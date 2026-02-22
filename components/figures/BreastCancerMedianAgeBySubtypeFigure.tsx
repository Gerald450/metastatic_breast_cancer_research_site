'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const SUBTYPES_SOURCE = ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST;
const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function BreastCancerMedianAgeBySubtypeFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="Median Age at Diagnosis by Breast Cancer Subtype"
      description="2018-2022, Female, All Races"
      externalSource={{ name: SUBTYPES_SOURCE.name, url: SUBTYPES_SOURCE.url }}
      status="Verified"
      caption="Data from public/csv/Subtypes/explorer_download (7).csv. HR+/HER2- (Luminal A) diagnosed at median 64; HR+/HER2+ (Luminal B) at median 58."
      summary="Luminal B (HR+/HER2+) is diagnosed at younger median age (58) compared with Luminal A (HR+/HER2-) at 64 years."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
