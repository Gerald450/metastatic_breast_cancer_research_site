import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Returns incidence by stage at diagnosis for bar chart (HR+/HER2- visual).
 * Format: { stage, ratePer100k }
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('incidence_by_stage_at_diagnosis')
      .select('stage, rate_per_100k')
      .order('stage');

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const chartData = (data ?? []).map((r) => ({
      stage: r.stage,
      ratePer100k: r.rate_per_100k != null ? Math.round(r.rate_per_100k * 10) / 10 : null,
    }));

    return NextResponse.json({ data: chartData });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
