'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { survivalByTumorSubtypeData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function SurvivalByTumorSubtypeFigure() {
  const hasData = survivalByTumorSubtypeData.length > 0;

  return (
    <Figure
      title="Survival by Tumor Subtype"
      description="HER2+, HR+, TNBC survival"
      externalSource={{ name: 'SEER (post-2010 subtype)', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Median survival by molecular subtype. SEER hormone receptor and HER2 data (2010+)."
      summary="Molecular subtype strongly predicts MBC outcomes. HER2+ and HR+ subtypes have longer median survival due to targeted therapies; triple-negative breast cancer (TNBC) has the shortest survival and fewer treatment options."
    >
      {hasData ? (
        <div role="img" aria-label="Bar chart of survival by tumor subtype">
          <BarCategoryChart
            data={survivalByTumorSubtypeData}
            xKey="subtype"
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
