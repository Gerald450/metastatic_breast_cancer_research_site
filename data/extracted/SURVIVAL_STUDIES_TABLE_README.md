# Survival Studies Table Data

This directory contains data extracted from "Table 1. Studies of change in survival over time for patients with metastatic breast cancer."

## Overview

The table provides structured data comparing survival outcomes across different time periods and studies. This data is more comprehensive than the automated PDF extraction and includes:

- Diagnosis periods
- Recurrence time period comparisons
- Disease status (Recurrent vs Stage IV)
- Source populations
- Sample sizes
- Median survival metrics
- Statistical significance
- References

## Files

- **`survival_studies_table_template.json`**: Template file showing the expected structure
- **`survival_studies_table.json`**: Your actual table data (create this file)
- **`survival_over_time_from_table.json`**: Generated output after transformation (auto-generated)

## How to Use

### Step 1: Fill in the Table Data

1. Copy the template file:
   ```bash
   cp data/extracted/survival_studies_table_template.json data/extracted/survival_studies_table.json
   ```

2. Fill in `survival_studies_table.json` with your table data. Each row from the table becomes one JSON object:

   ```json
   {
     "diagnosisPeriod": "1974-1994",
     "recurrenceTimePeriodsCompared": "1974-1979 to 1995-2000",
     "diseaseStatus": "Recurrent (90%) & stage IV",
     "sourcePopulation": "Adjuvant clinical trials, MD Anderson Cancer Center",
     "sampleSize": 70,
     "medianSurvival": "15 to 58",
     "statisticalSignificance": "UV & MV",
     "references": "Giordano et al. (25)",
     "notes": ""
   }
   ```

### Step 2: Update Reference Mappings

Edit `scripts/transform-survival-studies-table.mjs` and update the `REFERENCE_MAP` and `FILENAME_MAP` to match your actual references:

```javascript
const REFERENCE_MAP = {
  'Giordano': 'ref-001',  // Update with your actual reference IDs
  'Vogel': 'ref-002',
  // ... etc
};

const FILENAME_MAP = {
  'ref-001': 'Caswell_et_al.pdf',
  'ref-002': 'Lord_et_al.pdf',
  // ... etc
};
```

### Step 3: Transform the Data

Run the transformation script:

```bash
node scripts/transform-survival-studies-table.mjs
```

This will:
- Parse the table data
- Convert median survival strings (e.g., "15 to 58") into structured values
- Create multiple `SurvivalOverTimeEntry` records for each table row
- Save the output to `survival_over_time_from_table.json`

### Step 4: Import to Firebase

You have two options:

#### Option A: Merge with Existing Data

1. Merge the transformed data with your existing `survival_over_time.json`:
   ```bash
   # Backup existing data
   cp data/extracted/survival_over_time.json data/extracted/survival_over_time_backup.json
   
   # Merge (using jq or manually)
   # Then run migration
   npm run migrate-to-firebase
   ```

#### Option B: Import Separately

1. Temporarily rename your existing file:
   ```bash
   mv data/extracted/survival_over_time.json data/extracted/survival_over_time_original.json
   ```

2. Use the transformed data:
   ```bash
   cp data/extracted/survival_over_time_from_table.json data/extracted/survival_over_time.json
   ```

3. Run migration:
   ```bash
   npm run migrate-to-firebase
   ```

## Data Structure

### Input Format (survival_studies_table.json)

```typescript
{
  diagnosisPeriod: string;              // "1974-1994"
  recurrenceTimePeriodsCompared: string; // "1974-1979 to 1995-2000"
  diseaseStatus: string;                 // "Recurrent (90%) & stage IV"
  sourcePopulation: string;              // "Adjuvant clinical trials, MD Anderson Cancer Center"
  sampleSize: string | number;          // 70 or "15438" or "NR*"
  medianSurvival: string;               // "15 to 58" or "5 yrt: 19% to 34%"
  statisticalSignificance: string;      // "UV & MV"
  references: string;                    // "Giordano et al. (25)"
  notes?: string;                        // Optional additional notes
}
```

### Output Format (survival_over_time_from_table.json)

The transformation script converts each table entry into one or more `SurvivalOverTimeEntry` records compatible with your existing schema:

```typescript
{
  sourceRefId: string;
  filename: string;
  metricName: string | null;
  timePeriod: string | null;
  value: number | null;
  unit: string | null;
  population: string | null;
  notes: string;
  pageHint: number;
  needsManualReview: boolean;
}
```

## Median Survival Parsing

The script intelligently parses various median survival formats:

- **Range**: "15 to 58" → Creates entries for both start (15) and end (58) periods
- **Year rate**: "5 yrt: 19% to 34%" → Parses as percentage with year rate unit
- **Percentage range**: "19% to 34%" → Parses as percentage range
- **Single value**: "20" → Assumes months
- **With unit**: "26 months" → Parses with explicit unit

## Notes

- **pageHint**: Set to 0 by default. Update manually if you know the page numbers from the source PDF.
- **sourceRefId**: Automatically mapped from author names in the references field. Update `REFERENCE_MAP` if mappings are incorrect.
- **needsManualReview**: Set to `true` if the script had to make assumptions (e.g., using average of a range).

## Example Workflow

1. Extract table data from PDF or document
2. Fill in `survival_studies_table.json` with all table rows
3. Update reference mappings in the transformation script
4. Run transformation: `node scripts/transform-survival-studies-table.mjs`
5. Review the output in `survival_over_time_from_table.json`
6. Update pageHint values if known
7. Merge or replace existing data
8. Run migration: `npm run migrate-to-firebase`
