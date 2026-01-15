import { references } from '@/lib/references';

interface CitationCalloutProps {
  // New format
  claim?: string;
  sources?: string[]; // Reference IDs
  pageRanges?: string;
  // Legacy format (for backward compatibility)
  children?: React.ReactNode;
  citation?: string;
}

export default function CitationCallout({
  claim,
  sources,
  pageRanges,
  children,
  citation,
}: CitationCalloutProps) {
  // Legacy format support
  if (citation && !claim) {
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

  // New format
  if (!claim || !sources) {
    return null;
  }

  const sourceRefs = sources
    .map((id) => references.find((ref) => ref.id === id))
    .filter(Boolean);

  return (
    <div className="my-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-900/20">
      <div className="text-gray-800 dark:text-gray-200">
        <p className="font-medium">{claim}</p>
        {children && <div className="mt-2">{children}</div>}
      </div>
      <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <span className="font-medium">Sources:</span>{' '}
          {sourceRefs.map((ref, idx) => (
            <span key={ref!.id}>
              {idx > 0 && ', '}
              <span className="font-medium">{ref!.id}</span> ({ref!.title})
            </span>
          ))}
        </div>
        {pageRanges && (
          <div>
            <span className="font-medium">Pages:</span> {pageRanges}
          </div>
        )}
        <div className="mt-2 text-xs italic text-gray-600 dark:text-gray-400">
          Verify in PDF
        </div>
      </div>
    </div>
  );
}
