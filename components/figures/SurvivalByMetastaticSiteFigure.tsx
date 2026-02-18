'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { survivalByMetastaticSiteData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function SurvivalByMetastaticSiteFigure() {
  const hasData = survivalByMetastaticSiteData.length > 0;

  return (
    <Figure
      title="Survival by Metastatic Site"
      description="Survival for bone, lung, liver, brain"
      externalSource={{ name: 'SEER (site variables) / Kaggle', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Median survival by metastatic site from SEER. Site-specific variables."
      summary="Survival varies by metastatic site: bone-only metastases generally have better outcomes than visceral sites. Brain and liver metastases are associated with shorter survival, reflecting disease aggressiveness and limited treatment options."
    >
      {hasData ? (
        <div role="img" aria-label="Bar chart of survival by metastatic site">
          <BarCategoryChart
            data={survivalByMetastaticSiteData}
            xKey="site"
            yKey="survivalMonths"
            xLabel="Metastatic site"
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
