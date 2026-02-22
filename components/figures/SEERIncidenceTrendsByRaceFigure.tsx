'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SEERIncidenceTrendsByRaceFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="SEER Cancer Incidence Trends by Race/Ethnicity"
      description="Average Annual Percent Change (AAPC) in age-adjusted incidence rates"
      externalSource={{
        name: ONLINE_SOURCES.SEER_NOV_2024.name,
        url: ONLINE_SOURCES.SEER_NOV_2024.url,
      }}
      status="Verified"
      caption="Data from public/csv/explorer_download (2).csv. All Cancer Sites Combined. SEER Incidence Data, November 2024 Submission (1975-2022), SEER 21 registries. Delay-adjusted rates per 100,000, age-adjusted to 2000 US Std Population. Joinpoint Trend Analysis."
      summary="Recent 10-year (2013-2022) and 5-year (2018-2022) incidence trends are rising for most race/ethnicity groups. Non-Hispanic Black showed Not Significant trend for 2013-2022 but Rising for 2018-2022."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
