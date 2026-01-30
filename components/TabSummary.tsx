import Link from 'next/link';
import type { SiteSection } from '@/lib/references';
import { references } from '@/lib/references';
import { getTabSummary } from '@/lib/tab-summaries';

interface TabSummaryProps {
  section: SiteSection;
  /** Optional: show a "Summary" heading above the block */
  showHeading?: boolean;
}

export default function TabSummary({ section, showHeading = true }: TabSummaryProps) {
  const { summary, sourceRefIds } = getTabSummary(section);
  const refs = sourceRefIds
    .map((id) => references.find((r) => r.id === id))
    .filter(Boolean) as typeof references;

  return (
    <div className="card card-hover mb-10 rounded-xl border border-gray-200 bg-gray-50/90 p-5 dark:border-gray-700 dark:bg-gray-800/60">
      {showHeading && (
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
          Summary for researchers
        </h2>
      )}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {summary}
      </p>
      {refs.length > 0 && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Key sources (from PDFs): </span>
          {refs.map((ref, idx) => (
            <span key={ref.id}>
              {idx > 0 && '; '}
              <Link
                href={`/references#${ref.id}`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                {ref.id}
              </Link>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
