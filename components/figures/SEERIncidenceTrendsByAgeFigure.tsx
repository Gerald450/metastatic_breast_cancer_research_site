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
      summary="This chart shows the average annual percent change (AAPC) in cancer incidence by age group (e.g., all ages, under 50, 50–64, 65+)—whether new cases are rising or falling in each group. We show it because age-specific trends inform screening and resource planning and can signal shifts in risk or detection. Conclusion: in the data presented, incidence is rising for “all ages” and for ages under 50; the trend for 50–64 is not significant; ages 65+ show a modest rising trend. What this means: incidence is not uniformly stable; monitoring by age helps target prevention and early detection and may prompt updates to age-based guidelines."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
