# MBC Research Site — Data Sources

This document lists data sources used for figures and tables across the site. All visuals must use trusted, cited sources.

## Allowed Data Sources

### SEER (NCI) — Trusted CSV Data
- **CSV files:** `public/csv/` — Downloads from SEER*Explorer (SEER Incidence Data, November 2024 Submission, 1975-2022, SEER 21 registries)
- **SEER*Explorer:** https://seer.cancer.gov/statistics-network/explorer/
- **November 2024 Submission:** https://seer.cancer.gov/data-software/documentation/seerstat/nov2024/
- **Use for:** Incidence trends (AAPC/APC), demographics by race/ethnicity and age. See `lib/seer-csv-data.ts` for extracted values.
- **Figure mapping:** SEERIncidenceTrendsByRaceFigure, SEERIncidenceTrendsByAgeFigure.

### SEER (NCI) — Other
- **November 2023 Submission:** https://seer.cancer.gov/data-software/documentation/seerstat/nov2023/
- **Cancer Stat Facts:** https://seer.cancer.gov/statfacts/html/breast.html — Used for SEERSurvivalByStageFigure and SEERDistantStageBySubtypeFigure. Static extracts in `data/seer/`.

### Site PDFs (Extracted Data)
Data extracted from peer-reviewed PDFs in `public/pdfs/`:
- **Caswell et al.** (ref-001) — survival after metastatic recurrence
- **Lord et al.** (ref-002) — England incidence, prevalence, survival
- **Mariotto et al.** (ref-011) — US burden projections
- **Hudock et al.** (ref-004) — metastatic cancer trends
- **Bonotto et al.** (ref-006) — metastatic site outcomes
- **Xiao et al.** (ref-007) — lung metastasis
- **Hendrick et al.** (ref-005) — age/race distributions

Extracted JSON files live in `data/extracted/`. Each figure cites the source reference.

### Allowed Kaggle (if applicable)
- Metastatic Breast Cancer Genomic Data — only if clearly MBC and well-sourced
- Breast Cancer METABRIC — only if cited and used for MBC-relevant questions

### Other
- Any public dataset that is MBC- or breast-cancer-metastasis-related and cites SEER, TCGA, METABRIC, or similar.

## Datasets and Visuals to AVOID

- **Breast Cancer Wisconsin (Diagnostic)** — no metastasis, no survival; not relevant for MBC
- Datasets with <1,000 samples claiming "metastatic" without a cited source
- Datasets not citing SEER/TCGA/METABRIC for metastatic or survival data
- Hand-labeled "metastatic = yes/no" without documented methodology

## Figure → Data Source Mapping

| Figure | Data Source | Citation |
|--------|-------------|----------|
| **SEERSurvivalByStageFigure** | Supabase `survival_by_stage` (from `public/txtData/`) | SEER Research Data (21 Registries, 2000–2022), SEER*Stat Nov 2024 |
| **SEERDistantStageBySubtypeFigure** | Supabase `survival_by_subtype` (from `public/txtData/`) | SEER Research Data (21 Registries, 2000–2022), SEER*Stat Nov 2024 |
| SurvivalTrendsFigure | Firebase `survival_over_time` or `data/extracted/survival_over_time.json` | ref-001, ref-002, ref-004, etc. (from extracted sourceRefId) |
| SurvivalStudiesTable | `data/extracted/survival_studies_table.json` | Giordano et al., Vogel et al. (study-level) |
| MetaRegressionSurvivalFigure | `data/extracted/meta_regression_survival.json` | Caswell et al. (ref-001) |
| MetastaticSiteOutcomesFigure | Firebase or extracted | ref-006, ref-007 |
| AgeRaceDistributionFigure | Firebase or `demographics_age_race.json` | ref-005, ref-013 |
| **AgeAtDiagnosisVsDeathFigure** | Placeholder in `mbc-figure-data.ts` | *Source TBD — verify with SEER (age at dx) + NCHS (age at death). See public/csv/ for SEER data structure.* |
| **SEERIncidenceTrendsByRaceFigure** | `lib/seer-csv-data.ts` from `public/csv/explorer_download (2).csv` | SEER Nov 2024 (All Cancer Sites) |
| **SEERIncidenceTrendsByAgeFigure** | `lib/seer-csv-data.ts` from `public/csv/explorer_download (3).csv` | SEER Nov 2024 (All Cancer Sites) |
| **BreastCancerMedianAgeBySubtypeFigure** | `lib/seer-subtypes-data.ts` from `public/csv/Subtypes/explorer_download (7).csv` | [SEER*Explorer Female Breast](https://seer.cancer.gov/statistics-network/explorer/application.html?site=621&...) |
| **HRPlusHer2PosIncidenceByRaceFigure** | `lib/seer-subtypes-data.ts` from `public/csv/Subtypes/explorer_download (9).csv` | SEER*Explorer Female Breast |
| **HRPlusHer2NegTrendsByAgeFigure** | `lib/seer-subtypes-data.ts` from `public/csv/Subtypes/explorer_download (2).csv` | SEER*Explorer Female Breast |
| **HRPlusHer2NegStageDistributionFigure** | `lib/seer-subtypes-data.ts` from `public/csv/Subtypes/explorer_download (3).csv` | SEER*Explorer Female Breast |
| SurvivorshipBurdenFigure | Firebase or `prevalence_or_survivorship_burden.json` | ref-004, ref-011 |

## Extracted Files

See `data/extracted/README.md` for schema and extraction pipeline details.
