'use client';

/**
 * Icon strip: Age, Sex, Race, SES as demographic segments.
 * Complements Demographics page content; can replace or sit alongside the Sex distribution VisualPlaceholder.
 */
const segments = [
  {
    label: 'Age',
    detail: 'Age at diagnosis, age-specific rates',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'amber',
  },
  {
    label: 'Sex',
    detail: 'Sex-specific incidence & presentation',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: 'rose',
  },
  {
    label: 'Race & ethnicity',
    detail: 'Racial and ethnic distribution',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'violet',
  },
  {
    label: 'Socioeconomic',
    detail: 'Income, education, access to care',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'emerald',
  },
];

const colorClasses: Record<string, string> = {
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export default function DemographicSegmentsVisual() {
  return (
    <figure className="my-8">
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-700 dark:bg-gray-800/30">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {segments.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-center dark:border-gray-600 dark:bg-gray-800/50"
            >
              <div className={`mb-2 flex h-14 w-14 items-center justify-center rounded-xl ${colorClasses[s.color]}`}>
                {s.icon}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{s.label}</span>
              <span className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{s.detail}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm italic text-gray-500 dark:text-gray-400">
          Demographics explored in this section: age, sex, race/ethnicity, and socioeconomic factors.
        </p>
      </div>
    </figure>
  );
}
