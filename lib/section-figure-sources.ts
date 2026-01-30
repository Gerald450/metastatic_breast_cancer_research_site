import type { SiteSection } from './references';

/**
 * Ref IDs that can appear as "Sources" under figures on each section.
 * Derived from extracted data (survival_over_time, prevalence_burden,
 * demographics_age_race, metastatic_site_outcomes). Kept in sync so the
 * "References Used" list at the bottom of each tab includes every ref
 * cited in visuals above.
 */
export const SECTION_FIGURE_SOURCE_IDS: Record<SiteSection, string[]> = {
  definition: [],
  epidemiology: [],
  demographics: ['ref-001', 'ref-002', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-011'],
  'clinical-outcomes': ['ref-001', 'ref-002', 'ref-004', 'ref-005', 'ref-006', 'ref-007', 'ref-011'],
  'public-health': ['ref-002', 'ref-003', 'ref-004', 'ref-005', 'ref-007', 'ref-011'],
  biology: [],
  treatment: [],
};

export function getFigureSourceIdsForSection(section: SiteSection): string[] {
  return SECTION_FIGURE_SOURCE_IDS[section] ?? [];
}
