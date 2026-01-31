'use client';

import Figure from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { breastCancerMortalityRatesData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function BreastCancerMortalityRatesFigure() {
  const hasData = breastCancerMortalityRatesData.length > 0;

  return (
    <Figure
      title="Breast Cancer Mortality Rates Over Time"
      description="Death rates per 100,000 by year"
      externalSource={{ name: 'CDC WONDER', url: ONLINE_SOURCES.CDC_WONDER.url }}
      status="Draft"
      caption="Age-adjusted mortality rates from CDC WONDER. Verify year range and ICD codes."
      summary="Breast cancer mortality has declined over time, indicating earlier detection and better treatment. However, MBC remains largely incurable, and mortality improvements for metastatic disease are more modest."
    >
      {hasData ? (
        <div role="img" aria-label="Line chart of breast cancer mortality rate per 100,000 by year">
          <LineTimeSeriesChart
            data={breastCancerMortalityRatesData}
            xKey="year"
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
