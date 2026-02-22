'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SEERSurvivalByStageFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="5-Year Relative Survival by Stage"
      description="Female breast cancer. Distant stage represents metastatic disease."
      externalSource={{ name: 'SEER Cancer Stat Facts: Female Breast Cancer', url: 'https://seer.cancer.gov/statfacts/html/breast.html' }}
      status="Verified"
      caption="Data from National Cancer Institute SEER Program. Adapted from Cancer Stat Facts."
      summary="Stage strongly predicts 5-year survival: localized disease has excellent outcomes (~100%), while distant (metastatic) stage drops to about one-third. Early detection and treatment of non-metastatic disease remain critical."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
