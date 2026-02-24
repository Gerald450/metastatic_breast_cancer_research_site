import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Compute AAPC via log-linear regression: log(rate) = a + b*year => AAPC = (exp(b)-1)*100.
 * Excludes 2020 from fit (per SEER: "2020 incidence rate(s) were not used in the fit of the trend line").
 */
function aapcFromRates(
  points: { year: number; rate: number }[]
): number | null {
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

/**
 * Computes AAPC from stored rates using log-linear regression (excludes 2020).
 * Returns 2013-2022 and 2018-2022; front end shows 2013-2022.
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
    const { data, error } = await supabase
      .from('incidence_rates_by_race_year')
      .select('year, race, age_adjusted_rate')
      .in('year', years)
      .order('year', { ascending: true });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    const byRace: Record<string, { year: number; rate: number }[]> = {};

    for (const r of rows) {
      if (r.age_adjusted_rate == null || r.age_adjusted_rate <= 0) continue;
      if (!byRace[r.race]) byRace[r.race] = [];
      byRace[r.race].push({ year: r.year, rate: r.age_adjusted_rate });
    }

    const chartData: { race: string; yearRange: string; aapc: number; direction: string }[] = [];

    for (const race of Object.keys(byRace).sort()) {
      const points = byRace[race];
      const exclude2020 = points.filter((p) => p.year !== 2020);
      const aapc1322 = aapcFromRates(exclude2020);
      if (aapc1322 != null) {
        chartData.push({
          race,
          yearRange: '2013-2022',
          aapc: Math.round(aapc1322 * 10) / 10,
          direction: aapc1322 > 0 ? 'Rising' : aapc1322 < 0 ? 'Falling' : 'Not Significant',
        });
      }
      const points1819 = points.filter((p) => p.year >= 2018 && p.year !== 2020);
      const aapc1822 = aapcFromRates(points1819);
      if (aapc1822 != null) {
        chartData.push({
          race,
          yearRange: '2018-2022',
          aapc: Math.round(aapc1822 * 10) / 10,
          direction: aapc1822 > 0 ? 'Rising' : aapc1822 < 0 ? 'Falling' : 'Not Significant',
        });
      }
    }

    return NextResponse.json({ data: chartData });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
