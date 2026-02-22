'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { mbcSurvivalByRaceData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function MBCSurvivalByRaceFigure() {
  const chartData = mbcSurvivalByRaceData;

  return (
    <Figure
      title="MBC Survival by Race/Ethnicity"
      description="Median survival by race"
      externalSource={{ name: 'SEER', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Survival disparities by race. Reference data."
      summary="Significant survival disparities exist by race, with Black patients often experiencing shorter median survival. These gaps likely reflect differences in biology, access to care, treatment delays, and comorbidities."
    >
      <div role="img" aria-label="Bar chart of median survival by race">
        <BarCategoryChart
          data={chartData}
          xKey="race"
          yKey="survivalMonths"
          xLabel="Race"
          yLabel="Median survival (months)"
        />
      </div>
    </Figure>
  );
}
