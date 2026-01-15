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
    usedFor: ['clinical-outcomes'],
    highlightNotes: [
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint: 'Improved population-level survival over time',
      },
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint:
          'Most metastatic disease arises from recurrence, not de novo stage IV',
      },
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint:
          'Cancer registries under-capture recurrent metastatic burden',
      },
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
    usedFor: ['epidemiology', 'clinical-outcomes'],
    highlightNotes: [
      {
        section: 'Epidemiology',
        pages: 'TBD',
        excerptHint: 'Population-based survival trends',
      },
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint: 'Heterogeneity in metastatic outcomes',
      },
      {
        section: 'Epidemiology',
        pages: 'TBD',
        excerptHint: 'Registry limitations',
      },
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
    usedFor: ['epidemiology', 'public-health'],
    highlightNotes: [
      {
        section: 'Epidemiology',
        pages: 'TBD',
        excerptHint: 'Global population burden',
      },
      {
        section: 'Public Health',
        pages: 'TBD',
        excerptHint: 'Incidence and mortality projections',
      },
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
    usedFor: ['epidemiology', 'clinical-outcomes'],
    highlightNotes: [
      {
        section: 'Epidemiology',
        pages: 'TBD',
        excerptHint: 'Metastatic cancer survivorship growth',
      },
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint: 'Reframing metastatic cancer as a chronic condition',
      },
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
    usedFor: ['demographics'],
    highlightNotes: [
      {
        section: 'Demographics',
        pages: 'TBD',
        excerptHint: 'Racial and age-based disparities',
      },
      {
        section: 'Demographics',
        pages: 'TBD',
        excerptHint:
          'Higher metastatic burden among non-Hispanic Black women',
      },
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
    usedFor: ['clinical-outcomes'],
    highlightNotes: [
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint: 'Site-specific metastatic prognosis',
      },
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint: 'Brain, liver, lung, bone outcome differences',
      },
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
    usedFor: ['clinical-outcomes'],
    highlightNotes: [
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint: 'Lung metastasis survival variability',
      },
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint: 'Subtype-specific outcomes',
      },
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
    usedFor: ['epidemiology', 'demographics'],
    highlightNotes: [
      {
        section: 'Epidemiology',
        pages: 'TBD',
        excerptHint: 'Male breast cancer epidemiology',
      },
      {
        section: 'Demographics',
        pages: 'TBD',
        excerptHint: 'Delayed diagnosis and poorer outcomes',
      },
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
    usedFor: ['definition'],
    highlightNotes: [
      {
        section: 'Definition',
        pages: 'TBD',
        excerptHint: 'Research gaps',
      },
      {
        section: 'Definition',
        pages: 'TBD',
        excerptHint: 'Metastatic progression mechanisms',
      },
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
    usedFor: ['public-health'],
    highlightNotes: [
      {
        section: 'Public Health',
        pages: 'TBD',
        excerptHint: 'Screening and public health prevention',
      },
      {
        section: 'Public Health',
        pages: 'TBD',
        excerptHint: 'Population-level policy implications',
      },
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
    usedFor: ['epidemiology', 'public-health'],
    highlightNotes: [
      {
        section: 'Epidemiology',
        pages: 'TBD',
        excerptHint: 'Prevalence projections',
      },
      {
        section: 'Public Health',
        pages: 'TBD',
        excerptHint: 'Survivorship burden',
      },
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
    usedFor: ['definition', 'clinical-outcomes'],
    highlightNotes: [
      {
        section: 'Definition',
        pages: 'TBD',
        excerptHint: 'Metastatic progression',
      },
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint: 'Dormancy and reactivation',
      },
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
    localUrl: '/pdfs/Jin_Xiao_Ren_et_al.pdf',
    doi: null,
    usedFor: ['demographics', 'clinical-outcomes'],
    highlightNotes: [
      {
        section: 'Demographics',
        pages: 'TBD',
        excerptHint: 'Socioeconomic disparities',
      },
      {
        section: 'Clinical Outcomes',
        pages: 'TBD',
        excerptHint: 'Insurance and survival differences',
      },
    ],
  },
];


