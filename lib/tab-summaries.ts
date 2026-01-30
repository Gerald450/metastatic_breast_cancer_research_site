import type { SiteSection } from './references';

/**
 * Summary and citation ref IDs for each topic tab.
 * Content is derived from the PDF sources (references.ts highlightNotes, titles).
 * Helps users and researchers quickly understand what evidence the tab is based on.
 */
export type TabSummaryEntry = {
  summary: string;
  sourceRefIds: string[];
};

const summaries: Record<SiteSection, TabSummaryEntry> = {
  definition: {
    summary:
      'This section covers the clinical definition, diagnostic criteria, and classification of metastatic breast cancer. Key themes from the literature include research gaps in knowledge, metastatic progression mechanisms, and the distinction between metastatic recurrence and de novo stage IV disease.',
    sourceRefIds: ['ref-009', 'ref-012'],
  },
  epidemiology: {
    summary:
      'Evidence here draws on population-based studies of incidence, prevalence, and survival in England, the US, and globally. Topics include metastatic breast cancer survivorship growth over time, temporal trends, and projections; cancer registries are noted to under-capture recurrent metastatic burden.',
    sourceRefIds: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-008', 'ref-011'],
  },
  demographics: {
    summary:
      'This tab summarizes age, race, ethnicity, and sex patterns in metastatic breast cancer. Sources report racial and age-based disparities, higher metastatic burden among non-Hispanic Black women, male breast cancer epidemiology with delayed diagnosis and poorer outcomes, and socioeconomic and insurance-related disparities in outcomes.',
    sourceRefIds: ['ref-005', 'ref-008', 'ref-013'],
  },
  'clinical-outcomes': {
    summary:
      'Content focuses on survival after metastatic recurrence, improvements in median survival over time, and site-specific outcomes (e.g. bone, liver, lung, brain). Studies include population-based survival trends, heterogeneity in metastatic outcomes, and reframing metastatic cancer as a chronic condition.',
    sourceRefIds: ['ref-001', 'ref-002', 'ref-004', 'ref-006', 'ref-007', 'ref-012', 'ref-013'],
  },
  'public-health': {
    summary:
      'This section addresses population burden, screening, prevention, and policy. Sources cover global and US burden and projections, survivorship burden, screening and public health prevention, and population-level policy implications.',
    sourceRefIds: ['ref-003', 'ref-010', 'ref-011'],
  },
  biology: {
    summary:
      'Biology covers the metastatic cascade, tumor evolution, heterogeneity, and resistance mechanisms. This topic is in development; references will be added as content is extracted from the literature.',
    sourceRefIds: [],
  },
  treatment: {
    summary:
      'Treatment covers therapy overview, targeted therapy, sequencing, and modalities. This topic is in development; references will be added as content is extracted from the literature.',
    sourceRefIds: [],
  },
};

export function getTabSummary(section: SiteSection): TabSummaryEntry {
  return summaries[section];
}
