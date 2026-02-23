'use client';

import Figure from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { useFigureData } from '@/lib/use-figure-data';
import { mbcSurvivalOverTimeData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function MBCSurvivalOverTimeFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/mbcSurvivalOverTime');
  const chartData = (data && data.length > 0 ? data : mbcSurvivalOverTimeData) as Record<string, unknown>[];

  return (
    <Figure
      title="MBC Survival Over Time"
      description="Median or overall survival trends by diagnosis year"
      externalSource={{ name: 'SEER', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Data from SEER (stage at diagnosis). Verify against SEER*Stat queries for metastatic breast cancer."
      summary="Median survival for MBC has improved over time, reflecting advances in treatment. Survival gains support the value of newer targeted therapies and combination regimens."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Line chart of MBC survival months by year">
          <LineTimeSeriesChart data={chartData} xKey="year" yKey="survivalMonths" xLabel="Year" yLabel="Median survival (months)" />
        </div>
      )}
    </Figure>
  );
}
