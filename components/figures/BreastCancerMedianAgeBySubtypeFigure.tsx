'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { breastCancerMedianAgeBySubtypeData } from '@/lib/seer-subtypes-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const SUBTYPES_SOURCE = ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST;

export default function BreastCancerMedianAgeBySubtypeFigure() {
  return (
    <Figure
      title="Median Age at Diagnosis by Breast Cancer Subtype"
      description="2018-2022, Female, All Races"
      externalSource={{ name: SUBTYPES_SOURCE.name, url: SUBTYPES_SOURCE.url }}
      status="Verified"
      caption="Data from public/csv/Subtypes/explorer_download (7).csv. HR+/HER2- (Luminal A) diagnosed at median 64; HR+/HER2+ (Luminal B) at median 58."
      summary="Luminal B (HR+/HER2+) is diagnosed at younger median age (58) compared with Luminal A (HR+/HER2-) at 64 years."
    >
      <div role="img" aria-label="Bar chart of median age at diagnosis by breast cancer subtype">
        <BarCategoryChart
          data={breastCancerMedianAgeBySubtypeData}
          xKey="subtype"
          yKey="medianAge"
          yLabel="Median age (years)"
        />
      </div>
    </Figure>
  );
}
