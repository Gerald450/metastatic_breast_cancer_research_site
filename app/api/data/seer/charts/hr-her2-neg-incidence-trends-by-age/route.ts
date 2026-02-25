import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * AAPC from counts via log-linear regression: log(count) = a + b*year => AAPC = (exp(b)-1)*100.
 * Excludes 2020 from fit (per SEER). Data from hr_her2_neg_incidence_by_age_year (Incidence_trends_by_agetxt.txt / luminal).
 */
function aapcFromCounts(points: { year: number; count: number }[]): number | null {
  const valid = points.filter((p) => p.count > 0);
  if (valid.length < 2) return null;
  const n = valid.length;
  const sumX = valid.reduce((s, p) => s + p.year, 0);
  const sumY = valid.reduce((s, p) => s + Math.log(p.count), 0);
  const sumXX = valid.reduce((s, p) => s + p.year * p.year, 0);
  const sumXY = valid.reduce((s, p) => s + p.year * Math.log(p.count), 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  if (!Number.isFinite(slope)) return null;
  return (Math.exp(slope) - 1) * 100;
}

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
    const { data, error } = await supabase
      .from('hr_her2_neg_incidence_by_age_year')
      .select('year, age_group, count')
      .in('year', years)
      .order('year', { ascending: true });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    const byAge: Record<string, { year: number; count: number }[]> = {};

    for (const r of rows) {
      if (r.count == null || r.count <= 0) continue;
      if (!byAge[r.age_group]) byAge[r.age_group] = [];
      byAge[r.age_group].push({ year: r.year, count: r.count });
    }

    const chartData: { ageGroup: string; yearRange: string; aapc: number; direction: string }[] = [];

    for (const ageGroup of Object.keys(byAge).sort()) {
      const points = byAge[ageGroup];
      const exclude2020 = points.filter((p) => p.year !== 2020);
      const aapc = aapcFromCounts(exclude2020);
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
