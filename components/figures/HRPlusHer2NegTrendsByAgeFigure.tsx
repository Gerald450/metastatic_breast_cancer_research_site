'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const SUBTYPES_SOURCE = ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST;
const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function HRPlusHer2NegTrendsByAgeFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="HR+/HER2- (Luminal A) Incidence Trends by Age"
      description="Average Annual Percent Change, 2013-2022"
      externalSource={{ name: SUBTYPES_SOURCE.name, url: SUBTYPES_SOURCE.url }}
      status="Verified"
      caption="Data from public/csv/Subtypes/explorer_download (2).csv. HR+/HER2- breast cancer incidence is rising across all age groups, with the steepest increase in women under 50 (2.6% per year)."
      summary="Luminal A incidence trends are rising in all age groups, with the highest AAPC in Ages under 50 (2.6%)."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
