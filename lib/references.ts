export type SiteSection =
  | 'definition'
  | 'epidemiology'
  | 'demographics'
  | 'clinical-outcomes'
  | 'public-health'
  | 'biology'
  | 'treatment';

export type HighlightNote = {
  section: string;
  pages?: string;
  excerptHint: string;
};

export type Reference = {
  id: string;
  title: string;
  authors?: string;
  year?: string;
  journal?: string;
  filename: string; // exact uploaded filename
  localUrl?: string; // path segment only, e.g. "/pdfs/Caswell_et_al.pdf" (used to build Storage or local URL)
  doi?: string | null;
  usedFor: SiteSection[];
  highlightNotes?: HighlightNote[]; // TODO: insert verified page numbers
};

const STORAGE_BUCKET = 'pdfs';

/**
 * Public URL for a reference's PDF. Prefers Supabase Storage when NEXT_PUBLIC_SUPABASE_URL is set; otherwise falls back to local path.
 */
export function getPdfUrl(ref: Reference): string | undefined {
  if (!ref.localUrl) return undefined;
  const filename = ref.localUrl.replace(/^\/pdfs\/?/, '') || ref.localUrl.split('/').pop();
  if (!filename) return undefined;
  const base = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined;
  if (base) {
    return `${base}/storage/v1/object/public/${STORAGE_BUCKET}/${encodeURIComponent(filename)}`;
  }
  return ref.localUrl;
}

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
    usedFor: ['definition', 'clinical-outcomes', 'demographics'],
    highlightNotes: [
      {
        section: 'Clinical Outcomes',
        pages: '—',
        excerptHint: 'Improved population-level survival over time',
      },
      {
        section: 'Clinical Outcomes',
        pages: '—',
        excerptHint:
          'Most metastatic disease arises from recurrence, not de novo stage IV',
      },
      {
        section: 'Clinical Outcomes',
        pages: '—',
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
    localUrl: '/pdfs/Lord_et_ al.pdf', // matches actual filename (space before "al")
    doi: '10.1136/bmjopen-2018-026414',
    usedFor: ['definition', 'epidemiology', 'clinical-outcomes', 'public-health', 'demographics'],
    highlightNotes: [
      {
        section: 'Epidemiology',
        pages: '—',
        excerptHint: 'Population-based survival trends',
      },
      {
        section: 'Clinical Outcomes',
        pages: '—',
        excerptHint: 'Heterogeneity in metastatic outcomes',
      },
      {
        section: 'Epidemiology',
        pages: '—',
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
    localUrl: '/pdfs/Jing _lu _et_al.pdf', // matches actual filename (spaces)
    doi: null,
    usedFor: ['epidemiology', 'public-health'],
    highlightNotes: [
      {
        section: 'Epidemiology',
        pages: '—',
        excerptHint: 'Global population burden',
      },
      {
        section: 'Public Health',
        pages: '—',
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
    usedFor: ['epidemiology', 'clinical-outcomes', 'public-health', 'demographics'],
    highlightNotes: [
      {
        section: 'Epidemiology',
        pages: '—',
        excerptHint: 'Metastatic cancer survivorship growth',
      },
      {
        section: 'Clinical Outcomes',
        pages: '—',
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
    usedFor: ['demographics', 'clinical-outcomes', 'public-health', 'epidemiology'],
    highlightNotes: [
      {
        section: 'Demographics',
        pages: '—',
        excerptHint: 'Racial and age-based disparities',
      },
      {
        section: 'Demographics',
        pages: '—',
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
    usedFor: ['clinical-outcomes', 'demographics', 'treatment'],
    highlightNotes: [
      {
        section: 'Clinical Outcomes',
        pages: '—',
        excerptHint: 'Site-specific metastatic prognosis',
      },
      {
        section: 'Clinical Outcomes',
        pages: '—',
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
    usedFor: ['clinical-outcomes', 'public-health', 'demographics', 'treatment', 'epidemiology'],
    highlightNotes: [
      {
        section: 'Clinical Outcomes',
        pages: '—',
        excerptHint: 'Lung metastasis survival variability',
      },
      {
        section: 'Clinical Outcomes',
        pages: '—',
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
        pages: '—',
        excerptHint: 'Male breast cancer epidemiology',
      },
      {
        section: 'Demographics',
        pages: '—',
        excerptHint: 'Delayed diagnosis and poorer outcomes',
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
        pages: '—',
        excerptHint: 'Screening and public health prevention',
      },
      {
        section: 'Public Health',
        pages: '—',
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
    usedFor: ['epidemiology', 'public-health', 'clinical-outcomes', 'demographics'],
    highlightNotes: [
      {
        section: 'Epidemiology',
        pages: '—',
        excerptHint: 'Prevalence projections',
      },
      {
        section: 'Public Health',
        pages: '—',
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
    usedFor: ['biology', 'definition', 'clinical-outcomes'],
    highlightNotes: [
      {
        section: 'Definition',
        pages: '—',
        excerptHint: 'Metastatic progression',
      },
      {
        section: 'Clinical Outcomes',
        pages: '—',
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
        pages: '—',
        excerptHint: 'Socioeconomic disparities',
      },
      {
        section: 'Clinical Outcomes',
        pages: '—',
        excerptHint: 'Insurance and survival differences',
      },
    ],
  },

  {
    id: 'ref-014',
    title:
      'The Biology of Metastatic Breast Cancer: Circulating Tumor Cells, Physical Constraints, and Temporal Regulation',
    authors: 'Synthesis article citing Diamantopoulou, Orrapin, Philips et al.',
    filename: 'The Biology of Metastatic Breast Cancer- Circulating Tumor Cells, Physical….pdf',
    localUrl: '/pdfs/ctc-biology.pdf',
    doi: null,
    usedFor: ['biology'],
    highlightNotes: [
      { section: 'Biology', pages: '—', excerptHint: 'CTCs as drivers of metastasis' },
      { section: 'Biology', pages: '—', excerptHint: 'Physical biology and mechanical trapping' },
      { section: 'Biology', pages: '—', excerptHint: 'Molecular heterogeneity (scRNA-seq)' },
      { section: 'Biology', pages: '—', excerptHint: 'Circadian regulation and sleep-associated metastasis' },
    ],
  },

  {
    id: 'ref-015',
    title:
      'Early detection of metastatic disease in asymptomatic breast cancer patients with whole-body imaging and defined tumour marker increase',
    authors: 'D. Di Gioia, P. Stieber, G.P. Schmidt, et al.',
    year: '2015',
    journal: 'British Journal of Cancer',
    filename: 'Early_detection.pdf',
    localUrl: '/pdfs/Early_detection.pdf',
    doi: '10.1038/bjc.2015.8',
    usedFor: ['public-health'],
    highlightNotes: [
      {
        section: 'Public Health',
        pages: '—',
        excerptHint: 'Tumour marker monitoring (CEA, CA 15-3, CA 125) for early MBC detection',
      },
      {
        section: 'Public Health',
        pages: '—',
        excerptHint: 'Whole-body MRI and FDG-PET/CT for asymptomatic recurrence',
      },
      {
        section: 'Public Health',
        pages: '—',
        excerptHint: 'Reproducible tumour marker increase followed by imaging is highly effective',
      },
    ],
  },

  {
    id: 'ref-016',
    title:
      'Healthcare Resource Use and Expenditures among Metastatic Breast Cancer Patients Treated with HER2-Targeted Agents',
    authors: 'N. Meyer, Y. Hao, X. Song, et al.',
    year: '2014',
    journal: 'International Journal of Breast Cancer',
    filename: 'healthcare_resources.pdf',
    localUrl: '/pdfs/healthcare_resources.pdf',
    doi: '10.1155/2014/475171',
    usedFor: ['public-health'],
    highlightNotes: [
      {
        section: 'Public Health',
        pages: '—',
        excerptHint: 'Healthcare utilization and costs by treatment type and MBC subgroups',
      },
      {
        section: 'Public Health',
        pages: '—',
        excerptHint: 'HER2-targeted therapy associated with highest outpatient and total costs',
      },
      {
        section: 'Public Health',
        pages: '—',
        excerptHint: 'Inpatient costs dominate for untreated patients; outpatient for treated',
      },
    ],
  },

  {
    id: 'ref-017',
    title:
      "'Omic approaches to preventing or managing metastatic breast cancer",
    authors: 'O.L. Griffith, J.W. Gray',
    year: '2011',
    journal: 'Breast Cancer Research',
    filename: 'prevention_strategies.pdf',
    localUrl: '/pdfs/prevention_strategies.pdf',
    doi: '10.1186/bcr2923',
    usedFor: ['public-health', 'biology'],
    highlightNotes: [
      {
        section: 'Public Health',
        pages: '—',
        excerptHint: 'Omic-signature-based screening for metastasis-prone breast cancers',
      },
      {
        section: 'Public Health',
        pages: '—',
        excerptHint: 'Limitations of mammographic screening for metastasis-prone lesions',
      },
      {
        section: 'Biology',
        pages: '—',
        excerptHint: 'Molecular features of metastasis-prone subtypes',
      },
    ],
  },
];


