'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SurvivalByYearAndSubtypeFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="Survival by Year of Diagnosis × Subtype"
      description="Effect of treatment advances on outcomes"
      externalSource={{ name: 'SEER', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Median survival by year of diagnosis and molecular subtype. SEER post-2010 subtype data."
      summary="Survival has improved over time across subtypes, with HER2+ showing the largest gains due to anti-HER2 therapies. TNBC improvements are smaller, highlighting the need for more effective targeted treatments."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
