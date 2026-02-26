'use client';

import Figure from '@/components/Figure';
import MultiLineTimeSeriesChart from '@/components/charts/MultiLineTimeSeriesChart';
import { useFigureData } from '@/lib/use-figure-data';
import { survivalCurvesByStageData } from '@/lib/mbc-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function SurvivalCurvesByStageFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/seer/charts/survival-curves-by-stage');
  const chartData = (data && data.length > 0 ? data : survivalCurvesByStageData) as Record<string, unknown>[];

  return (
    <Figure
      title="Survival Curves by Stage (I–IV)"
      description="Simplified Kaplan–Meier–style curves"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="5-year relative survival probability by months from diagnosis. Simplified from SEER survival by stage."
      summary="This figure plots survival probability over time (months from diagnosis) by stage (I–IV)—how the chance of being alive falls over the first several years for each stage. It shows not just a single number but the shape of survival, which matters for understanding when risk is highest and how stage separates outcomes. Conclusion: Stage I–II have high 5-year survival; Stage IV (metastatic) shows a steep decline early on. What this means: stage is a powerful prognostic factor, and the steep drop for Stage IV underscores why effective therapies for metastatic disease and early detection of non-metastatic disease are both critical."
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
            height={380}
          />
        </div>
      )}
    </Figure>
  );
}
