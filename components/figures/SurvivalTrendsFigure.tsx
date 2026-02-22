'use client';

import Figure from '@/components/Figure';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SurvivalTrendsFigure() {
  return (
    <Figure
      title="Survival Trends Over Time"
      description="Survival metrics tracked across time periods"
      status="Draft"
      caption={NO_DATA_MSG}
      summary="Survival metrics from literature show how outcomes have evolved across study periods."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
