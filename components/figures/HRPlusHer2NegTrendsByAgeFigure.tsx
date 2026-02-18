'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { hrHer2NegTrendsByAgeData } from '@/lib/seer-subtypes-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const SUBTYPES_SOURCE = ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST;

const chartData = hrHer2NegTrendsByAgeData.map((row) => ({
  ageGroup: row.subtype,
  aapc: row.aapc,
}));

export default function HRPlusHer2NegTrendsByAgeFigure() {
  return (
    <Figure
      title="HR+/HER2- (Luminal A) Incidence Trends by Age"
      description="Average Annual Percent Change, 2013-2022"
      externalSource={{ name: SUBTYPES_SOURCE.name, url: SUBTYPES_SOURCE.url }}
      status="Verified"
      caption="Data from public/csv/Subtypes/explorer_download (2).csv. HR+/HER2- breast cancer incidence is rising across all age groups, with the steepest increase in women under 50 (2.6% per year)."
      summary="Luminal A incidence trends are rising in all age groups, with the highest AAPC in Ages under 50 (2.6%)."
    >
      <div role="img" aria-label="Bar chart of HR+/HER2- AAPC by age group">
        <BarCategoryChart
          data={chartData}
          xKey="ageGroup"
          yKey="aapc"
          xLabel="Age group"
          yLabel="AAPC (%)"
        />
      </div>
    </Figure>
  );
}
