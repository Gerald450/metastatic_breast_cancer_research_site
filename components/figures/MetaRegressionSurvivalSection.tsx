'use client';

import { useFigureData } from '@/lib/use-figure-data';
import type { MetaRegressionPlotData } from '@/components/figures/MetaRegressionSurvivalFigure';

type MetaRegressionSurvivalData = {
  recurrentDisease?: MetaRegressionPlotData;
  recurrentERPlus?: MetaRegressionPlotData;
  recurrentERMinus?: MetaRegressionPlotData;
  deNovoStageIV?: MetaRegressionPlotData;
};

const NO_DATA_MSG = 'No verified data available. This chart displays only API-verified data (ClinicalTrials.gov, PubMed, CDC WONDER).';

export default function MetaRegressionSurvivalSection() {
  useFigureData<MetaRegressionSurvivalData | null>(null);

  return (
    <div id="meta-regression-survival" className="space-y-6">
      <h3 className="heading-card text-gray-900 dark:text-white">
        Meta-regression: survival improvement by disease type
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Data adapted from meta-regression of recurrent and de novo MBC studies. Source:{' '}
        <a href="/references#ref-001" className="text-blue-600 hover:underline dark:text-blue-400">Caswell et al. (ref-001)</a>.
      </p>
      <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">{NO_DATA_MSG}</div>
    </div>
  );
}
