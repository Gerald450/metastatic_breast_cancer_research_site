import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { MBC_Drug, DrugsResponse } from '@/lib/types/mbc-data';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '100', 10), 500);
    const offset = parseInt(searchParams.get('offset') ?? '0', 10);

    const { data, error } = await supabase
      .from('mbc_drugs')
      .select('*')
      .order('brand_name', { ascending: true, nullsFirst: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json<DrugsResponse>({ data: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json<DrugsResponse>({ data: (data ?? []) as MBC_Drug[] });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json<DrugsResponse>({ data: [], error: msg }, { status: 500 });
  }
}
