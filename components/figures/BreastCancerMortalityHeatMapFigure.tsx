'use client';

import Figure from '@/components/Figure';
import StateHeatMapChart from '@/components/charts/StateHeatMapChart';
import { breastCancerMortalityHeatMapData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function BreastCancerMortalityHeatMapFigure() {
  const hasData = breastCancerMortalityHeatMapData.length > 0;

  return (
    <Figure
      title="Breast Cancer Mortality by State"
      description="Geographic intensity of mortality"
      externalSource={{ name: 'CDC WONDER', url: ONLINE_SOURCES.CDC_WONDER.url }}
      status="Draft"
      caption="Color intensity reflects age-adjusted mortality rate per 100,000. CDC WONDER."
      summary="Geographic patterns highlight states with higher breast cancer mortality. Hotspots may correlate with rurality, poverty, insurance gaps, or lower screening uptake—useful for prioritizing resources and outreach."
    >
      {hasData ? (
        <div role="img" aria-label="Heat map of breast cancer mortality by U.S. state">
          <StateHeatMapChart
            data={breastCancerMortalityHeatMapData}
            valueLabel="Rate per 100,000"
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
