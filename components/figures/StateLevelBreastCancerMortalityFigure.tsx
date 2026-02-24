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
      summary="This chart shows age-adjusted breast cancer mortality rates by U.S. state—where death rates are higher or lower across the country. We show it because geography reflects differences in screening, access to care, and population risk; identifying high-burden states can target resources. Conclusion: mortality rates vary meaningfully by state, with some regions showing consistently higher or lower rates. What this means: state and regional efforts to improve screening, treatment access, and equity could help reduce mortality in higher-burden areas and narrow geographic disparities."
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
