import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

/** Short labels for bar chart display */
const STAGE_LABELS: Record<string, string> = {
  'Localized only': 'Localized',
  'Regional by direct extension only': 'Regional (extension)',
  'Regional lymph nodes involved only': 'Regional (nodes)',
  'Regional by both direct extension and lymph node involvement': 'Regional (both)',
  'Distant site(s)/node(s) involved': 'Distant',
};

/** Display order for stages */
const STAGE_ORDER = [
  'Localized only',
  'Regional lymph nodes involved only',
  'Regional by direct extension only',
  'Regional by both direct extension and lymph node involvement',
  'Distant site(s)/node(s) involved',
];

/**
 * Returns 5-year (60 mo) relative survival by stage for bar chart.
 * Format: { stage, relativeSurvivalPercent }
 */
export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('survival_by_stage')
      .select('stage, relative_survival')
      .eq('interval_month', 60)
      .in('stage', STAGE_ORDER);

    if (error) {
      return NextResponse.json({ data: [], error: error.message }, { status: 500 });
    }

    const rows = data ?? [];
    const chartData = STAGE_ORDER.filter((s) => rows.some((r) => r.stage === s)).map((stage) => {
      const r = rows.find((x) => x.stage === stage);
      return {
        stage: STAGE_LABELS[stage] ?? stage,
        relativeSurvivalPercent:
          r?.relative_survival != null ? Math.round(r.relative_survival * 1000) / 10 : null,
      };
    });

    return NextResponse.json({ data: chartData });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ data: [], error: msg }, { status: 500 });
  }
}
