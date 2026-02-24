'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { hrHer2NegTrendsByAgeData } from '@/lib/seer-subtypes-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

const fallbackData = hrHer2NegTrendsByAgeData.map((r) => ({
  ageGroup: r.subtype,
  aapc: r.aapc,
}));

export default function HRPlusHer2NegTrendsByAgeFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/incidence-trends-by-age'
  );
  const chartData = (data && data.length > 0 ? data : fallbackData) as Record<string, unknown>[];

  return (
    <Figure
      title="HR+/HER2- (Luminal A) Incidence Trends by Age"
      description="Average Annual Percent Change, 2013-2022"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="AAPC in incidence by age group. Data from SEER Research Data (txtData)."
      summary="Luminal A incidence trends by age group. Rising trends across groups when data available."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <div role="img" aria-label="Bar chart of HR+/HER2- incidence AAPC by age group">
          <BarCategoryChart
            data={chartData}
            xKey="ageGroup"
            yKey="aapc"
            xLabel="Age group"
            yLabel="AAPC (%)"
          />
        </div>
      )}
    </Figure>
  );
}
