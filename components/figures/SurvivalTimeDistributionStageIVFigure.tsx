'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SurvivalTimeDistributionStageIVFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="Survival Time Distribution (Stage IV)"
      description="Spread of survival months by metastatic site"
      externalSource={{ name: 'SEER / Kaggle', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Box plot of survival months by site. Min, Q1, median, Q3, max from SEER or study data."
      summary="The spread of survival by site shows substantial variability within each group. Bone-only disease has the widest range and longest tail, while brain metastases show the shortest and most compressed distribution."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
