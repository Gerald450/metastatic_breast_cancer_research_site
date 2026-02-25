import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * HR+/HER2+ (Luminal B) incidence by race: 5-year (2018-2022) age-adjusted rate per 100,000.
 * Returns { race, age_adjusted_rate } for bar chart.
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('hr_her2_pos_incidence_by_race_year')
      .select('race, age_adjusted_rate')
      .in('year', [2018, 2019, 2020, 2021, 2022])
      .order('race');

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    const byRace: Record<string, number[]> = {};
    for (const r of rows) {
      if (r.age_adjusted_rate != null && r.age_adjusted_rate > 0) {
        if (!byRace[r.race]) byRace[r.race] = [];
        byRace[r.race].push(Number(r.age_adjusted_rate));
      }
    }

    const chartData = Object.entries(byRace).map(([race, rates]) => {
      const avg = rates.reduce((a, b) => a + b, 0) / rates.length;
      return { race, age_adjusted_rate: Math.round(avg * 10) / 10 };
    }).sort((a, b) => a.race.localeCompare(b.race));

    return NextResponse.json({ data: chartData });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
