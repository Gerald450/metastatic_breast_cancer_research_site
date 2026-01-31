'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { stateLevelBreastCancerMortalityData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function StateLevelBreastCancerMortalityFigure() {
  const hasData = stateLevelBreastCancerMortalityData.length > 0;

  return (
    <Figure
      title="State-Level Breast Cancer Mortality"
      description="Mortality rates by U.S. state"
      externalSource={{ name: 'CDC WONDER / USCS', url: ONLINE_SOURCES.CDC_WONDER.url }}
      status="Draft"
      caption="Age-adjusted breast cancer mortality rates per 100,000 by state. CDC WONDER and USCS."
      summary="Mortality rates vary by state, reflecting disparities in screening, access to care, and population risk factors. Higher rates in some states point to opportunities for targeted public health interventions."
    >
      {hasData ? (
        <div role="img" aria-label="Bar chart of breast cancer mortality rate by state">
          <BarCategoryChart
            data={stateLevelBreastCancerMortalityData}
            xKey="state"
            yKey="ratePer100k"
            yLabel="Rate per 100,000"
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
