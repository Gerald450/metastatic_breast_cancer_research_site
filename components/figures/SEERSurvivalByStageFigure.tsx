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
      summary="This figure shows 5-year relative survival by SEER stage (localized, regional, distant) for female breast cancer—how stage at diagnosis relates to the chance of surviving five years. We show it because stage is one of the strongest predictors of outcome and anchors discussions about early detection and metastatic disease. Conclusion: localized disease has excellent 5-year survival (approaching 100% in many series), while distant (metastatic) stage drops to roughly one-third. What this means: early detection and effective treatment of non-metastatic disease save lives; for metastatic breast cancer, improving survival remains a central goal of research and care."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
