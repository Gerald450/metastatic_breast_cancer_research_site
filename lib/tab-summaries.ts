import type { SiteSection } from './references';

/**
 * Summary and citation ref IDs for each topic tab.
 * Content is derived from the PDF sources (references.ts highlightNotes, titles).
 * Helps users and researchers quickly understand what evidence the tab is based on.
 */
export type TabSummaryEntry = {
  summary: string;
  sourceRefIds: string[];
  onlineSourceIds?: string[];
};

const summaries: Record<SiteSection, TabSummaryEntry> = {
  definition: {
    summary:
      'This section covers the clinical definition, diagnostic criteria, and classification of metastatic breast cancer. Key themes from the literature include research gaps in knowledge, metastatic progression mechanisms, and the distinction between metastatic recurrence and de novo stage IV disease.',
    sourceRefIds: ['ref-001', 'ref-002', 'ref-012'],
  },
  epidemiology: {
    summary:
      'Evidence draws on population-based studies of incidence, prevalence, and survival (England, US, global) and the SEER*Stat November 2023 Submission. Topics include MBC survivorship growth, temporal trends, and projections; cancer registries under-capture recurrent metastatic burden.',
    sourceRefIds: ['ref-001', 'ref-002', 'ref-003', 'ref-004', 'ref-008', 'ref-011'],
    onlineSourceIds: ['seer-nov2023', 'nci-seer'],
  },
  demographics: {
    summary:
      'Summarizes age, race, ethnicity, and sex patterns in MBC. Sources report racial and age-based disparities, higher metastatic burden among non-Hispanic Black women, male breast cancer with delayed diagnosis and poorer outcomes, and socioeconomic/insurance disparities. SEER data supplements demographics.',
    sourceRefIds: ['ref-005', 'ref-008', 'ref-013'],
    onlineSourceIds: ['seer-nov2023'],
  },
  'clinical-outcomes': {
    summary:
      'Survival after metastatic recurrence, median survival improvements over time, and site-specific outcomes (bone, liver, lung, brain). Population-based survival trends, heterogeneity in outcomes, and reframing metastatic cancer as chronic. SEER and site PDFs cited.',
    sourceRefIds: ['ref-001', 'ref-002', 'ref-004', 'ref-006', 'ref-007', 'ref-012', 'ref-013'],
    onlineSourceIds: ['seer-nov2023'],
  },
  'public-health': {
    summary:
      'Population burden, mortality landscape, screening and early detection (tumour markers, whole-body imaging), prevention strategies (omic-signature-based screening, limitations of mammography), and healthcare resource utilization (costs, HER2-targeted therapy burden). NCI/SEER and CDC supplement where applicable.',
    sourceRefIds: ['ref-003', 'ref-010', 'ref-011', 'ref-015', 'ref-016', 'ref-017'],
    onlineSourceIds: ['nci-seer', 'cdc-cancer'],
  },
  biology: {
    summary:
      'Circulating tumor cells (CTCs) as drivers of metastasis, physical biology (stiffness, shear stress, mechanical trapping), molecular heterogeneity revealed by scRNA-seq, circadian and sleep-associated regulation of dissemination, and implications for resistance and treatment. Draws on ref-014 (CTC biology synthesis), ref-017 (omic approaches to metastasis-prone subtypes), and Thompson et al. (ref-012) for progression and dormancy.',
    sourceRefIds: ['ref-012', 'ref-014', 'ref-017'],
  },
  treatment: {
    summary:
      'Therapy overview, targeted therapy, sequencing, and modalities. Content in development; references from clinical-outcomes (e.g. Bonotto, Xiao) inform site-specific treatment response. Additional sources will be added.',
    sourceRefIds: ['ref-006', 'ref-007'],
  },
};

export function getTabSummary(section: SiteSection): TabSummaryEntry {
  return summaries[section];
}
