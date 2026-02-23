'use client';

import Figure from '@/components/Figure';
import StackedBarChart from '@/components/charts/StackedBarChart';
import { useFigureData } from '@/lib/use-figure-data';
import { causeOfDeathBreastVsOtherData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function CauseOfDeathBreastVsOtherFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/causeOfDeathBreastVsOther');
  const chartData = (data && data.length > 0 ? data : causeOfDeathBreastVsOtherData) as Record<string, unknown>[];

  return (
    <Figure
      title="Cause of Death (Breast vs Other)"
      description="Competing mortality in older populations"
      externalSource={{ name: 'SEER (cause-specific)', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Proportion of deaths due to breast cancer vs other causes by age group. Reference data."
      summary="In older populations, competing causes of death increase; breast cancer becomes a smaller share of deaths. This reflects both cancer mortality and age-related comorbidities."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Stacked bar chart of cause of death by age group">
          <StackedBarChart
            data={chartData}
            xKey="ageGroup"
            series={[
              { key: 'breast', label: 'Breast cancer', color: '#ec4899' },
              { key: 'other', label: 'Other causes', color: '#94a3b8' },
            ]}
            xLabel="Age group"
            yLabel="Percent"
          />
        </div>
      )}
    </Figure>
  );
}
