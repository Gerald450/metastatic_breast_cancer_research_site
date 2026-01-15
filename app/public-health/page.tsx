import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';
import ReferenceList from '@/components/ReferenceList';
import { references } from '@/lib/references';

export default function PublicHealthPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
          Public Health
        </h1>
      </div>

      <Section title="Public Health Impact">
        <div className="space-y-6">
          <Placeholder
            label="Population health burden"
            notes={[
              'Overall disease burden metrics',
              'Healthcare system impacts',
              'Economic and social costs',
            ]}
          />
          <VisualPlaceholder
            title="Public health burden visualization"
            type="chart"
            description="Comprehensive view of disease burden and healthcare utilization"
          />
        </div>
      </Section>

      <Section title="Screening and Early Detection">
        <div className="space-y-6">
          <Placeholder
            label="Screening programs and strategies"
            notes={[
              'Current screening approaches',
              'Early detection methods',
              'Screening program effectiveness',
            ]}
          />
        </div>
      </Section>

      <Section title="Prevention Strategies">
        <div className="space-y-6">
          <Placeholder
            label="Prevention and risk reduction"
            notes={[
              'Primary prevention approaches',
              'Risk factor modification',
              'Population-level interventions',
            ]}
          />
        </div>
      </Section>

      <Section title="Healthcare Resource Utilization">
        <div className="space-y-6">
          <VisualPlaceholder
            title="Healthcare utilization patterns table"
            type="table"
            description="Resource utilization metrics including hospitalizations, procedures, and costs"
          />
          <Placeholder
            label="Resource utilization analysis"
            notes={[
              'Healthcare service utilization',
              'Cost and resource allocation',
              'System capacity considerations',
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
          <ReferenceList references={references} filterBy="public-health" />
        </div>
      </Section>
    </div>
  );
}
