import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Returns incidence by race for bar chart.
 * Format: { race, age_adjusted_rate, count }
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('incidence_by_race')
      .select('race, age_adjusted_rate, count')
      .order('race');

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data ?? [] });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
