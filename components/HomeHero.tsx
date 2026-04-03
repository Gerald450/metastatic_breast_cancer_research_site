'use client';

import Link from 'next/link';

export default function HomeHero() {
  return (
    <header className="border-b border-pink-100/90 pb-12 dark:border-pink-900/25 sm:pb-16">
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
            className="inline-flex items-center rounded-lg border border-pink-700 bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-pink-700 hover:border-pink-800 dark:border-pink-500 dark:bg-pink-600 dark:hover:bg-pink-500 dark:hover:border-pink-400"
          >
            What is MBC?
          </Link>
        </div>
      </div>
    </header>
  );
}
