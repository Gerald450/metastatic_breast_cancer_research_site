'use client';

import Figure from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { useFigureData } from '@/lib/use-figure-data';
import { mbcSurvivalOverTimeData } from '@/lib/mbc-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function MBCSurvivalOverTimeFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/seer/charts/survival-by-year');
  const chartData = (data && data.length > 0 ? data : mbcSurvivalOverTimeData) as Record<string, unknown>[];

  return (
    <Figure
      title="MBC Survival Over Time"
      description="5-year relative survival by diagnosis year"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="5-year relative survival by year of diagnosis. SEER metastatic breast cancer (distant stage)."
      summary="This line chart plots 5-year relative survival for metastatic breast cancer by year of diagnosis—whether outcomes have improved over time. We track this because it reflects the impact of new drugs, earlier diagnosis, and better care; rising survival is a key measure of progress. Conclusion: survival for MBC has improved over the years, consistent with advances in targeted therapies and combination regimens. What this means: continued investment in research and access to modern treatments is paying off for patients, though MBC remains incurable and further gains are needed."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Line chart of 5-year relative survival by year">
          <LineTimeSeriesChart data={chartData} xKey="year" yKey="relativeSurvivalPercent" xLabel="Year" yLabel="5-year relative survival (%)" />
        </div>
      )}
    </Figure>
  );
}
