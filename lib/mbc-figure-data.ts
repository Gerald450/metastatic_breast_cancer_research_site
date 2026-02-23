/**
 * Static/mock data for MBC figure visualizations.
 * Data shapes match figure specs. Replace with Firebase/API data when available.
 * Sources: SEER (see public/csv/ for verified SEER*Explorer data), CDC WONDER, USCS, Mariotto et al. (ref-011).
 * Verified SEER trend data: lib/seer-csv-data.ts from public/csv/.
 */

/** Fig 1: MBC Survival Over Time (5-year relative survival % by year) */
export const mbcSurvivalOverTimeData = [
  { year: '2010', relativeSurvivalPercent: 30.7 },
  { year: '2012', relativeSurvivalPercent: 31.8 },
  { year: '2014', relativeSurvivalPercent: 33.2 },
  { year: '2016', relativeSurvivalPercent: 34.5 },
  { year: '2018', relativeSurvivalPercent: 34.9 },
  { year: '2020', relativeSurvivalPercent: 30.9 },
];

/** Fig 2: MBC Survivorship Population Growth */
export const mbcSurvivorshipPopulationGrowthData = [
  { year: '2010', prevalence: 135000 },
  { year: '2012', prevalence: 148000 },
  { year: '2014', prevalence: 162000 },
  { year: '2016', prevalence: 178000 },
  { year: '2018', prevalence: 195000 },
  { year: '2020', prevalence: 215000 },
];

/** Fig 3: Breast Cancer Mortality Rates */
export const breastCancerMortalityRatesData = [
  { year: '2010', ratePer100k: 22.9 },
  { year: '2012', ratePer100k: 21.8 },
  { year: '2014', ratePer100k: 20.6 },
  { year: '2016', ratePer100k: 19.8 },
  { year: '2018', ratePer100k: 19.2 },
  { year: '2020', ratePer100k: 18.6 },
];

/** Fig 4: De Novo Stage IV Incidence */
export const deNovoStageIVIncidenceData = [
  { year: '2015', countOrRate: 11200 },
  { year: '2016', countOrRate: 11500 },
  { year: '2017', countOrRate: 11800 },
  { year: '2018', countOrRate: 12100 },
  { year: '2019', countOrRate: 12400 },
  { year: '2020', countOrRate: 12600 },
];

/** Fig 5: MBC Incidence by Age Group */
export const mbcIncidenceByAgeData = [
  { ageGroup: '20-34', incidence: 2.1 },
  { ageGroup: '35-44', incidence: 8.4 },
  { ageGroup: '45-54', incidence: 18.2 },
  { ageGroup: '55-64', incidence: 24.6 },
  { ageGroup: '65-74', incidence: 28.1 },
  { ageGroup: '75+', incidence: 32.4 },
];

/** Fig 6: MBC Incidence by Race (age-adjusted rate per 100,000) */
export const mbcIncidenceByRaceData = [
  { race: 'White', age_adjusted_rate: 471.9, count: 11762766 },
  { race: 'Black', age_adjusted_rate: 470.9, count: 1555745 },
  { race: 'American Indian/Alaska Native', age_adjusted_rate: 236.7, count: 72011 },
  { race: 'Asian or Pacific Islander', age_adjusted_rate: 316.4, count: 811614 },
];

/** Fig 7: MBC Survival by Race */
export const mbcSurvivalByRaceData = [
  { race: 'White', survivalMonths: 30 },
  { race: 'Black', survivalMonths: 22 },
  { race: 'Asian', survivalMonths: 34 },
  { race: 'Hispanic', survivalMonths: 26 },
  { race: 'American Indian/Alaska Native', survivalMonths: 24 },
];

/** Fig 8: Sex Distribution */
export const sexDistributionBreastCancerData = [
  { sex: 'Female', count: 284200 },
  { sex: 'Male', count: 2710 },
];

/** Fig 9: Age at Diagnosis vs Age at Death */
export const ageAtDiagnosisVsDeathData = [
  { ageGroup: '20-39', atDiagnosis: 8, atDeath: 2 },
  { ageGroup: '40-49', atDiagnosis: 45, atDeath: 18 },
  { ageGroup: '50-59', atDiagnosis: 85, atDeath: 42 },
  { ageGroup: '60-69', atDiagnosis: 72, atDeath: 48 },
  { ageGroup: '70+', atDiagnosis: 55, atDeath: 65 },
];

/** Fig 10: Survival by Metastatic Site (SEER, Xiao et al.) */
export const survivalByMetastaticSiteData = [
  { site: 'Bone only', survivalMonths: 36 },
  { site: 'Lung', survivalMonths: 24 },
  { site: 'Liver', survivalMonths: 18 },
  { site: 'Brain', survivalMonths: 12 },
];

/** Fig 11: Survival by Tumor Subtype (SEER distant stage by subtype) - 5-year relative survival % */
export const survivalByTumorSubtypeData = [
  { subtype: 'HR+/HER2+', relativeSurvivalPercent: 45.7 },
  { subtype: 'HR-/HER2+', relativeSurvivalPercent: 39.4 },
  { subtype: 'HR+/HER2-', relativeSurvivalPercent: 34.4 },
  { subtype: 'HR-/HER2-', relativeSurvivalPercent: 13.9 },
];

/** Fig 12: Survival Time Distribution (Stage IV) - box plot */
export const survivalTimeDistributionStageIVData = [
  { category: 'Bone', min: 6, q1: 18, median: 36, q3: 60, max: 120 },
  { category: 'Lung', min: 4, q1: 12, median: 24, q3: 42, max: 96 },
  { category: 'Liver', min: 3, q1: 10, median: 18, q3: 30, max: 72 },
  { category: 'Brain', min: 2, q1: 6, median: 12, q3: 24, max: 48 },
];

/** Fig 13: Survival Curves by Stage */
export const survivalCurvesByStageData = [
  { month: 0, stageI: 100, stageII: 100, stageIII: 100, stageIV: 100 },
  { month: 12, stageI: 98, stageII: 95, stageIII: 88, stageIV: 65 },
  { month: 24, stageI: 96, stageII: 90, stageIII: 75, stageIV: 45 },
  { month: 36, stageI: 94, stageII: 86, stageIII: 65, stageIV: 32 },
  { month: 48, stageI: 93, stageII: 83, stageIII: 58, stageIV: 28 },
  { month: 60, stageI: 92, stageII: 80, stageIII: 52, stageIV: 24 },
];

/** Fig 14: State-Level Breast Cancer Mortality */
export const stateLevelBreastCancerMortalityData = [
  { state: 'District of Columbia', ratePer100k: 24.2 },
  { state: 'West Virginia', ratePer100k: 21.8 },
  { state: 'Kentucky', ratePer100k: 21.2 },
  { state: 'Mississippi', ratePer100k: 20.9 },
  { state: 'Oklahoma', ratePer100k: 20.5 },
  { state: 'Arkansas', ratePer100k: 20.1 },
  { state: 'Louisiana', ratePer100k: 19.8 },
  { state: 'Alabama', ratePer100k: 19.6 },
  { state: 'Tennessee', ratePer100k: 19.4 },
  { state: 'South Carolina', ratePer100k: 19.2 },
  { state: 'Ohio', ratePer100k: 19.0 },
  { state: 'Indiana', ratePer100k: 18.8 },
  { state: 'Missouri', ratePer100k: 18.6 },
  { state: 'Georgia', ratePer100k: 18.4 },
  { state: 'North Carolina', ratePer100k: 18.2 },
  { state: 'Pennsylvania', ratePer100k: 18.0 },
  { state: 'Michigan', ratePer100k: 17.8 },
  { state: 'Texas', ratePer100k: 17.6 },
  { state: 'Virginia', ratePer100k: 17.4 },
  { state: 'Illinois', ratePer100k: 17.2 },
  { state: 'New York', ratePer100k: 17.0 },
  { state: 'Florida', ratePer100k: 16.8 },
  { state: 'California', ratePer100k: 16.6 },
  { state: 'Utah', ratePer100k: 15.2 },
  { state: 'Colorado', ratePer100k: 15.0 },
  { state: 'Arizona', ratePer100k: 16.0 },
  { state: 'Hawaii', ratePer100k: 14.8 },
  { state: 'Connecticut', ratePer100k: 16.4 },
  { state: 'Massachusetts', ratePer100k: 16.2 },
];

/** Fig 15: Heat map - same structure as Fig 14, use stateLevelBreastCancerMortalityData mapped to { state, rate } */
export const breastCancerMortalityHeatMapData: { state: string; rate: number }[] = [
  { state: 'District of Columbia', rate: 24.2 },
  { state: 'West Virginia', rate: 21.8 },
  { state: 'Kentucky', rate: 21.2 },
  { state: 'Mississippi', rate: 20.9 },
  { state: 'Oklahoma', rate: 20.5 },
  { state: 'Arkansas', rate: 20.1 },
  { state: 'Louisiana', rate: 19.8 },
  { state: 'Alabama', rate: 19.6 },
  { state: 'Tennessee', rate: 19.4 },
  { state: 'South Carolina', rate: 19.2 },
  { state: 'Ohio', rate: 19.0 },
  { state: 'Indiana', rate: 18.8 },
  { state: 'Missouri', rate: 18.6 },
  { state: 'Georgia', rate: 18.4 },
  { state: 'North Carolina', rate: 18.2 },
  { state: 'California', rate: 16.6 },
  { state: 'Utah', rate: 15.2 },
  { state: 'Hawaii', rate: 14.8 },
];

/** Fig 16: Cause of Death (Breast vs Other) */
export const causeOfDeathBreastVsOtherData = [
  { ageGroup: '50-59', breast: 68, other: 32 },
  { ageGroup: '60-69', breast: 58, other: 42 },
  { ageGroup: '70-79', breast: 45, other: 55 },
  { ageGroup: '80+', breast: 28, other: 72 },
];

/** Fig 17: Survival by Year and Subtype */
export const survivalByYearAndSubtypeData = [
  { year: '2010', her2: 42, hr: 38, tnbc: 12 },
  { year: '2013', her2: 48, hr: 40, tnbc: 14 },
  { year: '2016', her2: 52, hr: 43, tnbc: 16 },
  { year: '2019', her2: 55, hr: 46, tnbc: 18 },
];

/** Fig 18: Insurance vs Stage at Diagnosis */
export const insuranceVsStageAtDiagnosisData = [
  { insuranceStatus: 'Uninsured', lateStagePercent: 42 },
  { insuranceStatus: 'Medicaid', lateStagePercent: 38 },
  { insuranceStatus: 'Private', lateStagePercent: 28 },
  { insuranceStatus: 'Medicare', lateStagePercent: 32 },
];
