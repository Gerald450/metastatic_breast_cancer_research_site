/**
 * SEER TXT file parser and data cleaning utilities.
 * Files from public/txtData/ (SEER*Stat 21 Registries, 2000–2022).
 */

const NULL_MARKERS = ['+', '~', '#', 'NA', ''];

/** Convert percentage string "45.7%" to decimal 0.457 */
export function parsePercent(s: string | null | undefined): number | null {
  if (s == null || s === '') return null;
  const t = String(s).trim().replace(/^["']|["']$/g, '');
  if (NULL_MARKERS.includes(t)) return null;
  const m = t.match(/^([\d.]+)%?$/);
  if (!m) return null;
  const v = parseFloat(m[1]);
  return isNaN(v) ? null : t.includes('%') ? v / 100 : v;
}

/** Convert to number; "+", "~", "#" → null */
export function parseNum(s: string | null | undefined): number | null {
  if (s == null || s === '') return null;
  const t = String(s).trim().replace(/^["']|["']$/g, '');
  if (NULL_MARKERS.includes(t)) return null;
  const v = parseFloat(t.replace(/,/g, ''));
  return isNaN(v) ? null : v;
}

/** Trim and remove quotes from string */
export function cleanStr(s: string | null | undefined): string {
  if (s == null) return '';
  return String(s).trim().replace(/^["']|["']$/g, '');
}

/** Parse comma-separated line, handling quoted fields */
export function parseCSVLine(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuote = !inQuote;
    } else if ((c === ',' && !inQuote) || c === '\r') {
      out.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  out.push(cur.trim());
  return out;
}

/** Check if line looks like metadata (starts with [ or non-data pattern) */
export function isMetadataLine(line: string): boolean {
  const t = line.trim();
  return t.startsWith('[') || t === '' || /^Var\d+Name=/.test(t) || /^\[.*\]$/.test(t);
}

// --- Survival file column indices (from Dic files) ---
// 0: Page type, 1: Subtype/Stage/Year, 2: Summary Interval, 3: N
// 4: Median Obs, 5: Median Rel, 6: Observed, 7: Expected
// 8: Relative (survival %), 9: SE Obs, 10: SE Rel
// 11-12: Obs CIs, 13: Rel Cum CIs Lower, 14: Rel Cum CIs Upper

const COL_DIM = 1; // subtype, stage, or year
const COL_INTERVAL = 2;
const COL_N = 3;
const COL_RELATIVE = 8;
const COL_CI_LOWER = 13;
const COL_CI_UPPER = 14;

const SUBTYPE_EXCLUDE = new Set([
  'Unknown',
  'Recode not available',
  'Blank(s)',
]);

const STAGE_EXCLUDE = new Set([
  'Unknown/unstaged/unspecified/DCO',
  'Blank(s)',
  'Not applicable/Benign/Borderline',
  'In situ',
]);

const STAGE_KEEP_PREFIXES = [
  'Localized only',
  'Regional',
  'Distant site(s)/node(s)',
];

function keepStage(stage: string): boolean {
  if (STAGE_EXCLUDE.has(stage)) return false;
  return STAGE_KEEP_PREFIXES.some((p) => stage.startsWith(p));
}

const INTERVAL_MO = /^(\d+)\s*mo$/;

function parseIntervalMo(s: string): number | null {
  const m = s.match(INTERVAL_MO);
  return m ? parseInt(m[1], 10) : null;
}

export interface SurvivalRow {
  stage?: string;
  subtype?: string;
  year?: string;
  interval_month: number;
  relative_survival: number | null;
  ci_lower: number | null;
  ci_upper: number | null;
  n: number | null;
}

/** Parse survival TXT content (subtype, stage, or year) */
export function parseSurvivalTxt(
  content: string,
  mode: 'subtype' | 'stage' | 'year'
): SurvivalRow[] {
  const rows: SurvivalRow[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    if (isMetadataLine(line)) continue;
    const cols = parseCSVLine(line);
    if (cols.length < 9) continue;

    const dim = cleanStr(cols[COL_DIM]);
    const intervalStr = cleanStr(cols[COL_INTERVAL]);
    const intervalMonth = parseIntervalMo(intervalStr);
    if (intervalMonth == null) continue;

    if (mode === 'subtype' && SUBTYPE_EXCLUDE.has(dim)) continue;
    if (mode === 'stage' && !keepStage(dim)) continue;

    const rel = parsePercent(cols[COL_RELATIVE]);
    const ciLo = cols.length > COL_CI_LOWER ? parsePercent(cols[COL_CI_LOWER]) : null;
    const ciHi = cols.length > COL_CI_UPPER ? parsePercent(cols[COL_CI_UPPER]) : null;
    const n = parseNum(cols[COL_N]);

    const row: SurvivalRow = {
      interval_month: intervalMonth,
      relative_survival: rel,
      ci_lower: ciLo,
      ci_upper: ciHi,
      n,
    };
    if (mode === 'subtype') row.subtype = dim;
    if (mode === 'stage') row.stage = dim;
    if (mode === 'year') row.year = dim;

    rows.push(row);
  }
  return rows;
}

/** For survival_by_year: only 60 mo interval, exclude years with "+" (invalid) */
export function filterSurvivalByYear(rows: SurvivalRow[]): SurvivalRow[] {
  return rows.filter((r) => {
    if (r.interval_month !== 60) return false;
    if (r.relative_survival == null) return false;
    const y = r.year ?? '';
    if (y.includes('-') || y === '2000' || y === '2001' || y === '2002' || y === '2003') return false;
    const yr = parseInt(y, 10);
    return yr >= 2004 && yr <= 2022 && !isNaN(yr);
  });
}

/** For survival curves: intervals 12, 24, 36, 48, 60 only */
export function filterSurvivalCurveIntervals(rows: SurvivalRow[]): SurvivalRow[] {
  const valid = new Set([12, 24, 36, 48, 60]);
  return rows.filter((r) => valid.has(r.interval_month));
}

// --- Incidence ---

const RACE_EXCLUDE = new Set(['Unknown']);

export interface IncidenceByRaceRow {
  race: string;
  age_adjusted_rate: number | null;
  count: number | null;
  population: number | null;
}

export function parseIncidenceByRaceTxt(content: string): IncidenceByRaceRow[] {
  const rows: IncidenceByRaceRow[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    if (isMetadataLine(line)) continue;
    const cols = parseCSVLine(line);
    if (cols.length < 4) continue;

    const race = cleanStr(cols[0]);
    if (RACE_EXCLUDE.has(race)) continue;

    const rate = parseNum(cols[1]);
    const count = parseNum(cols[2]);
    const pop = parseNum(cols[3]);

    rows.push({
      race,
      age_adjusted_rate: rate,
      count: count ?? null,
      population: pop ?? null,
    });
  }
  return rows;
}

export interface IncidenceByYearRow {
  year: number;
  age_adjusted_rate: number | null;
  count: number | null;
  population: number | null;
}

export function parseIncidenceByYearTxt(content: string): IncidenceByYearRow[] {
  const rows: IncidenceByYearRow[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    if (isMetadataLine(line)) continue;
    const cols = parseCSVLine(line);
    if (cols.length < 4) continue;

    const yearStr = cleanStr(cols[0]);
    if (yearStr.includes('-')) continue; // skip "2000-2022"
    const year = parseInt(yearStr, 10);
    if (isNaN(year) || year < 2000 || year > 2022) continue;

    const rate = parseNum(cols[1]);
    const count = parseNum(cols[2]);
    const pop = parseNum(cols[3]);

    rows.push({
      year,
      age_adjusted_rate: rate,
      count: count ?? null,
      population: pop ?? null,
    });
  }
  return rows;
}

// --- Cause of death ---

export interface CauseOfDeathRow {
  cause: string;
  count: number | null;
}

export function parseCauseOfDeathTxt(content: string): CauseOfDeathRow[] {
  const rows: CauseOfDeathRow[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    if (isMetadataLine(line)) continue;
    const cols = parseCSVLine(line);
    if (cols.length < 2) continue;

    const cause = cleanStr(cols[0]);
    const count = parseNum(cols[1]);
    if (!cause) continue;

    rows.push({ cause, count });
  }
  return rows;
}
