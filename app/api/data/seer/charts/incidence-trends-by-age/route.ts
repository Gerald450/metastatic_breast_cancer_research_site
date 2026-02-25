import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Compute AAPC via log-linear regression: log(rate) = a + b*year => AAPC = (exp(b)-1)*100.
 * Excludes 2020 from fit (per SEER: "2020 incidence rate(s) were not used in the fit of the trend line").
 * Negative AAPC means incidence declined over the period (correct interpretation).
 */
function aapcFromRates(points: { year: number; rate: number }[]): number | null {
  const valid = points.filter((p) => p.rate > 0);
  if (valid.length < 2) return null;
  const n = valid.length;
  const sumX = valid.reduce((s, p) => s + p.year, 0);
  const sumY = valid.reduce((s, p) => s + Math.log(p.rate), 0);
  const sumXX = valid.reduce((s, p) => s + p.year * p.year, 0);
  const sumXY = valid.reduce((s, p) => s + p.year * Math.log(p.rate), 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  if (!Number.isFinite(slope)) return null;
  return (Math.exp(slope) - 1) * 100;
}

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
    const { data, error } = await supabase
      .from('incidence_rates_by_age_year')
      .select('year, age_group, age_adjusted_rate')
      .in('year', years)
      .order('year', { ascending: true });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    const byAge: Record<string, { year: number; rate: number }[]> = {};

    for (const r of rows) {
      if (r.age_adjusted_rate == null || r.age_adjusted_rate <= 0) continue;
      if (!byAge[r.age_group]) byAge[r.age_group] = [];
      byAge[r.age_group].push({ year: r.year, rate: r.age_adjusted_rate });
    }

    const chartData: { ageGroup: string; yearRange: string; aapc: number; direction: string }[] = [];

    for (const ageGroup of Object.keys(byAge).sort()) {
      const points = byAge[ageGroup];
      const exclude2020 = points.filter((p) => p.year !== 2020);
      const aapc = aapcFromRates(exclude2020);
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
