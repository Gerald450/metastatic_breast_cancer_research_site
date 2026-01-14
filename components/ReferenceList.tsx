interface Reference {
  id: string;
  citation: string;
  year?: number;
}

interface ReferenceListProps {
  references: Reference[];
}

export default function ReferenceList({ references }: ReferenceListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        References
      </h3>
      <ol className="list-decimal space-y-3 pl-6 text-sm text-gray-700 dark:text-gray-300">
        {references.map((ref) => (
          <li key={ref.id} className="pl-2">
            {ref.citation}
            {ref.year && <span className="text-gray-500"> ({ref.year})</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

