'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { mbcSurvivalByRaceData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function MBCSurvivalByRaceFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/mbcSurvivalByRace');
  const chartData = (data && data.length > 0 ? data : mbcSurvivalByRaceData) as Record<string, unknown>[];

  return (
    <Figure
      title="MBC Survival by Race/Ethnicity"
      description="Median survival by race"
      externalSource={{ name: 'SEER', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Survival disparities by race. Reference data."
      summary="Significant survival disparities exist by race, with Black patients often experiencing shorter median survival. These gaps likely reflect differences in biology, access to care, treatment delays, and comorbidities."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Bar chart of median survival by race">
          <BarCategoryChart
          data={chartData}
          xKey="race"
          yKey="survivalMonths"
          xLabel="Race"
          yLabel="Median survival (months)"
        />
        </div>
      )}
    </Figure>
  );
}
