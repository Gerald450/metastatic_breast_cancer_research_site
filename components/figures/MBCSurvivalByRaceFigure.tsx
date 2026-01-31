'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { mbcSurvivalByRaceData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function MBCSurvivalByRaceFigure() {
  const hasData = mbcSurvivalByRaceData.length > 0;

  return (
    <Figure
      title="MBC Survival by Race/Ethnicity"
      description="Median or 5-year survival by race"
      externalSource={{ name: 'SEER', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Survival disparities by race from SEER. Median survival in months."
    >
      {hasData ? (
        <div role="img" aria-label="Bar chart of MBC survival by race/ethnicity">
          <BarCategoryChart
            data={mbcSurvivalByRaceData}
            xKey="race"
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
