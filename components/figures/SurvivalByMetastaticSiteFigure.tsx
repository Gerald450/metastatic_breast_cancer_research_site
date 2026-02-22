'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SurvivalByMetastaticSiteFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="Survival by Metastatic Site"
      description="Survival for bone, lung, liver, brain"
      externalSource={{ name: 'SEER (site variables) / Kaggle', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Median survival by metastatic site from SEER. Site-specific variables."
      summary="Survival varies by metastatic site: bone-only metastases generally have better outcomes than visceral sites. Brain and liver metastases are associated with shorter survival, reflecting disease aggressiveness and limited treatment options."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
