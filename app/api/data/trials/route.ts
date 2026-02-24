import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { MBC_Trial, TrialsResponse } from '@/lib/types/mbc-data';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '100', 10), 500);
    const offset = parseInt(searchParams.get('offset') ?? '0', 10);

    let query = supabase.from('mbc_trials').select('*').range(offset, offset + limit - 1).order('synced_at', { ascending: false });

    if (status) {
      query = query.eq('overall_status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json<TrialsResponse>({ data: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json<TrialsResponse>({ data: (data ?? []) as MBC_Trial[] });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json<TrialsResponse>({ data: [], error: msg }, { status: 500 });
  }
}
