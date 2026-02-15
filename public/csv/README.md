# SEER CSV Data

These CSV files were downloaded from **SEER*Explorer** (https://seer.cancer.gov/statistics-network/explorer/) and serve as trusted data sources for the MBC research site.

## Source

- **Data:** SEER Incidence Data, November 2024 Submission (1975-2022)
- **Registries:** SEER 21
- **Created:** SEER*Explorer on the date noted in each file footer

## Files

| File | Content |
|------|---------|
| `explorer_download.csv` | All Cancer Sites — Trends by Sex, Ages 75+ |
| `explorer_download (2).csv` | All Cancer Sites — Trends by Race/Ethnicity |
| `explorer_download (3).csv` | All Cancer Sites — Trends by Age |
| `explorer_download (4).csv` | Cancer Site Comparison — All sites, Colon/Rectum, Lung, Pancreas |
| `explorer_download (5).csv` | Cancer Site Comparison — Black population |
| `explorer_download (6).csv` | Cancer Site Comparison — Male Black population |

## Usage

Data is extracted in `lib/seer-csv-data.ts` and used by:

- **SEERIncidenceTrendsByRaceFigure** — from `explorer_download (2).csv`
- **SEERIncidenceTrendsByAgeFigure** — from `explorer_download (3).csv`

Note: Files cover **All Cancer Sites Combined**. Breast cancer–specific queries can be run in SEER*Explorer and added here.
