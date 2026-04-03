'use client';

import { ReactNode } from 'react';

type Theme = 'definition' | 'epidemiology' | 'demographics' | 'clinical' | 'public-health' | 'biology' | 'treatment';

const gradientClasses: Record<Theme, string> = {
  definition:
    'bg-gradient-to-br from-slate-50 via-pink-50/70 to-blue-50/50 dark:from-gray-800/80 dark:via-pink-950/20 dark:to-blue-950/15',
  epidemiology:
    'bg-gradient-to-br from-slate-50 via-pink-50/60 to-pink-100/40 dark:from-gray-800/80 dark:via-pink-950/25 dark:to-pink-900/10',
  demographics:
    'bg-gradient-to-br from-slate-50 via-blue-50/60 to-pink-50/40 dark:from-gray-800/80 dark:via-blue-950/20 dark:to-pink-950/15',
  clinical:
    'bg-gradient-to-br from-slate-50 via-rose-50/70 to-pink-100/50 dark:from-gray-800/80 dark:via-rose-950/25 dark:to-pink-900/15',
  'public-health':
    'bg-gradient-to-br from-slate-50 via-blue-50/70 to-sky-50/40 dark:from-gray-800/80 dark:via-blue-950/25 dark:to-sky-950/10',
  biology:
    'bg-gradient-to-br from-slate-50 via-pink-50/50 to-blue-50/60 dark:from-gray-800/80 dark:via-pink-950/15 dark:to-blue-950/20',
  treatment:
    'bg-gradient-to-br from-slate-50 via-blue-50/65 to-pink-50/45 dark:from-gray-800/80 dark:via-blue-950/22 dark:to-pink-950/12',
};

interface PageHeroProps {
  title: string;
  theme: Theme;
  illustration: ReactNode;
}

export default function PageHero({
  title,
  theme,
  illustration,
}: PageHeroProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-gray-200/80 px-6 py-8 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700/50 sm:px-10 sm:py-12 lg:px-14 lg:py-14 ${gradientClasses[theme]}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v32H0V0zm31 0h1v32h-1V0z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h1 className="heading-page text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
        <div className="flex shrink-0 justify-end md:justify-center">
          {illustration}
        </div>
      </div>
    </div>
  );
}
