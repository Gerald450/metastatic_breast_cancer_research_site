import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { MBC_Mortality, MortalityResponse } from '@/lib/types/mbc-data';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const state = searchParams.get('state');
    const ageGroup = searchParams.get('age_group');
    const race = searchParams.get('race');
    const sex = searchParams.get('sex');
    const causeFilter = searchParams.get('cause_filter');
    const byDimension = searchParams.get('by'); // 'age' | 'race' | 'sex' | 'cause_of_death'
    const dimension = searchParams.get('dimension'); // 'base' = year+state only (for rates/state charts)

    let query = supabase.from('mbc_mortality').select('*').order('year', { ascending: false });

    if (year) query = query.eq('year', parseInt(year, 10));
    if (state) query = query.eq('state', state);
    if (ageGroup) query = query.eq('age_group', ageGroup);
    if (race) query = query.eq('race', race);
    if (sex) query = query.eq('sex', sex);
    // Base dimension: only year+state rows (for mortality rates, state map, heatmap)
    if (dimension === 'base') query = query.is('age_group', null).is('race', null).is('sex', null);
    // For cause_of_death we need both C50 and all-cause rows, so don't filter by cause
    if (causeFilter && byDimension !== 'cause_of_death') query = query.eq('cause_filter', causeFilter);

    const { data, error } = await query;

    if (error) {
      return NextResponse.json<MortalityResponse>({ data: [], error: error.message }, { status: 500 });
    }

    const result = (data ?? []) as MBC_Mortality[];

    // Special formats for figures
    if (byDimension === 'cause_of_death') {
      const withAge = result.filter((r) => r.age_group);
      const breastByAge = new Map<string, number>();
      const allByAge = new Map<string, number>();
      for (const row of withAge) {
        const key = row.age_group!;
        if (row.cause_filter === 'all') {
          allByAge.set(key, (allByAge.get(key) ?? 0) + (row.deaths ?? 0));
        } else {
          breastByAge.set(key, (breastByAge.get(key) ?? 0) + (row.deaths ?? 0));
        }
      }
      const causeOfDeathData = Array.from(allByAge.entries())
        .map(([ageGroup, allDeaths]) => {
          const breastDeaths = breastByAge.get(ageGroup) ?? 0;
          return {
            ageGroup,
            breast: allDeaths > 0 ? Math.round((breastDeaths / allDeaths) * 100) : 0,
            other: allDeaths > 0 ? Math.round(((allDeaths - breastDeaths) / allDeaths) * 100) : 0,
          };
        })
        .filter((d) => d.ageGroup && d.ageGroup !== 'Not Stated');
      return NextResponse.json({ data: causeOfDeathData });
    }

    if (byDimension === 'sex') {
      const withSex = result.filter((r) => r.sex && (r.cause_filter === 'C50' || r.cause_filter == null));
      const bySex = new Map<string, number>();
      for (const row of withSex) {
        const label: string = row.sex === 'F' ? 'Female' : row.sex === 'M' ? 'Male' : (row.sex ?? 'Unknown');
        bySex.set(label, (bySex.get(label) ?? 0) + (row.deaths ?? 0));
      }
      return NextResponse.json({
        data: Array.from(bySex.entries()).map(([sex, count]) => ({ sex, count })),
      });
    }

    if (byDimension === 'race') {
      const withRace = result.filter((r) => r.race && (r.cause_filter === 'C50' || r.cause_filter == null));
      const byRace = new Map<string, number>();
      for (const row of withRace) {
        const label = row.race ?? 'Unknown';
        byRace.set(label, (byRace.get(label) ?? 0) + (row.deaths ?? 0));
      }
      return NextResponse.json({
        data: Array.from(byRace.entries()).map(([race, deaths]) => ({ race, deaths })),
      });
    }

    if (byDimension === 'age') {
      const withAge = result.filter((r) => r.age_group && (r.cause_filter === 'C50' || r.cause_filter == null));
      const byAge = new Map<string, number>();
      for (const row of withAge) {
        const key = row.age_group!;
        if (key === 'Not Stated') continue;
        byAge.set(key, (byAge.get(key) ?? 0) + (row.deaths ?? 0));
      }
      return NextResponse.json({
        data: Array.from(byAge.entries()).map(([ageGroup, deaths]) => ({ ageGroup, deaths })),
      });
    }

    return NextResponse.json<MortalityResponse>({ data: result });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json<MortalityResponse>({ data: [], error: msg }, { status: 500 });
  }
}
