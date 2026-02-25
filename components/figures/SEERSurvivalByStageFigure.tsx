'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function SEERSurvivalByStageFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/survival-by-stage'
  );
  const chartData = (data ?? []) as { stage: string; relativeSurvivalPercent: number | null }[];

  return (
    <Figure
      title="5-Year Relative Survival by Stage"
      description="Female breast cancer. Distant stage represents metastatic disease."
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="Data from SEER Research Data (txtData). 5-year relative survival by SEER summary stage. Distant = metastatic."
      summary="This figure shows 5-year relative survival by SEER stage (localized, regional, distant) for female breast cancer—how stage at diagnosis relates to the chance of surviving five years. Stage is one of the strongest predictors of outcome. Localized disease has excellent 5-year survival; distant (metastatic) stage is roughly one-third. Early detection and effective treatment of non-metastatic disease save lives; for metastatic breast cancer, improving survival remains a central goal."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data. Run ingest:seer and ensure survival_by_stage.txt or 5_yesar_survival.txt is loaded.
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
