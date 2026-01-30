'use client';

const stats = [
  {
    value: '15 → 58',
    unit: 'months',
    label: 'Median survival improvement',
    detail: 'MD Anderson adjuvant trials (Giordano et al.)',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    value: '1974–2006',
    unit: '',
    label: 'Study periods covered',
    detail: 'Survival trends across decades',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    value: 'Multi-site',
    unit: '',
    label: 'Outcomes by metastatic site',
    detail: 'Bone, liver, brain, lung, and more',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z" />
      </svg>
    ),
  },
  {
    value: 'Age & race',
    unit: '',
    label: 'Demographic distributions',
    detail: 'Incidence and burden by group',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function KeyStatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-rose-200 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:border-rose-800/50"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
            {stat.icon}
          </div>
          <div className="flex flex-1 flex-col">
            <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {stat.value}
              {stat.unit && <span className="ml-1 text-lg font-medium text-gray-500 dark:text-gray-400">{stat.unit}</span>}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
