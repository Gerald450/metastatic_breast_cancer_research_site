'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import distantStageData from '@/data/seer/distant_stage_by_subtype.json';

const sourceUrl = distantStageData.source.url;
const dataPeriod = distantStageData.source.dataPeriod;
const chartData = distantStageData.data.map((row) => ({
  subtype: row.subtype,
  value: row.survivalPercent,
}));

export default function SEERDistantStageBySubtypeFigure() {
  return (
    <Figure
      title="5-Year Relative Survival: Distant (Metastatic) Stage by Subtype"
      description={`Female breast cancer diagnosed at distant stage, ${dataPeriod}. HR = hormone receptor; HER2 = human epidermal growth factor receptor 2.`}
      externalSource={{
        name: 'SEER Cancer Stat Facts: Female Breast Cancer Subtypes',
        url: sourceUrl,
      }}
      status="Verified"
      caption={`Data from National Cancer Institute SEER Program (${dataPeriod}). Distant stage = metastatic disease. Adapted from Cancer Stat Facts.`}
      summary="Within metastatic disease, subtype matters: HR+/HER2+ and HR-/HER2+ have higher 5-year survival than HR+/HER2- and especially HR-/HER2- (TNBC). This supports targeted therapy development and subtype-specific counseling."
    >
      <BarCategoryChart
        data={chartData}
        xKey="subtype"
        yKey="value"
        yLabel="5-year relative survival (%)"
      />
    </Figure>
  );
}
