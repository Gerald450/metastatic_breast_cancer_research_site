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
      summary="This figure shows 5-year relative survival for distant-stage (metastatic) breast cancer by molecular subtype—whether outcomes differ among HR+/HER2+, HR-/HER2+, HR+/HER2-, and HR-/HER2- (TNBC) when the disease is already metastatic. We show it because subtype predicts both treatment options and prognosis even in Stage IV. Conclusion: among metastatic patients, HR+/HER2+ and HR-/HER2+ generally have higher 5-year survival than HR+/HER2- and especially TNBC. What this means: subtype should guide counseling and therapy choices in MBC, and developing better treatments for TNBC and other poor-prognosis subtypes remains a priority."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
