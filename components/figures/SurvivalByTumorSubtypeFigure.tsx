'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { survivalByTumorSubtypeData } from '@/lib/mbc-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function SurvivalByTumorSubtypeFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/seer/charts/survival-by-subtype');
  const chartData = (data && data.length > 0 ? data : survivalByTumorSubtypeData) as Record<string, unknown>[];

  return (
    <Figure
      title="Survival by Tumor Subtype"
      description="5-year relative survival by molecular subtype"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="5-year relative survival by molecular subtype. SEER hormone receptor and HER2 data (2010+)."
      summary="This chart shows 5-year relative survival by molecular subtype (e.g., HR+/HER2-, HER2+, triple-negative) for metastatic breast cancer. It answers: does subtype affect how long people live with MBC? We show it because subtype determines treatment options and prognosis and guides both clinical decisions and drug development. Conclusion: HER2+ and HR+ subtypes tend to have longer survival, in part due to targeted therapies; triple-negative breast cancer (TNBC) has the shortest survival and fewer targeted options. What this means: subtype-specific care and new therapies for TNBC and other poor-prognosis subtypes are essential to narrow outcome gaps."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Bar chart of 5-year relative survival by tumor subtype">
          <BarCategoryChart data={chartData} xKey="subtype" yKey="relativeSurvivalPercent" xLabel="Subtype" yLabel="5-year relative survival (%)" />
        </div>
      )}
    </Figure>
  );
}
