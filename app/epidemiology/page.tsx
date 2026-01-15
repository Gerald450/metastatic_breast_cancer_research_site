import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';
import ReferenceList from '@/components/ReferenceList';
import { references } from '@/lib/references';
import SurvivalTrendsFigure from '@/components/figures/SurvivalTrendsFigure';
import SurvivorshipBurdenFigure from '@/components/figures/SurvivorshipBurdenFigure';

export default function EpidemiologyPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
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
          <SurvivorshipBurdenFigure />
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
          <SurvivalTrendsFigure />
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

      <Section title="References Used">
        <div className="space-y-4">
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            Page highlights are listed as notes and must be verified against the
            PDF pages.
          </p>
          <ReferenceList references={references} filterBy="epidemiology" />
        </div>
      </Section>
    </div>
  );
}
