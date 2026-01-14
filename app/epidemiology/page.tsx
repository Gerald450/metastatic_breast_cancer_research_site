import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';

export default function EpidemiologyPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
          Epidemiology
        </h1>
      </div>

      <Section title="Prevalence and Incidence">
        <div className="space-y-6">
          <Placeholder
            label="Population-level occurrence data"
            notes={[
              'Overall prevalence estimates',
              'Incidence rates and trends',
              'Regional and global variations',
            ]}
          />
          <VisualPlaceholder
            title="Prevalence trends over time"
            type="chart"
            description="Temporal trends in prevalence rates across different populations"
          />
        </div>
      </Section>

      <Section title="Geographic Distribution">
        <div className="space-y-6">
          <VisualPlaceholder
            title="Geographic distribution map"
            type="diagram"
            description="Global and regional distribution patterns"
          />
          <Placeholder
            label="Geographic variation analysis"
            notes={[
              'Regional differences in occurrence',
              'Factors influencing geographic patterns',
              'International comparison data',
            ]}
          />
        </div>
      </Section>

      <Section title="Temporal Trends">
        <div className="space-y-6">
          <Placeholder
            label="Changes over time"
            notes={[
              'Historical trends and patterns',
              'Recent changes in incidence',
              'Projected future trends',
            ]}
          />
          <VisualPlaceholder
            title="Incidence trends chart"
            type="chart"
            description="Long-term incidence trends and projections"
          />
        </div>
      </Section>

      <Section title="Epidemiological Factors">
        <div className="space-y-6">
          <Placeholder
            label="Risk factors and associations"
            notes={[
              'Identified risk factors',
              'Environmental and lifestyle associations',
              'Genetic and familial patterns',
            ]}
          />
        </div>
      </Section>

      <Section title="References used on this page">
        <div className="space-y-2">
          <Placeholder
            label="Reference list placeholder"
            notes={[
              'TODO: Add prevalence and incidence study citations',
              'TODO: Add geographic distribution sources',
              'TODO: Add temporal trend references',
            ]}
          />
        </div>
      </Section>
    </div>
  );
}
