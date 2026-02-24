import { NextRequest, NextResponse } from 'next/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import {
  parseSurvivalTxt,
  filterSurvivalByYear,
  filterSurvivalCurveIntervals,
  parseIncidenceByRaceTxt,
  parseIncidenceByYearTxt,
  parseCauseOfDeathTxt,
} from '@/lib/seer-parser';

const TXT_DIR = path.join(process.cwd(), 'public', 'txtData');

function readTxt(name: string): string {
  const p = path.join(TXT_DIR, name);
  return fs.readFileSync(p, 'utf-8');
}

interface ValidationRow {
  relative_survival?: number | null;
}

async function validateIngestion(supabase: SupabaseClient): Promise<string[]> {
  const errors: string[] = [];

  const { data: distant } = await supabase
    .from('survival_by_stage')
    .select('relative_survival')
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
    .select('relative_survival')
    .eq('subtype', 'HR-/HER2-')
    .eq('interval_month', 60)
    .single();

  const t = tnbc as ValidationRow | null;
  if (t?.relative_survival != null) {
    const pct = Number(t.relative_survival) * 100;
    if (pct < 12 || pct > 18) {
      errors.push(`TNBC 5-year survival ${pct.toFixed(1)}% outside expected 13–15%`);
    }
  }

  const { data: hrHer2 } = await supabase
    .from('survival_by_subtype')
    .select('relative_survival')
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

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: 'Supabase env vars missing' }, { status: 500 });
    }

    const supabase = createClient(url, key);

    // Survival by subtype
    const subtypeTxt = readTxt('survival_by_subtype.txt');
    const subtypeRows = filterSurvivalCurveIntervals(parseSurvivalTxt(subtypeTxt, 'subtype'));
    const { error: e1 } = await supabase.from('survival_by_subtype').upsert(
      subtypeRows.map((r) => ({
        subtype: r.subtype!,
        interval_month: r.interval_month,
        relative_survival: r.relative_survival,
        ci_lower: r.ci_lower,
        ci_upper: r.ci_upper,
        n: r.n,
      })),
      { onConflict: 'subtype,interval_month' }
    );
    if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });

    // Survival by stage
    const stageTxt = readTxt('survival_by_stage.txt');
    const stageRows = filterSurvivalCurveIntervals(parseSurvivalTxt(stageTxt, 'stage'));
    const { error: e2 } = await supabase.from('survival_by_stage').upsert(
      stageRows.map((r) => ({
        stage: r.stage!,
        interval_month: r.interval_month,
        relative_survival: r.relative_survival,
        ci_lower: r.ci_lower,
        ci_upper: r.ci_upper,
        n: r.n,
      })),
      { onConflict: 'stage,interval_month' }
    );
    if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });

    // Survival by year
    const yearTxt = readTxt('median_survival_by_year.txt');
    const yearRows = filterSurvivalByYear(parseSurvivalTxt(yearTxt, 'year'));
    const { error: e3 } = await supabase.from('survival_by_year').upsert(
      yearRows.map((r) => ({
        year: parseInt(r.year!, 10),
        relative_survival_5yr: r.relative_survival,
        n: r.n,
      })),
      { onConflict: 'year' }
    );
    if (e3) return NextResponse.json({ error: e3.message }, { status: 500 });

    // Incidence by race
    const raceTxt = readTxt('incidence_by_race.txt');
    const raceRows = parseIncidenceByRaceTxt(raceTxt);
    const { error: e4 } = await supabase.from('incidence_by_race').upsert(
      raceRows.map((r) => ({
        race: r.race,
        age_adjusted_rate: r.age_adjusted_rate,
        count: r.count,
        population: r.population,
      })),
      { onConflict: 'race' }
    );
    if (e4) return NextResponse.json({ error: e4.message }, { status: 500 });

    // Incidence by year
    const incYearTxt = readTxt('Incidence_rates.txt');
    const incYearRows = parseIncidenceByYearTxt(incYearTxt);
    const { error: e5 } = await supabase.from('incidence_by_year').upsert(
      incYearRows.map((r) => ({
        year: r.year,
        age_adjusted_rate: r.age_adjusted_rate,
        count: r.count,
        population: r.population,
      })),
      { onConflict: 'year' }
    );
    if (e5) return NextResponse.json({ error: e5.message }, { status: 500 });

    // Cause of death
    const codTxt = readTxt('cod.txt');
    const codRows = parseCauseOfDeathTxt(codTxt);
    const { error: e6 } = await supabase.from('cause_of_death').upsert(
      codRows.map((r) => ({ cause: r.cause, count: r.count })),
      { onConflict: 'cause' }
    );
    if (e6) return NextResponse.json({ error: e6.message }, { status: 500 });

    const validationErrors = await validateIngestion(supabase);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { synced: true, validationErrors },
        { status: 207 }
      );
    }

    return NextResponse.json({
      synced: true,
      counts: {
        survival_by_subtype: subtypeRows.length,
        survival_by_stage: stageRows.length,
        survival_by_year: yearRows.length,
        incidence_by_race: raceRows.length,
        incidence_by_year: incYearRows.length,
        cause_of_death: codRows.length,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
