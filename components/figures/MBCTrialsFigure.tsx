'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
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
      ).map(([phase, count]) => ({ phase, count }))
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
      summary="Ongoing clinical trials drive advances in MBC treatment. New therapies are continually being evaluated for safety and efficacy."
    >
      {hasData ? (
        <div role="img" aria-label="Bar chart of MBC trials by phase">
          <BarCategoryChart data={chartData} xKey="phase" yKey="count" xLabel="Phase" yLabel="Count" />
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">No trials data. Run sync to fetch from ClinicalTrials.gov.</div>
      )}
    </Figure>
  );
}
