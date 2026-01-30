'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

export type FigureStatus = 'Verified' | 'Needs Review' | 'Draft';

interface FigureProps {
  title: string;
  description?: string;
  children: ReactNode;
  caption?: string;
  sources: string[]; // Array of reference IDs (e.g., ['ref-001', 'ref-002'])
  status?: FigureStatus;
  className?: string;
}

export default function Figure({
  title,
  description,
  children,
  caption,
  sources,
  status = 'Draft',
  className = '',
}: FigureProps) {
  const statusStyles = {
    Verified: 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-300/20',
    'Needs Review': 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/20 dark:text-amber-300 dark:ring-amber-300/20',
    Draft: 'bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-800/50 dark:text-gray-300 dark:ring-gray-300/20',
  };

  return (
    <figure className={`my-8 ${className}`}>
      {/* Title and Description */}
      <div className="mb-4">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold leading-tight text-gray-900 dark:text-white">
            {title}
          </h3>
          <span
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>
        {description && (
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      {/* Chart Area */}
      <div className="card rounded-xl border border-gray-200 bg-white p-4 sm:p-5 dark:border-gray-700 dark:bg-gray-800/50">
        {children}
      </div>

      {/* Caption and Sources */}
      <figcaption className="mt-4 space-y-2">
        {caption && (
          <p className="text-sm italic leading-relaxed text-gray-600 dark:text-gray-400">
            {caption}
          </p>
        )}
        {sources.length > 0 && (
          <div className="text-xs text-gray-500 dark:text-gray-500">
            <span className="font-medium">Sources:</span>{' '}
            <span className="font-mono">
              {sources.map((sourceId, i) => (
                <span key={sourceId}>
                  {i > 0 && ', '}
                  <Link
                    href={`/references#${sourceId}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {sourceId}
                  </Link>
                </span>
              ))}
            </span>
          </div>
        )}
      </figcaption>
    </figure>
  );
}

