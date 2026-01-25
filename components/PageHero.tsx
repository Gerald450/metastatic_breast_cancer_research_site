'use client';

import { ReactNode } from 'react';

type Theme = 'definition' | 'epidemiology' | 'demographics' | 'clinical' | 'public-health';

const gradientClasses: Record<Theme, string> = {
  definition:
    'bg-gradient-to-br from-slate-50 via-indigo-50/50 to-violet-50/50 dark:from-gray-800/80 dark:via-indigo-900/10 dark:to-violet-900/10',
  epidemiology:
    'bg-gradient-to-br from-slate-50 via-emerald-50/50 to-teal-50/50 dark:from-gray-800/80 dark:via-emerald-900/10 dark:to-teal-900/10',
  demographics:
    'bg-gradient-to-br from-slate-50 via-amber-50/50 to-orange-50/50 dark:from-gray-800/80 dark:via-amber-900/10 dark:to-orange-900/10',
  clinical:
    'bg-gradient-to-br from-slate-50 via-rose-50/50 to-pink-50/50 dark:from-gray-800/80 dark:via-rose-900/10 dark:to-pink-900/10',
  'public-health':
    'bg-gradient-to-br from-slate-50 via-cyan-50/50 to-blue-50/50 dark:from-gray-800/80 dark:via-cyan-900/10 dark:to-blue-900/10',
};

interface PageHeroProps {
  title: string;
  description: string;
  theme: Theme;
  illustration: ReactNode;
}

export default function PageHero({
  title,
  description,
  theme,
  illustration,
}: PageHeroProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-gray-200 px-6 py-10 shadow-sm dark:border-gray-700/50 sm:px-10 sm:py-12 lg:px-14 lg:py-14 ${gradientClasses[theme]}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v32H0V0zm31 0h1v32h-1V0z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        <div className="flex shrink-0 justify-end md:justify-center">
          {illustration}
        </div>
      </div>
    </div>
  );
}
