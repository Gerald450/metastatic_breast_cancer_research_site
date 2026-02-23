'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { stateLevelBreastCancerMortalityData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function StateLevelBreastCancerMortalityFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/stateLevelBreastCancerMortality');
  const chartData = (data && data.length > 0 ? data : stateLevelBreastCancerMortalityData) as Record<string, unknown>[];

  return (
    <Figure
      title="State-Level Breast Cancer Mortality"
      description="Mortality rates by U.S. state"
      externalSource={{ name: 'Reference data', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Age-adjusted breast cancer mortality rates per 100,000 by state. Reference data."
      summary="Mortality rates vary by state, reflecting disparities in screening, access to care, and population risk factors."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Bar chart of breast cancer mortality rate by state">
          <BarCategoryChart data={chartData} xKey="state" yKey="ratePer100k" xLabel="State" yLabel="Rate per 100,000" />
        </div>
      )}
    </Figure>
  );
}
