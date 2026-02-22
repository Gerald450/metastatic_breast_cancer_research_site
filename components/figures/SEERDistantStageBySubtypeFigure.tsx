'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SEERDistantStageBySubtypeFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="5-Year Relative Survival: Distant (Metastatic) Stage by Subtype"
      description="Female breast cancer diagnosed at distant stage. HR = hormone receptor; HER2 = human epidermal growth factor receptor 2."
      externalSource={{
        name: 'SEER Cancer Stat Facts: Female Breast Cancer Subtypes',
        url: 'https://seer.cancer.gov/statfacts/html/breast-subtypes.html',
      }}
      status="Verified"
      caption="Data from National Cancer Institute SEER Program. Distant stage = metastatic disease. Adapted from Cancer Stat Facts."
      summary="Within metastatic disease, subtype matters: HR+/HER2+ and HR-/HER2+ have higher 5-year survival than HR+/HER2- and especially HR-/HER2- (TNBC). This supports targeted therapy development and subtype-specific counseling."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
