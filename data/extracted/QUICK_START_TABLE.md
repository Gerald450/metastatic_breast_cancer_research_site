# Quick Start: Adding Table Data

## Step-by-Step Guide

### 1. Create the table data file

```bash
cp data/extracted/survival_studies_table_template.json data/extracted/survival_studies_table.json
```

### 2. Fill in your table data

Edit `survival_studies_table.json` and add each row from your table as a JSON object. Example:

```json
[
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
]
```

### 3. Update reference mappings

Edit `scripts/transform-survival-studies-table.mjs` and update:

```javascript
const REFERENCE_MAP = {
  'Giordano': 'ref-001',  // Change to your actual ref IDs
  'Vogel': 'ref-002',
  // Add all authors from your table
};
```

### 4. Transform the data

```bash
node scripts/transform-survival-studies-table.mjs
```

This creates `survival_over_time_from_table.json`

### 5. Import to Firebase

The migration script will automatically merge the table data if it exists:

```bash
npm run migrate-to-firebase
```

That's it! The table data will be imported alongside your existing survival data.
