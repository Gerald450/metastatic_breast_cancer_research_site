import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Median age at diagnosis by breast cancer subtype.
 * Returns { subtype, median_age } for bar chart.
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('median_age_by_subtype')
      .select('subtype, median_age')
      .order('median_age', { ascending: true });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const chartData = (data ?? []).map((r) => ({
      subtype: r.subtype,
      median_age: Number(r.median_age),
    }));

    return NextResponse.json({ data: chartData });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
