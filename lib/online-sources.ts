/**
 * Trusted online data sources for MBC research.
 * Used for citations and links on topic pages.
 * SEER November 2023 Submission: https://seer.cancer.gov/data-software/documentation/seerstat/nov2023/
 */
export const ONLINE_SOURCES = {
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
    citation: 'National Cancer Institute. Surveillance, Epidemiology, and End Results (SEER) Program.',
    usedFor: ['epidemiology', 'demographics'],
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
} as const;
