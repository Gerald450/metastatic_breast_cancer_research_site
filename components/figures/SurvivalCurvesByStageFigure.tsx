'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function SurvivalCurvesByStageFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="Survival Curves by Stage (I–IV)"
      description="Simplified Kaplan–Meier–style curves"
      externalSource={{ name: 'SEER / Kaggle', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="5-year relative survival probability by months from diagnosis. Simplified from SEER survival by stage."
      summary="Survival drops sharply with stage. Stage I–II have high 5-year survival; Stage IV (metastatic) shows a steep decline. This underscores the prognostic importance of stage and the need for effective therapies for metastatic disease."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
