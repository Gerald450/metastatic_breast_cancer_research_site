'use client';

import Link from 'next/link';

export default function HomeHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gradient-to-br from-slate-50 via-rose-50/40 to-indigo-50/50 px-6 py-12 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700/50 dark:from-gray-800/80 dark:via-rose-900/10 dark:to-indigo-900/10 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v32H0V0zm31 0h1v32h-1V0z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Abstract illustration: branching nodes (metastasis / research flow) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-90 sm:right-8 md:right-12 lg:right-16">
        <svg
          viewBox="0 0 160 140"
          className="h-32 w-36 text-rose-400/60 dark:text-rose-500/40 sm:h-40 sm:w-44 md:h-44 md:w-48"
          aria-hidden
        >
          <defs>
            <linearGradient id="node-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Central node */}
          <circle cx="80" cy="70" r="14" fill="url(#node-grad)" />
          {/* Branches */}
          <path
            d="M80 56 L80 20 L50 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          <path
            d="M80 56 L80 20 L110 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          <path
            d="M94 70 L130 70 L130 100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeOpacity="0.35"
          />
          <path
            d="M66 70 L30 70 L30 100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeOpacity="0.35"
          />
          <path
            d="M80 84 L80 120 L55 120"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeOpacity="0.3"
          />
          <path
            d="M80 84 L80 120 L105 120"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeOpacity="0.3"
          />
          {/* Leaf nodes */}
          <circle cx="50" cy="20" r="8" fill="url(#node-grad)" fillOpacity="0.7" />
          <circle cx="110" cy="20" r="8" fill="url(#node-grad)" fillOpacity="0.7" />
          <circle cx="130" cy="100" r="8" fill="url(#node-grad)" fillOpacity="0.6" />
          <circle cx="30" cy="100" r="8" fill="url(#node-grad)" fillOpacity="0.6" />
          <circle cx="55" cy="120" r="7" fill="url(#node-grad)" fillOpacity="0.5" />
          <circle cx="105" cy="120" r="7" fill="url(#node-grad)" fillOpacity="0.5" />
        </svg>
      </div>

      <div className="relative max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Metastatic breast cancer research
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
          Evidence summaries, epidemiology, demographics, and clinical outcomes—curated from the literature to support research and clinical understanding.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/definition"
            className="inline-flex items-center rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Start with Definition
          </Link>
          <Link
            href="/clinical-outcomes"
            className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Clinical outcomes
          </Link>
        </div>
      </div>
    </div>
  );
}
