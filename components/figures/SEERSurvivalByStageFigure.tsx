'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import survivalByStageData from '@/data/seer/survival_by_stage.json';

const sourceUrl = survivalByStageData.source.url;
const dataPeriod = survivalByStageData.source.dataPeriod;
const chartData = survivalByStageData.data.map((row) => ({
  stage: row.stage,
  value: row.survivalPercent,
}));

export default function SEERSurvivalByStageFigure() {
  return (
    <Figure
      title="5-Year Relative Survival by Stage"
      description={`Female breast cancer, ${dataPeriod}. Distant stage represents metastatic disease.`}
      externalSource={{
        name: 'SEER Cancer Stat Facts: Female Breast Cancer',
        url: sourceUrl,
      }}
      status="Verified"
      caption={`Data from National Cancer Institute SEER Program (${dataPeriod}). Adapted from Cancer Stat Facts.`}
      summary="Stage strongly predicts 5-year survival: localized disease has excellent outcomes (~100%), while distant (metastatic) stage drops to about one-third. Early detection and treatment of non-metastatic disease remain critical."
    >
      <BarCategoryChart
        data={chartData}
        xKey="stage"
        yKey="value"
        xLabel="Stage"
        yLabel="5-year relative survival (%)"
      />
    </Figure>
  );
}
