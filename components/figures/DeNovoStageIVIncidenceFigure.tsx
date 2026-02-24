'use client';

import Figure from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { useFigureData } from '@/lib/use-figure-data';
import { deNovoStageIVIncidenceData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function DeNovoStageIVIncidenceFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/deNovoStageIVIncidence');
  const chartData = (data && data.length > 0 ? data : deNovoStageIVIncidenceData) as Record<string, unknown>[];

  return (
    <Figure
      title="De Novo Stage IV Incidence by Year"
      description="Number or rate of Stage IV diagnoses at presentation"
      externalSource={{ name: 'SEER (stage at diagnosis)', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="De novo metastatic breast cancer cases from SEER. Stage at diagnosis variable."
      summary="This chart shows the number or rate of de novo Stage IV breast cancer cases by year—people whose first breast cancer diagnosis is already metastatic. We show it because this group was never detected at an earlier stage and represents a critical target for screening and awareness. Conclusion: de novo Stage IV incidence has been relatively stable or slightly increasing over time. What this means: a meaningful share of patients still present with metastatic disease at first diagnosis; improving screening uptake and early detection could reduce this proportion, while those who do present with de novo Stage IV need dedicated research and support."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Line chart of de novo Stage IV incidence by year">
          <LineTimeSeriesChart data={chartData} xKey="year" yKey="countOrRate" xLabel="Year" yLabel="Count or rate" />
        </div>
      )}
    </Figure>
  );
}
