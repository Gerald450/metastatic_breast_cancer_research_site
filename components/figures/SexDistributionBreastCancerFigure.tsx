'use client';

import Figure from '@/components/Figure';
import PieCategoryChart from '@/components/charts/PieCategoryChart';
import { sexDistributionBreastCancerData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function SexDistributionBreastCancerFigure() {
  const hasData = sexDistributionBreastCancerData.length > 0;

  return (
    <Figure
      title="Sex Distribution of Breast Cancer Cases"
      description="Female vs male cases"
      externalSource={{ name: 'SEER / ACS', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Breast cancer case counts by sex from SEER. Male breast cancer is rare (~1% of cases)."
      summary="Breast cancer is overwhelmingly diagnosed in women; male cases represent about 1% of the total. Male breast cancer is often diagnosed at later stages and merits distinct awareness and screening considerations."
    >
      {hasData ? (
        <div role="img" aria-label="Pie chart of breast cancer cases by sex">
          <PieCategoryChart
            data={sexDistributionBreastCancerData}
            labelKey="sex"
            valueKey="count"
          />
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data available for this figure yet.
        </div>
      )}
    </Figure>
  );
}
