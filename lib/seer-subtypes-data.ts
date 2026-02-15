/**
 * Breast cancer subtype data from public/csv/Subtypes/ (SEER*Explorer Female Breast downloads).
 * Source: SEER Incidence Data, November 2024 Submission (1975-2022), SEER 21 registries.
 * Data link: https://seer.cancer.gov/statistics-network/explorer/application.html?site=621&...
 */

/** AAPC = Average Annual Percent Change */
export interface SEERSubtypeTrendRow {
  subtype: string;
  yearRange: string;
  aapc: number;
  direction: 'Rising' | 'Falling' | 'Not Significant';
}

/** From explorer_download (2).csv - HR+/HER2- AAPC by age (verified) */
export const breastCancerSubtypeTrendsData: SEERSubtypeTrendRow[] = [
  { subtype: 'HR+/HER2- (Luminal A)', yearRange: '2013-2022', aapc: 2.0, direction: 'Rising' },
  { subtype: 'HR+/HER2- (Luminal A)', yearRange: '2018-2022', aapc: 2.0, direction: 'Rising' },
];

/** From explorer_download (7).csv - Median age at diagnosis by subtype */
export const breastCancerMedianAgeBySubtypeData = [
  { subtype: 'HR+/HER2- (Luminal A)', medianAge: 64 },
  { subtype: 'HR+/HER2+ (Luminal B)', medianAge: 58 },
];

/** From explorer_download (9).csv - HR+/HER2+ 5-year incidence rates 2018-2022 by race (per 100,000) */
export const hrHer2PosIncidenceByRaceData = [
  { race: 'Hispanic', rate: 10.4 },
  { race: 'American Indian/Alaska Native', rate: 11.7 },
  { race: 'Asian/Pacific Islander', rate: 12.2 },
  { race: 'Black', rate: 12.6 },
  { race: 'White', rate: 12.8 },
];

/** From explorer_download (2).csv - HR+/HER2- trends by age */
export const hrHer2NegTrendsByAgeData: SEERSubtypeTrendRow[] = [
  { subtype: 'All Ages', yearRange: '2013-2022', aapc: 2.0, direction: 'Rising' },
  { subtype: 'Ages < 50', yearRange: '2013-2022', aapc: 2.6, direction: 'Rising' },
  { subtype: 'Ages 50-64', yearRange: '2013-2022', aapc: 1.9, direction: 'Rising' },
  { subtype: 'Ages 65+', yearRange: '2013-2022', aapc: 1.8, direction: 'Rising' },
];

/** HR+/HER2- incidence rates by stage, 2022 (explorer_download (3).csv) - per 100,000 */
export const hrHer2NegRatesByStage2022 = [
  { stage: 'Localized', rate: 65.2 },
  { stage: 'Regional', rate: 23.4 },
  { stage: 'Distant', rate: 4.3 },
];
