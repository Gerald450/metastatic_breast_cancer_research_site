# Detailed Fix Prompt: MBC Research Site

Use this as a single, ordered set of instructions to fix frontend, data, visuals, and copy across the codebase.

---

## 1. DATA SOURCE AND ATTRIBUTION ERRORS

### 1.1 Key stats card – wrong citation
- **File:** `components/KeyStatsCards.tsx`
- **Issue:** The card shows **"15 → 58 months"** and **"MD Anderson 1974–2000 (Caswell et al.)"**.
- **Reality:** That 15→58 result is from **Giordano et al. (25)** — adjuvant trials, MD Anderson (see `data/extracted/survival_studies_table.json`). Caswell et al. (ref-001) is a **population-based** JNCI study, not MD Anderson.
- **Fix:** Change the first card to cite **Giordano et al.** and MD Anderson (or the correct study from your table). Optionally drive this from `survival_studies_table.json` so the home key stat and the table stay in sync.

### 1.2 Survival studies table – wrong data source
- **Files:** `components/figures/SurvivalStudiesTable.tsx`, `lib/survival-studies-table.ts`, `data/extracted/survival_studies_table.json`
- **Issue:** `SurvivalStudiesTable` uses **`getSurvivalOverTime()`** (Firebase unstructured rows) and tries to build a table by parsing `population` and `notes`. The real “Table 1” content lives in **`survival_studies_table.json`** (Giordano et al., Vogel et al., etc.) and is never used. `lib/survival-studies-table.ts` defines `SurvivalStudiesTableEntry` and helpers but no component reads the JSON.
- **Fix:**
  - Use **`survival_studies_table.json`** (or a server/API that serves it) as the single source for the “Studies of change in survival over time” table.
  - Update `SurvivalStudiesTable.tsx` to load that data (or accept it as props) and render columns: diagnosis period, recurrence time periods compared, disease status, source population, sample size, median survival, statistical significance, references.
  - Map `references` strings (e.g. "Giordano et al. (25)") to `references` in `lib/references.ts` where possible so source links work.

### 1.3 Extracted data vs reference IDs
- **Files:** `data/extracted/prevalence_or_survivorship_burden.json`, `lib/references.ts`
- **Issue:** Some extracted rows have `sourceRefId: "ref-001"` and text like “Global cancer in women: burden and trends” (Lancet/Jing Lu style), but ref-001 is Caswell et al. So either the extraction tagged the wrong PDF as ref-001, or the JSON is from a different pipeline.
- **Fix:** Audit `sourceRefId` in all `data/extracted/*.json` (and any Firebase seed data) so every row points to the reference that actually contains that finding. Correct ref IDs or fix extraction so refs match `lib/references.ts`.

---

## 2. PDF LINKS AND REFERENCES

### 2.1 Broken `localUrl` (filename mismatch)
- **File:** `lib/references.ts`
- **Actual PDFs in** `public/pdfs/`:
  - `Jing _lu _et_al.pdf` (spaces)
  - `Lord_et_ al.pdf` (space before "al")
  - `J.Lord_et_all.pdf` ("all" not "al")
- **Issue:** References use `localUrl: '/pdfs/Jing_Lu_et_al.pdf'` and `'/pdfs/Lord_et_al.pdf'`, which don’t match filenames, so links 404.
- **Fix:** Either rename PDFs to match `localUrl` (e.g. `Jing_Lu_et_al.pdf`, `Lord_et_al.pdf`) or set `localUrl` to the exact filename (e.g. `'/pdfs/Jing _lu _et_al.pdf'`, `'/pdfs/Lord_et_ al.pdf'`). Prefer consistent, space-free names and update both files and `references.ts`.

### 2.2 Duplicate / mislinked references
- **File:** `lib/references.ts`
- **Issue:**
  - **ref-009:** Title “Evaluation of the current knowledge limitations in breast cancer research: a gap analysis”, authors “Alastair Thompson et al.”, **localUrl: `/pdfs/Robinson_et_al.pdf`** — wrong PDF.
  - **ref-012:** Same title and authors, **localUrl: `/pdfs/Thompson_et_al.pdf`** — correct for Thompson. So ref-009 is either a duplicate of ref-012 or a different paper; if it’s Thompson, fix ref-009’s `localUrl` to Thompson (or remove ref-009 and use ref-012 everywhere).
- **Fix:** Resolve ref-009 vs ref-012: one entry per paper, correct title/authors/DOI, and each `localUrl` pointing to the PDF that matches that paper.

### 2.3 Highlight notes all "TBD"
- **File:** `lib/references.ts`
- **Issue:** Every `highlightNotes[].pages` is `'TBD'`.
- **Fix:** Replace with real page numbers (or remove `pages` until verified) so “pages TBD” isn’t shown everywhere. Optionally add a small note in the UI that page numbers are under verification.

---

## 3. FRONTEND AND UX

### 3.1 Topic grid vs header nav
- **Files:** `components/TopicExploreGrid.tsx`, `components/SiteHeader.tsx`
- **Issue:** Topic grid has 6 items (Definition, Epidemiology, Demographics, Clinical Outcomes, Public Health, **References**) and omits **Biology** and **Treatment**. Header has Biology and Treatment as “(Planned)”. So the grid doesn’t match the full nav and doesn’t signal that Biology/Treatment exist but are planned.
- **Fix:** Either add Biology and Treatment to the topic grid with a “Coming soon” or “Planned” state, or add a short note under the grid that more topics (Biology, Treatment) are in the header and planned.

### 3.2 Biology and Treatment pages – inconsistent hero
- **Files:** `app/biology/page.tsx`, `app/treatment/page.tsx`
- **Issue:** They use a plain `<h1>` with no `PageHero`, while Definition, Epidemiology, Demographics, Clinical Outcomes, Public Health use `PageHero` with theme and illustration.
- **Fix:** Use `PageHero` on Biology and Treatment with a `theme` and optional illustration so layout and tone match other topic pages.

### 3.3 Age/race figure – default groupBy before data loads
- **File:** `components/figures/AgeRaceDistributionFigure.tsx`
- **Issue:** `useState<GroupByOption>(() => ...)` uses `data.some(...)` to pick default `groupBy`, but on first render `data` is `[]`, so the default is always `'ageRange'`. After fetch, `groupBy` isn’t updated when `groupLabel` appears.
- **Fix:** Set default (e.g. `'ageRange'`) in `useState`, and in a `useEffect` when `data` has loaded, if you have `groupLabel` and prefer it, set `groupBy` to `'groupLabel'` once (so the default adapts to available dimensions).

### 3.4 Redundant “Survival trends” on two pages
- **Files:** `app/page.tsx` (home), `app/epidemiology/page.tsx`, `app/clinical-outcomes/page.tsx`
- **Issue:** `SurvivalTrendsFigure` appears on home, under Epidemiology “Temporal Trends”, and under Clinical Outcomes “Survival Outcomes”. Same chart in three places can confuse “where does this live?”
- **Fix:** Keep it on home and clinical-outcomes; on epidemiology either remove it or replace with epidemiology-specific content (e.g. incidence/prevalence over time) and add a short cross-link to “Survival trends” on Clinical Outcomes if needed.

### 3.5 CitationCallout with "TODO"
- **File:** `app/clinical-outcomes/page.tsx`
- **Issue:** `<CitationCallout citation="TODO: Add citation">` and an empty/incomplete body.
- **Fix:** Add the real citation (e.g. from `references`) and a one- or two-sentence summary, or remove the callout until content is ready.

### 3.6 Draft banner and placeholder messaging
- **File:** `app/page.tsx`
- **Issue:** Banner says “Draft — content placeholders included.” Many section labels and notes still say “placeholder” or “TODO” in code.
- **Fix:** Either keep one clear “Draft” or “Under development” banner at the top and remove redundant TODOs in UI text, or remove the banner once placeholders are replaced so the site doesn’t look half-finished.

---

## 4. VISUALS AND LABELS

### 4.1 Figure captions and axes
- **Files:** `components/figures/SurvivalTrendsFigure.tsx`, `SurvivorshipBurdenFigure.tsx`, `MetastaticSiteOutcomesFigure.tsx`, `AgeRaceDistributionFigure.tsx`
- **Issue:** When Firebase (or fallback) returns no data, charts show “No verified values available yet” or “Loading data…” and captions still say “Data extracted from uploaded PDFs; verify page ranges.” Axis labels sometimes fall back to generic “Value” when `unit` is missing.
- **Fix:** When there’s no data, use a single clear message (e.g. “No data available for this figure yet”) and avoid implying “extracted, verify pages.” When data exists, keep the verification note and ensure y-axis label uses the actual unit (e.g. “months”, “%”) from the first row or a sensible default per metric type.

### 4.2 EpidemiologyKeyStats – not real numbers
- **File:** `components/figures/EpidemiologyKeyStats.tsx`
- **Issue:** Shows only categories: “Prevalence & burden”, “Temporal trends”, “Multi-study” — no actual prevalence/incidence numbers.
- **Fix:** Either drive these from `getPrevalenceBurden()` or another dataset and show real numbers with units and source, or relabel as “Topics covered” so it’s clear they’re categories, not key stats.

### 4.3 GeographicEvidenceVisual
- **File:** `components/figures/GeographicEvidenceVisual.tsx`
- **Issue:** Purely abstract (globe + nodes). No real geographic data or study labels.
- **Fix:** If you add geographic data later, wire it in and label regions/studies. If it stays conceptual, add a short caption that it represents “evidence coverage by region” and that specific data is from US/UK/global registries where noted elsewhere.

---

## 5. REDUNDANCIES AND DEAD CODE

### 5.1 Survival data – two concepts
- **Issue:** “Survival over time” is used in two ways: (1) **Structured “Table 1”** in `survival_studies_table.json` (study-level rows: Giordano, Vogel, etc.), (2) **Unstructured series** in Firebase `survival_over_time` (metric/time/value). The table component currently uses (2) and tries to reshape it; the JSON (1) is unused.
- **Fix:** Use (1) for the **SurvivalStudiesTable** and (2) only for **SurvivalTrendsFigure** (time-series chart). Document in a short README or comment which data feeds which UI.

### 5.2 References in ReferenceList when no PDF
- **File:** `components/ReferenceList.tsx`
- **Issue:** When `!ref.localUrl`, the UI shows “TODO: add local PDF link” next to the filename.
- **Fix:** Either add `localUrl` for every reference that has a PDF in `public/pdfs/`, or change the message to “PDF not yet available” (or hide the link block) so users don’t see “TODO.”

### 5.3 Footer
- **File:** `components/SiteFooter.tsx`
- **Issue:** Comment “TODO: Add footer links, contact info, or additional content.”
- **Fix:** Add minimal footer content (e.g. “MBC Research Site”, link to references, optional contact) or remove the TODO and leave a minimal copyright/credits line.

---

## 6. TECHNICAL AND CONSISTENCY

### 6.1 Fonts
- **Files:** `app/layout.tsx`, `app/globals.css`
- **Issue:** Layout sets Geist font variables; `globals.css` sets `body { font-family: Arial, Helvetica, sans-serif; }`, so Geist isn’t applied.
- **Fix:** Use the Geist variables for body (e.g. `font-family: var(--font-geist-sans), sans-serif;`) so the site consistently uses the chosen typeface, or explicitly decide to use system fonts and remove unused Geist vars.

### 6.2 Firebase vs static JSON
- **File:** `lib/extracted-data.ts`
- **Issue:** All figure data is loaded from Firebase. If env vars are missing, `fetchCollection` fails and returns `[]`, so charts are empty. The repo also has `data/extracted/*.json` that could be used as fallback or for static build.
- **Fix:** Either document that Firebase is required and add a clear “No data” state when collections are empty, or add a fallback that reads from `data/extracted/*.json` when Firebase is unavailable so the site still shows something in development or static deploy.

### 6.3 Demographics data – null dimensions
- **File:** `data/extracted/demographics_age_race.json` (sample)
- **Issue:** Many rows have `groupLabel: null` and `ageRange: null`; notes describe “80% recurrent / 20% de novo” (disease status), not age/race. So “Age and Race Distribution” may show “Unknown” or empty buckets.
- **Fix:** Filter or label: don’t aggregate null dimensions as “Unknown” without a note; prefer “No demographic breakdown in this extract” or only show the figure when at least one of `groupLabel` or `ageRange` is present. Align extraction with real age/race variables from the PDFs.

---

## 7. SUMMARY CHECKLIST FOR IMPLEMENTATION

1. **Data & citations**
   - Fix KeyStatsCards attribution (Giordano et al. / MD Anderson for 15→58).
   - Switch SurvivalStudiesTable to `survival_studies_table.json` and correct columns.
   - Audit `sourceRefId` in extracted JSON (and Firebase) vs `references.ts`.

2. **PDFs & references**
   - Align `localUrl` with actual filenames in `public/pdfs/` (Jing Lu, Lord).
   - Fix ref-009 vs ref-012 (one correct entry, correct PDF per ref).
   - Replace or remove “TBD” in highlight notes; fix “TODO: add local PDF link” in ReferenceList.

3. **Frontend**
   - Align TopicExploreGrid with nav (Biology, Treatment planned or listed).
   - Use PageHero on Biology and Treatment.
   - Fix AgeRaceDistributionFigure default `groupBy` after data load.
   - Reduce or clarify duplicate SurvivalTrendsFigure (home vs epidemiology vs clinical-outcomes).
   - Replace CitationCallout “TODO” with real citation or remove.
   - One clear draft/placeholder strategy and remove noisy TODOs from user-facing text.

4. **Visuals**
   - Clear empty-state messages for figures; correct axis units; keep “verify page ranges” only when data is present.
   - EpidemiologyKeyStats: real numbers or “Topics covered” labeling.
   - Short caption for GeographicEvidenceVisual.

5. **Cleanup**
   - Document or implement: table = `survival_studies_table.json`, chart = Firebase (or JSON) survival over time.
   - Footer content or minimal placeholder.
   - Body font: use Geist or remove override.
   - Optional: Firebase fallback to `data/extracted/*.json` and handle null demographics dimensions.
