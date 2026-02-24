'use client';

import Figure from '@/components/Figure';
import StateHeatMapChart from '@/components/charts/StateHeatMapChart';
import { useFigureData } from '@/lib/use-figure-data';
import { breastCancerMortalityHeatMapData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function BreastCancerMortalityHeatMapFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/breastCancerMortalityHeatMap');
  const chartData = (data && data.length > 0 ? data : breastCancerMortalityHeatMapData) as { state: string; rate: number }[];

  return (
    <Figure
      title="Breast Cancer Mortality by State"
      description="Geographic intensity of mortality"
      externalSource={{ name: 'Reference data', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Color intensity reflects age-adjusted mortality rate per 100,000. Reference data."
      summary="This heat map shades U.S. states by age-adjusted breast cancer mortality rate—darker or more intense color indicates higher mortality. We show it to make geographic variation easy to see at a glance and to support planning and advocacy. Conclusion: certain states and regions stand out with higher mortality, often consistent with disparities in screening and care. What this means: public health and policy can use these patterns to prioritize interventions and resources where mortality is highest and to track progress over time."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Heat map of breast cancer mortality by U.S. state">
          <StateHeatMapChart data={chartData} valueLabel="Rate per 100,000" />
        </div>
      )}
    </Figure>
  );
}
