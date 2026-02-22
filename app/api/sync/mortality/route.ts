import { NextResponse } from 'next/server';

/**
 * CDC WONDER mortality sync - disabled.
 * CDC API has rate limits and consent requirements that make it unreliable.
 * Mortality figures use static data from lib/mbc-figure-data.ts.
 */
export async function POST() {
  return NextResponse.json({
    synced: 0,
    errors: ['CDC WONDER sync disabled. Mortality figures use static reference data.'],
  });
}
