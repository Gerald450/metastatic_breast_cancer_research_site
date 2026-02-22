'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SurvivalByTumorSubtypeFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="Survival by Tumor Subtype"
      description="HER2+, HR+, TNBC survival"
      externalSource={{ name: 'SEER (post-2010 subtype)', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Median survival by molecular subtype. SEER hormone receptor and HER2 data (2010+)."
      summary="Molecular subtype strongly predicts MBC outcomes. HER2+ and HR+ subtypes have longer median survival due to targeted therapies; triple-negative breast cancer (TNBC) has the shortest survival and fewer treatment options."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
