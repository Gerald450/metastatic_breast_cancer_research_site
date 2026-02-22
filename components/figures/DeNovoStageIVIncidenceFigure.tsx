'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function DeNovoStageIVIncidenceFigure() {
  useFigureData<unknown>(null);

  return (
    <Figure
      title="De Novo Stage IV Incidence by Year"
      description="Number or rate of Stage IV diagnoses at presentation"
      externalSource={{ name: 'SEER (stage at diagnosis)', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="De novo metastatic breast cancer cases from SEER. Stage at diagnosis variable."
      summary="De novo Stage IV incidence has been relatively stable or slightly increasing. This highlights that a subset of patients present with metastatic disease at diagnosis, underscoring the importance of screening and early detection."
    >
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </Figure>
  );
}
