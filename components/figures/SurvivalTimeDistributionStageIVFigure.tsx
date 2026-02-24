'use client';

import Figure from '@/components/Figure';
import BoxPlotChart from '@/components/charts/BoxPlotChart';
import { useFigureData } from '@/lib/use-figure-data';
import { survivalTimeDistributionStageIVData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function SurvivalTimeDistributionStageIVFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/survivalTimeDistributionStageIV');
  const chartData = (data && data.length > 0 ? data : survivalTimeDistributionStageIVData) as { category: string; min: number; q1: number; median: number; q3: number; max: number }[];

  return (
    <Figure
      title="Survival Time Distribution (Stage IV)"
      description="Spread of survival months by metastatic site"
      externalSource={{ name: 'SEER / Kaggle', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Box plot of survival months by site. Min, Q1, median, Q3, max from SEER or study data."
      summary="This box plot shows the distribution of survival time (months) by metastatic site—the spread from shortest to longest survival within each site group, not just the median. We show it because variability matters: some patients do much better or worse than the median, and that range differs by site. Conclusion: survival varies widely within each site; bone-only disease often has the widest range and longest tail, while brain metastases tend to have a shorter, more compressed distribution. What this means: prognosis by site is a distribution, not a single number; counseling and research should account for this variability, and identifying who does better or worse within each site can inform personalized care."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Box plot of survival months by metastatic site">
          <BoxPlotChart data={chartData} xLabel="Metastatic site" yLabel="Survival (months)" />
        </div>
      )}
    </Figure>
  );
}
