import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';

export default function EpidemiologyPage() {
  return (
    <div className="py-12">
      <Section title="Epidemiology">
        <div className="space-y-8">
          <Placeholder text="TODO: Add epidemiology content" />
          
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Prevalence
            </h3>
            <VisualPlaceholder
              height="250px"
              label="TODO: Add prevalence chart or data visualization"
            />
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Incidence
            </h3>
            <VisualPlaceholder
              height="250px"
              label="TODO: Add incidence chart or data visualization"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

