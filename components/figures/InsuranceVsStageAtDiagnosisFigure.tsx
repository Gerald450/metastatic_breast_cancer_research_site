'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function InsuranceVsStageAtDiagnosisFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="Insurance Status vs Stage at Diagnosis"
      description="Later-stage diagnosis among uninsured"
      externalSource={{ name: 'SEER / USCS', url: ONLINE_SOURCES.USCS.url }}
      status="Draft"
      caption="Percent diagnosed at late stage (regional or distant) by insurance status. SEER and USCS."
      summary="Uninsured and Medicaid patients are more likely to be diagnosed at late stage, reflecting barriers to screening and timely care. Improving access to insurance and preventive services could reduce late-stage diagnoses."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
