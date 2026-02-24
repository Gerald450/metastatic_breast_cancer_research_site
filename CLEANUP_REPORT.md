# Production-Level Codebase Cleanup Report

**Project:** MBC (Metastatic Breast Cancer) — Next.js App Router, TypeScript, Supabase, TailwindCSS, Vercel  
**Report date:** Generated from static analysis. No deletions performed.  
**Scope:** `my-app/` (excluding `.next`, `.git`, `node_modules`).

---

## PHASE 1 — SAFE DISCOVERY

### 1. Classified items

#### A. SAFE TO DELETE (high confidence, no production dependency)

| Item | Path / detail | Reason |
|------|----------------|--------|
| Unused hook | `lib/use-multiple-figure-data.ts` | Never imported. Only `useFigureData` (single URL) is used. |
| Unused chart component | `components/charts/AreaTimeSeriesChart.tsx` | Never imported anywhere. |
| Unused figure components | `components/figures/TumorEvolutionDiagram.tsx`, `components/figures/GeographicEvidenceVisual.tsx`, `components/figures/DemographicSegmentsVisual.tsx`, `components/figures/AgeRaceDistributionFigure.tsx` | Defined and exported but never imported by any page or parent component. Referenced only in `fixes_prompt.md` / `data-sources.md`. |
| Unused figure component | `components/figures/SurvivalStudiesTable.tsx` | Never imported by any route. Renders placeholder only; `useFigureData(null)`. Documented as intended to use `survival_studies_table.json` but that wiring was never done. |
| Unused image asset | `public/images/explorer-graph.png` | No reference in codebase. Other images under `public/images/` are referenced. |
| One-off script (not in package.json) | `scripts/transform-survival-studies-table.mjs` | Referenced in `data/extracted/` READMEs for transforming table JSON. Not run by npm scripts; optional pipeline. Safe to delete only if you do not plan to use the survival-studies table pipeline. |

#### B. NEEDS CONFIRMATION (verify before deleting)

| Item | Path / detail | Reason |
|------|----------------|--------|
| API route | `app/api/data/mortality/route.ts` | No client fetches `/api/data/mortality`. EvidenceHighlights lists “Mortality data” as static and links to `/public-health`. Mortality figures use `figure_data` or `lib/mbc-figure-data.ts`. If you do not plan to switch mortality visuals to live CDC/mbc_mortality data, this route and possibly `app/api/sync/mortality/route.ts` are candidates for removal. |
| Sync route | `app/api/sync/mortality/route.ts` | Documented as “CDC WONDER mortality sync - disabled.” No caller. Keep if you plan to re-enable; otherwise removable. |
| Lib module | `lib/seer-csv-data.ts` | Exports SEER trend arrays and `SEER_CSV_SOURCES`. Not imported by any TS/TSX. Only mentioned in `lib/mbc-figure-data.ts` (comment), `lib/data-sources.md`, and `public/csv/README.md`. SEER incidence figures use API routes (`/api/data/seer/charts/...`), not this file. Confirm whether you want to keep it as reference/citation data before deleting. |
| PDFs table | `supabase/migrations/007_pdfs_table.sql` | Table `pdfs` exists in schema but is not read by the app. References and PDF URLs come from `lib/references.ts` and Storage. Keep if you plan to move reference metadata to DB; otherwise optional. |
| Doc / prompt files | `fixes_prompt.md`, `lib/data-sources.md` | Internal/task docs. Safe to archive or delete only if no longer needed for product/process. |
| `data/extracted/` JSON + READMEs | `data/extracted/*.json`, `QUICK_START_TABLE.md`, `SURVIVAL_STUDIES_TABLE_README.md`, etc. | Used by `extract-numbers.mjs` and transform script; `survival_studies_table.json` is not consumed by the app (see SurvivalStudiesTable). Confirm which files are still part of your pipeline before bulk delete. |

#### C. DO NOT DELETE (actively used)

- **Migrations 001–006:** Tables and RLS used by API routes and ingest (trials, publications, mortality, drugs, figure_data, SEER tables, incidence trends).
- **Migration 007 (pdfs):** Safe to keep; no app dependency yet.
- **Scripts in package.json:** `extract-pdfs`, `seed-supabase`, `seed-figure-data`, `ingest:seer`, `upload:pdfs` — all referenced; keep.
- **All page routes under `app/**/page.tsx`**, **API routes under `app/api/data/*` and `app/api/sync/*`** (except mortality if you confirm removal).
- **Components:** All figures/charts that are imported by app pages (see Phase 2); `Placeholder`, `VisualPlaceholder`, `Section`, `Figure`, `CitationCallout`, `ReferenceList`, `TabSummary`, `DefinitionWalkthrough`, `EvidenceHighlights`, `TopicExploreGrid`, `HomeHero`, `PageHero`, header/footer, illustrations.
- **Lib:** `references.ts`, `supabase.ts`, `use-figure-data.ts`, `section-figure-sources.ts`, `tab-summaries.ts`, `online-sources.ts`, `mbc-figure-data.ts`, `seer-subtypes-data.ts`, `seer-parser.ts`, `survival-studies-table.ts` (type used by SurvivalStudiesTable even if component is unused), `types/mbc-data.ts`.
- **Public assets:** `public/images/*.png|jpg` except `explorer-graph.png`; `public/txtData/*` (ingest-seer); `public/csv/*` (docs and optional SEER pipeline); `public/pdfs/` (fallback when Storage URL not set).

#### D. DB CLEANUP RECOMMENDATIONS

- **Orphaned tables:** None clearly orphaned. `mbc_mortality` is written by sync (disabled) and read by `app/api/data/mortality/route.ts`; if you remove that route, you may later drop or repurpose the table (do not drop without backup).
- **`pdfs` table:** No app reads. Either start using it for reference metadata or leave as future use; no need to drop for stability.
- **Indexes:** All current migrations add indexes used by API filters; no recommendation to remove.
- **RLS:** All tables have “Allow public read” SELECT policies. No missing RLS detected on app-used tables.

#### E. RISKY AREAS

- **Service role key:** `SUPABASE_SERVICE_ROLE_KEY` is used in server-side code and scripts. Ensure it is never exposed to the client (it is not in `NEXT_PUBLIC_*`). `.env.local` should be gitignored (confirm it is).
- **Public Storage bucket:** Script `upload-pdfs-to-storage.ts` creates a public `pdfs` bucket. Acceptable for public PDFs; ensure no private documents are uploaded there.
- **Over-permissive RLS:** All tables use `FOR SELECT USING (true)`. Appropriate for read-only public evidence site; if you add auth or sensitive data, add restrictive policies.

---

## PHASE 2 — DEAD CODE DETECTION

### 1. Static analysis summary

| Category | Item | File | Reasoning |
|----------|------|------|-----------|
| Unused export | `useMultipleFigureData` | `lib/use-multiple-figure-data.ts` | No imports in repo. |
| Unused component | `AreaTimeSeriesChart` | `components/charts/AreaTimeSeriesChart.tsx` | No imports. |
| Unused component | `TumorEvolutionDiagram` | `components/figures/TumorEvolutionDiagram.tsx` | No imports. |
| Unused component | `GeographicEvidenceVisual` | `components/figures/GeographicEvidenceVisual.tsx` | No imports. |
| Unused component | `DemographicSegmentsVisual` | `components/figures/DemographicSegmentsVisual.tsx` | No imports. |
| Unused component | `AgeRaceDistributionFigure` | `components/figures/AgeRaceDistributionFigure.tsx` | No imports. |
| Unused component | `SurvivalStudiesTable` | `components/figures/SurvivalStudiesTable.tsx` | No imports. |
| Unused API consumer | `/api/data/mortality` | (client code) | No `fetch` or `useFigureData` to this URL. |
| Unused API consumer | `/api/sync/mortality` | (scripts) | `seed-supabase.ts` does not call it; sync is disabled. |

### 2. Dynamic usage

- **Routing:** All API routes are referenced by path string in `useFigureData(url)` or `fetch(url)` (e.g. `/api/data/trials`, `/api/data/seer/charts/...`). No reflection-based routing found.
- **Supabase:** Tables accessed via `supabase.from('...')`; no RPC or dynamic table names detected in app code.

### 3. Exact paths for suggested deletion (after confirmation)

- `lib/use-multiple-figure-data.ts`
- `components/charts/AreaTimeSeriesChart.tsx`
- `components/figures/TumorEvolutionDiagram.tsx`
- `components/figures/GeographicEvidenceVisual.tsx`
- `components/figures/DemographicSegmentsVisual.tsx`
- `components/figures/AgeRaceDistributionFigure.tsx`
- `components/figures/SurvivalStudiesTable.tsx`
- `public/images/explorer-graph.png`

---

## PHASE 3 — ASSET CLEANUP

### Scan summary

| Location | Contents | Cross-reference |
|----------|----------|------------------|
| `public/images/` | mbc_progression.png, molecular_heterog.png, resistant_mechs.png, tumor_evolution.jpg, metastatic-progression-primary-to-distant.png, explorer-graph.png | Biology page and home page reference all except `explorer-graph.png`. |
| `public/pdfs/` | PDFs listed in `references.ts` (localUrl) | Referenced by path in `references.ts`; app uses `getPdfUrl()` (Storage or local). |
| `public/txtData/` | SEER .txt files | Used by `scripts/ingest-seer.ts` only. |
| `public/csv/` | Explorer CSVs, Subtypes | Referenced in captions and `seer-csv-data.ts` / docs; SEER charts use API, not direct CSV load in browser. |
| `/assets` | (Cursor/assets) | Not under `my-app`; progression image was copied to `public/images/`. |

### Classification

- **Safe to delete:** `public/images/explorer-graph.png` (no references).
- **Possibly referenced in DB:** None. No DB-stored asset URLs found; PDFs are either static paths or Storage URLs built in code.
- **Used in production:** All other images under `public/images/` (except above), `public/txtData/` (for ingest), and `public/csv/` (documentation and optional tooling).

---

## PHASE 4 — MIGRATION CONSOLIDATION

### Status

- **Redundant migrations:** None. 001 → 007 apply in order; no duplicate table/column creation.
- **Test/failed/temporary:** None identified.
- **Schema vs DB:** Not compared (no live DB introspection). Recommend running `supabase db diff` or comparing `supabase/migrations/` to your project’s current schema before any consolidation.

### Recommendations

1. **Do not modify production DB** for cleanup; only add new migrations if needed.
2. **Squashing:** If you want a single baseline, generate a new `initial_schema.sql` from current DB (e.g. `pg_dump --schema-only`) and archive existing migrations in a folder like `migrations_archive/`. Apply only on new projects or after careful backup.
3. **007 pdfs:** Keep unless you decide not to use the `pdfs` table; it does not conflict with anything.

---

## PHASE 5 — STRUCTURE IMPROVEMENTS

### Recommendations

- **Folder structure:** Current split (app/, components/, lib/, scripts/, public/) is clear. Optional: group figure components by domain (e.g. `components/figures/seer/`, `components/figures/mortality/`) if the count grows.
- **Server vs client:** Components using `useFigureData` or `useState` are correctly `'use client'`; pages that only compose them can stay server components. No change required.
- **Circular dependencies:** None detected (lib imports lib; components import lib and components).
- **Utils:** Chart helpers live under `components/charts/`; data helpers in `lib/`. No duplication requiring consolidation.
- **Naming:** Consistent (PascalCase components, camelCase lib, kebab-case API routes).

### Detected issues

- **Large file:** `lib/references.ts` is large (~480 lines) due to inline reference array. Consider moving the array to `data/references.json` or a separate `references-data.ts` and keep types + `getPdfUrl` in `references.ts`.
- **God components:** None; pages compose sections and figures reasonably.
- **Mixed concerns:** API routes do both HTTP and Supabase; acceptable. Sync routes contain external fetch logic; could be moved to `lib/sync/` for clarity.

---

## PHASE 6 — CLEANUP EXECUTION PLAN

### 1. Ordered deletion plan (after confirmation)

1. Remove unused code (no runtime impact):  
   `lib/use-multiple-figure-data.ts`,  
   `components/charts/AreaTimeSeriesChart.tsx`,  
   `components/figures/TumorEvolutionDiagram.tsx`,  
   `components/figures/GeographicEvidenceVisual.tsx`,  
   `components/figures/DemographicSegmentsVisual.tsx`,  
   `components/figures/AgeRaceDistributionFigure.tsx`,  
   `components/figures/SurvivalStudiesTable.tsx`,  
   `public/images/explorer-graph.png`.
2. If confirmed unused:  
   `app/api/data/mortality/route.ts`,  
   `app/api/sync/mortality/route.ts`;  
   optionally `lib/seer-csv-data.ts` (or keep as doc/reference).
3. Do not delete: migrations, `pdfs` table migration, seed/ingest/upload scripts, or any referenced asset.

### 2. Git commit breakdown

- Commit 1: Remove unused components and hook + explorer-graph.png (safe).
- Commit 2 (optional): Remove mortality API + sync route if confirmed.
- Commit 3 (optional): Move references array to data file and trim `references.ts` (refactor only).

### 3. Rollback strategy

- Keep a branch (e.g. `pre-cleanup`) before deletions. Restore deleted files from that branch if needed.
- No DB migrations are removed; rollback is code-only unless you add new migrations.

### 4. Testing checklist

- [ ] `npm run build` succeeds.
- [ ] Home, Definition, Epidemiology, Demographics, Clinical Outcomes, Public Health, Biology, Treatment, References pages load.
- [ ] Evidence highlights and all figures that fetch from API (trials, publications, drugs, figure_data, SEER charts) load.
- [ ] PDF links (Storage or local) open.
- [ ] Run `ingest:seer`, `seed-figure-data`, `upload:pdfs` once in dev and confirm no script errors.

### 5. Supabase backup checklist

- [ ] Export DB (Supabase dashboard or `pg_dump`) before any schema change.
- [ ] If you drop or alter tables, document in a migration (prefer new migration over editing old ones).

### 6. Production safety checklist

- [ ] No `.env.local` or secrets in repo.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` only in server/scripts.
- [ ] After cleanup, run full build and smoke test on staging or production URL.

---

## TECHNICAL DEBT PATTERNS

- **Hardcoded values:** Reference list and figure keys are in code; acceptable. Optional: move to config or DB.
- **Temporary/debug:** No stray `console.log` in app components; only in scripts and one `console.warn` in `lib/supabase.ts` when env is missing (acceptable).
- **Supabase clients:** Server uses `createServerSupabaseClient()`; scripts create ad hoc client with service role. No duplicate client singletons in app.
- **Duplicate API logic:** Sync routes each own their external API (ClinicalTrials, PubMed, OpenFDA); no duplication.

---

## AI-RELATED CLEANUP

- This codebase does not contain AI training, flashcard, roleplay, or embeddings logic. No AI-specific cleanup items.

---

## DATABASE HYGIENE

- **Tables with no recent inserts:** Not measured (no DB access). `mbc_mortality` may be empty if sync was never run or is disabled.
- **Columns never queried:** Not analyzed. `mbc_mortality` extended columns (age_group, race, sex, cause_filter) are used in `app/api/data/mortality/route.ts`; if that route is removed, those columns become unused.
- **JSON fields:** `raw_json` on trials, publications, drugs, mortality used for debugging/audit; can be kept or trimmed later.
- **Indexes:** All created in migrations are on filtered columns; no recommendation to drop.

---

## SECURITY CHECK

- **Service role key:** Used only server-side and in scripts; not exposed to client.
- **Public bucket:** `pdfs` is public by design for reference PDFs; ensure only intended files are uploaded.
- **RLS:** All tables have SELECT-only, public-read policies; appropriate for current public evidence site.
- **Over-permissive:** No INSERT/UPDATE/DELETE policies on app tables; only sync/scripts use service role for writes.

---

*End of report. No changes were made to the repository; this document is advisory only.*
