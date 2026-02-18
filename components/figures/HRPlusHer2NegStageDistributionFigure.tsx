'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { hrHer2NegRatesByStage2022 } from '@/lib/seer-subtypes-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const SUBTYPES_SOURCE = ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST;

export default function HRPlusHer2NegStageDistributionFigure() {
  return (
    <Figure
      title="HR+/HER2- Breast Cancer Incidence by Stage at Diagnosis"
      description="2022, Female, All Races, per 100,000"
      externalSource={{ name: SUBTYPES_SOURCE.name, url: SUBTYPES_SOURCE.url }}
      status="Verified"
      caption="Data from public/csv/Subtypes/explorer_download (3).csv. Localized (65.2), Regional (23.4), Distant (4.3) per 100,000. Distant stage approximates metastatic presentation."
      summary="Most HR+/HER2- breast cancers are diagnosed at localized stage (65.2/100k); distant stage accounts for 4.3/100k."
    >
      <div role="img" aria-label="Bar chart of HR+/HER2- incidence rate by stage">
        <BarCategoryChart
          data={hrHer2NegRatesByStage2022}
          xKey="stage"
          yKey="rate"
          xLabel="Stage"
          yLabel="Rate per 100,000"
        />
      </div>
    </Figure>
  );
}
