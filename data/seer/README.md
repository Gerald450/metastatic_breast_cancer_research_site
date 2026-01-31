# SEER Trusted Data — Static Extracts

Data in this directory is extracted from **National Cancer Institute SEER Program** published statistics. Used for figures that require trusted, publicly cited data.

## Source

- **SEER Cancer Stat Facts: Female Breast Cancer**  
  https://seer.cancer.gov/statfacts/html/breast.html
- **SEER Cancer Stat Facts: Female Breast Cancer Subtypes**  
  https://seer.cancer.gov/statfacts/html/breast-subtypes.html
- **SEER*Explorer** (survival, stage, trends)  
  https://seer.cancer.gov/statistics-network/explorer/

## Citation

> National Cancer Institute. Surveillance, Epidemiology, and End Results (SEER) Program.  
> Cancer Stat Facts and SEER*Explorer. Accessed via https://seer.cancer.gov/

## Files

| File | Description | Data Period |
|------|-------------|-------------|
| `survival_by_stage.json` | 5-year relative survival by stage (localized, regional, distant) | 2015-2021 |
| `distant_stage_by_subtype.json` | 5-year relative survival for distant (metastatic) stage by molecular subtype | 2015-2021 |

## Updates

When SEER publishes new statistics, update these files and note the new data period in the JSON and figure captions.
