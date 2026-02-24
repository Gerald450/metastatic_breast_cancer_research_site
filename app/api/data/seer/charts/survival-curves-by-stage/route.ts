import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/**
 * Transforms survival_by_stage into chart format:
 * { month, stageI, stageII, stageIII, stageIV }
 * Maps: Localized → stageI, Regional* → stageII/stageIII, Distant → stageIV
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('survival_by_stage')
      .select('stage, interval_month, relative_survival')
      .in('interval_month', [12, 24, 36, 48, 60])
      .order('interval_month', { ascending: true });

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    const localized = rows.filter((r) => r.stage === 'Localized only');
    const regionalExt = rows.filter((r) => r.stage === 'Regional by direct extension only');
    const regionalNodes = rows.filter((r) => r.stage === 'Regional lymph nodes involved only');
    const regionalBoth = rows.filter((r) => r.stage === 'Regional by both direct extension and lymph node involvement');
    const distant = rows.filter((r) => r.stage === 'Distant site(s)/node(s) involved');

    const toPct = (v: number | null) => (v != null ? Math.round(v * 100) : null);

    const chartData: Record<string, unknown>[] = [
      {
        month: 0,
        stageI: 100,
        stageII: 100,
        stageIII: 100,
        stageIV: 100,
      },
    ];

    for (const mo of [12, 24, 36, 48, 60]) {
      const getVal = (arr: { interval_month: number; relative_survival: number | null }[]) => {
        const r = arr.find((x) => x.interval_month === mo);
        return toPct(r?.relative_survival ?? null);
      };
      const stageI = getVal(localized) ?? 100;
      const stageII = getVal(regionalNodes) ?? getVal(regionalExt) ?? 90;
      const stageIII = getVal(regionalBoth) ?? 80;
      const stageIV = getVal(distant) ?? 30;

      chartData.push({
        month: mo,
        stageI,
        stageII,
        stageIII,
        stageIV,
      });
    }

    return NextResponse.json({ data: chartData });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
