'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { survivalByStageBarData } from '@/lib/mbc-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function SurvivalByStageBarFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/survival-by-stage'
  );
  const chartData = (data && data.length > 0 ? data : survivalByStageBarData) as Record<
    string,
    unknown
  >[];

  return (
    <Figure
      title="5-Year Relative Survival by Stage"
      description="Female breast cancer. Distant stage represents metastatic disease."
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="5-year relative survival by SEER stage. Localized disease has excellent outcomes; distant (metastatic) stage drops to about one-third."
      summary="This bar chart shows 5-year relative survival by stage (localized, regional, distant) for female breast cancer. It answers a central question: how much does stage at diagnosis affect the chance of surviving five years? The reason we show it: stage is one of the strongest predictors of outcome, and the gap between early and metastatic stage drives policy and patient counseling. Conclusion: localized disease has excellent 5-year survival (around 90% or higher), while distant (metastatic) stage drops to roughly 28%. What this means: early detection and effective treatment of non-metastatic disease save lives; for metastatic breast cancer, improving survival remains a critical unmet need."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <div role="img" aria-label="Bar chart of 5-year relative survival by stage">
          <BarCategoryChart
            data={chartData}
            xKey="stage"
            yKey="relativeSurvivalPercent"
            xLabel="Stage"
            yLabel="5-year relative survival (%)"
          />
        </div>
      )}
    </Figure>
  );
}
