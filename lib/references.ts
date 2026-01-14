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
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-002',
    title: '[Title TBD from PDF]',
    filename: 'e026414.full.pdf',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-003',
    title: '[Title TBD from PDF]',
    filename: '809.pdf',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-004',
    title: '[Title TBD from PDF]',
    filename: 's43856-023-00304-x.pdf',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-005',
    title: '[Title TBD from PDF]',
    filename: 'Cancer - 2021 - Hendrick - Age distributions...',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-006',
    title: '[Title TBD from PDF]',
    filename: 's10549-018-4956-y.pdf',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-007',
    title: '[Title TBD from PDF]',
    filename: 'Cancer Medicine - 2018 - Xiao...',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-008',
    title: '[Title TBD from PDF]',
    filename: 's12672-025-02140-y.pdf',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-009',
    title: '[Title TBD from PDF]',
    filename: 'bcr1983.pdf',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-010',
    title: '[Title TBD from PDF]',
    filename: '2013-the-national-prevention-strategy...',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-011',
    title: '[Title TBD from PDF]',
    filename: 'PIIS2589537022000128.pdf',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-012',
    title: '[Title TBD from PDF]',
    filename: 'oncolo_19_6_608.pdf',
    usedFor: [],
    highlightNotes: [],
  },
  {
    id: 'ref-013',
    title: '[Title TBD from PDF]',
    filename: 'aging-13-202502.pdf',
    usedFor: [],
    highlightNotes: [],
  },
];

