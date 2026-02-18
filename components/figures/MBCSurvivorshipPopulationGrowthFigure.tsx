'use client';

import Figure from '@/components/Figure';
import AreaTimeSeriesChart from '@/components/charts/AreaTimeSeriesChart';
import { mbcSurvivorshipPopulationGrowthData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function MBCSurvivorshipPopulationGrowthFigure() {
  const hasData = mbcSurvivorshipPopulationGrowthData.length > 0;

  return (
    <Figure
      title="Growth of MBC Survivorship Population"
      description="Estimated number of people living with MBC over time"
      externalSource={{ name: 'SEER + Mariotto-style / USCS', url: ONLINE_SOURCES.USCS.url }}
      status="Draft"
      caption="Estimated prevalence from SEER and USCS. Mariotto et al. methodology for burden projections."
      summary="The number of people living with MBC is rising steadily due to improved survival. This growing survivorship population underscores the need for long-term care, monitoring, and support services."
    >
      {hasData ? (
        <div role="img" aria-label="Area chart of people living with MBC by year">
          <AreaTimeSeriesChart
            data={mbcSurvivorshipPopulationGrowthData}
            xKey="year"
            yKey="prevalence"
            xLabel="Year"
            yLabel="People living with MBC"
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
