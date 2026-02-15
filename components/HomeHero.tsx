'use client';

import Link from 'next/link';

export default function HomeHero() {
  return (
    <header className="border-b border-gray-200/60 pb-12 dark:border-gray-700/50 sm:pb-16">
      <div className="max-w-3xl">
        <h1 className="heading-page text-gray-900 dark:text-white">
          Metastatic breast cancer
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
          A synthesis of evidence from epidemiology, treatment, and outcomes—drawn from SEER data,
          clinical trials, and peer-reviewed literature.
        </p>
        <div className="mt-8">
          <Link
            href="#definition"
            className="inline-flex items-center rounded-lg border border-gray-900 bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:border-gray-100 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            What is MBC?
          </Link>
        </div>
      </div>
    </header>
  );
}
