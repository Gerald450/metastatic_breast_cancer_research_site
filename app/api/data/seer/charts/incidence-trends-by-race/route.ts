import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Computes AAPC from stored rates and returns for bar chart.
 * AAPC (Average Annual Percent Change) = ((rate_end/rate_start)^(1/years) - 1) * 100
 * Returns 2013-2022 and 2018-2022; front end can show one or both.
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('incidence_rates_by_race_year')
      .select('year, race, age_adjusted_rate')
      .in('year', [2013, 2018, 2022])
      .order('year', { ascending: true });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    const byRace: Record<string, { rate2013?: number; rate2018?: number; rate2022?: number }> = {};

    for (const r of rows) {
      if (r.age_adjusted_rate == null) continue;
      if (!byRace[r.race]) byRace[r.race] = {};
      if (r.year === 2013) byRace[r.race].rate2013 = r.age_adjusted_rate;
      if (r.year === 2018) byRace[r.race].rate2018 = r.age_adjusted_rate;
      if (r.year === 2022) byRace[r.race].rate2022 = r.age_adjusted_rate;
    }

    const chartData: { race: string; yearRange: string; aapc: number; direction: string }[] = [];

    for (const race of Object.keys(byRace).sort()) {
      const v = byRace[race];
      // 2013-2022: 9 years
      if (v.rate2013 != null && v.rate2013 > 0 && v.rate2022 != null) {
        const aapc = (Math.pow(v.rate2022 / v.rate2013, 1 / 9) - 1) * 100;
        chartData.push({
          race,
          yearRange: '2013-2022',
          aapc: Math.round(aapc * 10) / 10,
          direction: aapc > 0 ? 'Rising' : aapc < 0 ? 'Falling' : 'Not Significant',
        });
      }
      // 2018-2022: 4 years
      if (v.rate2018 != null && v.rate2018 > 0 && v.rate2022 != null) {
        const aapc = (Math.pow(v.rate2022 / v.rate2018, 1 / 4) - 1) * 100;
        chartData.push({
          race,
          yearRange: '2018-2022',
          aapc: Math.round(aapc * 10) / 10,
          direction: aapc > 0 ? 'Rising' : aapc < 0 ? 'Falling' : 'Not Significant',
        });
      }
    }

    return NextResponse.json({ data: chartData });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
