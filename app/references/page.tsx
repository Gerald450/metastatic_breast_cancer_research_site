import Section from '@/components/Section';
import ReferenceList from '@/components/ReferenceList';
import { references } from '@/lib/references';

export default function ReferencesPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
          References
        </h1>
      </div>

      <Section title="All References">
        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            Reference list for all sources used across the site. Use the filter
            buttons below to view references by section.
          </p>
          <ReferenceList references={references} />
        </div>
      </Section>
    </div>
  );
}
