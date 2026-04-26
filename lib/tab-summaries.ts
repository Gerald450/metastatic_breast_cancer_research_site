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
      'Survival after metastatic recurrence, median survival improvements over time, site-specific outcomes (bone, liver, lung, brain), treatment response end points (PFS, OS, RECIST), and quality of life measures (EORTC, FACT-B). NCI, NCCN, and MDPI/EORTC cited for outcomes and PROs.',
    sourceRefIds: ['ref-001', 'ref-002', 'ref-004', 'ref-006', 'ref-007', 'ref-012', 'ref-013'],
    onlineSourceIds: ['seer-nov2023', 'nci-mbc-endpoints', 'nccn-mbc', 'mdpi-qol-mbc', 'eortc-mbc'],
  },
  'public-health': {
    summary:
      'Population burden, mortality landscape, screening and early detection (tumour markers, whole-body imaging), prevention strategies (omic-signature-based screening, limitations of mammography), and healthcare resource utilization (costs, HER2-targeted therapy burden). NCI/SEER and CDC supplement where applicable.',
    sourceRefIds: ['ref-003', 'ref-010', 'ref-011', 'ref-015', 'ref-016', 'ref-017'],
    onlineSourceIds: ['nci-seer', 'cdc-cancer'],
  },
  biology: {
    summary:
      'Circulating tumor cells (CTCs) and the metastatic cascade; hypoxia, HIF, and VEGF-mediated angiogenesis and escape; biophysical and ECM-mediated invasion (stiffness, integrins, MMPs) alongside CTC physical biology; the tumor microenvironment (CAF and immune crosstalk, immunosuppressive niches); epithelial–mesenchymal plasticity with in vivo and MET–colonization context (synthesis); molecular heterogeneity and single-cell views; cancer stem cell pathways (Notch, Wnt, Hedgehog); circadian and sleep-associated dissemination; clonal and genomic drivers (e.g. TP53, PIK3CA, instability) with Thompson et al. (ref-012) on research gaps, dormancy, and evolution.',
    sourceRefIds: [
      'ref-012',
      'ref-014',
      'ref-017',
      'ref-018',
      'ref-019',
      'ref-020',
      'ref-021',
      'ref-022',
      'ref-023',
      'ref-024',
      'ref-025',
    ],
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
