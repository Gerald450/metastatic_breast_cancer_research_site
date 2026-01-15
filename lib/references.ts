export type Reference = {
  id: string;
  title: string;
  authors?: string;
  year?: string;
  journal?: string;
  filename: string; // exact uploaded filename
  localUrl?: string; // e.g., "/pdfs/pky062.pdf"
  doi?: string | null;
  usedFor: string[]; // site sections
  highlightNotes?: (
    | string
    | { section: string; pages?: string; excerptHint: string }
  )[];
};

export const references: Reference[] = [
  {
    id: 'ref-001',
    title:
      'Survival after metastatic recurrence in breast cancer: a population-based study',
    authors:
      'S. Caswell-Jin, H. Plevritis, et al.',
    year: '2018',
    journal: 'JNCI Cancer Spectrum',
    filename: 'pky062.pdf',
    localUrl: '/pdfs/Caswell_et_al.pdf',
    doi: '10.1093/jncics/pky062',
    usedFor: [],
    highlightNotes: [
      'Improved population-level survival over time',
      'Most metastatic disease arises from recurrence, not de novo stage IV',
      'Cancer registries under-capture recurrent metastatic burden',
    ],
  },

  {
    id: 'ref-002',
    title:
      'Metastatic breast cancer incidence, prevalence, and survival in England, 1995–2015',
    authors:
      'J. Lord, M. Robinson, et al.',
    year: '2019',
    journal: 'BMJ Open',
    filename: 'e026414.full.pdf',
    localUrl: '/pdfs/Lord_et_al.pdf',
    doi: '10.1136/bmjopen-2018-026414',
    usedFor: [],
    highlightNotes: [
      'Population-based survival trends',
      'Heterogeneity in metastatic outcomes',
      'Registry limitations',
    ],
  },

  {
    id: 'ref-003',
    title:
      'Global burden of breast cancer: trends and projections',
    authors:
      'Jing Lu et al.',
    year: '2022',
    journal: 'The Lancet Regional Health',
    filename: '809.pdf',
    localUrl: '/pdfs/Jing_Lu_et_al.pdf',
    doi: null,
    usedFor: [],
    highlightNotes: [
      'Global population burden',
      'Incidence and mortality projections',
    ],
  },

  {
    id: 'ref-004',
    title:
      'Future trends in incidence and long-term survival of metastatic cancer in the United States',
    authors:
      'Nicholas L. Hudock',
    year: '2023',
    journal: 'Communications Medicine',
    filename: 's43856-023-00304-x.pdf',
    localUrl: '/pdfs/Hudock_et_al.pdf',
    doi: '10.1038/s43856-023-00304-x',
    usedFor: [],
    highlightNotes: [
      'Metastatic cancer survivorship growth',
      'Reframing metastatic cancer as a chronic condition',
    ],
  },

  {
    id: 'ref-005',
    title:
      'Age distributions of breast cancer diagnosis and mortality by race and ethnicity in US women',
    authors:
      'R. E. Hendrick et al.',
    year: '2021',
    journal: 'Cancer',
    filename: 'Cancer - 2021 - Hendrick - Age distributions...',
    localUrl: '/pdfs/Hendrick_et_al.pdf',
    doi: '10.1002/cncr.33846',
    usedFor: [],
    highlightNotes: [
      'Racial and age-based disparities',
      'Higher metastatic burden among non-Hispanic Black women',
    ],
  },

  {
    id: 'ref-006',
    title:
      'Prognostic impact of metastatic site in breast cancer',
    authors:
      'M. Bonotto et al.',
    year: '2018',
    journal: 'Breast Cancer Research and Treatment',
    filename: 's10549-018-4956-y.pdf',
    localUrl: '/pdfs/Bonotto_et_al.pdf',
    doi: '10.1007/s10549-018-4956-y',
    usedFor: [],
    highlightNotes: [
      'Site-specific metastatic prognosis',
      'Brain, liver, lung, bone outcome differences',
    ],
  },

  {
    id: 'ref-007',
    title:
      'Risk factors and survival outcomes in patients with breast cancer and lung metastasis: a population-based study',
    authors:
      'Weikai Xiao et al.',
    year: '2018',
    journal: 'Cancer Medicine',
    filename: 'Cancer Medicine - 2018 - Xiao...',
    localUrl: '/pdfs/Xiao_et_al.pdf',
    doi: '10.1002/cam4.1370',
    usedFor: [],
    highlightNotes: [
      'Lung metastasis survival variability',
      'Subtype-specific outcomes',
    ],
  },

  {
    id: 'ref-008',
    title:
      'Decoding male breast cancer: epidemiological insights, cutting-edge treatments, and future perspectives',
    authors:
      'Lei Zhao, Huijuan Cheng, Dongqiang He et al.',
    year: '2025',
    journal: 'Discover Oncology',
    filename: 's12672-025-02140-y.pdf',
    localUrl: '/pdfs/Zhao_et_al.pdf',
    doi: '10.1007/s12672-025-02140-y',
    usedFor: [],
    highlightNotes: [
      'Male breast cancer epidemiology',
      'Delayed diagnosis and poorer outcomes',
    ],
  },

  {
    id: 'ref-009',
    title:
      'Evaluation of the current knowledge limitations in breast cancer research: a gap analysis',
    authors:
      'Alastair Thompson et al.',
    year: '2008',
    journal: 'Breast Cancer Research',
    filename: 'bcr1983.pdf',
    localUrl: '/pdfs/Robinson_et_al.pdf',
    doi: '10.1186/bcr1983',
    usedFor: [],
    highlightNotes: [
      'Research gaps',
      'Metastatic progression mechanisms',
    ],
  },

  {
    id: 'ref-010',
    title:
      'The National Prevention Strategy and Breast Cancer Screening: Scientific Evidence for Public Health Action',
    authors:
      'Marcus Plescia et al.',
    year: '2013',
    journal: 'Journal of Public Health Management and Practice',
    filename: '2013-the-national-prevention-strategy...',
    localUrl: '/pdfs/Marcus_Plescia.pdf',
    doi: null,
    usedFor: [],
    highlightNotes: [
      'Screening and public health prevention',
      'Population-level policy implications',
    ],
  },

  {
    id: 'ref-011',
    title:
      'Projected burden of metastatic breast cancer in the United States',
    authors:
      'Mariotto et al.',
    year: '2017',
    journal: 'Journal of the National Cancer Institute',
    filename: 'PIIS2589537022000128.pdf',
    localUrl: '/pdfs/Mariotto_et_al.pdf',
    doi: null,
    usedFor: [],
    highlightNotes: [
      'Prevalence projections',
      'Survivorship burden',
    ],
  },

  {
    id: 'ref-012',
    title:
      'Evaluation of the current knowledge limitations in breast cancer research: a gap analysis',
    authors:
      'Alastair Thompson et al.',
    year: '2008',
    journal: 'Breast Cancer Research',
    filename: 'oncolo_19_6_608.pdf',
    localUrl: '/pdfs/Thompson_et_al.pdf',
    doi: '10.1186/bcr1983',
    usedFor: [],
    highlightNotes: [
      'Metastatic progression',
      'Dormancy and reactivation',
    ],
  },

  {
    id: 'ref-013',
    title:
      'Racial and socioeconomic disparities in breast cancer outcomes',
    authors:
      'Jin-Xiao Ren et al.',
    year: '2021',
    journal: 'Aging',
    filename: 'aging-13-202502.pdf',
    localUrl: '/pdfs/Jin-Xiao_Ren_et_al.pdf',
    doi: null,
    usedFor: [],
    highlightNotes: [
      'Socioeconomic disparities',
      'Insurance and survival differences',
    ],
  },
];


