'use client';

import Figure from '@/components/Figure';
import StackedBarChart from '@/components/charts/StackedBarChart';
import { causeOfDeathBreastVsOtherData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const series = [
  { key: 'breast', label: 'Breast cancer' },
  { key: 'other', label: 'Other causes' },
];

export default function CauseOfDeathBreastVsOtherFigure() {
  const hasData = causeOfDeathBreastVsOtherData.length > 0;

  return (
    <Figure
      title="Cause of Death (Breast vs Other)"
      description="Competing mortality in older populations"
      externalSource={{ name: 'SEER (cause-specific)', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Proportion of deaths due to breast cancer vs other causes by age group. SEER cause-specific survival."
    >
      {hasData ? (
        <div role="img" aria-label="Stacked bar chart of cause of death by age group">
          <StackedBarChart
            data={causeOfDeathBreastVsOtherData}
            xKey="ageGroup"
            series={series}
            yLabel="% of deaths"
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
