/**
 * SEER data extracted from public/csv/ (SEER*Explorer downloads).
 * Source: SEER Incidence Data, November 2024 Submission (1975-2022), SEER 21 registries.
 * Created by https://seer.cancer.gov/statistics-network/explorer/
 */

/** AAPC = Average Annual Percent Change. Direction: Rising | Falling | Not Significant */
export interface SEERTrendRow {
  group: string;
  yearRange: string;
  aapc: number;
  lowerCI: number;
  upperCI: number;
  pValue: string;
  direction: 'Rising' | 'Falling' | 'Not Significant';
}

/** From explorer_download (2).csv - By Race/Ethnicity, Both Sexes, All Ages */
export const seerIncidenceTrendsByRaceData: SEERTrendRow[] = [
  { group: 'Hispanic (any race)', yearRange: '2013-2022', aapc: 0.7, lowerCI: 0.6, upperCI: 0.9, pValue: '<0.01', direction: 'Rising' },
  { group: 'Hispanic (any race)', yearRange: '2018-2022', aapc: 0.7, lowerCI: 0.6, upperCI: 1.0, pValue: '<0.01', direction: 'Rising' },
  { group: 'Non-Hispanic American Indian/Alaska Native', yearRange: '2013-2022', aapc: 1.1, lowerCI: 0.9, upperCI: 1.3, pValue: '<0.01', direction: 'Rising' },
  { group: 'Non-Hispanic American Indian/Alaska Native', yearRange: '2018-2022', aapc: 1.1, lowerCI: 0.9, upperCI: 1.3, pValue: '<0.01', direction: 'Rising' },
  { group: 'Non-Hispanic Asian/Pacific Islander', yearRange: '2013-2022', aapc: 0.7, lowerCI: 0.5, upperCI: 0.9, pValue: '<0.01', direction: 'Rising' },
  { group: 'Non-Hispanic Asian/Pacific Islander', yearRange: '2018-2022', aapc: 1.2, lowerCI: 0.7, upperCI: 2.1, pValue: '<0.01', direction: 'Rising' },
  { group: 'Non-Hispanic Black', yearRange: '2013-2022', aapc: 0.1, lowerCI: -0.0, upperCI: 0.3, pValue: '0.06', direction: 'Not Significant' },
  { group: 'Non-Hispanic Black', yearRange: '2018-2022', aapc: 0.4, lowerCI: 0.1, upperCI: 0.6, pValue: '<0.01', direction: 'Rising' },
  { group: 'Non-Hispanic White', yearRange: '2013-2022', aapc: 0.4, lowerCI: 0.1, upperCI: 0.6, pValue: '<0.01', direction: 'Rising' },
  { group: 'Non-Hispanic White', yearRange: '2018-2022', aapc: 0.4, lowerCI: 0.2, upperCI: 0.7, pValue: '<0.01', direction: 'Rising' },
];

/** From explorer_download (3).csv - By Age, Both Sexes, All Races */
export const seerIncidenceTrendsByAgeData: SEERTrendRow[] = [
  { group: 'All Ages', yearRange: '2013-2022', aapc: 0.4, lowerCI: 0.1, upperCI: 0.5, pValue: '<0.01', direction: 'Rising' },
  { group: 'All Ages', yearRange: '2018-2022', aapc: 0.4, lowerCI: 0.2, upperCI: 0.6, pValue: '<0.01', direction: 'Rising' },
  { group: 'Ages < 50', yearRange: '2013-2022', aapc: 0.8, lowerCI: 0.6, upperCI: 1.0, pValue: '<0.01', direction: 'Rising' },
  { group: 'Ages < 50', yearRange: '2018-2022', aapc: 0.8, lowerCI: 0.6, upperCI: 1.2, pValue: '<0.01', direction: 'Rising' },
  { group: 'Ages 50-64', yearRange: '2013-2022', aapc: 0.1, lowerCI: -0.1, upperCI: 0.3, pValue: '0.30', direction: 'Not Significant' },
  { group: 'Ages 50-64', yearRange: '2018-2022', aapc: 0.1, lowerCI: -0.2, upperCI: 0.5, pValue: '0.34', direction: 'Not Significant' },
  { group: 'Ages 65+', yearRange: '2013-2022', aapc: 0.3, lowerCI: 0.1, upperCI: 0.5, pValue: '0.01', direction: 'Rising' },
  { group: 'Ages 65+', yearRange: '2018-2022', aapc: 0.3, lowerCI: 0.1, upperCI: 0.6, pValue: '0.01', direction: 'Rising' },
];

/** From explorer_download.csv - By Sex, Ages 75+ */
export const seerIncidenceTrendsBySexAges75PlusData: SEERTrendRow[] = [
  { group: 'Female', yearRange: '2013-2022', aapc: 0.3, lowerCI: 0.1, upperCI: 0.4, pValue: '<0.01', direction: 'Rising' },
  { group: 'Female', yearRange: '2018-2022', aapc: 0.3, lowerCI: 0.1, upperCI: 0.6, pValue: '0.01', direction: 'Rising' },
  { group: 'Male', yearRange: '2013-2022', aapc: 0.3, lowerCI: -0.0, upperCI: 0.5, pValue: '0.05', direction: 'Not Significant' },
  { group: 'Male', yearRange: '2018-2022', aapc: 0.3, lowerCI: 0.0, upperCI: 0.6, pValue: '0.05', direction: 'Rising' },
];

/** CSV file paths for citation */
export const SEER_CSV_SOURCES = {
  raceEthnicity: '/csv/explorer_download (2).csv',
  age: '/csv/explorer_download (3).csv',
  sexAges75Plus: '/csv/explorer_download.csv',
} as const;
