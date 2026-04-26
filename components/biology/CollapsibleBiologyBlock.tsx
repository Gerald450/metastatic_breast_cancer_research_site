import { ReactNode } from 'react';

type Props = {
  title: string;
  id?: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

/**
 * Collapsible content block; uses native <details> for accessibility and zero JS.
 */
export default function CollapsibleBiologyBlock({ title, id, children, defaultOpen }: Props) {
  return (
    <details
      id={id}
      className="group my-6 rounded-xl border border-gray-200/90 bg-white/60 shadow-sm open:shadow dark:border-gray-600 dark:bg-gray-800/40"
      open={defaultOpen}
    >
      <summary className="cursor-pointer list-none rounded-xl px-4 py-3 font-medium text-gray-900 dark:text-white marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2 text-sm sm:text-base">
          <span>{title}</span>
          <span className="shrink-0 text-gray-400 transition-transform group-open:rotate-180 dark:text-gray-500">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </span>
      </summary>
      <div className="border-t border-gray-100 px-4 pb-4 pt-0 text-sm leading-relaxed text-gray-700 dark:border-gray-600/60 dark:text-gray-300 sm:text-base sm:pb-5">
        {children}
      </div>
    </details>
  );
}
