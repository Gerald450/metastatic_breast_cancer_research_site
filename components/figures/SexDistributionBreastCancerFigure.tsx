'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { sexDistributionBreastCancerData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function SexDistributionBreastCancerFigure() {
  const chartData = sexDistributionBreastCancerData;

  return (
    <Figure
      title="Sex Distribution of Breast Cancer Cases"
      description="Female vs male cases"
      externalSource={{ name: 'SEER / ACS', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Breast cancer case counts by sex. Reference data."
      summary="Breast cancer is overwhelmingly diagnosed in women; male cases represent about 1% of the total. Male breast cancer is often diagnosed at later stages."
    >
      <div role="img" aria-label="Bar chart of breast cancer by sex">
        <BarCategoryChart data={chartData} xKey="sex" yKey="count" xLabel="Sex" yLabel="Count" />
      </div>
    </Figure>
  );
}
