'use client';

import Figure from '@/components/Figure';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function MetastaticSiteOutcomesFigure() {
  return (
    <Figure
      title="Outcomes by Metastatic Site"
      description="Survival and outcomes by site of metastasis"
      status="Draft"
      caption={NO_DATA_MSG}
      summary="Outcomes vary by metastatic site—bone, liver, brain, lung."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
