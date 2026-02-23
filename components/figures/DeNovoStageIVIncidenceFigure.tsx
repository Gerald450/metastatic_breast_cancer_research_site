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
      summary="De novo Stage IV incidence has been relatively stable or slightly increasing. This highlights that a subset of patients present with metastatic disease at diagnosis, underscoring the importance of screening and early detection."
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
