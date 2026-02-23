import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Returns 5-year relative survival by year for line chart.
 * Format: { year, relativeSurvivalPercent }
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('survival_by_year')
      .select('year, relative_survival_5yr')
      .order('year', { ascending: true });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const chartData = (data ?? []).map((r) => ({
      year: String(r.year),
      relativeSurvivalPercent: r.relative_survival_5yr != null ? Math.round(r.relative_survival_5yr * 1000) / 10 : null,
    }));

    return NextResponse.json({ data: chartData });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
