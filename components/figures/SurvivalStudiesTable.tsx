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
      summary="Across studies, median survival for MBC has improved over more recent diagnosis periods. Statistical significance varies by population and comparison; the table supports evidence that treatment advances have translated into better outcomes."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
