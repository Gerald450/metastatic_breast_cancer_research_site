import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Returns AAPC by age group for HR+/HER2- trends by age.
 * Uses count-based proxy when rate is missing: AAPC = ((count_end/count_start)^(1/years) - 1) * 100
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('incidence_rates_by_age_year')
      .select('year, age_group, age_adjusted_rate, count')
      .in('year', [2013, 2022])
      .order('year', { ascending: true });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    const byAge: Record<
      string,
      { rate2013?: number; rate2022?: number; count2013?: number; count2022?: number }
    > = {};

    for (const r of rows) {
      if (!byAge[r.age_group]) byAge[r.age_group] = {};
      if (r.year === 2013) {
        byAge[r.age_group].rate2013 = r.age_adjusted_rate ?? undefined;
        byAge[r.age_group].count2013 = r.count ?? undefined;
      }
      if (r.year === 2022) {
        byAge[r.age_group].rate2022 = r.age_adjusted_rate ?? undefined;
        byAge[r.age_group].count2022 = r.count ?? undefined;
      }
    }

    const chartData: { ageGroup: string; yearRange: string; aapc: number; direction: string }[] = [];

    for (const ageGroup of Object.keys(byAge).sort()) {
      const v = byAge[ageGroup];
      let aapc: number | null = null;
      if (v.rate2013 != null && v.rate2013 > 0 && v.rate2022 != null) {
        aapc = (Math.pow(v.rate2022 / v.rate2013, 1 / 9) - 1) * 100;
      } else if (v.count2013 != null && v.count2013 > 0 && v.count2022 != null) {
        aapc = (Math.pow(v.count2022 / v.count2013, 1 / 9) - 1) * 100;
      }
      if (aapc != null) {
        chartData.push({
          ageGroup,
          yearRange: '2013-2022',
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
