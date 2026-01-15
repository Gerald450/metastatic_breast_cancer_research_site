export type Reference = {
  id: string;
  title: string;
  authors?: string;
  year?: string;
  journal?: string;
  filename: string; // exact uploaded filename
  localUrl?: string; // e.g., "/pdfs/pky062.pdf"
  usedFor: string[]; // site sections
  highlightNotes?: { section: string; pages?: string; excerptHint: string }[];
};

export const references: Reference[] = [
  {
    id: 'ref-001',
    title: '[Title TBD from PDF]',
    filename: 'pky062.pdf',
    localUrl: '/pdfs/Caswell_et_al.pdf', // DOI: 10.1093/jncics/pky062
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-002',
    title: '[Title TBD from PDF]',
    filename: 'e026414.full.pdf',
    localUrl: '/pdfs/Lord_et_ al.pdf', // DOI: bmjopen-2018-026414
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-003',
    title: '[Title TBD from PDF]',
    filename: '809.pdf',
    localUrl: '/pdfs/Jing _lu _et_al.pdf', // Matched by process of elimination
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-004',
    title: 'Future trends in incidence and long-term survival of metastatic cancer in the United States',
    authors: 'Nicholas L. Hudock',
    year: '2023',
    journal: 'Communications Medicine',
    filename: 's43856-023-00304-x.pdf',
    localUrl: '/pdfs/Hudock_et_al.pdf', // DOI: 10.1038/s43856-023-00304-x
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-005',
    title: '[Title TBD from PDF]',
    filename: 'Cancer - 2021 - Hendrick - Age distributions...',
    localUrl: '/pdfs/Hendrick_et_al.pdf', // DOI: 10.1002/cncr.33846
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-006',
    title: '[Title TBD from PDF]',
    filename: 's10549-018-4956-y.pdf',
    localUrl: '/pdfs/Bonotto_et_al.pdf', // DOI: 10.1634/theoncologist.2014-0002
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-007',
    title: '[Title TBD from PDF]',
    filename: 'Cancer Medicine - 2018 - Xiao...',
    localUrl: '/pdfs/Xiao_et_al.pdf', // DOI: 10.1002/cam4.1370
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-008',
    title: 'Decoding male breast cancer: epidemiological insights, cutting-edge treatments, and future perspectives',
    authors: 'Lei Zhao, Huijuan Cheng, Dongqiang He',
    year: '2025',
    journal: 'Discover Oncology',
    filename: 's12672-025-02140-y.pdf',
    localUrl: '/pdfs/Zhao_et_al.pdf', // DOI: 10.1007/s12672-025-02140-y
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-009',
    title: '[Title TBD from PDF]',
    filename: 'bcr1983.pdf',
    localUrl: '/pdfs/Robinson_et_al.pdf', // Matched by process of elimination
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-010',
    title: '[Title TBD from PDF]',
    filename: '2013-the-national-prevention-strategy...',
    localUrl: '/pdfs/Marcus_Plescia.pdf',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-011',
    title: '[Title TBD from PDF]',
    filename: 'PIIS2589537022000128.pdf',
    localUrl: '/pdfs/Huang_et_al.pdf', // Matched by process of elimination
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-012',
    title: '[Title TBD from PDF]',
    filename: 'oncolo_19_6_608.pdf',
    localUrl: '/pdfs/Thompson_et_al.pdf', // Matched by process of elimination
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-013',
    title: '[Title TBD from PDF]',
    filename: 'aging-13-202502.pdf',
    localUrl: '/pdfs/Jin‑Xiao_Ren_et_al.pdf', // Matched by process of elimination
    usedFor: [],
    highlightNotes: [],
  },
];

