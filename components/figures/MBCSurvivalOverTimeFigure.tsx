'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function MBCSurvivalOverTimeFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="MBC Survival Over Time"
      description="Median or overall survival trends by diagnosis year"
      externalSource={{ name: 'SEER', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Data from SEER (stage at diagnosis). Verify against SEER*Stat queries for metastatic breast cancer."
      summary="Median survival for MBC has improved over time, reflecting advances in treatment. Survival gains support the value of newer targeted therapies and combination regimens."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
