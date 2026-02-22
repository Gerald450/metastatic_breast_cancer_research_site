'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function MBCIncidenceByAgeFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="MBC Incidence by Age Group"
      description="Stage IV incidence across age brackets"
      externalSource={{ name: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.name, url: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.url }}
      status="Draft"
      caption="Incidence rates by age from SEER and USCS. Count or rate per 100,000."
      summary="MBC incidence increases with age, peaking in older adults. The age distribution informs screening guidelines and resource allocation for different populations."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
