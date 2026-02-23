'use client';

import Figure from '@/components/Figure';
import MultiLineTimeSeriesChart from '@/components/charts/MultiLineTimeSeriesChart';
import { useFigureData } from '@/lib/use-figure-data';
import { survivalCurvesByStageData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function SurvivalCurvesByStageFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/survivalCurvesByStage');
  const chartData = (data && data.length > 0 ? data : survivalCurvesByStageData) as Record<string, unknown>[];

  return (
    <Figure
      title="Survival Curves by Stage (I–IV)"
      description="Simplified Kaplan–Meier–style curves"
      externalSource={{ name: 'SEER / Kaggle', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="5-year relative survival probability by months from diagnosis. Simplified from SEER survival by stage."
      summary="Survival drops sharply with stage. Stage I–II have high 5-year survival; Stage IV (metastatic) shows a steep decline. This underscores the prognostic importance of stage and the need for effective therapies for metastatic disease."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Multi-line chart of survival curves by stage">
          <MultiLineTimeSeriesChart
            data={chartData}
            xKey="month"
            series={[
              { key: 'stageI', label: 'Stage I', color: '#10b981' },
              { key: 'stageII', label: 'Stage II', color: '#3b82f6' },
              { key: 'stageIII', label: 'Stage III', color: '#f59e0b' },
              { key: 'stageIV', label: 'Stage IV', color: '#ef4444' },
            ]}
            xLabel="Months from diagnosis"
            yLabel="Survival (%)"
          />
        </div>
      )}
    </Figure>
  );
}
