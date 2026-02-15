'use client';

import Link from 'next/link';

/** Order follows narrative: What → How it works → How common → Who → Outcomes → Treatment → Burden → Sources */
const topics: Array<{
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  planned?: boolean;
}> = [
  {
    href: '/#definition',
    label: 'Definition',
    description: 'What MBC is: clinical definition, classification, and terminology',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'rose',
  },
  {
    href: '/biology',
    label: 'Biology',
    description: 'How metastasis works: CTCs, tumor evolution, resistance',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'violet',
  },
  {
    href: '/epidemiology',
    label: 'Epidemiology',
    description: 'How common: prevalence, incidence, and temporal trends',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'indigo',
  },
  {
    href: '/demographics',
    label: 'Demographics',
    description: 'Who is affected: age, sex, race, socioeconomic patterns',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: 'amber',
  },
  {
    href: '/clinical-outcomes',
    label: 'Clinical Outcomes',
    description: 'What happens: survival, progression, site-specific outcomes',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'emerald',
  },
  {
    href: '/treatment',
    label: 'Treatment',
    description: 'How we treat: therapy overview, targeted therapy, sequencing',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: 'sky',
  },
  {
    href: '/public-health',
    label: 'Public Health',
    description: 'Population burden, mortality, and healthcare impact',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M12 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'cyan',
  },
  {
    href: '/references',
    label: 'References',
    description: 'Literature and source citations',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'violet',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  rose: {
    bg: 'bg-slate-100 dark:bg-slate-800/40',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700/50',
  },
  indigo: {
    bg: 'bg-slate-100 dark:bg-slate-800/40',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700/50',
  },
  amber: {
    bg: 'bg-slate-100 dark:bg-slate-800/40',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700/50',
  },
  emerald: {
    bg: 'bg-slate-100 dark:bg-slate-800/40',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700/50',
  },
  cyan: {
    bg: 'bg-slate-100 dark:bg-slate-800/40',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700/50',
  },
  violet: {
    bg: 'bg-slate-100 dark:bg-slate-800/40',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700/50',
  },
  sky: {
    bg: 'bg-slate-100 dark:bg-slate-800/40',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700/50',
  },
};

export default function TopicExploreGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic) => {
        const c = colorClasses[topic.color] ?? colorClasses.rose;
        return (
          <Link
            key={topic.href}
            href={topic.href}
            className={`card card-hover group flex items-start gap-4 rounded-xl border bg-white p-5 dark:bg-gray-800/50 ${c.border} transition-all duration-200 hover:-translate-y-0.5`}
          >
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.text}`}>
              {topic.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="heading-card text-gray-900 dark:text-white group-hover:underline">
                {topic.label}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{topic.description}</p>
              {topic.planned && (
                <span className="mt-2 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  Coming soon
                </span>
              )}
            </div>
            <svg
              className="h-5 w-5 shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-gray-600 dark:group-hover:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        );
      })}
    </div>
  );
}
