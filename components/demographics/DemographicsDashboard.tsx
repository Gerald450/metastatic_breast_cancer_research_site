'use client';

import { useMemo, useState } from 'react';
import InsightCard, { type InsightSourceTag } from '@/components/insights/InsightCard';
import { ONLINE_SOURCES } from '@/lib/online-sources';

import Section from '@/components/Section';
import TabSummary from '@/components/TabSummary';
import SexDistributionBreastCancerFigure from '@/components/figures/SexDistributionBreastCancerFigure';
import MBCIncidenceByAgeFigure from '@/components/figures/MBCIncidenceByAgeFigure';
import HRPlusHer2NegTrendsByAgeFigure from '@/components/figures/HRPlusHer2NegTrendsByAgeFigure';
import SEERIncidenceTrendsByAgeFigure from '@/components/figures/SEERIncidenceTrendsByAgeFigure';
import AgeAtDiagnosisVsDeathFigure from '@/components/figures/AgeAtDiagnosisVsDeathFigure';
import MBCIncidenceByRaceFigure from '@/components/figures/MBCIncidenceByRaceFigure';
import HRPlusHer2PosIncidenceByRaceFigure from '@/components/figures/HRPlusHer2PosIncidenceByRaceFigure';
import SEERIncidenceTrendsByRaceFigure from '@/components/figures/SEERIncidenceTrendsByRaceFigure';
import MBCSurvivalByRaceFigure from '@/components/figures/MBCSurvivalByRaceFigure';
import InsuranceVsStageAtDiagnosisFigure from '@/components/figures/InsuranceVsStageAtDiagnosisFigure';
import BreastCancerMedianAgeBySubtypeFigure from '@/components/figures/BreastCancerMedianAgeBySubtypeFigure';

type ViewMode = 'summary' | 'data';

function TogglePill({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/50">
      {(['summary', 'data'] as const).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium sm:text-sm ${
            value === v
              ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
              : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700/40'
          }`}
          aria-pressed={value === v}
        >
          {v === 'summary' ? 'Summary' : 'Data'}
        </button>
      ))}
    </div>
  );
}

function scrollToData() {
  const el = document.getElementById('demographics-data');
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function DemographicsDashboard() {
  const [mode, setMode] = useState<ViewMode>('summary');

  const seerTag: InsightSourceTag = useMemo(
    () => ({
      kind: 'data',
      id: 'seer',
      label: 'SEER (NCI)',
      href: ONLINE_SOURCES.NCI_SEER.url,
    }),
    []
  );

  return (
    <div>
      {/* Bring insights above the fold */}
      <div className="mt-8 mb-10 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              Demographics
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Key disparities and distributions across age, sex, race/ethnicity, and access—each insight is tied to
              sources and supported by the charts below.
            </p>
          </div>
          <TogglePill
            value={mode}
            onChange={(v) => {
              setMode(v);
              if (v === 'data') requestAnimationFrame(scrollToData);
            }}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InsightCard
            lead="Racial disparities"
            headline="Population-level studies report higher metastatic burden at diagnosis and worse survival for non-Hispanic Black women compared with other groups."
            detail="Interpret as registry/observational associations (not individual-level causality). See incidence-by-race and survival-by-race panels for distributions and trends."
            severity="attention"
            onViewData={() => {
              setMode('data');
              requestAnimationFrame(scrollToData);
            }}
            sources={[
              { kind: 'ref', id: 'ref-005', href: '/references#ref-005' },
              { kind: 'ref', id: 'ref-008', href: '/references#ref-008' },
              seerTag,
            ]}
          />

          <InsightCard
            lead="Age patterns"
            headline="Incidence and age-at-diagnosis distributions vary across subtypes, with trends that change over time."
            detail="Use the age-trend and age distribution panels to compare patterns across groups and across time; subtype-specific age differences are summarized separately."
            onViewData={() => {
              setMode('data');
              requestAnimationFrame(scrollToData);
            }}
            sources={[
              { kind: 'ref', id: 'ref-013', href: '/references#ref-013' },
              seerTag,
            ]}
          />

          <InsightCard
            lead="Sex differences"
            headline="Male breast cancer is rare and is reported in the literature as more likely to be diagnosed later, with poorer outcomes."
            detail="Because male breast cancer is uncommon, interpret comparisons cautiously; the chart below focuses on distribution rather than causal drivers."
            severity="caution"
            onViewData={() => {
              setMode('data');
              requestAnimationFrame(scrollToData);
            }}
            sources={[
              { kind: 'ref', id: 'ref-013', href: '/references#ref-013' },
            ]}
          />

          <InsightCard
            lead="Socioeconomic access"
            headline="Insurance status is associated with stage at diagnosis, consistent with access-related disparities in timely detection and care."
            detail="This panel uses insurance as an access proxy; treat it as an association and consider confounding (age, comorbidity, geography)."
            severity="attention"
            onViewData={() => {
              setMode('data');
              requestAnimationFrame(scrollToData);
            }}
            sources={[
              { kind: 'data', id: 'uscs', label: 'USCS', href: ONLINE_SOURCES.USCS.url },
              seerTag,
            ]}
          />

          <InsightCard
            lead="Subtype × age"
            headline="Median age at diagnosis differs by tumor subtype, linking biology to demographic patterns."
            detail="This is a descriptive summary: subtype composition shifts by age, and age distributions differ by receptor status."
            onViewData={() => {
              setMode('data');
              requestAnimationFrame(scrollToData);
            }}
            sources={[seerTag]}
          />
        </div>

        {/* Keep an evidence summary, but remove paragraph dominance */}
        {mode === 'summary' && (
          <div className="rounded-xl border border-gray-200 bg-gray-50/90 p-5 dark:border-gray-700 dark:bg-gray-800/60">
            <TabSummary section="demographics" />
          </div>
        )}
      </div>

      {/* Data dashboard */}
      <div id="demographics-data" className="scroll-mt-24">
        <Section
          title="Dashboard"
          subtitle="Charts supporting the insights above"
          className="section-alt"
        >
          <div className="not-prose grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700/50 dark:bg-gray-800/50">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Sex distribution</p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Distribution by sex; interpret male patterns cautiously due to rarity.
              </p>
              <div className="mt-4">
                <SexDistributionBreastCancerFigure />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700/50 dark:bg-gray-800/50">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Age patterns</p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Age distributions and trend overlays; compare across time and subtype.
              </p>
              <div className="mt-4 space-y-6">
                <MBCIncidenceByAgeFigure />
                <HRPlusHer2NegTrendsByAgeFigure />
                <SEERIncidenceTrendsByAgeFigure />
                <AgeAtDiagnosisVsDeathFigure />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700/50 dark:bg-gray-800/50">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Race/ethnicity disparities</p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Incidence and survival patterns by race/ethnicity; population-level associations.
              </p>
              <div className="mt-4 space-y-6">
                <MBCIncidenceByRaceFigure />
                <HRPlusHer2PosIncidenceByRaceFigure />
                <SEERIncidenceTrendsByRaceFigure />
                <MBCSurvivalByRaceFigure />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700/50 dark:bg-gray-800/50">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Socioeconomic access proxy</p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Insurance vs stage at diagnosis; interpret as association with access.
              </p>
              <div className="mt-4">
                <InsuranceVsStageAtDiagnosisFigure />
              </div>
            </div>

            <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700/50 dark:bg-gray-800/50">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Tumor subtypes by age</p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Median age at diagnosis by subtype (descriptive).
              </p>
              <div className="mt-4">
                <BreastCancerMedianAgeBySubtypeFigure />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

