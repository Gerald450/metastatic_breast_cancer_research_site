'use client';

import Figure from '@/components/Figure';
import MultiLineTimeSeriesChart from '@/components/charts/MultiLineTimeSeriesChart';
import { survivalByYearAndSubtypeData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const series = [
  { key: 'her2', label: 'HER2+' },
  { key: 'hr', label: 'HR+' },
  { key: 'tnbc', label: 'TNBC' },
];

export default function SurvivalByYearAndSubtypeFigure() {
  const hasData = survivalByYearAndSubtypeData.length > 0;

  return (
    <Figure
      title="Survival by Year of Diagnosis × Subtype"
      description="Effect of treatment advances on outcomes"
      externalSource={{ name: 'SEER', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Median survival by year of diagnosis and molecular subtype. SEER post-2010 subtype data."
      summary="Survival has improved over time across subtypes, with HER2+ showing the largest gains due to anti-HER2 therapies. TNBC improvements are smaller, highlighting the need for more effective targeted treatments."
    >
      {hasData ? (
        <div role="img" aria-label="Multi-line chart of survival by year and subtype">
          <MultiLineTimeSeriesChart
            data={survivalByYearAndSubtypeData}
            xKey="year"
            series={series}
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
