'use client';

import { useMemo } from 'react';
import type { Reference } from '@/lib/references';
import { getPdfUrl } from '@/lib/references';
import {
  allInsightLines,
  inferDocumentKind,
  labelForSection,
  topInsightLines,
} from '@/lib/reference-ui';
import type { SiteSection } from '@/lib/references';

function IconPdf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 2h7l5 5v15H6V2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M13 2v6h6M8 12h8M8 16h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDoc({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconReview({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16v12H4V6zM8 3h8v3H8V3zM8 18h3v2H8v-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function kindLabel(kind: ReturnType<typeof inferDocumentKind>): string {
  switch (kind) {
    case 'review':
      return 'Review';
    case 'synthesis':
      return 'Synthesis';
    case 'note':
      return 'Source note';
    default:
      return 'Research';
  }
}

const TAG_RING: Record<SiteSection, string> = {
  definition: 'ring-pink-200/50 bg-pink-50/90 text-pink-900 dark:bg-pink-950/40 dark:text-pink-100 dark:ring-pink-500/20',
  epidemiology: 'ring-amber-200/50 bg-amber-50/90 text-amber-900 dark:bg-amber-950/35 dark:text-amber-100 dark:ring-amber-500/20',
  demographics: 'ring-violet-200/50 bg-violet-50/90 text-violet-900 dark:bg-violet-950/35 dark:text-violet-100 dark:ring-violet-500/20',
  'clinical-outcomes':
    'ring-sky-200/50 bg-sky-50/90 text-sky-900 dark:bg-sky-950/35 dark:text-sky-100 dark:ring-sky-500/20',
  'public-health': 'ring-emerald-200/50 bg-emerald-50/90 text-emerald-900 dark:bg-emerald-950/35 dark:text-emerald-100 dark:ring-emerald-500/20',
  biology: 'ring-rose-200/50 bg-rose-50/90 text-rose-900 dark:bg-rose-950/35 dark:text-rose-100 dark:ring-rose-500/20',
  treatment: 'ring-indigo-200/50 bg-indigo-50/90 text-indigo-900 dark:bg-indigo-950/35 dark:text-indigo-100 dark:ring-indigo-500/20',
};

type ReferenceCardProps = {
  refData: Reference;
  expanded: boolean;
  onToggle: () => void;
  isSpotlight: boolean;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
};

export default function ReferenceCard({
  refData,
  expanded,
  onToggle,
  isSpotlight,
  isBookmarked,
  onBookmarkToggle,
}: ReferenceCardProps) {
  const pdfUrl = getPdfUrl(refData);
  const kind = inferDocumentKind(refData);
  const shortBullets = useMemo(() => topInsightLines(refData, 3), [refData]);
  const fullLines = useMemo(() => allInsightLines(refData), [refData]);

  const usedSections = useMemo(() => {
    const map = new Map<string, { pages?: string }>();
    for (const n of refData.highlightNotes ?? []) {
      const k = n.section;
      if (!map.has(k)) map.set(k, { pages: n.pages });
    }
    return Array.from(map.entries());
  }, [refData]);

  const KindIcon =
    kind === 'review' || kind === 'synthesis' ? IconReview : kind === 'note' ? IconDoc : IconDoc;

  const titleNode = pdfUrl ? (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group/title text-left font-serif-heading text-base font-semibold text-gray-900 transition-colors hover:text-pink-700 sm:text-lg dark:text-white dark:group-hover:text-pink-300"
      onClick={(e) => e.stopPropagation()}
    >
      {refData.title}
    </a>
  ) : (
    <span className="font-serif-heading text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
      {refData.title}
    </span>
  );

  return (
    <article
      id={refData.id}
      className={`card group scroll-mt-24 overflow-hidden transition-[box-shadow,transform] duration-200 ${
        isSpotlight
          ? 'ring-1 ring-pink-400/35 dark:ring-pink-400/25'
          : ''
      } `}
    >
      <div className="p-4 sm:p-5">
        <div className="flex gap-3">
          <div
            className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800/80 dark:text-gray-400"
            title={kindLabel(kind)}
          >
            {kind === 'article' || kind === 'note' ? (
              <IconDoc className="h-5 w-5" />
            ) : (
              <KindIcon className="h-5 w-5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                {titleNode}
                <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {refData.authors && <span className="text-gray-600 dark:text-gray-300">{refData.authors}</span>}
                  {refData.authors && (refData.year || refData.journal) && (
                    <span className="text-gray-400"> · </span>
                  )}
                  {refData.year && <span>{refData.year}</span>}
                  {refData.year && refData.journal && <span className="text-gray-400"> · </span>}
                  {refData.journal && <span className="italic">{refData.journal}</span>}
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1">
                <span
                  className="select-none rounded border border-gray-200 bg-white/80 px-1.5 py-0.5 font-mono text-[10px] text-gray-500 sm:text-xs dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-400"
                  title="Citation ID in figures and tables"
                >
                  {refData.id}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmarkToggle();
                  }}
                  className={`rounded-lg p-1.5 transition-colors ${
                    isBookmarked
                      ? 'text-pink-600 dark:text-pink-400'
                      : 'text-gray-400 hover:bg-gray-100 hover:text-pink-600 dark:hover:bg-gray-800 dark:hover:text-pink-400'
                  }`}
                  title={isBookmarked ? 'Remove from saved' : 'Save for later'}
                  aria-pressed={isBookmarked}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    {isBookmarked ? (
                      <path d="M4 3h16v18l-8-4-8 4V3z" />
                    ) : (
                      <path
                        d="M4 3h16v18l-8-4-8 4V3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    )}
                  </svg>
                  <span className="sr-only">{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

            {isSpotlight && (
              <p className="mt-2 inline-flex items-center gap-1 rounded-md bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-950/40 dark:text-pink-200">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-500" aria-hidden />
                Frequently used on this site
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5" role="list" aria-label="Topic tags">
              {refData.usedFor.map((tag) => (
                <span
                  key={tag}
                  role="listitem"
                  className={`inline-flex max-w-full truncate rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${TAG_RING[tag]}`}
                >
                  {labelForSection(tag)}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              App coverage: {refData.usedFor.length} site section
              {refData.usedFor.length === 1 ? '' : 's'}
            </p>

            {!expanded && shortBullets.length > 0 && (
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300">
                {shortBullets.map((line) => (
                  <li key={line} className="leading-snug [text-wrap:balance]">
                    {line}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-700/60">
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-pink-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 dark:bg-pink-600 dark:hover:bg-pink-500"
                >
                  <IconPdf className="h-4 w-4" aria-hidden />
                  View PDF
                </a>
              )}
              {!pdfUrl && (
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <IconDoc className="h-4 w-4 opacity-60" aria-hidden />
                  PDF not available
                </span>
              )}
              <button
                type="button"
                onClick={onToggle}
                className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                aria-expanded={expanded}
              >
                {expanded ? 'Show less' : 'Full details'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="space-y-4 border-t border-gray-100 bg-gray-50/60 px-4 py-4 dark:border-gray-700/60 dark:bg-gray-900/30 sm:px-5">
          {fullLines.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                All highlights
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                {fullLines.map((row, i) => (
                  <li
                    key={i}
                    className="rounded-md border border-gray-200/80 bg-white/60 px-3 py-2 dark:border-gray-600/60 dark:bg-gray-800/40"
                  >
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        {row.section}
                      </span>
                      {row.pages && row.pages !== '—' && (
                        <span> · p. {row.pages}</span>
                      )}
                    </div>
                    <p className="mt-0.5 leading-relaxed">{row.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {usedSections.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Used in sections
              </h4>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {usedSections.map(([name, meta]) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-700 dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-200"
                  >
                    {name}
                    {meta?.pages && meta.pages !== '—' && (
                      <span className="text-gray-500">· {meta.pages}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {refData.doi && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              DOI:{' '}
              <a
                href={`https://doi.org/${refData.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-blue-600 hover:underline dark:text-blue-400"
              >
                {refData.doi}
              </a>
            </p>
          )}
        </div>
      )}
    </article>
  );
}
