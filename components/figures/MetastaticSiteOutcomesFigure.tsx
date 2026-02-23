'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { survivalByMetastaticSiteData } from '@/lib/mbc-figure-data';

export default function MetastaticSiteOutcomesFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/survivalByMetastaticSite');
  const chartData = (data && data.length > 0 ? data : survivalByMetastaticSiteData) as Record<string, unknown>[];

  return (
    <Figure
      title="Outcomes by Metastatic Site"
      description="Survival and outcomes by site of metastasis"
      status="Draft"
      caption="Median survival by metastatic site from SEER. Site-specific variables."
      summary="Outcomes vary by metastatic site—bone, liver, brain, lung."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Bar chart of median survival by metastatic site">
          <BarCategoryChart data={chartData} xKey="site" yKey="survivalMonths" xLabel="Metastatic site" yLabel="Median survival (months)" />
        </div>
      )}
    </Figure>
  );
}
