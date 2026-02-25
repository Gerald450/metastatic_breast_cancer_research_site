'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
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
      caption="All Cancer Sites Combined. SEER Incidence Data (txtData), November 2024. Age-adjusted rates per 100,000. AAPC 2013-2022."
      summary="This chart shows the average annual percent change (AAPC) in cancer incidence by age group—whether new cases are rising or falling in each group. We show it because age-specific trends inform screening and resource planning and can signal shifts in risk or detection. Incidence is not uniformly stable; monitoring by age helps target prevention and early detection and may prompt updates to age-based guidelines."
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
        <div role="img" aria-label="Bar chart of incidence AAPC by age group">
          <BarCategoryChart
            data={chartData}
            xKey="ageGroup"
            yKey="aapc"
            xLabel="Age group"
            yLabel="AAPC (%)"
          />
        </div>
      )}
    </Figure>
  );
}
