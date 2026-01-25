import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';
import CitationCallout from '@/components/CitationCallout';
import ReferenceList from '@/components/ReferenceList';
import { references } from '@/lib/references';
import MetastaticSiteOutcomesFigure from '@/components/figures/MetastaticSiteOutcomesFigure';
import SurvivalTrendsFigure from '@/components/figures/SurvivalTrendsFigure';
import SurvivalStudiesTable from '@/components/figures/SurvivalStudiesTable';
import PageHero from '@/components/PageHero';
import ClinicalIllustration from '@/components/illustrations/ClinicalIllustration';
import ProgressionPathwayDiagram from '@/components/figures/ProgressionPathwayDiagram';

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
      </div>

      <Section
        title="Survival Outcomes"
        className="bg-gray-50/70 dark:bg-gray-800/40"
      >
        <div className="space-y-6">
          <CitationCallout citation="Multiple studies">
            <p className="text-gray-700 dark:text-gray-300">
              Studies have shown improvements in survival over time for patients with metastatic breast cancer, 
              with median survival increasing across different time periods and study populations.
            </p>
          </CitationCallout>
          <SurvivalTrendsFigure />
          <SurvivalStudiesTable />
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
        className="bg-gray-50/70 dark:bg-gray-800/40"
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
          <CitationCallout citation="TODO: Add citation">
            {/* TODO: Add important clinical outcome information */}
          </CitationCallout>
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
