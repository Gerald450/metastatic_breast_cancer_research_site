# PDF Numeric Extraction Pipeline

This directory contains extracted numeric data from peer-reviewed PDF articles about metastatic breast cancer.

## Overview

The extraction pipeline processes PDFs from `/public/pdfs` and extracts numeric values (survival metrics, prevalence estimates, demographics, metastatic site outcomes) into structured JSON datasets. The extraction follows a **conservative approach**—only storing values that are explicitly present in the PDF text. Values that cannot be confidently extracted are marked with `needsManualReview: true` and set to `null`.

## Running the Extraction Script

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Run the extraction script**:
   ```bash
   node scripts/extract-numbers.mjs
   ```

The script will:
- Process 7 specified PDFs from `/public/pdfs`
- Extract text page-by-page
- Identify numeric candidates using regex patterns
- Map candidates to structured datasets
- Save results to JSON files in this directory

## Output Files

### Raw Candidates
- **`raw_candidates.json`**: All numeric values found in PDFs with context, before mapping to datasets
  - Contains: source reference, filename, page number, extracted value, unit, confidence level, and surrounding text

### Structured Datasets

#### 1. `survival_over_time.json`
Survival metrics tracked over time periods.

**Schema:**
```typescript
{
  sourceRefId: string;        // e.g., "ref-001"
  filename: string;           // PDF filename
  metricName: string | null;  // e.g., "5-year overall survival"
  timePeriod: string | null;  // e.g., "2010-2015" or "2018"
  value: number | null;       // Numeric value (null if uncertain)
  unit: string | null;        // e.g., "%", "months", "years"
  population: string | null; // Population description
  notes: string;              // Context text from PDF
  pageHint: number;           // Page number where found
  needsManualReview: boolean; // true if extraction uncertain
}
```

#### 2. `prevalence_or_survivorship_burden.json`
Prevalence estimates and survivorship burden metrics.

**Schema:**
```typescript
{
  sourceRefId: string;
  filename: string;
  metricName: string | null;  // e.g., "prevalence", "incidence"
  yearOrRange: string | null; // e.g., "2017" or "2010-2015"
  value: number | null;
  unit: string | null;        // e.g., "cases", "per 100,000"
  population: string | null;
  notes: string;
  pageHint: number;
  needsManualReview: boolean;
}
```

#### 3. `demographics_age_race.json`
Demographic breakdowns by age and race/ethnicity.

**Schema:**
```typescript
{
  sourceRefId: string;
  filename: string;
  metricName: string | null;  // e.g., "incidence rate"
  groupLabel: string | null;  // e.g., "Non-Hispanic Black"
  ageRange: string | null;    // e.g., "40-49"
  value: number | null;
  unit: string | null;        // e.g., "per 100,000"
  notes: string;
  pageHint: number;
  needsManualReview: boolean;
}
```

#### 4. `metastatic_site_outcomes.json`
Outcomes specific to different metastatic sites (brain, liver, lung, bone, etc.).

**Schema:**
```typescript
{
  sourceRefId: string;
  filename: string;
  site: string | null;        // e.g., "brain", "liver", "lung", "bone"
  metricName: string | null;  // e.g., "median overall survival"
  value: number | null;
  unit: string | null;        // e.g., "months", "%"
  notes: string;
  pageHint: number;
  needsManualReview: boolean;
}
```

## Conservative Extraction Rules

The extraction pipeline follows these conservative principles:

1. **No Guessing**: Values are only stored if explicitly found in the PDF text
2. **Null for Uncertainty**: If a field cannot be confidently determined, it is set to `null`
3. **Manual Review Flag**: Entries with `needsManualReview: true` require human verification
4. **Context Preservation**: Original text context is preserved in the `notes` field for verification
5. **Page Hints**: Page numbers are included to enable quick manual verification

## Processed PDFs

The following PDFs are processed by the extraction script:

- `ref-001`: Caswell_et_al.pdf
- `ref-002`: Lord_et_ al.pdf
- `ref-004`: Hudock_et_al.pdf
- `ref-005`: Hendrick_et_al.pdf
- `ref-006`: Bonotto_et_al.pdf
- `ref-007`: Xiao_et_al.pdf
- `ref-011`: Mariotto_et_al.pdf

## Manual Review Process

1. Review entries with `needsManualReview: true`
2. Check the `notes` field for original context
3. Verify values using the `pageHint` to locate the source in the PDF
4. Update `value`, `unit`, or other fields as needed
5. Set `needsManualReview: false` once verified

## Which data feeds which UI

- **Survival studies table** (Studies of change in survival over time): Uses **`survival_studies_table.json`** only. The table component reads this file directly; it is the single source for “Table 1” study-level rows (e.g. Giordano et al., Vogel et al.).
- **Survival trends chart** (time-series): Uses **Firebase** collection `survival_over_time` (or fallback when configured). The time-series chart shows metric/time/value points, not the study-level table.
- Other figures (prevalence/burden, demographics, metastatic site outcomes) use Firebase collections; see `lib/extracted-data.ts`.

## Notes

- Page numbers are estimated based on text distribution and may not be 100% accurate
- Some numeric values may be extracted but not mapped to datasets if context is unclear
- All unassigned candidates are available in `raw_candidates.json` for manual review
- The extraction does not perform any medical interpretation—it only extracts explicit numeric values

