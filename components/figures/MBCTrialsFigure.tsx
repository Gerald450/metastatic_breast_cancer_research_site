'use client';

import Figure from '@/components/Figure';
import DotPlotChart from '@/components/charts/DotPlotChart';
import { useFigureData } from '@/lib/use-figure-data';
import type { MBC_Trial } from '@/lib/types/mbc-data';

export default function MBCTrialsFigure() {
  const { data, loading, error } = useFigureData<MBC_Trial[]>('/api/data/trials');

  const chartData = Array.isArray(data)
    ? Object.entries(
        (data as MBC_Trial[]).reduce<Record<string, number>>((acc, t) => {
          const phase = t.phases?.[0] ?? t.overall_status ?? 'Unknown';
          acc[phase] = (acc[phase] ?? 0) + 1;
          return acc;
        }, {})
      )
      .map(([phase, count]) => ({ phase, count }))
      .sort((a, b) => b.count - a.count)
    : [];
  const hasData = chartData.length > 0;

  if (loading) {
    return (
      <Figure title="MBC Clinical Trials" description="Active trials for metastatic breast cancer" status="Draft" caption="Loading...">
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading trials...</div>
      </Figure>
    );
  }

  if (error) {
    return (
      <Figure title="MBC Clinical Trials" description="Active trials for metastatic breast cancer" status="Draft" caption={error}>
        <div className="flex h-64 items-center justify-center text-sm text-red-500 dark:text-red-400">{error}</div>
      </Figure>
    );
  }

  return (
    <Figure
      title="MBC Clinical Trials"
      description="Trials for metastatic breast cancer from ClinicalTrials.gov"
      externalSource={{ name: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov' }}
      status="Draft"
      caption="Data from ClinicalTrials.gov. Run POST /api/sync/trials to refresh."
      summary="This chart shows the number of clinical trials for metastatic breast cancer by phase (e.g., Phase 1, 2, 3)—how much active research is underway and at what stage. We show it because trials are the pipeline for new therapies and reflect where the field is investing. Conclusion: many trials are active across phases, reflecting ongoing evaluation of new drugs and combinations. What this means: progress in MBC depends on these studies; patients and providers can use ClinicalTrials.gov to find relevant trials and contribute to the evidence base."
    >
      {hasData ? (
        <div role="img" aria-label="Horizontal bar chart of MBC trials by phase">
          <DotPlotChart
            data={chartData}
            categoryKey="phase"
            valueKey="count"
            categoryLabel="Phase"
            valueLabel="Number of trials"
          />
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">No trials data. Run sync to fetch from ClinicalTrials.gov.</div>
      )}
    </Figure>
  );
}
