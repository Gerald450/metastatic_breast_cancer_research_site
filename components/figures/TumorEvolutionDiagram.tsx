'use client';

/**
 * Simple diagram: tumor evolution over time—founding clone, clonal expansion,
 * branching subclones, and selection pressures.
 */
export default function TumorEvolutionDiagram() {
  return (
    <figure className="my-8">
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
        <div className="flex flex-col items-center">
          <svg
            viewBox="0 0 320 140"
            className="w-full max-w-md text-violet-500 dark:text-violet-400"
            aria-hidden
          >
            <defs>
              <linearGradient id="evol-grad-a" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="evol-grad-b" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="evol-grad-c" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Time axis */}
            <line x1="20" y1="70" x2="300" y2="70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
            <text x="160" y="95" textAnchor="middle" fill="currentColor" style={{ fontSize: 10 }} opacity={0.6}>
              Time
            </text>

            {/* Founder clone */}
            <circle cx="40" cy="70" r="12" fill="url(#evol-grad-a)" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
            <text x="40" y="105" textAnchor="middle" fill="currentColor" style={{ fontSize: 9 }} opacity={0.7}>
              Founder
            </text>

            {/* Main stem */}
            <path d="M52 70 L100 70" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

            {/* First expansion - 2 subclones */}
            <circle cx="120" cy="55" r="10" fill="url(#evol-grad-b)" stroke="currentColor" strokeWidth="1" opacity="0.85" />
            <circle cx="120" cy="85" r="10" fill="url(#evol-grad-b)" stroke="currentColor" strokeWidth="1" opacity="0.75" />
            <path d="M100 70 L108 60" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M100 70 L108 80" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />

            {/* Second expansion */}
            <path d="M130 55 L168 55" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M130 85 L168 85" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
            <circle cx="180" cy="45" r="9" fill="url(#evol-grad-c)" stroke="currentColor" strokeWidth="1" opacity="0.8" />
            <circle cx="180" cy="65" r="9" fill="url(#evol-grad-c)" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <circle cx="180" cy="95" r="9" fill="url(#evol-grad-c)" stroke="currentColor" strokeWidth="1" opacity="0.75" />
            <path d="M168 55 L172 48" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M168 55 L172 62" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M168 85 L172 92" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />

            {/* Third expansion - metastatic/diverse */}
            <path d="M189 45 L217 35" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M189 65 L227 65" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M189 95 L217 105" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <circle cx="235" cy="30" r="7" fill="url(#evol-grad-c)" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <circle cx="250" cy="65" r="8" fill="url(#evol-grad-a)" stroke="currentColor" strokeWidth="1" opacity="0.9" />
            <circle cx="235" cy="110" r="7" fill="url(#evol-grad-c)" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <text x="250" y="50" textAnchor="middle" fill="#e11d48" style={{ fontSize: 9 }}>
              resistant
            </text>

            {/* Arrow head on time axis */}
            <polygon points="300,67 295,70 300,73" fill="currentColor" opacity="0.4" />
          </svg>
        </div>
        <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
          Clonal evolution: a founding population diversifies into subclones over time through mutation and selection.
        </p>
      </div>
    </figure>
  );
}
