import { references } from '@/lib/references';
import { ONLINE_SOURCES } from '@/lib/online-sources';
import InsightCard, { type InsightSourceTag } from '@/components/insights/InsightCard';

interface CitationCalloutProps {
  // New format
  claim?: string;
  sources?: string[]; // Reference IDs (PDF refs)
  onlineSourceIds?: string[]; // ONLINE_SOURCES ids
  pageRanges?: string;
  // Legacy format (for backward compatibility)
  children?: React.ReactNode;
  citation?: string;
}

export default function CitationCallout({
  claim,
  sources,
  onlineSourceIds,
  pageRanges,
  children,
  citation,
}: CitationCalloutProps) {
  // Legacy format support
  if (citation && !claim) {
    return (
      <div className="my-6">
        <InsightCard
          lead="Citation"
          headline={citation}
          severity="neutral"
          defaultExpanded={false}
        >
          {children ? (
            <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
          ) : null}
        </InsightCard>
      </div>
    );
  }

  // New format: need claim and at least one source type
  const hasRefSources = sources && sources.length > 0;
  const hasOnlineSources = onlineSourceIds && onlineSourceIds.length > 0;
  if (!claim || (!hasRefSources && !hasOnlineSources)) {
    return null;
  }

  const sourceRefs = (sources ?? [])
    .map((id) => references.find((ref) => ref.id === id))
    .filter(Boolean);
  const onlineRefs = (onlineSourceIds ?? [])
    .map((id) => Object.values(ONLINE_SOURCES).find((s) => s.id === id))
    .filter(Boolean);

  const insightSources: InsightSourceTag[] = [
    ...(sourceRefs.map((ref) => ({
      kind: 'ref' as const,
      id: ref!.id,
      href: `/references#${ref!.id}`,
    })) ?? []),
    ...(onlineRefs.map((src) => ({
      kind: 'data' as const,
      id: src!.id,
      label: src!.name,
      href: src!.url,
    })) ?? []),
  ];

  const detailLines: string[] = [];
  if (pageRanges) detailLines.push(`Pages: ${pageRanges}`);
  if (hasRefSources) detailLines.push('Verify in PDF');

  return (
    <div className="my-6">
      <InsightCard
        lead="Key insight"
        headline={claim}
        severity="attention"
        sources={insightSources}
        defaultExpanded={false}
        detail={detailLines.length > 0 ? detailLines.join(' • ') : undefined}
      >
        {children ? <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div> : null}
      </InsightCard>
    </div>
  );
}
