// Data types for extracted datasets
export type SurvivalOverTimeEntry = {
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
};

export type PrevalenceBurdenEntry = {
  sourceRefId: string;
  filename: string;
  metricName: string | null;
  yearOrRange: string | null;
  value: number | null;
  unit: string | null;
  population: string | null;
  notes: string;
  pageHint: number;
  needsManualReview: boolean;
};

export type DemographicsAgeRaceEntry = {
  sourceRefId: string;
  filename: string;
  metricName: string | null;
  groupLabel: string | null;
  ageRange: string | null;
  value: number | null;
  unit: string | null;
  notes: string;
  pageHint: number;
  needsManualReview: boolean;
};

export type MetastaticSiteOutcomesEntry = {
  sourceRefId: string;
  filename: string;
  site: string | null;
  metricName: string | null;
  value: number | null;
  unit: string | null;
  notes: string;
  pageHint: number;
  needsManualReview: boolean;
};

// Import JSON files (Next.js will bundle these at build time)
import survivalOverTimeRaw from '@/data/extracted/survival_over_time.json';
import prevalenceBurdenRaw from '@/data/extracted/prevalence_or_survivorship_burden.json';
import demographicsAgeRaceRaw from '@/data/extracted/demographics_age_race.json';
import metastaticSiteOutcomesRaw from '@/data/extracted/metastatic_site_outcomes.json';

// Type assertions
const survivalOverTime = survivalOverTimeRaw as SurvivalOverTimeEntry[];
const prevalenceBurden = prevalenceBurdenRaw as PrevalenceBurdenEntry[];
const demographicsAgeRace = demographicsAgeRaceRaw as DemographicsAgeRaceEntry[];
const metastaticSiteOutcomes = metastaticSiteOutcomesRaw as MetastaticSiteOutcomesEntry[];

/**
 * Normalize and filter dataset entries
 * - Filters out entries with value === null
 * - Keeps entries with needsManualReview=true but marks them
 */
export function normalizeDataset<T extends { value: number | null; needsManualReview: boolean }>(
  data: T[]
): (T & { hasReviewFlag: boolean })[] {
  return data
    .filter((entry) => entry.value !== null)
    .map((entry) => ({
      ...entry,
      hasReviewFlag: entry.needsManualReview,
    }));
}

/**
 * Get unique source reference IDs from a dataset
 */
export function getSourceRefIds<T extends { sourceRefId: string }>(
  data: T[]
): string[] {
  return Array.from(new Set(data.map((entry) => entry.sourceRefId))).sort();
}

/**
 * Get normalized survival over time data
 */
export function getSurvivalOverTime() {
  return normalizeDataset(survivalOverTime);
}

/**
 * Get normalized prevalence/burden data
 */
export function getPrevalenceBurden() {
  return normalizeDataset(prevalenceBurden);
}

/**
 * Get normalized demographics age/race data
 */
export function getDemographicsAgeRace() {
  return normalizeDataset(demographicsAgeRace);
}

/**
 * Get normalized metastatic site outcomes data
 */
export function getMetastaticSiteOutcomes() {
  return normalizeDataset(metastaticSiteOutcomes);
}

/**
 * Get all datasets with normalization
 */
export function getAllDatasets() {
  return {
    survivalOverTime: getSurvivalOverTime(),
    prevalenceBurden: getPrevalenceBurden(),
    demographicsAgeRace: getDemographicsAgeRace(),
    metastaticSiteOutcomes: getMetastaticSiteOutcomes(),
  };
}

