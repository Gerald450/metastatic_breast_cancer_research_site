import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';

export default function BiologyPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
          Biology
        </h1>
      </div>

      <Section title="Metastatic Cascade">
        <div className="space-y-6">
          <Placeholder
            label="Metastatic cascade mechanisms (planned)"
            notes={[
              'Invasion and migration processes',
              'Intravasation and circulation',
              'Extravasation and colonization',
            ]}
          />
          <VisualPlaceholder
            title="Metastatic cascade diagram"
            type="diagram"
            description="Step-by-step visualization of the metastatic process from primary tumor to distant sites"
          />
        </div>
      </Section>

      <Section title="Tumor Evolution">
        <div className="space-y-6">
          <Placeholder
            label="Tumor evolution patterns (planned)"
            notes={[
              'Clonal evolution dynamics',
              'Temporal progression patterns',
              'Evolutionary pressures and selection',
            ]}
          />
          <VisualPlaceholder
            title="Tumor evolution timeline"
            type="diagram"
            description="Visual representation of tumor development and evolution over time"
          />
        </div>
      </Section>

      <Section title="Tumor Heterogeneity">
        <div className="space-y-6">
          <Placeholder
            label="Heterogeneity mechanisms (planned)"
            notes={[
              'Spatial and temporal heterogeneity',
              'Intratumoral diversity',
              'Intertumoral variations',
            ]}
          />
        </div>
      </Section>

      <Section title="Resistance Mechanisms">
        <div className="space-y-6">
          <Placeholder
            label="Treatment resistance biology (planned)"
            notes={[
              'Primary and acquired resistance',
              'Molecular resistance pathways',
              'Overcoming resistance strategies',
            ]}
          />
          <VisualPlaceholder
            title="Resistance mechanism pathways"
            type="diagram"
            description="Diagram showing various molecular pathways involved in treatment resistance"
          />
        </div>
      </Section>

      <Section title="References used on this page">
        <div className="space-y-2">
          <Placeholder
            label="Reference list placeholder"
            notes={[
              'TODO: Add metastatic cascade study citations',
              'TODO: Add tumor evolution sources',
              'TODO: Add heterogeneity and resistance references',
            ]}
          />
        </div>
      </Section>
    </div>
  );
}
