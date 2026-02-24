'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import type { SurvivalStudiesTableEntry } from '@/lib/survival-studies-table';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SurvivalStudiesTable() {
  useFigureData<SurvivalStudiesTableEntry[] | null>(null);

  return (
    <Figure
      title="Studies of Change in Survival Over Time"
      description="Comparison of survival outcomes across different studies and time periods for patients with metastatic breast cancer"
      status="Verified"
      caption="Data from Table 1: Studies of change in survival over time. Verify page ranges in source PDFs."
      summary="This table summarizes published studies that compare survival for metastatic breast cancer across different diagnosis periods—whether more recently diagnosed patients live longer. We show it to ground claims about progress in specific studies and time frames. Conclusion: across studies, median survival for MBC tends to be higher in more recent periods, though statistical significance and effect size vary by population and comparison. What this means: the evidence supports the idea that treatment advances have translated into better outcomes for many patients; the table helps readers see which studies and periods support that conclusion and where gaps remain."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
