import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { MBC_Publication, PublicationsResponse } from '@/lib/types/mbc-data';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200);
    const offset = parseInt(searchParams.get('offset') ?? '0', 10);
    const year = searchParams.get('year');

    let query = supabase.from('mbc_publications').select('*').range(offset, offset + limit - 1).order('pub_date', { ascending: false });

    if (year) {
      query = query.like('pub_date', `${year}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json<PublicationsResponse>({ data: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json<PublicationsResponse>({ data: (data ?? []) as MBC_Publication[] });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json<PublicationsResponse>({ data: [], error: msg }, { status: 500 });
  }
}
