'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Reference, SiteSection } from '@/lib/references';
import { getFigureSourceIdsForSection } from '@/lib/section-figure-sources';
import ReferenceCard from '@/components/ReferenceCard';
import {
  labelForSection,
  parseYear,
  primarySection,
  referenceUsageScore,
  searchRelevanceScore,
  SITE_SECTION_ORDER,
} from '@/lib/reference-ui';

const BOOKMARKS_KEY = 'mbc-ref-bookmarks';

interface ReferenceListProps {
  references: Reference[];
  filterBy?: SiteSection;
  ensureIds?: string[];
}

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(BOOKMARKS_KEY);
      if (!raw) return;
      const arr = JSON.parse(raw) as unknown;
      if (!Array.isArray(arr)) return;
      setBookmarks(new Set(arr.filter((x): x is string => typeof x === 'string')));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { bookmarks, toggle };
}

function refMatchesQuery(ref: Reference, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  if (ref.title.toLowerCase().includes(s)) return true;
  if (ref.id.toLowerCase().includes(s)) return true;
  if (ref.authors?.toLowerCase().includes(s)) return true;
  if (ref.journal?.toLowerCase().includes(s)) return true;
  if (ref.filename.toLowerCase().includes(s)) return true;
  for (const t of ref.usedFor) {
    if (t.includes(s) || labelForSection(t).toLowerCase().includes(s)) return true;
  }
  for (const n of ref.highlightNotes ?? []) {
    if (n.excerptHint.toLowerCase().includes(s) || n.section.toLowerCase().includes(s)) return true;
  }
  return false;
}

function refMatchesTagSelection(
  ref: Reference,
  selected: Set<SiteSection>,
  requiredIds: Set<string>
): boolean {
  if (selected.size === 0) return true;
  if (requiredIds.has(ref.id)) return true;
  return ref.usedFor.some((t) => selected.has(t));
}

type SortMode = 'recent' | 'relevance' | 'category';

export default function ReferenceList({
  references: allReferences,
  filterBy,
  ensureIds,
}: ReferenceListProps) {
  const { bookmarks, toggle: toggleBookmark } = useBookmarks();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortMode>(filterBy ? 'category' : 'relevance');
  const [selectedTags, setSelectedTags] = useState<Set<SiteSection>>(() =>
    filterBy ? new Set([filterBy]) : new Set()
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  const requiredIds = useMemo(
    () => new Set(ensureIds ?? (filterBy ? getFigureSourceIdsForSection(filterBy) : [])),
    [filterBy, ensureIds]
  );

  const availableTags = useMemo(() => {
    const s = new Set<SiteSection>();
    for (const r of allReferences) {
      for (const t of r.usedFor) s.add(t);
    }
    return Array.from(s).sort(
      (a, b) => SITE_SECTION_ORDER.indexOf(a) - SITE_SECTION_ORDER.indexOf(b)
    );
  }, [allReferences]);

  const preFiltered = useMemo(() => {
    return allReferences.filter((r) => refMatchesTagSelection(r, selectedTags, requiredIds));
  }, [allReferences, selectedTags, requiredIds]);

  const searched = useMemo(() => {
    return preFiltered.filter((r) => refMatchesQuery(r, search));
  }, [preFiltered, search]);

  const withBookmark = useMemo(() => {
    if (!onlyBookmarked) return searched;
    return searched.filter((r) => bookmarks.has(r.id));
  }, [searched, onlyBookmarked, bookmarks]);

  const sorted = useMemo(() => {
    const out = withBookmark.slice();
    const q = search.trim();
    if (sort === 'recent') {
      out.sort((a, b) => {
        const ya = parseYear(a);
        const yb = parseYear(b);
        if (ya !== yb) {
          if (ya == null) return 1;
          if (yb == null) return -1;
          return yb - ya;
        }
        return a.title.localeCompare(b.title);
      });
    } else if (sort === 'relevance' && q) {
      out.sort(
        (a, b) =>
          searchRelevanceScore(b, q) - searchRelevanceScore(a, q) || a.title.localeCompare(b.title)
      );
    } else if (sort === 'relevance') {
      out.sort(
        (a, b) =>
          referenceUsageScore(b) - referenceUsageScore(a) || a.title.localeCompare(b.title)
      );
    } else {
      out.sort((a, b) => {
        const pa = primarySection(a);
        const pb = primarySection(b);
        const oa = SITE_SECTION_ORDER.indexOf(pa);
        const ob = SITE_SECTION_ORDER.indexOf(pb);
        if (oa !== ob) return oa - ob;
        return a.title.localeCompare(b.title);
      });
    }
    return out;
  }, [withBookmark, sort, search]);

  const spotlightIds = useMemo(() => {
    if (sorted.length === 0) return new Set<string>();
    const scored = sorted.map((r) => ({ r, sc: referenceUsageScore(r) }));
    scored.sort((a, b) => b.sc - a.sc);
    const minScore = 5;
    const top = scored.filter((x) => x.sc >= minScore).slice(0, 4);
    if (top.length > 0) {
      return new Set(top.map((x) => x.r.id));
    }
    // Soft fallback: still call out the top 2 in this list when all scores are low
    return new Set(scored.slice(0, 2).map((x) => x.r.id));
  }, [sorted]);

  const handleToggleTag = (tag: SiteSection) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const clearTags = () => setSelectedTags(new Set());
  const resetToPage = () => {
    setSearch('');
    setSelectedTags(filterBy ? new Set([filterBy]) : new Set());
  };

  const expandAll = () => {
    setExpandedIds(new Set(sorted.map((r) => r.id)));
  };
  const collapseAll = () => setExpandedIds(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const grouped = useMemo(() => {
    if (sort !== 'category') return null;
    const map = new Map<SiteSection, Reference[]>();
    for (const s of SITE_SECTION_ORDER) map.set(s, []);
    for (const r of sorted) {
      const p = primarySection(r);
      if (!map.has(p)) map.set(p, []);
      map.get(p)!.push(r);
    }
    return map;
  }, [sorted, sort]);

  return (
    <div className="w-full not-prose">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full min-w-0 sm:max-w-md">
            <label
              htmlFor="ref-search"
              className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400"
            >
              Search
            </label>
            <input
              id="ref-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Title, author, journal, ID, or keyword…"
              className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:border-gray-600 dark:bg-gray-800/50 dark:text-white"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-wrap items-end gap-2 sm:gap-3">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Sort
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {(
                  [
                    ['relevance', 'Relevance / use'],
                    ['recent', 'Most recent'],
                    ['category', 'By topic'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSort(value as SortMode)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium sm:text-sm ${
                      sort === value
                        ? 'bg-pink-600 text-white dark:bg-pink-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                    }`}
                    aria-pressed={sort === value}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="ml-auto flex gap-1 sm:ml-0">
              <button
                type="button"
                onClick={expandAll}
                className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Expand all
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Collapse all
              </button>
            </div>
          </div>
        </div>

        {availableTags.length > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Filter by site section (multi-select)
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={clearTags}
                className={`rounded-lg px-2.5 py-1.5 text-xs sm:text-sm ${
                  selectedTags.size === 0
                    ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
                aria-pressed={selectedTags.size === 0}
                title="Show all references in the list"
              >
                All topics
              </button>
              {filterBy && (
                <button
                  type="button"
                  onClick={resetToPage}
                  className="rounded-lg border border-pink-200/80 bg-pink-50 px-2.5 py-1.5 text-xs text-pink-800 hover:bg-pink-100 dark:border-pink-800/50 dark:bg-pink-950/30 dark:text-pink-200 dark:hover:bg-pink-950/50"
                >
                  This page
                </button>
              )}
              {availableTags.map((tag) => {
                const active = selectedTags.has(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs sm:text-sm ${
                      active
                        ? 'bg-pink-600 text-white dark:bg-pink-600'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                    aria-pressed={active}
                  >
                    {labelForSection(tag)}
                  </button>
                );
              })}
            </div>
            {selectedTags.size > 0 && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {selectedTags.size} filter{selectedTags.size > 1 ? 's' : ''} active:{' '}
                {Array.from(selectedTags)
                  .map((t) => labelForSection(t))
                  .join(', ')}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <label className="inline-flex cursor-pointer select-none items-center gap-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-pink-600 focus:ring-pink-500/30 dark:border-gray-600"
              checked={onlyBookmarked}
              onChange={(e) => setOnlyBookmarked(e.target.checked)}
            />
            <span>Only saved references</span>
          </label>
          {bookmarks.size > 0 && !onlyBookmarked && (
            <span className="text-xs text-gray-500">({bookmarks.size} saved)</span>
          )}
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-200 bg-white/50 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800/20 dark:text-gray-400">
          No references match your search or filters. Try clearing filters
          {filterBy && ` or use “This page”`} or the search field.
        </p>
      ) : sort === 'category' && grouped ? (
        <div className="space-y-10">
          {SITE_SECTION_ORDER.map((section) => {
            const list = grouped.get(section);
            if (!list?.length) return null;
            return (
              <section
                key={section}
                aria-label={labelForSection(section)}
                className="space-y-4"
              >
                <div className="flex items-baseline justify-between border-b border-gray-200/90 pb-2 dark:border-gray-600/50">
                  <h3 className="font-serif-heading text-lg font-semibold text-gray-900 dark:text-white">
                    {labelForSection(section)}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {list.length} {list.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <ul className="list-none space-y-4 p-0">
                  {list.map((r) => (
                    <li key={r.id}>
                      <ReferenceCard
                        refData={r}
                        expanded={expandedIds.has(r.id)}
                        onToggle={() => toggleExpand(r.id)}
                        isSpotlight={spotlightIds.has(r.id)}
                        isBookmarked={bookmarks.has(r.id)}
                        onBookmarkToggle={() => toggleBookmark(r.id)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <ul className="list-none space-y-4 p-0">
          {sorted.map((r) => (
            <li key={r.id}>
              <ReferenceCard
                refData={r}
                expanded={expandedIds.has(r.id)}
                onToggle={() => toggleExpand(r.id)}
                isSpotlight={spotlightIds.has(r.id)}
                isBookmarked={bookmarks.has(r.id)}
                onBookmarkToggle={() => toggleBookmark(r.id)}
              />
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Showing {sorted.length} of {allReferences.length} source
        {allReferences.length === 1 ? '' : 's'}. Page highlights are notes; verify page ranges
        against PDFs when available.
      </p>
    </div>
  );
}
