# SEER Female Breast Cancer Subtype Data

CSV files downloaded from **SEER*Explorer — Female Breast** (site 621).

**Source URL:** https://seer.cancer.gov/statistics-network/explorer/application.html?site=621&data_type=1&graph_type=2&compareBy=race&chk_race_6=6&chk_race_5=5&chk_race_4=4&chk_race_9=9&chk_race_8=8&rate_type=2&hdn_sex=3&age_range=1&stage=101&advopt_precision=1&advopt_show_ci=on#resultsRegion0

## Files

| File | Content |
|------|---------|
| (1) | Cancer site comparison — Female, Black; HR+/HER2- AAPC 2.1% |
| (2) | HR+/HER2- by age — AAPC by age group |
| (3) | HR+/HER2- by stage — Localized, Regional, Distant rates by year |
| (4) | HR+/HER2- median age by race |
| (5) | HR+/HER2+ median age by race |
| (7) | Cancer site comparison — Median age by subtype |
| (8) | HR+/HER2+ incidence rates by age |
| (9) | HR+/HER2+ 5-year rates by race |
| (10) | HR+/HER2+ trends by race over time |
| (11) | HR-/HER2+ trends by race |
| (12) | HR-/HER2+ trends (all ages) |
| (13) | HR-/HER2+ by stage |
| (14) | Cancer site comparison — HR+/HER2-, HR+/HER2+, HR-/HER2+ trends |

## Usage

Data extracted in `lib/seer-subtypes-data.ts`. Figures:
- BreastCancerMedianAgeBySubtypeFigure
- HRPlusHer2PosIncidenceByRaceFigure
- HRPlusHer2NegTrendsByAgeFigure
- HRPlusHer2NegStageDistributionFigure
