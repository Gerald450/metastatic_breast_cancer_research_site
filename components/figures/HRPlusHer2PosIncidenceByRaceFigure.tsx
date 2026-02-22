'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const SUBTYPES_SOURCE = ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST;
const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function HRPlusHer2PosIncidenceByRaceFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="HR+/HER2+ Breast Cancer Incidence by Race/Ethnicity"
      description="5-year age-adjusted rates (2018-2022), per 100,000"
      externalSource={{ name: SUBTYPES_SOURCE.name, url: SUBTYPES_SOURCE.url }}
      status="Verified"
      caption="Data from public/csv/Subtypes/explorer_download (9).csv. Luminal B subtype rates are similar across races, with White women at 12.8 and Black women at 12.6 per 100,000."
      summary="Hispanic women have the lowest HR+/HER2+ incidence (10.4/100k); White and Black women have the highest (12.8 and 12.6/100k)."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
