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
      summary="Stage strongly predicts 5-year survival: localized disease has excellent outcomes (~90%), while distant (metastatic) stage drops to about 28%. Early detection and treatment of non-metastatic disease remain critical."
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
