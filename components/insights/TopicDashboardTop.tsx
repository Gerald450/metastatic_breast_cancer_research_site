'use client';

import { useMemo, useState } from 'react';
import TabSummary from '@/components/TabSummary';
import InsightCard, { type InsightCardProps } from '@/components/insights/InsightCard';

type ViewMode = 'summary' | 'data';

type Insight = Pick<
  InsightCardProps,
  'lead' | 'headline' | 'detail' | 'severity' | 'sources'
>;

type Props = {
  title: string;
  subtitle: string;
  section: Parameters<typeof TabSummary>[0]['section'];
  dataAnchorId: string;
  insights: Insight[];
};

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

function scrollToAnchor(anchorId: string) {
  const el = document.getElementById(anchorId);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function TopicDashboardTop({
  title,
  subtitle,
  section,
  dataAnchorId,
  insights,
}: Props) {
  const [mode, setMode] = useState<ViewMode>('summary');

  const onViewData = useMemo(
    () => () => {
      setMode('data');
      requestAnimationFrame(() => scrollToAnchor(dataAnchorId));
    },
    [dataAnchorId]
  );

  return (
    <div className="mt-8 mb-10 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>
        <TogglePill
          value={mode}
          onChange={(v) => {
            setMode(v);
            if (v === 'data') requestAnimationFrame(() => scrollToAnchor(dataAnchorId));
          }}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((i, idx) => (
          <InsightCard
            key={`${i.lead}-${idx}`}
            lead={i.lead}
            headline={i.headline}
            detail={i.detail}
            severity={i.severity}
            sources={i.sources}
            onViewData={onViewData}
          />
        ))}
      </div>

      {mode === 'summary' && (
        <div className="mt-2">
          <TabSummary section={section} />
        </div>
      )}
    </div>
  );
}

