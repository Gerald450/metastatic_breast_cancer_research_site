/**
 * Trusted online data sources for MBC research.
 * Used for citations and links on topic pages.
 * SEER data from public/txtData/ (SEER*Stat 21 Registries, 2000–2022).
 */
export const SEER_DATA_SOURCE =
  'Data Source: SEER Research Data (21 Registries, 2000–2022), SEER*Stat Nov 2024 Submission. National Cancer Institute.';

export const ONLINE_SOURCES = {
  SEER_EXPLORER: {
    id: 'seer-explorer',
    name: 'SEER*Explorer',
    org: 'National Cancer Institute',
    url: 'https://seer.cancer.gov/statistics-network/explorer/',
    citation: 'National Cancer Institute. SEER*Explorer. Surveillance, Epidemiology, and End Results (SEER) Program.',
    usedFor: ['epidemiology', 'demographics'],
  },
  /** Female Breast cancer (site 621) — source for public/csv/Subtypes/ data */
  SEER_EXPLORER_FEMALE_BREAST: {
    id: 'seer-explorer-breast',
    name: 'SEER*Explorer — Female Breast',
    org: 'National Cancer Institute',
    url: 'https://seer.cancer.gov/statistics-network/explorer/application.html?site=621&data_type=1&graph_type=2&compareBy=race&chk_race_6=6&chk_race_5=5&chk_race_4=4&chk_race_9=9&chk_race_8=8&rate_type=2&hdn_sex=3&age_range=1&stage=101&advopt_precision=1&advopt_show_ci=on#resultsRegion0',
    citation: 'National Cancer Institute. SEER*Explorer Female Breast Cancer Statistics. SEER Incidence Data, November 2024 Submission.',
    usedFor: ['epidemiology', 'demographics', 'clinical-outcomes'],
  },
  SEER_NOV_2024: {
    id: 'seer-nov2024',
    name: 'SEER Incidence Data — November 2024 Submission',
    org: 'National Cancer Institute',
    url: 'https://seer.cancer.gov/data-software/documentation/seerstat/nov2024/',
    citation: 'National Cancer Institute. SEER Incidence Data, November 2024 Submission (1975-2022), SEER 21 registries.',
    usedFor: ['epidemiology', 'demographics', 'clinical-outcomes'],
  },
  SEER_NOV_2023: {
    id: 'seer-nov2023',
    name: 'SEER*Stat Databases — November 2023 Submission',
    org: 'National Cancer Institute',
    url: 'https://seer.cancer.gov/data-software/documentation/seerstat/nov2023/',
    citation: 'National Cancer Institute, SEER*Stat Databases — November 2023 Submission. Surveillance, Epidemiology, and End Results (SEER) Program.',
    usedFor: ['epidemiology', 'demographics', 'clinical-outcomes'],
  },
  NCI_SEER: {
    id: 'nci-seer',
    name: 'SEER Cancer Statistics',
    org: 'National Cancer Institute',
    url: 'https://seer.cancer.gov/',
    citation: SEER_DATA_SOURCE,
    usedFor: ['epidemiology', 'demographics'],
  },
  /** Verified SEER*Stat exports (21 Registries, 2000–2022) */
  SEER_VERIFIED: {
    id: 'seer-verified',
    name: 'SEER Research Data (21 Registries, 2000–2022)',
    org: 'National Cancer Institute',
    url: 'https://seer.cancer.gov/',
    citation: SEER_DATA_SOURCE,
    usedFor: ['epidemiology', 'demographics', 'clinical-outcomes'],
  },
  CDC_CANCER: {
    id: 'cdc-cancer',
    name: 'CDC Cancer Data',
    org: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/cancer/',
    citation: 'Centers for Disease Control and Prevention. Cancer Data and Statistics.',
    usedFor: ['epidemiology', 'public-health'],
  },
  CDC_WONDER: {
    id: 'cdc-wonder',
    name: 'CDC WONDER',
    org: 'Centers for Disease Control and Prevention',
    url: 'https://wonder.cdc.gov/',
    citation: 'Centers for Disease Control and Prevention. CDC WONDER Online Database.',
    usedFor: ['epidemiology', 'public-health'],
  },
  USCS: {
    id: 'uscs',
    name: 'United States Cancer Statistics',
    org: 'CDC and NCI',
    url: 'https://www.cdc.gov/cancer/uscs/',
    citation: 'Centers for Disease Control and Prevention and National Cancer Institute. United States Cancer Statistics.',
    usedFor: ['epidemiology', 'demographics', 'public-health'],
  },
  OPENFDA: {
    id: 'openfda',
    name: 'OpenFDA',
    org: 'U.S. Food and Drug Administration',
    url: 'https://open.fda.gov/',
    citation: 'U.S. Food and Drug Administration. OpenFDA Drug Labeling API.',
    usedFor: ['treatment'],
  },
  CDC_BREAST_CANCER_RISK: {
    id: 'cdc-breast-risk',
    name: 'Breast Cancer Risk Factors',
    org: 'Centers for Disease Control and Prevention',
    url: 'https://www.cdc.gov/breast-cancer/risk-factors/index.html',
    citation: 'CDC. Breast Cancer Risk Factors. National Center for Chronic Disease Prevention and Health Promotion.',
    usedFor: ['epidemiology'],
  },

  /** NCI Breast Cancer Steering Committee Working Group on MBC trial endpoints */
  NCI_MBC_ENDPOINTS: {
    id: 'nci-mbc-endpoints',
    name: 'NCI Breast Cancer Steering Committee Working Group Report on Meaningful and Appropriate End Points for Clinical Trials in Metastatic Breast Cancer',
    org: 'Journal of Clinical Oncology / NCI',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7351338/',
    citation: 'Seidman AD et al. J Clin Oncol. 2018;36(32):3259–3268.',
    usedFor: ['clinical-outcomes'],
  },

  /** NCCN Guidelines for Metastatic Breast Cancer */
  NCCN_MBC: {
    id: 'nccn-mbc',
    name: 'NCCN Guidelines for Metastatic Breast Cancer',
    org: 'National Comprehensive Cancer Network',
    url: 'https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1419',
    citation: 'NCCN. Breast Cancer Guidelines. National Comprehensive Cancer Network.',
    usedFor: ['clinical-outcomes'],
  },

  /** MDPI Cancers: QoL PROs in real-world MBC patients */
  MDPI_QOL_MBC: {
    id: 'mdpi-qol-mbc',
    name: 'Measuring Quality of Life Using Patient-Reported Outcomes in Real-World Metastatic Breast Cancer Patients',
    org: 'Cancers (MDPI)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8151772/',
    citation: 'Clarijs ME et al. Cancers. 2021;13(10):2308.',
    usedFor: ['clinical-outcomes'],
  },

  /** EORTC Quality of Life - Metastatic Breast Cancer module */
  EORTC_MBC: {
    id: 'eortc-mbc',
    name: 'EORTC QLQ-BR45 — Metastatic Breast Cancer Module',
    org: 'European Organisation for Research and Treatment of Cancer',
    url: 'https://qol.eortc.org/questionnaire/metastatic-breast-cancer/',
    citation: 'EORTC. Quality of Life Questionnaires. Metastatic Breast Cancer Module.',
    usedFor: ['clinical-outcomes'],
  },
} as const;
