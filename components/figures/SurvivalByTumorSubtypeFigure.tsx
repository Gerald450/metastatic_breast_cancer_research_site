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
      summary="Molecular subtype strongly predicts MBC outcomes. HER2+ and HR+ subtypes have longer median survival due to targeted therapies; triple-negative breast cancer (TNBC) has the shortest survival and fewer treatment options."
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
