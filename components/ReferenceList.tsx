'use client';

import { useState, useMemo } from 'react';
import type { Reference, SiteSection } from '@/lib/references';
import { getPdfUrl } from '@/lib/references';
import { getFigureSourceIdsForSection } from '@/lib/section-figure-sources';

interface ReferenceListProps {
  references: Reference[];
  filterBy?: SiteSection; // usedFor tag to filter by
  /** Ref IDs that must appear when filterBy is set (e.g. sources from figures on this tab). Ensures visuals' sources match the list. */
  ensureIds?: string[];
}

export default function ReferenceList({
  references,
  filterBy,
  ensureIds,
}: ReferenceListProps) {
  const [selectedFilter, setSelectedFilter] = useState<SiteSection | 'all' | undefined>(
    filterBy || undefined
  );

  // Ref IDs that must be included when showing this section (from figures on this tab)
  const requiredIds = useMemo(
    () => new Set(ensureIds ?? (filterBy ? getFigureSourceIdsForSection(filterBy) : [])),
    [filterBy, ensureIds]
  );

  // Get all unique usedFor tags
  const allTags = Array.from(
    new Set(references.flatMap((ref) => ref.usedFor))
  ).sort() as SiteSection[];

  // Filter references: (usedFor includes section) OR (id in requiredIds) so visuals' sources match the list
  const filteredReferences = useMemo(() => {
    if (!selectedFilter || selectedFilter === 'all') return references;
    const bySection = references.filter((ref) => ref.usedFor.includes(selectedFilter as SiteSection));
    const byFigureSources = references.filter((ref) => requiredIds.has(ref.id));
    const seen = new Set<string>();
    return [...bySection, ...byFigureSources].filter((ref) => {
      if (seen.has(ref.id)) return false;
      seen.add(ref.id);
      return true;
    });
  }, [references, selectedFilter, requiredIds]);

  return (
    <div className="space-y-4">
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              (!selectedFilter || selectedFilter === 'all')
                ? 'bg-gray-900 text-white shadow-sm dark:bg-gray-100 dark:text-gray-900'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedFilter(tag as SiteSection)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                selectedFilter === tag
                  ? 'bg-gray-900 text-white shadow-sm dark:bg-gray-100 dark:text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {filteredReferences.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No references found for the selected filter.
          </p>
        ) : (
          <ol className="list-decimal space-y-4 pl-6">
            {filteredReferences.map((ref) => (
              <li key={ref.id} id={ref.id} className="pl-2 scroll-mt-24">
                <div className="space-y-1">
                  <div>
                    <span
                      className="mr-2 inline-flex items-center rounded bg-gray-200 px-2 py-0.5 font-mono text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      title="Use this ID to match sources cited in figures and tables"
                    >
                      {ref.id}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {ref.title}
                    </span>
                    {ref.authors && (
                      <span className="text-gray-700 dark:text-gray-300">
                        {' '}
                        — {ref.authors}
                      </span>
                    )}
                    {ref.year && (
                      <span className="text-gray-600 dark:text-gray-400">
                        {' '}
                        ({ref.year})
                      </span>
                    )}
                    {ref.journal && (
                      <span className="text-gray-600 dark:text-gray-400">
                        . {ref.journal}
                      </span>
                    )}
                  </div>
                  <div className="text-sm">
                    {getPdfUrl(ref) ? (
                      <a
                        href={getPdfUrl(ref)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                      >
                        {ref.filename}
                      </a>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          {ref.filename}
                        </span>
                        <span className="text-xs italic text-gray-500 dark:text-gray-500">
                          PDF not yet available
                        </span>
                      </div>
                    )}
                  </div>
                  {ref.usedFor.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {ref.usedFor.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {ref.highlightNotes && ref.highlightNotes.length > 0 && (
                    <div className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      {ref.highlightNotes.map((note, idx) => (
                        <div key={idx} className="pl-2">
                          <span className="font-medium">{note.section}</span>
                          {note.pages && note.pages !== '—' && (
                            <span> (pages {note.pages})</span>
                          )}
                          : {note.excerptHint}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
