'use client';

import Figure from '@/components/Figure';
import DotPlotChart from '@/components/charts/DotPlotChart';
import { useFigureData } from '@/lib/use-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function SEERIncidenceTrendsByAgeFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/incidence-trends-by-age'
  );
  const rawData = (data ?? []) as { ageGroup: string; yearRange: string; aapc: number }[];
  const chartData = rawData.filter((r) => r.yearRange === '2013-2022').map((r) => ({ ageGroup: r.ageGroup, aapc: r.aapc }));

  return (
    <Figure
      title="SEER Cancer Incidence Trends by Age"
      description="Average Annual Percent Change (AAPC) in age-adjusted incidence rates"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="All Cancer Sites Combined. SEER Incidence Data (txtData), November 2024. Age-adjusted rates per 100,000. AAPC 2013–2022 (2020 excluded from trend per SEER). Negative AAPC = declining incidence in that age group."
      summary="This chart shows the average annual percent change (AAPC) in cancer incidence by age group—whether new cases are rising or falling in each group. Negative values are correct: they mean incidence declined over the period in that age group. We show it because age-specific trends inform screening and resource planning and can signal shifts in risk or detection."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data. Run ingest:seer and ensure Incidence_by_age.txt is loaded.
        </div>
      ) : (
        <div role="img" aria-label="Dot plot of incidence AAPC by age group">
          <DotPlotChart
            data={chartData}
            categoryKey="ageGroup"
            valueKey="aapc"
            categoryLabel="Age group"
            valueLabel="AAPC (%)"
            showZeroLine
          />
        </div>
      )}
    </Figure>
  );
}
