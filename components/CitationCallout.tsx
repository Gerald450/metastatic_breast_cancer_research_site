interface CitationCalloutProps {
  children: React.ReactNode;
  citation?: string;
}

export default function CitationCallout({ children, citation }: CitationCalloutProps) {
  return (
    <div className="my-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-900/20">
      <div className="text-gray-800 dark:text-gray-200">{children}</div>
      {citation && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <em>— {citation}</em>
        </div>
      )}
    </div>
  );
}

