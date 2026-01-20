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

// Firebase imports
import { collection, getDocs, query, where, QueryConstraint } from 'firebase/firestore';
import { db } from './firebase';

// Collection names
const COLLECTIONS = {
  SURVIVAL_OVER_TIME: 'survival_over_time',
  PREVALENCE_BURDEN: 'prevalence_burden',
  DEMOGRAPHICS_AGE_RACE: 'demographics_age_race',
  METASTATIC_SITE_OUTCOMES: 'metastatic_site_outcomes',
} as const;

/**
 * Convert Firestore document to typed entry
 * Handles undefined fields (Firestore doesn't store null) by converting to null
 */
function convertFirestoreDoc<T>(doc: any): T {
  const data = doc.data();
  const converted: any = { id: doc.id };
  
  for (const [key, value] of Object.entries(data)) {
    // Convert undefined back to null for consistency with TypeScript types
    converted[key] = value === undefined ? null : value;
  }
  
  return converted as T;
}

/**
 * Fetch all documents from a Firestore collection with optional filters
 */
async function fetchCollection<T>(
  collectionName: string,
  filters: QueryConstraint[] = []
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionName);
    const q = filters.length > 0 
      ? query(collectionRef, ...filters)
      : query(collectionRef);
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => convertFirestoreDoc<T>(doc));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    // Fallback to empty array on error
    return [];
  }
}

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
 * Can be called from both server and client components
 */
export async function getSurvivalOverTime(): Promise<(SurvivalOverTimeEntry & { hasReviewFlag: boolean })[]> {
  const data = await fetchCollection<SurvivalOverTimeEntry>(COLLECTIONS.SURVIVAL_OVER_TIME);
  return normalizeDataset(data);
}

/**
 * Get normalized prevalence/burden data
 */
export async function getPrevalenceBurden(): Promise<(PrevalenceBurdenEntry & { hasReviewFlag: boolean })[]> {
  const data = await fetchCollection<PrevalenceBurdenEntry>(COLLECTIONS.PREVALENCE_BURDEN);
  return normalizeDataset(data);
}

/**
 * Get normalized demographics age/race data
 */
export async function getDemographicsAgeRace(): Promise<(DemographicsAgeRaceEntry & { hasReviewFlag: boolean })[]> {
  const data = await fetchCollection<DemographicsAgeRaceEntry>(COLLECTIONS.DEMOGRAPHICS_AGE_RACE);
  return normalizeDataset(data);
}

/**
 * Get normalized metastatic site outcomes data
 */
export async function getMetastaticSiteOutcomes(): Promise<(MetastaticSiteOutcomesEntry & { hasReviewFlag: boolean })[]> {
  const data = await fetchCollection<MetastaticSiteOutcomesEntry>(COLLECTIONS.METASTATIC_SITE_OUTCOMES);
  return normalizeDataset(data);
}

/**
 * Get all datasets with normalization
 */
export async function getAllDatasets() {
  const [survivalOverTime, prevalenceBurden, demographicsAgeRace, metastaticSiteOutcomes] = 
    await Promise.all([
      getSurvivalOverTime(),
      getPrevalenceBurden(),
      getDemographicsAgeRace(),
      getMetastaticSiteOutcomes(),
    ]);

  return {
    survivalOverTime,
    prevalenceBurden,
    demographicsAgeRace,
    metastaticSiteOutcomes,
  };
}
