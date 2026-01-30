import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import ReferenceList from '@/components/ReferenceList';
import TabSummary from '@/components/TabSummary';
import { references } from '@/lib/references';
import PageHero from '@/components/PageHero';
import DefinitionIllustration from '@/components/illustrations/DefinitionIllustration';
import ClassificationSchemaDiagram from '@/components/figures/ClassificationSchemaDiagram';

export default function DefinitionPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <PageHero
          title="Definition"
          description="Clinical definition, diagnostic criteria, classification systems, and key terminology for metastatic breast cancer."
          theme="definition"
          illustration={<DefinitionIllustration />}
        />
        <TabSummary section="definition" />
      </div>

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

      <Section
        title="Classification Systems"
        subtitle="Staging and subtypes"
        className="bg-gray-50/70 dark:bg-gray-800/40"
      >
        <div className="space-y-6">
          <ClassificationSchemaDiagram />
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
