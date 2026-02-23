'use client';

import Figure from '@/components/Figure';
import MultiLineTimeSeriesChart from '@/components/charts/MultiLineTimeSeriesChart';
import { useFigureData } from '@/lib/use-figure-data';
import { survivalByYearAndSubtypeData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function SurvivalByYearAndSubtypeFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/survivalByYearAndSubtype');
  const chartData = (data && data.length > 0 ? data : survivalByYearAndSubtypeData) as Record<string, unknown>[];

  return (
    <Figure
      title="Survival by Year of Diagnosis × Subtype"
      description="Effect of treatment advances on outcomes"
      externalSource={{ name: 'SEER', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Median survival by year of diagnosis and molecular subtype. SEER post-2010 subtype data."
      summary="Survival has improved over time across subtypes, with HER2+ showing the largest gains due to anti-HER2 therapies. TNBC improvements are smaller, highlighting the need for more effective targeted treatments."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Multi-line chart of survival by year and subtype">
          <MultiLineTimeSeriesChart
            data={chartData}
            xKey="year"
            series={[
              { key: 'her2', label: 'HER2+', color: '#3b82f6' },
              { key: 'hr', label: 'HR+', color: '#10b981' },
              { key: 'tnbc', label: 'TNBC', color: '#ef4444' },
            ]}
            xLabel="Year"
            yLabel="Median survival (months)"
          />
        </div>
      )}
    </Figure>
  );
}
