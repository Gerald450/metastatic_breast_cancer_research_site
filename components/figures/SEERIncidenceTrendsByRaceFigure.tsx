'use client';

import { useMemo } from 'react';
import Figure from '@/components/Figure';
import GroupedBarChart from '@/components/charts/GroupedBarChart';
import { seerIncidenceTrendsByRaceData } from '@/lib/seer-csv-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const series = [
  { key: 'aapc2013', label: '2013-2022 AAPC (%)' },
  { key: 'aapc2018', label: '2018-2022 AAPC (%)' },
];

export default function SEERIncidenceTrendsByRaceFigure() {
  const chartData = useMemo(() => {
    const byGroup = new Map<string, { group: string; aapc2013?: number; aapc2018?: number }>();
    for (const row of seerIncidenceTrendsByRaceData) {
      const label = row.group.replace('Non-Hispanic ', 'NH ');
      if (!byGroup.has(label)) {
        byGroup.set(label, { group: label });
      }
      const entry = byGroup.get(label)!;
      if (row.yearRange === '2013-2022') entry.aapc2013 = row.aapc;
      if (row.yearRange === '2018-2022') entry.aapc2018 = row.aapc;
    }
    return Array.from(byGroup.values());
  }, []);

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
      <div role="img" aria-label="Grouped bar chart of AAPC by race/ethnicity">
        <GroupedBarChart
          data={chartData}
          xKey="group"
          series={series}
          yLabel="AAPC (%)"
        />
      </div>
    </Figure>
  );
}
