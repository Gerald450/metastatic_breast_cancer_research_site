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
      summary="This graph shows median survival (months) for metastatic breast cancer by race/ethnicity—whether outcomes differ by group. We show it because survival gaps by race are well documented and reflect inequities that are partly addressable. Conclusion: Black patients often experience shorter median survival than White patients; the gap likely reflects a mix of biology, access to care, treatment delays, and comorbidities. What this means: closing these gaps requires equitable access to screening, timely treatment, clinical trials, and supportive care, as well as research into biological and social determinants of disparity."
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
