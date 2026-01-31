'use client';

import Figure from '@/components/Figure';
import BoxPlotChart from '@/components/charts/BoxPlotChart';
import { survivalTimeDistributionStageIVData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function SurvivalTimeDistributionStageIVFigure() {
  const hasData = survivalTimeDistributionStageIVData.length > 0;

  return (
    <Figure
      title="Survival Time Distribution (Stage IV)"
      description="Spread of survival months by metastatic site"
      externalSource={{ name: 'SEER / Kaggle', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Box plot of survival months by site. Min, Q1, median, Q3, max from SEER or study data."
      summary="The spread of survival by site shows substantial variability within each group. Bone-only disease has the widest range and longest tail, while brain metastases show the shortest and most compressed distribution."
    >
      {hasData ? (
        <div role="img" aria-label="Box plot of survival time distribution by metastatic site">
          <BoxPlotChart
            data={survivalTimeDistributionStageIVData}
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
