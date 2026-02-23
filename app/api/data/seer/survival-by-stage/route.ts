import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600; // 1 hour cache

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('survival_by_stage')
      .select('stage, interval_month, relative_survival, ci_lower, ci_upper, n')
      .in('interval_month', [12, 24, 36, 48, 60])
      .order('stage')
      .order('interval_month', { ascending: true });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data: data ?? [] });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
