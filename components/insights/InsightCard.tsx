'use client';

import { useId, useMemo, useState } from 'react';
import Link from 'next/link';

export type InsightSourceTag =
  | { kind: 'ref'; id: string; href: string; label?: string }
  | { kind: 'data'; id: string; href: string; label: string };

export type InsightSeverity = 'neutral' | 'attention' | 'caution';

export type InsightCardProps = {
  lead: string;
  headline: string;
  detail?: string;
  severity?: InsightSeverity;
  sources?: InsightSourceTag[];
  defaultExpanded?: boolean;
  onViewData?: () => void;
  viewDataLabel?: string;
  vizPreview?: React.ReactNode;
  children?: React.ReactNode;
};

const accentBySeverity: Record<InsightSeverity, string> = {
  neutral:
    'from-slate-50/60 via-white to-white dark:from-gray-900/10 dark:via-gray-900/20 dark:to-gray-900/10',
  attention:
    'from-pink-50/70 via-white to-white dark:from-pink-950/10 dark:via-gray-900/20 dark:to-gray-900/10',
  caution:
    'from-amber-50/70 via-white to-white dark:from-amber-950/10 dark:via-gray-900/20 dark:to-gray-900/10',
};

function SourceChips({ sources = [] }: { sources?: InsightSourceTag[] }) {
  const refs = sources.filter((s) => s.kind === 'ref');
  const data = sources.filter((s) => s.kind === 'data');
  if (refs.length === 0 && data.length === 0) return null;

  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {refs.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Key Sources
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {refs.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="rounded-full bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-800 ring-1 ring-inset ring-pink-700/10 hover:bg-pink-100 dark:bg-pink-950/25 dark:text-pink-200 dark:ring-pink-400/20"
                title="PDF reference"
              >
                {s.label ?? s.id}
              </Link>
            ))}
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Data Sources
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {data.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 dark:bg-blue-950/25 dark:text-blue-200 dark:ring-blue-400/20"
                title="Online data source"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InsightCard({
  lead,
  headline,
  detail,
  severity = 'neutral',
  sources = [],
  defaultExpanded = false,
  onViewData,
  viewDataLabel = 'View data',
  vizPreview,
  children,
}: InsightCardProps) {
  const reactId = useId();
  const panelId = useMemo(() => `insight-panel-${reactId}`, [reactId]);
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <section className="not-prose group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-pink-300/60 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:border-pink-700/40">
      <div className={`pointer-events-none absolute inset-0 opacity-70 bg-gradient-to-br ${accentBySeverity[severity]}`} />

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {lead}
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-gray-900 dark:text-white">
              {headline}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {onViewData && (
              <button
                type="button"
                onClick={onViewData}
                className="rounded-lg border border-gray-200 bg-white/60 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-white dark:border-gray-600 dark:bg-gray-800/40 dark:text-gray-200 dark:hover:bg-gray-800/70"
              >
                {viewDataLabel}
              </button>
            )}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={panelId}
              className="rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
            >
              {expanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>

        {vizPreview && (
          <div className="mt-3 rounded-lg border border-gray-200/80 bg-white/50 p-3 dark:border-gray-700/50 dark:bg-gray-900/10">
            {vizPreview}
          </div>
        )}

        <SourceChips sources={sources} />

        {expanded && (detail || children) && (
          <div id={panelId} className="mt-4 space-y-3 border-t border-gray-200/80 pt-4 dark:border-gray-700/50">
            {detail && (
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {detail}
              </p>
            )}
            {children && (
              <div className="rounded-lg border border-gray-200 bg-gray-50/70 p-3 dark:border-gray-700/50 dark:bg-gray-900/20">
                {children}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

