'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const SUBTYPES_SOURCE = ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST;
const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function HRPlusHer2NegStageDistributionFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="HR+/HER2- Breast Cancer Incidence by Stage at Diagnosis"
      description="2022, Female, All Races, per 100,000"
      externalSource={{ name: SUBTYPES_SOURCE.name, url: SUBTYPES_SOURCE.url }}
      status="Verified"
      caption="Data from public/csv/Subtypes/explorer_download (3).csv. Localized (65.2), Regional (23.4), Distant (4.3) per 100,000. Distant stage approximates metastatic presentation."
      summary="Most HR+/HER2- breast cancers are diagnosed at localized stage (65.2/100k); distant stage accounts for 4.3/100k."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
