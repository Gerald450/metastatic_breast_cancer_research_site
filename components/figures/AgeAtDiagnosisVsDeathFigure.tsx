'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function AgeAtDiagnosisVsDeathFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="Age at Diagnosis vs Age at Death"
      description="Distribution comparison"
      status="Draft"
      externalSource={{ name: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.name, url: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.url }}
      caption="Age distribution at diagnosis vs at death. Data are illustrative; source to be verified. Similar variables: SEER (age at diagnosis), NCHS mortality (age at death). Data from public/csv/Subtypes/."
      summary="The shift between age at diagnosis and age at death shows that older patients more often die from MBC. In younger age groups, diagnosis predominates; in the oldest groups, death from breast cancer or other causes increases."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
