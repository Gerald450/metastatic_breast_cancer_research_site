import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';
import CitationCallout from '@/components/CitationCallout';
import ReferenceList from '@/components/ReferenceList';
import { references } from '@/lib/references';

export default function ClinicalOutcomesPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
          Clinical Outcomes
        </h1>
      </div>

      <Section title="Survival Outcomes">
        <div className="space-y-6">
          <Placeholder
            label="Survival rate analysis"
            notes={[
              'Overall survival rates',
              'Disease-specific survival',
              'Progression-free survival',
            ]}
          />
          <VisualPlaceholder
            title="Survival curves over time"
            type="chart"
            description="Kaplan-Meier survival curves showing overall and progression-free survival"
          />
          {/* TODO: replace with final chart */}
        </div>
      </Section>

      <Section title="Disease Progression">
        <div className="space-y-6">
          <Placeholder
            label="Progression patterns and timelines"
            notes={[
              'Time to progression metrics',
              'Patterns of disease advancement',
              'Factors influencing progression',
            ]}
          />
          <VisualPlaceholder
            title="Progression timeline diagram"
            type="diagram"
            description="Visual representation of typical disease progression pathways"
          />
        </div>
      </Section>

      <Section title="Quality of Life Measures">
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
