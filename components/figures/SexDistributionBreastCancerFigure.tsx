'use client';

import Figure from '@/components/Figure';
import PieCategoryChart from '@/components/charts/PieCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { sexDistributionBreastCancerData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function SexDistributionBreastCancerFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/sexDistributionBreastCancer');
  const chartData = (data && data.length > 0 ? data : sexDistributionBreastCancerData) as Record<string, unknown>[];

  return (
    <Figure
      title="Sex Distribution of Breast Cancer Cases"
      description="Female vs male cases"
      externalSource={{ name: 'SEER / ACS', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Breast cancer case counts by sex. Reference data."
      summary="This chart shows the number of breast cancer cases by sex (female vs male)—the relative burden in women versus men. We show it because breast cancer in men is rare but often diagnosed later and may be under-recognized. Conclusion: the vast majority of breast cancer cases occur in women; male cases account for about 1% and are frequently diagnosed at later stages. What this means: awareness and guidelines should include men where appropriate, and research and support for male breast cancer remain important despite the smaller numbers."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Pie chart of breast cancer cases by sex">
          <PieCategoryChart data={chartData} labelKey="sex" valueKey="count" />
        </div>
      )}
    </Figure>
  );
}
