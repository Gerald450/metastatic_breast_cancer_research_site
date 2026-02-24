'use client';

import Figure from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { useFigureData } from '@/lib/use-figure-data';
import { mbcSurvivorshipPopulationGrowthData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function MBCSurvivorshipPopulationGrowthFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/mbcSurvivorshipPopulationGrowth');
  const chartData = (data && data.length > 0 ? data : mbcSurvivorshipPopulationGrowthData) as Record<string, unknown>[];

  return (
    <Figure
      title="Growth of MBC Survivorship Population"
      description="Estimated number of people living with MBC over time"
      externalSource={{ name: 'SEER + Mariotto-style / USCS', url: ONLINE_SOURCES.USCS.url }}
      status="Draft"
      caption="Estimated prevalence from SEER and USCS. Mariotto et al. methodology for burden projections."
      summary="This graph plots the estimated number of people living with metastatic breast cancer over time—the growth of the MBC survivorship population. We show it because MBC is increasingly managed as a chronic condition; the size of this population drives demand for follow-up care and support. Conclusion: the number of people living with MBC has risen steadily, driven by better survival. What this means: health systems and advocates must plan for long-term monitoring, survivorship care, and psychosocial and financial support for a growing cohort of patients living with MBC."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Line chart of MBC prevalence by year">
          <LineTimeSeriesChart data={chartData} xKey="year" yKey="prevalence" xLabel="Year" yLabel="Prevalence" />
        </div>
      )}
    </Figure>
  );
}
