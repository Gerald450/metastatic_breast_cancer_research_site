import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

const VALID_KEYS = new Set([
  'mbcSurvivalOverTime',
  'mbcSurvivorshipPopulationGrowth',
  'breastCancerMortalityRates',
  'deNovoStageIVIncidence',
  'mbcIncidenceByAge',
  'mbcIncidenceByRace',
  'mbcSurvivalByRace',
  'sexDistributionBreastCancer',
  'ageAtDiagnosisVsDeath',
  'survivalByMetastaticSite',
  'survivalByTumorSubtype',
  'survivalTimeDistributionStageIV',
  'survivalCurvesByStage',
  'stateLevelBreastCancerMortality',
  'breastCancerMortalityHeatMap',
  'causeOfDeathBreastVsOther',
  'survivalByYearAndSubtype',
  'insuranceVsStageAtDiagnosis',
]);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    if (!key || !VALID_KEYS.has(key)) {
      return NextResponse.json(
        { data: [], error: `Invalid dataset key: ${key}` },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('figure_data')
      .select('data')
      .eq('dataset_key', key)
      .order('row_index', { ascending: true });

    if (error) {
      return NextResponse.json(
        { data: [], error: error.message },
        { status: 500 }
      );
    }

    const rows = (data ?? []).map((r) => r.data as Record<string, unknown>);
    return NextResponse.json({ data: rows });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { data: [], error: msg },
      { status: 500 }
    );
  }
}
