import { references } from '@/lib/references';
import { ONLINE_SOURCES } from '@/lib/online-sources';

interface CitationCalloutProps {
  // New format
  claim?: string;
  sources?: string[]; // Reference IDs (PDF refs)
  onlineSourceIds?: string[]; // ONLINE_SOURCES ids
  pageRanges?: string;
  // Legacy format (for backward compatibility)
  children?: React.ReactNode;
  citation?: string;
}

export default function CitationCallout({
  claim,
  sources,
  onlineSourceIds,
  pageRanges,
  children,
  citation,
}: CitationCalloutProps) {
  // Legacy format support
  if (citation && !claim) {
    return (
      <div className="my-6 rounded-xl border-l-4 border-blue-500 bg-blue-50/90 p-4 transition-shadow duration-200 dark:border-blue-400 dark:bg-blue-900/20">
        <div className="text-base text-gray-700 dark:text-gray-300">{children}</div>
        {citation && (
          <div className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            <em>— {citation}</em>
          </div>
        )}
      </div>
    );
  }

  // New format: need claim and at least one source type
  const hasRefSources = sources && sources.length > 0;
  const hasOnlineSources = onlineSourceIds && onlineSourceIds.length > 0;
  if (!claim || (!hasRefSources && !hasOnlineSources)) {
    return null;
  }

  const sourceRefs = (sources ?? [])
    .map((id) => references.find((ref) => ref.id === id))
    .filter(Boolean);
  const onlineRefs = (onlineSourceIds ?? [])
    .map((id) => Object.values(ONLINE_SOURCES).find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="my-6 rounded-xl border-l-4 border-blue-500 bg-blue-50/90 p-4 transition-shadow duration-200 dark:border-blue-400 dark:bg-blue-900/20">
      <div className="text-base text-gray-700 dark:text-gray-300">
        <p className="font-medium leading-relaxed">{claim}</p>
        {children && <div className="mt-2">{children}</div>}
      </div>
      <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {sourceRefs.length > 0 && (
          <div>
            <span className="font-medium">Sources:</span>{' '}
            {sourceRefs.map((ref, idx) => (
              <span key={ref!.id}>
                {idx > 0 && ', '}
                <a
                  href={`#${ref!.id}`}
                  className="font-medium text-blue-600 hover:text-blue-800 underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {ref!.id}
                </a>{' '}
                ({ref!.title})
              </span>
            ))}
          </div>
        )}
        {onlineRefs.length > 0 && (
          <div>
            <span className="font-medium">{sourceRefs.length > 0 ? 'Online:' : 'Sources:'}</span>{' '}
            {onlineRefs.map((src, idx) => (
              <span key={src!.id}>
                {idx > 0 && ', '}
                <a
                  href={src!.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800 underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {src!.name}
                </a>
              </span>
            ))}
          </div>
        )}
        {pageRanges && (
          <div>
            <span className="font-medium">Pages:</span> {pageRanges}
          </div>
        )}
        {hasRefSources && (
          <div className="mt-2 text-xs italic text-gray-600 dark:text-gray-400">
            Verify in PDF
          </div>
        )}
      </div>
    </div>
  );
}
