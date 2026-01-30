'use client';

/**
 * Abstract “evidence coverage” map: stylized globe with regional nodes.
 * Replaces the Geographic distribution map VisualPlaceholder on the Epidemiology page.
 */
export default function GeographicEvidenceVisual() {
  return (
    <figure className="my-8">
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
        <div className="mx-auto flex max-w-md justify-center">
          <svg
            viewBox="0 0 200 120"
            className="h-48 w-full max-w-xs text-emerald-500/60 dark:text-teal-500/50"
            aria-hidden
          >
            <defs>
              <linearGradient id="geo-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Stylized continents / regions */}
            <ellipse cx="100" cy="60" rx="85" ry="50" fill="url(#geo-fill)" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <path d="M20 60 H180" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <path d="M55 25 Q100 18 145 25" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <path d="M55 95 Q100 102 145 95" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            {/* Regional evidence nodes */}
            <circle cx="55" cy="35" r="8" fill="currentColor" opacity="0.5" />
            <circle cx="100" cy="45" r="10" fill="currentColor" opacity="0.6" />
            <circle cx="145" cy="40" r="7" fill="currentColor" opacity="0.45" />
            <circle cx="70" cy="75" r="8" fill="currentColor" opacity="0.5" />
            <circle cx="130" cy="70" r="9" fill="currentColor" opacity="0.55" />
          </svg>
        </div>
        <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
          Evidence coverage by region; specific data is from US, UK, and global registries where noted elsewhere.
        </p>
      </div>
    </figure>
  );
}
