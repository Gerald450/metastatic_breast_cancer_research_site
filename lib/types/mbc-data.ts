/**
 * Shared types for MBC Supabase tables and API responses.
 */

// API-sourced tables
export interface MBC_Trial {
  id: string;
  nct_id: string;
  brief_title: string | null;
  official_title: string | null;
  conditions: string[] | null;
  phases: string[] | null;
  overall_status: string | null;
  start_date: string | null;
  completion_date: string | null;
  enrollment: number | null;
  sponsor: string | null;
  raw_json: Record<string, unknown> | null;
  synced_at: string | null;
}

export interface MBC_Publication {
  id: string;
  pmid: string;
  title: string | null;
  authors: string | null;
  journal: string | null;
  pub_date: string | null;
  doi: string | null;
  abstract: string | null;
  raw_json: Record<string, unknown> | null;
  synced_at: string | null;
}

export interface MBC_Drug {
  id: string;
  application_number: string;
  brand_name: string | null;
  generic_name: string | null;
  manufacturer_name: string | null;
  indications: string | null;
  purpose: string | null;
  active_ingredient: string | null;
  drug_class: string | null;
  raw_json: Record<string, unknown> | null;
  synced_at: string | null;
}

export interface MBC_Mortality {
  id: string;
  year: number | null;
  state: string | null;
  age_group: string | null;
  race: string | null;
  sex: string | null;
  rate_per_100k: number | null;
  deaths: number | null;
  population: number | null;
  cause_filter: string | null;
  raw_json: Record<string, unknown> | null;
  synced_at: string | null;
}

// Extracted data tables (snake_case for DB)
export interface SurvivalOverTimeRow {
  id: string;
  source_ref_id: string | null;
  filename: string | null;
  metric_name: string | null;
  time_period: string | null;
  value: number | null;
  unit: string | null;
  population: string | null;
  notes: string | null;
  page_hint: number | null;
  needs_manual_review: boolean | null;
}

export interface PrevalenceBurdenRow {
  id: string;
  source_ref_id: string | null;
  filename: string | null;
  metric_name: string | null;
  year_or_range: string | null;
  value: number | null;
  unit: string | null;
  population: string | null;
  notes: string | null;
  page_hint: number | null;
  needs_manual_review: boolean | null;
}

export interface DemographicsAgeRaceRow {
  id: string;
  source_ref_id: string | null;
  filename: string | null;
  metric_name: string | null;
  group_label: string | null;
  age_range: string | null;
  value: number | null;
  unit: string | null;
  notes: string | null;
  page_hint: number | null;
  needs_manual_review: boolean | null;
}

export interface MetastaticSiteOutcomesRow {
  id: string;
  source_ref_id: string | null;
  filename: string | null;
  site: string | null;
  metric_name: string | null;
  value: number | null;
  unit: string | null;
  notes: string | null;
  page_hint: number | null;
  needs_manual_review: boolean | null;
}

// API response types
export interface TrialsResponse {
  data: MBC_Trial[];
  error?: string;
}

export interface PublicationsResponse {
  data: MBC_Publication[];
  error?: string;
}

export interface MortalityResponse {
  data: MBC_Mortality[];
  error?: string;
}

export interface DrugsResponse {
  data: MBC_Drug[];
  error?: string;
}

export interface FigureDatasetResponse<T = unknown> {
  data: T;
  error?: string;
}

// Dataset keys for figure_dataset table
export type FigureDatasetKey =
  | 'mbcSurvivalOverTime'
  | 'mbcSurvivorshipPopulationGrowth'
  | 'breastCancerMortalityRates'
  | 'deNovoStageIVIncidence'
  | 'mbcIncidenceByAge'
  | 'mbcIncidenceByRace'
  | 'mbcSurvivalByRace'
  | 'sexDistributionBreastCancer'
  | 'ageAtDiagnosisVsDeath'
  | 'survivalByMetastaticSite'
  | 'survivalByTumorSubtype'
  | 'survivalTimeDistributionStageIV'
  | 'survivalCurvesByStage'
  | 'stateLevelBreastCancerMortality'
  | 'breastCancerMortalityHeatMap'
  | 'causeOfDeathBreastVsOther'
  | 'survivalByYearAndSubtype'
  | 'insuranceVsStageAtDiagnosis'
  | 'seerIncidenceTrendsByRace'
  | 'seerIncidenceTrendsByAge'
  | 'seerIncidenceTrendsBySexAges75Plus'
  | 'breastCancerSubtypeTrends'
  | 'breastCancerMedianAgeBySubtype'
  | 'hrHer2PosIncidenceByRace'
  | 'hrHer2NegTrendsByAge'
  | 'hrHer2NegRatesByStage2022'
  | 'survival_studies_table'
  | 'survival_by_stage'
  | 'distant_stage_by_subtype'
  | 'meta_regression_survival';
