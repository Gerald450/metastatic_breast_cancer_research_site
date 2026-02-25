'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function SEERDistantStageBySubtypeFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/survival-by-subtype'
  );
  const chartData = (data ?? []) as { subtype: string; relativeSurvivalPercent: number | null }[];

  return (
    <Figure
      title="5-Year Relative Survival: Distant (Metastatic) Stage by Subtype"
      description="Female breast cancer diagnosed at distant stage. HR = hormone receptor; HER2 = human epidermal growth factor receptor 2."
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="Distant stage = metastatic disease. Data from SEER Research Data (txtData). 5-year relative survival by molecular subtype."
      summary="This figure shows 5-year relative survival for distant-stage (metastatic) breast cancer by molecular subtype—whether outcomes differ among HR+/HER2+, HR-/HER2+, HR+/HER2-, and HR-/HER2- (TNBC). Subtype predicts both treatment options and prognosis in Stage IV. HR+/HER2+ and HR-/HER2+ generally have higher 5-year survival than HR+/HER2- and especially TNBC. Subtype should guide counseling and therapy choices in MBC."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data. Run ingest:seer and ensure distant_by_subtype.txt is loaded.
        </div>
      ) : (
        <div role="img" aria-label="Bar chart of 5-year relative survival by subtype (distant stage)">
          <BarCategoryChart
            data={chartData}
            xKey="subtype"
            yKey="relativeSurvivalPercent"
            xLabel="Subtype"
            yLabel="5-year relative survival (%)"
          />
        </div>
      )}
    </Figure>
  );
}
