#!/usr/bin/env npx tsx
/**
 * Ingest SEER TXT files from public/txtData/ into Supabase.
 * Run: npm run ingest:seer
 * Loads .env.local for NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import * as path from 'path';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '..', '.env.local') });

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import {
  parseSurvivalTxt,
  filterSurvivalByYear,
  filterSurvivalCurveIntervals,
  parseIncidenceByRaceTxt,
  parseIncidenceByYearTxt,
  parseCauseOfDeathTxt,
} from '../lib/seer-parser';

const TXT_DIR = path.join(__dirname, '..', 'public', 'txtData');

function readTxt(name: string): string {
  const p = path.join(TXT_DIR, name);
  return fs.readFileSync(p, 'utf-8');
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, key);
}

interface ValidationRow {
  relative_survival?: number | null;
}

/** Validation: expected ranges */
async function validateIngestion(supabase: SupabaseClient): Promise<void> {
  const errors: string[] = [];

  const { data: distant } = await supabase
    .from('survival_by_stage')
    .select('stage, interval_month, relative_survival')
    .eq('stage', 'Distant site(s)/node(s) involved')
    .eq('interval_month', 60)
    .single();

  const d = distant as ValidationRow | null;
  if (d?.relative_survival != null) {
    const pct = Number(d.relative_survival) * 100;
    if (pct < 28 || pct > 35) {
      errors.push(`Distant-stage 5-year survival ${pct.toFixed(1)}% outside expected 30–32%`);
    }
  }

  const { data: tnbc } = await supabase
    .from('survival_by_subtype')
    .select('subtype, interval_month, relative_survival')
    .eq('subtype', 'HR-/HER2-')
    .eq('interval_month', 60)
    .single();

  const t = tnbc as ValidationRow | null;
  if (t?.relative_survival != null) {
    const pct = Number(t.relative_survival) * 100;
    if (pct < 12 || pct > 18) {
      errors.push(`TNBC (HR-/HER2-) 5-year survival ${pct.toFixed(1)}% outside expected 13–15%`);
    }
  }

  const { data: hrHer2 } = await supabase
    .from('survival_by_subtype')
    .select('subtype, interval_month, relative_survival')
    .eq('subtype', 'HR+/HER2+')
    .eq('interval_month', 60)
    .single();

  const h = hrHer2 as ValidationRow | null;
  if (h?.relative_survival != null) {
    const pct = Number(h.relative_survival) * 100;
    if (pct < 42 || pct > 50) {
      errors.push(`HR+/HER2+ 5-year survival ${pct.toFixed(1)}% outside expected 45–46%`);
    }
  }

  if (errors.length > 0) {
    console.error('Validation errors:', errors);
    throw new Error(errors.join('; '));
  }
}

async function main() {
  const supabase = getSupabase();

  // 1. Survival by subtype
  const subtypeTxt = readTxt('survival_by_subtype.txt');
  const subtypeRows = parseSurvivalTxt(subtypeTxt, 'subtype');
  const subtypeRowsFiltered = filterSurvivalCurveIntervals(subtypeRows);

  const subtypeUpsert = subtypeRowsFiltered.map((r) => ({
    subtype: r.subtype!,
    interval_month: r.interval_month,
    relative_survival: r.relative_survival,
    ci_lower: r.ci_lower,
    ci_upper: r.ci_upper,
    n: r.n,
  }));

  const { error: e1 } = await supabase.from('survival_by_subtype').upsert(subtypeUpsert, {
    onConflict: 'subtype,interval_month',
  });
  if (e1) throw e1;
  console.log(`survival_by_subtype: ${subtypeUpsert.length} rows`);

  // 2. Survival by stage
  const stageTxt = readTxt('survival_by_stage.txt');
  const stageRows = parseSurvivalTxt(stageTxt, 'stage');
  const stageRowsFiltered = filterSurvivalCurveIntervals(stageRows);

  const stageUpsert = stageRowsFiltered.map((r) => ({
    stage: r.stage!,
    interval_month: r.interval_month,
    relative_survival: r.relative_survival,
    ci_lower: r.ci_lower,
    ci_upper: r.ci_upper,
    n: r.n,
  }));

  const { error: e2 } = await supabase.from('survival_by_stage').upsert(stageUpsert, {
    onConflict: 'stage,interval_month',
  });
  if (e2) throw e2;
  console.log(`survival_by_stage: ${stageUpsert.length} rows`);

  // 3. Survival by year (median_survival_by_year.txt, 60 mo only)
  const yearTxt = readTxt('median_survival_by_year.txt');
  const yearRows = parseSurvivalTxt(yearTxt, 'year');
  const yearRowsFiltered = filterSurvivalByYear(yearRows);

  const yearUpsert = yearRowsFiltered.map((r) => ({
    year: parseInt(r.year!, 10),
    relative_survival_5yr: r.relative_survival,
    n: r.n,
  }));

  const { error: e3 } = await supabase.from('survival_by_year').upsert(yearUpsert, {
    onConflict: 'year',
  });
  if (e3) throw e3;
  console.log(`survival_by_year: ${yearUpsert.length} rows`);

  // 4. Incidence by race
  const raceTxt = readTxt('incidence_by_race.txt');
  const raceRows = parseIncidenceByRaceTxt(raceTxt);

  const raceUpsert = raceRows.map((r) => ({
    race: r.race,
    age_adjusted_rate: r.age_adjusted_rate,
    count: r.count,
    population: r.population,
  }));

  const { error: e4 } = await supabase.from('incidence_by_race').upsert(raceUpsert, {
    onConflict: 'race',
  });
  if (e4) throw e4;
  console.log(`incidence_by_race: ${raceUpsert.length} rows`);

  // 5. Incidence by year
  const incYearTxt = readTxt('Incidence_rates.txt');
  const incYearRows = parseIncidenceByYearTxt(incYearTxt);

  const incYearUpsert = incYearRows.map((r) => ({
    year: r.year,
    age_adjusted_rate: r.age_adjusted_rate,
    count: r.count,
    population: r.population,
  }));

  const { error: e5 } = await supabase.from('incidence_by_year').upsert(incYearUpsert, {
    onConflict: 'year',
  });
  if (e5) throw e5;
  console.log(`incidence_by_year: ${incYearUpsert.length} rows`);

  // 6. Cause of death
  const codTxt = readTxt('cod.txt');
  const codRows = parseCauseOfDeathTxt(codTxt);

  const codUpsert = codRows.map((r) => ({
    cause: r.cause,
    count: r.count,
  }));

  const { error: e6 } = await supabase.from('cause_of_death').upsert(codUpsert, {
    onConflict: 'cause',
  });
  if (e6) throw e6;
  console.log(`cause_of_death: ${codUpsert.length} rows`);

  // Validation
  await validateIngestion(supabase);
  console.log('Validation passed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
