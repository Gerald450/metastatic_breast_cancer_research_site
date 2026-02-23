import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Returns 5-year (60 mo) relative survival by subtype for bar chart.
 * Format: { subtype, relativeSurvivalPercent }
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('survival_by_subtype')
      .select('subtype, relative_survival')
      .eq('interval_month', 60)
      .order('subtype');

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const chartData = (data ?? []).map((r) => ({
      subtype: r.subtype,
      relativeSurvivalPercent: r.relative_survival != null ? Math.round(r.relative_survival * 1000) / 10 : null,
    }));

    return NextResponse.json({ data: chartData });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
