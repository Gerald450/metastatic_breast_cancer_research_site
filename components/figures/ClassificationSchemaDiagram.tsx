'use client';

/**
 * Conceptual diagram: Definition → Diagnostic criteria → Classification → Terminology.
 * Replaces the Classification schema VisualPlaceholder on the Definition page.
 */
export default function ClassificationSchemaDiagram() {
  return (
    <figure className="my-8">
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Node label="Definition" />
          <Arrow />
          <Node label="Diagnostic criteria" />
          <Arrow />
          <Node label="Classification" />
          <Arrow />
          <Node label="Terminology" />
        </div>
        <p className="mt-6 text-center text-sm italic text-gray-500 dark:text-gray-400">
          Conceptual flow: from clinical definition through criteria, staging, and nomenclature.
        </p>
      </div>
    </figure>
  );
}

function Node({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-indigo-200 bg-white px-5 py-3 shadow-sm dark:border-indigo-800/50 dark:bg-gray-800/50">
      <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
    </div>
  );
}

function Arrow() {
  return (
    <svg className="h-5 w-6 shrink-0 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}
