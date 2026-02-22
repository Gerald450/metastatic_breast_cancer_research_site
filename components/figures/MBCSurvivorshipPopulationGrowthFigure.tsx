'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function MBCSurvivorshipPopulationGrowthFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="Growth of MBC Survivorship Population"
      description="Estimated number of people living with MBC over time"
      externalSource={{ name: 'SEER + Mariotto-style / USCS', url: ONLINE_SOURCES.USCS.url }}
      status="Draft"
      caption="Estimated prevalence from SEER and USCS. Mariotto et al. methodology for burden projections."
      summary="The number of people living with MBC is rising steadily due to improved survival. This growing survivorship population underscores the need for long-term care, monitoring, and support services."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
