'use client';

import Figure from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { breastCancerMortalityRatesData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function BreastCancerMortalityRatesFigure() {
  const chartData = breastCancerMortalityRatesData;

  return (
    <Figure
      title="Breast Cancer Mortality Rates Over Time"
      description="Death rates per 100,000 by year"
      externalSource={{ name: 'Reference data', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Age-adjusted mortality rates. Reference data from published sources."
      summary="Breast cancer mortality has declined over time, indicating earlier detection and better treatment. However, MBC remains largely incurable, and mortality improvements for metastatic disease are more modest."
    >
      <div role="img" aria-label="Line chart of breast cancer mortality rate per 100,000 by year">
        <LineTimeSeriesChart data={chartData} xKey="year" yKey="ratePer100k" xLabel="Year" yLabel="Rate per 100,000" />
      </div>
    </Figure>
  );
}
