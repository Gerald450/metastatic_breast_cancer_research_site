import type { Reference, SiteSection } from '@/lib/references';

/** Consistent order for grouping and primary-topic resolution */
export const SITE_SECTION_ORDER: SiteSection[] = [
  'definition',
  'epidemiology',
  'demographics',
  'clinical-outcomes',
  'public-health',
  'biology',
  'treatment',
];

const SECTION_LABEL: Record<SiteSection, string> = {
  definition: 'Overview',
  epidemiology: 'Epidemiology',
  demographics: 'Demographics',
  'clinical-outcomes': 'Clinical outcomes',
  'public-health': 'Public health',
  biology: 'Biology',
  treatment: 'Treatment',
};

export function labelForSection(section: SiteSection): string {
  return SECTION_LABEL[section];
}

export function primarySection(ref: Reference): SiteSection {
  const tags = ref.usedFor.slice();
  tags.sort(
    (a, b) =>
      SITE_SECTION_ORDER.indexOf(a) - SITE_SECTION_ORDER.indexOf(b)
  );
  return tags[0] ?? 'definition';
}

export type DocumentKind = 'article' | 'review' | 'synthesis' | 'note';

export function inferDocumentKind(ref: Reference): DocumentKind {
  const t = ref.title.toLowerCase();
  if (t.includes('review') || t.includes('systematic review')) return 'review';
  if (t.includes('synthesis') || t.includes('meta-analysis')) return 'synthesis';
  if (ref.journal?.toLowerCase().includes('review')) return 'review';
  if (!ref.journal && (!ref.authors || ref.authors === 'See PDF')) return 'note';
  return 'article';
}

export function referenceUsageScore(ref: Reference): number {
  return ref.usedFor.length * 2 + (ref.highlightNotes?.length ?? 0);
}

export function topInsightLines(ref: Reference, max = 3): string[] {
  const notes = ref.highlightNotes ?? [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const n of notes) {
    const line = n.excerptHint?.trim();
    if (!line || seen.has(line)) continue;
    seen.add(line);
    out.push(line);
    if (out.length >= max) break;
  }
  return out;
}

export function allInsightLines(ref: Reference): { section: string; pages?: string; text: string }[] {
  return (ref.highlightNotes ?? []).map((n) => ({
    section: n.section,
    pages: n.pages,
    text: n.excerptHint,
  }));
}

const STOP = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'in', 'to', 'for', 'on', 'with']);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

/**
 * Relevance for ordering when a search query is active.
 * Higher = better match.
 */
export function searchRelevanceScore(ref: Reference, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  let score = 0;
  if (ref.title.toLowerCase().includes(q)) score += 100;
  if (ref.id.toLowerCase() === q) score += 90;
  if (ref.authors?.toLowerCase().includes(q)) score += 50;
  if (ref.journal?.toLowerCase().includes(q)) score += 40;
  if (ref.filename.toLowerCase().includes(q)) score += 25;
  for (const t of ref.usedFor) {
    if (t.includes(q) || labelForSection(t).toLowerCase().includes(q)) score += 20;
  }
  const qTokens = tokenize(q);
  if (qTokens.length > 0) {
    const blob = [
      ref.title,
      ref.authors,
      ref.journal,
      ref.id,
      ...(ref.highlightNotes ?? []).map((h) => h.excerptHint),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    for (const w of qTokens) {
      if (blob.includes(w)) score += 5;
    }
  }
  return score;
}

export function parseYear(ref: Reference): number | null {
  if (!ref.year) return null;
  const n = parseInt(ref.year, 10);
  return Number.isFinite(n) ? n : null;
}
