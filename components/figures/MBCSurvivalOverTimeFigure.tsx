'use client';

import Figure from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { mbcSurvivalOverTimeData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function MBCSurvivalOverTimeFigure() {
  const hasData = mbcSurvivalOverTimeData.length > 0;

  return (
    <Figure
      title="MBC Survival Over Time"
      description="Median or overall survival trends by diagnosis year"
      externalSource={{ name: 'SEER', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Data from SEER (stage at diagnosis). Verify against SEER*Stat queries for metastatic breast cancer."
    >
      {hasData ? (
        <div role="img" aria-label="Line chart of MBC survival in months by year of diagnosis">
          <LineTimeSeriesChart
            data={mbcSurvivalOverTimeData}
            xKey="year"
            yKey="survivalMonths"
            yLabel="Survival (months)"
          />
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data available for this figure yet.
        </div>
      )}
    </Figure>
  );
}
