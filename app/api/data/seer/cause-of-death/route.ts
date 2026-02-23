import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600; // 1 hour cache

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('cause_of_death')
      .select('cause, count')
      .order('count', { ascending: false });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data: data ?? [] });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
