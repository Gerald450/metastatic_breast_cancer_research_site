'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { deNovoStageIVIncidenceData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function DeNovoStageIVIncidenceFigure() {
  const hasData = deNovoStageIVIncidenceData.length > 0;

  return (
    <Figure
      title="De Novo Stage IV Incidence by Year"
      description="Number or rate of Stage IV diagnoses at presentation"
      externalSource={{ name: 'SEER (stage at diagnosis)', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="De novo metastatic breast cancer cases from SEER. Stage at diagnosis variable."
    >
      {hasData ? (
        <div role="img" aria-label="Bar chart of de novo Stage IV incidence by year">
          <BarCategoryChart
            data={deNovoStageIVIncidenceData}
            xKey="year"
            yKey="countOrRate"
            yLabel="Count"
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
