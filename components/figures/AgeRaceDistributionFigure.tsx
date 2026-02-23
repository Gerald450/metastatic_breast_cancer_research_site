'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { mbcIncidenceByAgeData } from '@/lib/mbc-figure-data';

export default function AgeRaceDistributionFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/mbcIncidenceByAge');
  const chartData = (data && data.length > 0 ? data : mbcIncidenceByAgeData) as Record<string, unknown>[];

  return (
    <Figure
      title="Demographics: Age and Race"
      description="Distribution of MBC by age and race/ethnicity"
      status="Draft"
      caption="Incidence rates by age from SEER and USCS. Count or rate per 100,000."
      summary="Demographic patterns inform screening and resource allocation."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Bar chart of MBC incidence by age group">
          <BarCategoryChart data={chartData} xKey="ageGroup" yKey="incidence" xLabel="Age group" yLabel="Incidence" />
        </div>
      )}
    </Figure>
  );
}
