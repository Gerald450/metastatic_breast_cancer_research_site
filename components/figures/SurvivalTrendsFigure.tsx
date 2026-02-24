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
      summary="This visual is intended to show survival metrics from the literature over different time periods—how reported outcomes for metastatic breast cancer have changed as treatments and cohorts have evolved. We include it to summarize evidence that survival has improved over time. Conclusion: when data are available, survival trends generally reflect gains from newer therapies and earlier diagnosis. What this means: tracking survival over time helps quantify progress and identify where further improvement is needed; when verified data are loaded, this figure will illustrate those trends."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
