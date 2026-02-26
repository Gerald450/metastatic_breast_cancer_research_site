'use client';

import Link from 'next/link';
import { useFigureData } from '@/lib/use-figure-data';
import type { MBC_Trial } from '@/lib/types/mbc-data';
import type { MBC_Publication } from '@/lib/types/mbc-data';
import type { MBC_Drug } from '@/lib/types/mbc-data';

export default function EvidenceHighlights() {
  const { data: trials } = useFigureData<MBC_Trial[]>('/api/data/trials');
  const { data: publications } = useFigureData<MBC_Publication[]>('/api/data/publications');
  const { data: drugs } = useFigureData<MBC_Drug[]>('/api/data/drugs');
  const { data: mortalityData } = useFigureData<Record<string, unknown>[]>('/api/data/figure/stateLevelBreastCancerMortality');
  const { data: survivalData } = useFigureData<Record<string, unknown>[]>('/api/data/seer/survival-by-year');

  const trialsCount = Array.isArray(trials) ? trials.length : 0;
  const publicationsCount = Array.isArray(publications) ? publications.length : 0;
  const drugsCount = Array.isArray(drugs) ? drugs.length : 0;
  const mortalityCount = Array.isArray(mortalityData) ? mortalityData.length : 0;
  const survivalCount = Array.isArray(survivalData) ? survivalData.length : 0;

  const highlights = [
    {
      id: 'trials',
      value: trialsCount.toLocaleString(),
      unit: '',
      label: 'MBC clinical trials',
      detail: 'ClinicalTrials.gov',
      source: trialsCount > 0 ? 'ClinicalTrials.gov' : 'Run sync to populate',
      href: '/#research',
    },
    {
      id: 'publications',
      value: publicationsCount.toLocaleString(),
      unit: '',
      label: 'PubMed publications',
      detail: 'Metastatic breast cancer',
      source: publicationsCount > 0 ? 'PubMed' : 'Run sync to populate',
      href: '/#research',
    },
    {
      id: 'drugs',
      value: drugsCount.toLocaleString(),
      unit: '',
      label: 'FDA-approved drugs',
      detail: 'Breast cancer indications',
      source: 'OpenFDA',
      href: '/treatment#fda-approved-drugs',
    },
    {
      id: 'mortality',
      value: mortalityCount > 0 ? mortalityCount.toLocaleString() : '—',
      unit: mortalityCount > 0 ? 'states' : '',
      label: 'Mortality data',
      detail: 'Database data',
      source: mortalityCount > 0 ? 'Supabase (see Public Health)' : 'Run seed to populate',
      href: '/public-health',
    },
    {
      id: 'metastatic-sites',
      value: 'Multi-site',
      unit: '',
      label: 'Outcomes by metastatic site',
      detail: 'Bone, liver, brain, lung',
      source: 'API-verified data only',
      href: '/clinical-outcomes',
    },
    {
      id: 'demographics',
      value: 'Age & race',
      unit: '',
      label: 'Demographic distributions',
      detail: 'API-verified data only',
      source: 'See sync routes',
      href: '/demographics',
    },
    {
      id: 'survival',
      value: survivalCount > 0 ? survivalCount.toLocaleString() : '—',
      unit: survivalCount > 0 ? 'years' : '',
      label: 'Survival trends',
      detail: 'Database data',
      source: survivalCount > 0 ? 'Supabase (see Clinical Outcomes)' : 'Run SEER ingest to populate',
      href: '/clinical-outcomes#survival',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {highlights.map((h) => (
        <Link
          key={h.id}
          href={h.href}
          className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-gray-300 hover:bg-gray-50/50 dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:border-gray-600 dark:hover:bg-gray-800/80"
        >
          <div className="flex flex-1 flex-col">
            <p className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {h.value}
              {h.unit && <span className="ml-1 text-base font-normal text-gray-500 dark:text-gray-400">{h.unit}</span>}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">{h.label}</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{h.detail}</p>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              <span className="font-medium text-gray-600 dark:text-gray-400">Source:</span> {h.source}
            </p>
          </div>
          <span className="mt-3 inline-flex text-xs font-medium text-gray-500 transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
            Explore
            <svg className="ml-1 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
