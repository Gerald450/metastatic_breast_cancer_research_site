'use client';

/**
 * Conceptual disease progression: Primary → Recurrence → Metastatic.
 * Replaces the Progression timeline VisualPlaceholder on the Clinical Outcomes page.
 */
export default function ProgressionPathwayDiagram() {
  return (
    <figure className="my-8">
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <ProgressionNode label="Primary breast cancer" sub="Stage I–III" />
          <ProgressionArrow />
          <ProgressionNode label="Recurrence" sub="Local / regional" />
          <ProgressionArrow />
          <ProgressionNode label="Metastatic (MBC)" sub="Stage IV" highlight />
        </div>
        <p className="mt-6 text-center text-sm italic text-gray-500 dark:text-gray-400">
          Simplified progression pathway; many patients present with de novo stage IV.
        </p>
      </div>
    </figure>
  );
}

function ProgressionNode({
  label,
  sub,
  highlight,
}: {
  label: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-5 py-3 shadow-sm ${
        highlight
          ? 'border-rose-300 bg-rose-50 dark:border-rose-700/50 dark:bg-rose-900/20'
          : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800/50'
      }`}
    >
      <span className={`block text-sm font-medium ${highlight ? 'text-rose-900 dark:text-rose-200' : 'text-gray-900 dark:text-white'}`}>
        {label}
      </span>
      {sub && (
        <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">{sub}</span>
      )}
    </div>
  );
}

function ProgressionArrow() {
  return (
    <svg className="h-6 w-8 shrink-0 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}
