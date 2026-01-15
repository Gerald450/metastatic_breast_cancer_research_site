'use client';

import { useState } from 'react';
import type { Reference } from '@/lib/references';

interface ReferenceListProps {
  references: Reference[];
  filterBy?: string; // usedFor tag to filter by
}

export default function ReferenceList({
  references,
  filterBy,
}: ReferenceListProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(
    filterBy
  );

  // Get all unique usedFor tags
  const allTags = Array.from(
    new Set(references.flatMap((ref) => ref.usedFor))
  ).sort();

  // Filter references if a tag is selected
  const filteredReferences =
    selectedFilter && selectedFilter !== 'all'
      ? references.filter((ref) => ref.usedFor.includes(selectedFilter))
      : references;

  return (
    <div className="space-y-4">
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              (!selectedFilter || selectedFilter === 'all')
                ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedFilter(tag)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedFilter === tag
                  ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
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
              <li key={ref.id} className="pl-2">
                <div className="space-y-1">
                  <div>
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
                    {ref.localUrl ? (
                      <a
                        href={ref.localUrl}
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
                          TODO: add local PDF link
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
                          {typeof note === 'string' ? (
                            <span>{note}</span>
                          ) : (
                            <>
                              <span className="font-medium">{note.section}</span>
                              {note.pages && (
                                <span> (pages {note.pages})</span>
                              )}
                              : {note.excerptHint}
                            </>
                          )}
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
