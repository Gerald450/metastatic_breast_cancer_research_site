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
      summary="This chart shows median survival over time, separately for HER2+, HR+, and TNBC (triple-negative) metastatic breast cancer—how outcomes have changed by subtype as treatments have evolved. We show it because gains are not uniform; anti-HER2 therapies transformed HER2+ disease, while TNBC has seen smaller improvements. Conclusion: survival has improved over time for all subtypes, with HER2+ showing the largest gains; TNBC improvements are more modest. What this means: targeted therapies have had a real impact where they exist, but developing better treatments for TNBC and other poor-prognosis subtypes remains a priority."
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
