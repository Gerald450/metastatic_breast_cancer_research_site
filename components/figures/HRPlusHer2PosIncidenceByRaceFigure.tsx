'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { hrHer2PosIncidenceByRaceData } from '@/lib/seer-subtypes-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const SUBTYPES_SOURCE = ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST;

export default function HRPlusHer2PosIncidenceByRaceFigure() {
  return (
    <Figure
      title="HR+/HER2+ Breast Cancer Incidence by Race/Ethnicity"
      description="5-year age-adjusted rates (2018-2022), per 100,000"
      externalSource={{ name: SUBTYPES_SOURCE.name, url: SUBTYPES_SOURCE.url }}
      status="Verified"
      caption="Data from public/csv/Subtypes/explorer_download (9).csv. Luminal B subtype rates are similar across races, with White women at 12.8 and Black women at 12.6 per 100,000."
      summary="Hispanic women have the lowest HR+/HER2+ incidence (10.4/100k); White and Black women have the highest (12.8 and 12.6/100k)."
    >
      <div role="img" aria-label="Bar chart of HR+/HER2+ incidence rate by race">
        <BarCategoryChart
          data={hrHer2PosIncidenceByRaceData}
          xKey="race"
          yKey="rate"
          yLabel="Rate per 100,000"
        />
      </div>
    </Figure>
  );
}
