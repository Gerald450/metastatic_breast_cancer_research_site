# MBC Research Site — Data Sources

This document lists data sources used for figures and tables across the site. All visuals must use trusted, cited sources.

## Allowed Data Sources

### SEER (NCI)
- **Name:** SEER*Stat Databases — November 2023 Submission
- **URL:** https://seer.cancer.gov/data-software/documentation/seerstat/nov2023/
- **Use for:** Incidence, survival, prevalence, demographics (SEER 9/12/17/22)
- **Citation:** National Cancer Institute, SEER*Stat Databases — November 2023 Submission. Surveillance, Epidemiology, and End Results (SEER) Program.
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
| **SEERSurvivalByStageFigure** | `data/seer/survival_by_stage.json` | NCI SEER Cancer Stat Facts (2015-2021) |
| **SEERDistantStageBySubtypeFigure** | `data/seer/distant_stage_by_subtype.json` | NCI SEER Cancer Stat Facts (2015-2021) |
| SurvivalTrendsFigure | Firebase `survival_over_time` or `data/extracted/survival_over_time.json` | ref-001, ref-002, ref-004, etc. (from extracted sourceRefId) |
| SurvivalStudiesTable | `data/extracted/survival_studies_table.json` | Giordano et al., Vogel et al. (study-level) |
| MetaRegressionSurvivalFigure | `data/extracted/meta_regression_survival.json` | Caswell et al. (ref-001) |
| MetastaticSiteOutcomesFigure | Firebase or extracted | ref-006, ref-007 |
| AgeRaceDistributionFigure | Firebase or `demographics_age_race.json` | ref-005, ref-013 |
| SurvivorshipBurdenFigure | Firebase or `prevalence_or_survivorship_burden.json` | ref-004, ref-011 |

## Extracted Files

See `data/extracted/README.md` for schema and extraction pipeline details.
