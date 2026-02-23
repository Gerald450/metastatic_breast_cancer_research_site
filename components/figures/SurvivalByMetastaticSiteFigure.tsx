'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { survivalByMetastaticSiteData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function SurvivalByMetastaticSiteFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/survivalByMetastaticSite');
  const chartData = (data && data.length > 0 ? data : survivalByMetastaticSiteData) as Record<string, unknown>[];

  return (
    <Figure
      title="Survival by Metastatic Site"
      description="Survival for bone, lung, liver, brain"
      externalSource={{ name: 'SEER (site variables) / Kaggle', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Median survival by metastatic site from SEER. Site-specific variables."
      summary="Survival varies by metastatic site: bone-only metastases generally have better outcomes than visceral sites. Brain and liver metastases are associated with shorter survival, reflecting disease aggressiveness and limited treatment options."
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
