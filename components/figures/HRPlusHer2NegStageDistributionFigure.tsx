'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { hrHer2NegRatesByStage2022 } from '@/lib/seer-subtypes-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

const fallbackData = hrHer2NegRatesByStage2022.map((r) => ({
  stage: r.stage,
  ratePer100k: r.rate,
}));

export default function HRPlusHer2NegStageDistributionFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/incidence-by-stage-at-diagnosis'
  );
  const chartData = (data && data.length > 0 ? data : fallbackData) as Record<string, unknown>[];

  return (
    <Figure
      title="HR+/HER2- Breast Cancer Incidence by Stage at Diagnosis"
      description="Female, All Races, per 100,000 (SEER Research Data)"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="Incidence rate by stage at diagnosis. Localized, Regional, and Distant. Distant stage approximates metastatic presentation."
      summary="Most HR+/HER2- breast cancers are diagnosed at localized stage; distant stage accounts for a smaller share. Data from SEER*Stat exports."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <div role="img" aria-label="Bar chart of HR+/HER2- incidence by stage at diagnosis">
          <BarCategoryChart
            data={chartData}
            xKey="stage"
            yKey="ratePer100k"
            xLabel="Stage"
            yLabel="Rate per 100,000"
          />
        </div>
      )}
    </Figure>
  );
}
