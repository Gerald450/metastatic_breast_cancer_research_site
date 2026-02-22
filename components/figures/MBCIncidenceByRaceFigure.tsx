'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function MBCIncidenceByRaceFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="MBC Incidence by Race/Ethnicity"
      description="Proportion of MBC cases by race"
      externalSource={{ name: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.name, url: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.url }}
      status="Draft"
      caption="MBC case counts by race/ethnicity from SEER. ACS for demographic categories."
      summary="Racial and ethnic distribution of MBC cases reflects population demographics and disparities in access to care. White women account for the largest share of cases; Black women often have higher rates of aggressive subtypes and later-stage diagnosis."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
