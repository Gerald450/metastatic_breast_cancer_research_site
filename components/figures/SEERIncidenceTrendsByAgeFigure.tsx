'use client';

import { useMemo } from 'react';
import Figure from '@/components/Figure';
import GroupedBarChart from '@/components/charts/GroupedBarChart';
import { seerIncidenceTrendsByAgeData } from '@/lib/seer-csv-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const series = [
  { key: 'aapc2013', label: '2013-2022 AAPC (%)' },
  { key: 'aapc2018', label: '2018-2022 AAPC (%)' },
];

export default function SEERIncidenceTrendsByAgeFigure() {
  const chartData = useMemo(() => {
    const byGroup = new Map<string, { group: string; aapc2013?: number; aapc2018?: number }>();
    for (const row of seerIncidenceTrendsByAgeData) {
      if (!byGroup.has(row.group)) {
        byGroup.set(row.group, { group: row.group });
      }
      const entry = byGroup.get(row.group)!;
      if (row.yearRange === '2013-2022') entry.aapc2013 = row.aapc;
      if (row.yearRange === '2018-2022') entry.aapc2018 = row.aapc;
    }
    return Array.from(byGroup.values());
  }, []);

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
      <div role="img" aria-label="Grouped bar chart of AAPC by age group">
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
