'use client';

import Figure from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { useFigureData } from '@/lib/use-figure-data';
import { mbcSurvivorshipPopulationGrowthData } from '@/lib/mbc-figure-data';

export default function SurvivorshipBurdenFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/mbcSurvivorshipPopulationGrowth');
  const chartData = (data && data.length > 0 ? data : mbcSurvivorshipPopulationGrowthData) as Record<string, unknown>[];

  return (
    <Figure
      title="Survivorship Burden"
      description="Prevalence and burden of MBC over time"
      status="Draft"
      caption="Estimated prevalence from SEER and USCS. Mariotto et al. methodology for burden projections."
      summary="This graph plots the estimated number of people living with metastatic breast cancer (prevalence) over time—the “survivorship burden.” We show it because MBC is increasingly a chronic condition; more people are living longer with the disease, which has implications for healthcare systems and support services. Conclusion: the population living with MBC has grown steadily, driven by improved survival. What this means: health systems and policymakers need to plan for long-term care, monitoring, and psychosocial support for a growing number of people living with MBC."
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
