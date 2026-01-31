'use client';

import Figure from '@/components/Figure';
import MultiLineTimeSeriesChart from '@/components/charts/MultiLineTimeSeriesChart';
import { survivalCurvesByStageData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const series = [
  { key: 'stageI', label: 'Stage I' },
  { key: 'stageII', label: 'Stage II' },
  { key: 'stageIII', label: 'Stage III' },
  { key: 'stageIV', label: 'Stage IV' },
];

export default function SurvivalCurvesByStageFigure() {
  const hasData = survivalCurvesByStageData.length > 0;

  return (
    <Figure
      title="Survival Curves by Stage (I–IV)"
      description="Simplified Kaplan–Meier–style curves"
      externalSource={{ name: 'SEER / Kaggle', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="5-year relative survival probability by months from diagnosis. Simplified from SEER survival by stage."
    >
      {hasData ? (
        <div role="img" aria-label="Multi-line chart of survival probability by stage over months">
          <MultiLineTimeSeriesChart
            data={survivalCurvesByStageData}
            xKey="month"
            series={series}
            yLabel="Survival probability (%)"
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
