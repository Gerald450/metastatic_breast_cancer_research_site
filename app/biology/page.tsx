import Section from '@/components/Section';
import Placeholder from '@/components/Placeholder';
import VisualPlaceholder from '@/components/VisualPlaceholder';

export default function BiologyPage() {
  return (
    <div className="py-12">
      <Section title="Biology">
        <div className="space-y-8">
          <Placeholder text="TODO: Add biology content (PLACEHOLDER)" />
          
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Molecular Mechanisms
            </h3>
            <VisualPlaceholder
              height="300px"
              label="TODO: Add molecular mechanism diagram"
            />
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Pathophysiology
            </h3>
            <Placeholder text="TODO: Add pathophysiology content" />
          </div>
        </div>
      </Section>
    </div>
  );
}

