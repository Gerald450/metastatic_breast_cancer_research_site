#!/usr/bin/env npx tsx
/**
 * Seed figure_data table with hardcoded data from mbc-figure-data.ts.
 * Requires: Supabase env vars, and either dev server (for API) or direct Supabase client.
 *
 * Run: npm run seed-figure-data
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function loadDatasets() {
  const {
    mbcSurvivalOverTimeData,
    mbcSurvivorshipPopulationGrowthData,
    breastCancerMortalityRatesData,
    deNovoStageIVIncidenceData,
    mbcIncidenceByAgeData,
    mbcIncidenceByRaceData,
    mbcSurvivalByRaceData,
    sexDistributionBreastCancerData,
    ageAtDiagnosisVsDeathData,
    survivalByMetastaticSiteData,
    survivalByTumorSubtypeData,
    survivalTimeDistributionStageIVData,
    survivalCurvesByStageData,
    stateLevelBreastCancerMortalityData,
    breastCancerMortalityHeatMapData,
    causeOfDeathBreastVsOtherData,
    survivalByYearAndSubtypeData,
    insuranceVsStageAtDiagnosisData,
  } = await import('../lib/mbc-figure-data');

  return [
  { key: 'mbcSurvivalOverTime', rows: mbcSurvivalOverTimeData },
  { key: 'mbcSurvivorshipPopulationGrowth', rows: mbcSurvivorshipPopulationGrowthData },
  { key: 'breastCancerMortalityRates', rows: breastCancerMortalityRatesData },
  { key: 'deNovoStageIVIncidence', rows: deNovoStageIVIncidenceData },
  { key: 'mbcIncidenceByAge', rows: mbcIncidenceByAgeData },
  { key: 'mbcIncidenceByRace', rows: mbcIncidenceByRaceData },
  { key: 'mbcSurvivalByRace', rows: mbcSurvivalByRaceData },
  { key: 'sexDistributionBreastCancer', rows: sexDistributionBreastCancerData },
  { key: 'ageAtDiagnosisVsDeath', rows: ageAtDiagnosisVsDeathData },
  { key: 'survivalByMetastaticSite', rows: survivalByMetastaticSiteData },
  { key: 'survivalByTumorSubtype', rows: survivalByTumorSubtypeData },
  { key: 'survivalTimeDistributionStageIV', rows: survivalTimeDistributionStageIVData },
  { key: 'survivalCurvesByStage', rows: survivalCurvesByStageData },
  { key: 'stateLevelBreastCancerMortality', rows: stateLevelBreastCancerMortalityData },
  { key: 'breastCancerMortalityHeatMap', rows: breastCancerMortalityHeatMapData },
  { key: 'causeOfDeathBreastVsOther', rows: causeOfDeathBreastVsOtherData },
  { key: 'survivalByYearAndSubtype', rows: survivalByYearAndSubtypeData },
  { key: 'insuranceVsStageAtDiagnosis', rows: insuranceVsStageAtDiagnosisData },
  ];
}

async function main() {
  const DATASETS = await loadDatasets();
  console.log('Seeding figure_data...');

  let total = 0;
  for (const { key, rows } of DATASETS) {
    const { error } = await supabase.from('figure_data').delete().eq('dataset_key', key);
    if (error) {
      console.error(`Delete ${key}:`, error.message);
      continue;
    }

    const inserts = rows.map((row, i) => ({
      dataset_key: key,
      row_index: i,
      data: row as Record<string, unknown>,
    }));

    const { error: insertErr } = await supabase.from('figure_data').insert(inserts);
    if (insertErr) {
      console.error(`Insert ${key}:`, insertErr.message);
      continue;
    }
    total += rows.length;
    console.log(`  ${key}: ${rows.length} rows`);
  }

  console.log(`Total: ${total} rows`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
