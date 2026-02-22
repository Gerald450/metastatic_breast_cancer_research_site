'use client';

import Figure from '@/components/Figure';
import StateHeatMapChart from '@/components/charts/StateHeatMapChart';
import { breastCancerMortalityHeatMapData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function BreastCancerMortalityHeatMapFigure() {
  const chartData = breastCancerMortalityHeatMapData;

  return (
    <Figure
      title="Breast Cancer Mortality by State"
      description="Geographic intensity of mortality"
      externalSource={{ name: 'Reference data', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Color intensity reflects age-adjusted mortality rate per 100,000. Reference data."
      summary="Geographic patterns highlight states with higher breast cancer mortality."
    >
      <div role="img" aria-label="Heat map of breast cancer mortality by U.S. state">
        <StateHeatMapChart data={chartData} valueLabel="Rate per 100,000" />
      </div>
    </Figure>
  );
}
