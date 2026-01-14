import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';

export default function TreatmentPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
          Treatment
        </h1>
      </div>

      <Section title="Therapy Overview">
        <div className="space-y-6">
          <Placeholder
            label="Treatment approach overview (planned)"
            notes={[
              'General treatment principles',
              'Treatment modality categories',
              'Multidisciplinary approach',
            ]}
          />
          <VisualPlaceholder
            title="Treatment modality overview diagram"
            type="diagram"
            description="Comprehensive overview of available treatment approaches and their relationships"
          />
        </div>
      </Section>

      <Section title="Targeted Therapy">
        <div className="space-y-6">
          <Placeholder
            label="Targeted therapeutic approaches (planned)"
            notes={[
              'Molecular targets and pathways',
              'Targeted agent mechanisms',
              'Biomarker-guided therapy',
            ]}
          />
          <VisualPlaceholder
            title="Targeted therapy pathways chart"
            type="chart"
            description="Visualization of targeted therapy approaches and their molecular targets"
          />
        </div>
      </Section>

      <Section title="Treatment Sequencing">
        <div className="space-y-6">
          <Placeholder
            label="Treatment sequencing strategies (planned)"
            notes={[
              'First-line and subsequent therapies',
              'Sequencing algorithms',
              'Treatment decision frameworks',
            ]}
          />
          <VisualPlaceholder
            title="Treatment sequencing algorithm"
            type="diagram"
            description="Decision tree showing recommended treatment sequencing based on patient factors"
          />
        </div>
      </Section>

      <Section title="Treatment Modalities">
        <div className="space-y-6">
          <Placeholder
            label="Available treatment options"
            notes={[
              'Surgical approaches',
              'Systemic therapy options',
              'Supportive care measures',
            ]}
          />
          <VisualPlaceholder
            title="Treatment options comparison table"
            type="table"
            description="Comparative overview of different treatment modalities and their characteristics"
          />
        </div>
      </Section>

      <Section title="References used on this page">
        <div className="space-y-2">
          <Placeholder
            label="Reference list placeholder"
            notes={[
              'TODO: Add therapy overview study citations',
              'TODO: Add targeted therapy sources',
              'TODO: Add treatment sequencing references',
            ]}
          />
        </div>
      </Section>
    </div>
  );
}
