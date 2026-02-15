'use client';

import Link from 'next/link';
import survivalStudiesData from '@/data/extracted/survival_studies_table.json';
import { mbcSurvivorshipPopulationGrowthData } from '@/lib/mbc-figure-data';
import { seerIncidenceTrendsByAgeData } from '@/lib/seer-csv-data';
import survivalByStageData from '@/data/seer/survival_by_stage.json';

/** Distant stage 5-year survival from SEER */
const distantSurvival = survivalByStageData.data.find((r) => r.stage === 'Distant')?.survivalPercent ?? 33;
const seerPeriod = survivalByStageData.source.dataPeriod;

/** Latest survivorship estimate */
const latestSurvivorship = mbcSurvivorshipPopulationGrowthData[mbcSurvivorshipPopulationGrowthData.length - 1];
const survivorshipYear = latestSurvivorship.year;
const survivorshipCount = latestSurvivorship.prevalence.toLocaleString();

/** SEER AAPC all ages */
const allAgesTrend = seerIncidenceTrendsByAgeData.find((r) => r.group === 'All Ages' && r.yearRange === '2013-2022');
const aapc = allAgesTrend?.aapc ?? 0.4;

/** Survival studies - use Giordano for median improvement */
const giordanoStudy = survivalStudiesData.find((s) => s.references.includes('Giordano'));

const highlights = [
  {
    id: 'survival-improvement',
    value: giordanoStudy ? giordanoStudy.medianSurvival : '15 to 58',
    unit: 'months',
    label: 'Median survival improvement',
    detail: giordanoStudy?.sourcePopulation ?? 'MD Anderson adjuvant trials',
    source: giordanoStudy?.references ?? 'Giordano et al.',
    href: '/clinical-outcomes#survival',
  },
  {
    id: 'distant-survival',
    value: String(distantSurvival),
    unit: '%',
    label: '5-year relative survival, distant stage',
    detail: `SEER ${seerPeriod}`,
    source: 'NCI SEER Cancer Stat Facts',
    href: '/clinical-outcomes#survival',
  },
  {
    id: 'survivorship',
    value: survivorshipCount,
    unit: '',
    label: 'Women living with MBC in the US',
    detail: `Est. ${survivorshipYear} (Mariotto et al.)`,
    source: 'Mariotto et al., ref-011',
    href: '/epidemiology',
  },
  {
    id: 'incidence-trend',
    value: `${aapc}%`,
    unit: 'AAPC',
    label: 'Breast cancer incidence trend',
    detail: `2013–2022, all ages`,
    source: 'SEER Nov 2024',
    href: '/epidemiology',
  },
  {
    id: 'metastatic-sites',
    value: 'Multi-site',
    unit: '',
    label: 'Outcomes by metastatic site',
    detail: 'Bone, liver, brain, lung',
    source: 'Bonotto, Xiao et al.',
    href: '/clinical-outcomes',
  },
  {
    id: 'demographics',
    value: 'Age & race',
    unit: '',
    label: 'Demographic distributions',
    detail: 'SEER by race, ethnicity, age',
    source: 'SEER*Explorer',
    href: '/demographics',
  },
];

export default function EvidenceHighlights() {
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
          <span className="mt-3 inline-flex items-center text-xs font-medium text-gray-500 transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
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
