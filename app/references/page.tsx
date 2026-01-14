import Section from '@/components/Section';
import ReferenceList from '@/components/ReferenceList';

export default function ReferencesPage() {
  // TODO: Replace with actual references
  const references = [
    {
      id: '1',
      citation: 'TODO: Add reference citation',
      year: 2024,
    },
    {
      id: '2',
      citation: 'TODO: Add reference citation',
      year: 2023,
    },
  ];

  return (
    <div className="py-12">
      <Section title="References">
        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            {/* TODO: Add references page introduction */}
          </p>
          <ReferenceList references={references} />
        </div>
      </Section>
    </div>
  );
}

