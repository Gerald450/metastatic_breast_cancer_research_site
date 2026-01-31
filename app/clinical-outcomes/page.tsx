import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';
import CitationCallout from '@/components/CitationCallout';
import ReferenceList from '@/components/ReferenceList';
import TabSummary from '@/components/TabSummary';
import { references } from '@/lib/references';
import MetastaticSiteOutcomesFigure from '@/components/figures/MetastaticSiteOutcomesFigure';
import SurvivalTrendsFigure from '@/components/figures/SurvivalTrendsFigure';
import MetaRegressionSurvivalFigure from '@/components/figures/MetaRegressionSurvivalFigure';
import PageHero from '@/components/PageHero';
import ClinicalIllustration from '@/components/illustrations/ClinicalIllustration';
import ProgressionPathwayDiagram from '@/components/figures/ProgressionPathwayDiagram';
import metaRegressionSurvivalData from '@/data/extracted/meta_regression_survival.json';

export default function ClinicalOutcomesPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Clinical Outcomes"
          description="Survival, disease progression, quality of life, and treatment response in metastatic breast cancer."
          theme="clinical"
          illustration={<ClinicalIllustration />}
        />
        <TabSummary section="clinical-outcomes" />
      </div>

      <Section
        id="survival"
        title="Survival Outcomes"
        className="section-alt"
      >
        <div className="space-y-6">
          <CitationCallout
            claim="Survival has improved over time for patients with metastatic breast cancer, with median survival increasing across different time periods and study populations."
            sources={['ref-001', 'ref-002', 'ref-004']}
          />
          <SurvivalTrendsFigure />

          <div id="meta-regression-survival" className="space-y-10">
            <h2 className="text-2xl font-semibold leading-tight text-gray-900 dark:text-white sm:text-3xl">
              Improvement in median survival time after metastasis over time
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Data adapted from meta-regression of recurrent and de novo MBC studies. Source:{' '}
              <a href="/references#ref-001" className="text-blue-600 hover:underline dark:text-blue-400">Caswell et al. (ref-001)</a>.
            </p>
            <div className="grid gap-10 sm:grid-cols-1 lg:grid-cols-2">
              <MetaRegressionSurvivalFigure
                plotData={metaRegressionSurvivalData.recurrentDisease as Parameters<typeof MetaRegressionSurvivalFigure>[0]['plotData']}
              />
              <MetaRegressionSurvivalFigure
                plotData={metaRegressionSurvivalData.recurrentERPlus as Parameters<typeof MetaRegressionSurvivalFigure>[0]['plotData']}
              />
              <MetaRegressionSurvivalFigure
                plotData={metaRegressionSurvivalData.recurrentERMinus as Parameters<typeof MetaRegressionSurvivalFigure>[0]['plotData']}
              />
              <MetaRegressionSurvivalFigure
                plotData={metaRegressionSurvivalData.deNovoStageIV as Parameters<typeof MetaRegressionSurvivalFigure>[0]['plotData']}
              />
            </div>
          </div>

          <MetastaticSiteOutcomesFigure />
        </div>
      </Section>

      <Section title="Disease Progression">
        <div className="space-y-6">
          <ProgressionPathwayDiagram />
          <Placeholder
            label="Progression patterns and timelines"
            notes={[
              'Time to progression metrics',
              'Patterns of disease advancement',
              'Factors influencing progression',
            ]}
          />
        </div>
      </Section>

      <Section
        title="Quality of Life Measures"
        className="section-alt"
      >
        <div className="space-y-6">
          <Placeholder
            label="Patient-reported outcomes"
            notes={[
              'Quality of life assessments',
              'Symptom burden and management',
              'Functional status measures',
            ]}
          />
        </div>
      </Section>

      <Section title="Treatment Response Outcomes">
        <div className="space-y-6">
          <CitationCallout
            claim="Treatment response and duration vary by metastatic site and subtype. Site-specific outcomes (bone, liver, lung, brain) are reported in the literature and figures above."
            sources={['ref-006', 'ref-007']}
          />
          <Placeholder
            label="Response rates and outcomes"
            notes={[
              'Treatment response metrics',
              'Duration of response',
              'Outcome predictors',
            ]}
          />
          <VisualPlaceholder
            title="Treatment response outcomes table"
            type="table"
            description="Comparative response rates across different treatment approaches"
          />
        </div>
      </Section>

      <Section title="References Used">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the
            PDF pages.
          </p>
          <ReferenceList references={references} filterBy="clinical-outcomes" />
        </div>
      </Section>
    </div>
  );
}
