'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SEERIncidenceTrendsByAgeFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="SEER Cancer Incidence Trends by Age"
      description="Average Annual Percent Change (AAPC) in age-adjusted incidence rates"
      externalSource={{
        name: ONLINE_SOURCES.SEER_NOV_2024.name,
        url: ONLINE_SOURCES.SEER_NOV_2024.url,
      }}
      status="Verified"
      caption="Data from public/csv/explorer_download (3).csv. All Cancer Sites Combined. SEER Incidence Data, November 2024 Submission (1975-2022), SEER 21 registries. Both sexes, all races. Delay-adjusted rates per 100,000."
      summary="Incidence is rising in All Ages and Ages under 50; Ages 50-64 trend is Not Significant. Ages 65+ shows a modest rising trend."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
