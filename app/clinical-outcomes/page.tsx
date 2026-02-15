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
import SEERSurvivalByStageFigure from '@/components/figures/SEERSurvivalByStageFigure';
import SEERDistantStageBySubtypeFigure from '@/components/figures/SEERDistantStageBySubtypeFigure';
import SurvivalByMetastaticSiteFigure from '@/components/figures/SurvivalByMetastaticSiteFigure';
import SurvivalByTumorSubtypeFigure from '@/components/figures/SurvivalByTumorSubtypeFigure';
import SurvivalTimeDistributionStageIVFigure from '@/components/figures/SurvivalTimeDistributionStageIVFigure';
import SurvivalCurvesByStageFigure from '@/components/figures/SurvivalCurvesByStageFigure';
import SurvivalByYearAndSubtypeFigure from '@/components/figures/SurvivalByYearAndSubtypeFigure';
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
          theme="clinical"
          illustration={<ClinicalIllustration />}
        />
        <TabSummary section="clinical-outcomes" />
      </div>

      {/* Story: Baseline → Improvement → Heterogeneity → Progression → Site outcomes → Treatment response */}
      <Section
        id="survival"
        title="Stage and prognosis: the baseline"
        subtitle="What do we expect? 5-year survival by stage and subtype from SEER"
        className="section-alt"
      >
        <div className="space-y-8">
          <CitationCallout
            claim="Stage strongly predicts survival. Localized and regional disease have favorable outcomes; distant (metastatic) stage drops to about one-third at 5 years. Subtype further modifies prognosis."
            sources={['ref-001', 'ref-002']}
          />
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            <SEERSurvivalByStageFigure />
            <SEERDistantStageBySubtypeFigure />
          </div>
          <SurvivalCurvesByStageFigure />
        </div>
      </Section>

      <Section
        title="Improvement over time"
        subtitle="Median survival has increased across study populations"
      >
        <div className="space-y-8">
          <CitationCallout
            claim="Survival has improved over time for patients with metastatic breast cancer, with median survival increasing across different time periods and study populations."
            sources={['ref-001', 'ref-002', 'ref-004']}
          />
          <SurvivalTrendsFigure />
          <div id="meta-regression-survival" className="space-y-6">
            <h3 className="heading-card text-gray-900 dark:text-white">
              Meta-regression: survival improvement by disease type
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Data adapted from meta-regression of recurrent and de novo MBC studies. Source:{' '}
              <a href="/references#ref-001" className="text-blue-600 hover:underline dark:text-blue-400">Caswell et al. (ref-001)</a>.
            </p>
            <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
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
        </div>
      </Section>

      <Section
        title="Heterogeneity: site and subtype"
        subtitle="Outcomes vary by metastatic site and tumor biology"
        className="section-alt"
      >
        <div className="space-y-6">
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            <SurvivalByMetastaticSiteFigure />
            <SurvivalByTumorSubtypeFigure />
          </div>
          <SurvivalTimeDistributionStageIVFigure />
          <SurvivalByYearAndSubtypeFigure />
        </div>
      </Section>

      <Section
        title="Disease progression"
        subtitle="From localized to metastatic—how breast cancer advances"
      >
        <div className="space-y-6">
          <ProgressionPathwayDiagram />
          <Placeholder
            label="Progression patterns and timelines"
            notes={['Time to progression metrics', 'Patterns of disease advancement', 'Factors influencing progression']}
          />
        </div>
      </Section>

      <Section
        title="Site-specific outcomes"
        subtitle="Literature on bone, liver, lung, and brain metastasis"
        className="section-alt"
      >
        <div className="space-y-6">
          <CitationCallout
            claim="Treatment response and duration vary by metastatic site. Site-specific outcomes are reported in Bonotto, Xiao et al. and inform treatment sequencing."
            sources={['ref-006', 'ref-007']}
          />
          <MetastaticSiteOutcomesFigure />
        </div>
      </Section>

      <Section
        title="Treatment response outcomes"
        subtitle="Response rates and predictors (in development)"
      >
        <div className="space-y-6">
          <Placeholder
            label="Response rates and outcomes"
            notes={['Treatment response metrics', 'Duration of response', 'Outcome predictors']}
          />
          <VisualPlaceholder
            title="Treatment response outcomes table"
            type="table"
            description="Comparative response rates across different treatment approaches"
          />
        </div>
      </Section>

      <Section
        title="Quality of life measures"
        className="section-alt"
      >
        <Placeholder
          label="Patient-reported outcomes"
          notes={['Quality of life assessments', 'Symptom burden and management', 'Functional status measures']}
        />
      </Section>

      <Section title="References used">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the PDF pages.
          </p>
          <ReferenceList references={references} filterBy="clinical-outcomes" />
        </div>
      </Section>
    </div>
  );
}
