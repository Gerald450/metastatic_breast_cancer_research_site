'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function BreastCancerMedianAgeBySubtypeFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/median-age-by-subtype'
  );
  const chartData = (data ?? []) as { subtype: string; median_age: number }[];

  return (
    <Figure
      title="Median Age at Diagnosis by Breast Cancer Subtype"
      description="2018-2022, Female, All Races"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="Computed from SEER case listing (median_age.txt). HR+/HER2- (Luminal A) and HR+/HER2+ (Luminal B) median ages at diagnosis."
      summary="This figure presents the median age at diagnosis for different breast cancer subtypes—whether some subtypes tend to appear at younger or older ages. Age at diagnosis varies by biology and can affect screening and treatment choices. Luminal B (HR+/HER2+) is typically diagnosed at a younger median age than Luminal A (HR+/HER2-). Subtype-specific patterns may inform who is at risk at younger ages and support discussions about screening and prevention in higher-risk subgroups."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data. Run ingest:seer and ensure median_age.txt is loaded.
        </div>
      ) : (
        <div role="img" aria-label="Bar chart of median age at diagnosis by breast cancer subtype">
          <BarCategoryChart
            data={chartData}
            xKey="subtype"
            yKey="median_age"
            xLabel="Subtype"
            yLabel="Median age (years)"
          />
        </div>
      )}
    </Figure>
  );
}
