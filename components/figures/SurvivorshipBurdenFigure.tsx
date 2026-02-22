'use client';

import Figure from '@/components/Figure';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SurvivorshipBurdenFigure() {
  return (
    <Figure
      title="Survivorship Burden"
      description="Prevalence and burden of MBC over time"
      status="Draft"
      caption={NO_DATA_MSG}
      summary="The number of people living with MBC has grown due to improved survival."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
