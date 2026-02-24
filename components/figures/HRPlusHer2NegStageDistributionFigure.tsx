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
      summary="This graph shows how many HR+/HER2- (Luminal A) breast cancers are diagnosed at localized, regional, or distant (metastatic) stage—the distribution of stage at diagnosis for this subtype. It matters because most Luminal A cases are caught before metastasis, but the share diagnosed as distant reflects both biology and access to screening. The conclusion: the majority of HR+/HER2- cases are localized; distant stage is a smaller proportion but still represents real metastatic burden. What this means: screening and timely diagnosis are working for many patients, but we must still address the subset presenting with metastatic disease and reduce disparities so more people are diagnosed at earlier stages."
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
