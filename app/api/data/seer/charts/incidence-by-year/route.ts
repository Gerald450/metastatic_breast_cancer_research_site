import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Returns incidence by year for line chart.
 * Format: { year, age_adjusted_rate, count }
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('incidence_by_year')
      .select('year, age_adjusted_rate, count')
      .order('year', { ascending: true });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const chartData = (data ?? []).map((r) => ({
      year: String(r.year),
      age_adjusted_rate: r.age_adjusted_rate,
      count: r.count,
    }));

    return NextResponse.json({ data: chartData });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
