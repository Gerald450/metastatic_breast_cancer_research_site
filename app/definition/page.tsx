import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';
import ReferenceList from '@/components/ReferenceList';
import { references } from '@/lib/references';

export default function DefinitionPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
          Definition
        </h1>
      </div>

      {/* TODO: add disease background section */}
      <Section title="Overview" subtitle="Understanding the condition">
        <div className="space-y-6">
          <Placeholder
            label="Definition and classification"
            notes={[
              'Clinical definition and diagnostic criteria',
              'Classification systems and staging',
              'Key terminology and nomenclature',
            ]}
          />
        </div>
      </Section>

      <Section title="Diagnostic Criteria">
        <div className="space-y-6">
          <Placeholder
            label="Diagnostic requirements and standards"
            notes={[
              'Required clinical features',
              'Laboratory and imaging criteria',
              'Differential diagnosis considerations',
            ]}
          />
        </div>
      </Section>

      <Section title="Classification Systems">
        <div className="space-y-6">
          <VisualPlaceholder
            title="Classification schema diagram"
            type="diagram"
            description="Visual representation of classification systems and their relationships"
          />
          <Placeholder
            label="Classification framework details"
            notes={[
              'Primary classification systems',
              'Subtypes and variants',
              'Evolution of classification over time',
            ]}
          />
        </div>
      </Section>

      <Section title="Terminology and Nomenclature">
        <div className="space-y-6">
          <Placeholder
            label="Key terms and definitions"
            notes={[
              'Standard terminology',
              'Historical terms and updates',
              'International nomenclature standards',
            ]}
          />
        </div>
      </Section>

      <Section title="References Used">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the
            PDF pages.
          </p>
          <ReferenceList references={references} filterBy="definition" />
        </div>
      </Section>
    </div>
  );
}
