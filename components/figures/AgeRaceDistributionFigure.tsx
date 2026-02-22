'use client';

import Figure from '@/components/Figure';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function AgeRaceDistributionFigure() {
  return (
    <Figure
      title="Demographics: Age and Race"
      description="Distribution of MBC by age and race/ethnicity"
      status="Draft"
      caption={NO_DATA_MSG}
      summary="Demographic patterns inform screening and resource allocation."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
