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
      summary="This line chart shows age-adjusted breast cancer mortality rates (deaths per 100,000) over time—whether fewer people are dying from breast cancer as years go by. We show it because declining mortality is a key measure of progress from screening and treatment. Conclusion: overall breast cancer mortality has declined over time, consistent with earlier detection and better therapies; improvements for metastatic disease are more modest. What this means: gains are real but not equally shared; continued focus on MBC-specific treatments and equitable access is needed to extend progress to metastatic patients."
    >
      <div role="img" aria-label="Line chart of breast cancer mortality rate per 100,000 by year">
        <LineTimeSeriesChart data={chartData} xKey="year" yKey="ratePer100k" xLabel="Year" yLabel="Rate per 100,000" />
      </div>
    </Figure>
  );
}
