'use client';

import Figure from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { useFigureData } from '@/lib/use-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function SurvivalTrendsFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/survival-by-year'
  );
  const chartData = (data ?? []) as { year: string; relativeSurvivalPercent: number | null }[];

  return (
    <Figure
      title="Survival Trends Over Time"
      description="5-year relative survival by year of diagnosis (distant/metastatic stage)"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="Data from SEER Research Data (survival_trends_overtime.txt or median_survival_by_year.txt). 5-year relative survival for distant-stage breast cancer by diagnosis year."
      summary="This chart shows 5-year relative survival for metastatic breast cancer by year of diagnosis—whether outcomes have improved over time. Rising survival reflects the impact of new drugs and better care. Tracking survival over time helps quantify progress and identify where further improvement is needed."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data. Run ingest:seer and ensure survival_trends_overtime.txt or median_survival_by_year.txt is loaded.
        </div>
      ) : (
        <div role="img" aria-label="Line chart of 5-year survival trends over time">
          <LineTimeSeriesChart
            data={chartData}
            xKey="year"
            yKey="relativeSurvivalPercent"
            xLabel="Year of diagnosis"
            yLabel="5-year relative survival (%)"
          />
        </div>
      )}
    </Figure>
  );
}
