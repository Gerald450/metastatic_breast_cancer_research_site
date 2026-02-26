'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Figure from '@/components/Figure';
import type { MBC_Publication } from '@/lib/types/mbc-data';

const ITEMS_PER_PAGE = 20;
const VISIBLE_ITEMS = 5;
const CARD_MIN_HEIGHT_PX = 72;
const SCROLL_CONTAINER_HEIGHT = CARD_MIN_HEIGHT_PX * VISIBLE_ITEMS;

function truncate(str: string | null, max: number): string {
  if (!str || !str.trim()) return '';
  const s = str.trim();
  return s.length <= max ? s : s.slice(0, max) + '…';
}

export default function MBCPublicationsFigure() {
  const [publications, setPublications] = useState<MBC_Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);

  const loadPage = useCallback(async (offset: number, append: boolean) => {
    if (append) {
      if (loadingMoreRef.current) return;
      loadingMoreRef.current = true;
    }
    const setLoader = append ? setLoadingMore : setLoading;
    setLoader(true);
    try {
      const res = await fetch(`/api/data/publications?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
      const json = await res.json();
      if (!res.ok) {
        if (!append) setError(json.error ?? `HTTP ${res.status}`);
        return;
      }
      const list = (json.data ?? []) as MBC_Publication[];
      setPublications((prev) => (append ? [...prev, ...list] : list));
      setHasMore(list.length >= ITEMS_PER_PAGE);
    } catch (e) {
      if (!append) setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoader(false);
      if (append) loadingMoreRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadPage(0, false);
  }, [loadPage]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !hasMore || loadingMore || loading) return;

    const onScroll = () => {
      if (loadingMoreRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const threshold = 80;
      if (scrollHeight - scrollTop - clientHeight < threshold) {
        loadPage(publications.length, true);
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [publications.length, hasMore, loadingMore, loading, loadPage]);

  const hasData = publications.length > 0;

  if (loading && publications.length === 0) {
    return (
      <Figure title="Recent MBC Publications" description="PubMed articles on metastatic breast cancer" status="Draft" caption="Loading...">
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading publications...</div>
      </Figure>
    );
  }

  if (error && publications.length === 0) {
    return (
      <Figure title="Recent MBC Publications" description="PubMed articles on metastatic breast cancer" status="Draft" caption={error}>
        <div className="flex h-64 items-center justify-center text-sm text-red-500 dark:text-red-400">{error}</div>
      </Figure>
    );
  }

  return (
    <Figure
      title="Recent MBC Publications"
      description="Recent PubMed articles on metastatic breast cancer"
      externalSource={{ name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov' }}
      status="Draft"
      caption="Data from PubMed. Run POST /api/sync/publications to refresh."
      summary="This list shows recent publications on metastatic breast cancer from PubMed—a snapshot of current research and review articles. We include it to connect the site's content to the live literature and to show where evidence is being generated. Conclusion: ongoing research spans biology, treatment, and outcomes and feeds into clinical practice and guidelines. What this means: clinicians and patients can use this as a starting point to explore recent evidence and stay updated on MBC research."
    >
      {hasData ? (
        <div className="space-y-3">
          <div
            ref={scrollRef}
            className="overflow-y-auto overflow-x-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30"
            style={{ maxHeight: SCROLL_CONTAINER_HEIGHT }}
          >
            <ul className="divide-y divide-gray-200/80 dark:divide-gray-700/80">
              {publications.map((p, index) => {
                const pubUrl = `https://pubmed.ncbi.nlm.nih.gov/${p.pmid}`;
                const year = p.pub_date?.slice(0, 4) ?? '';
                const journal = truncate(p.journal, 50);
                const authors = truncate(p.authors, 60);
                return (
                  <li key={`${p.pmid}-${index}`}>
                    <a
                      href={pubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex gap-2.5 px-3 py-2.5 transition-colors hover:bg-white hover:shadow-sm dark:hover:bg-gray-800/60 dark:hover:shadow-none"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 line-clamp-2">
                          {p.title ?? 'Untitled'}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                          {year && (
                            <span className="rounded bg-gray-200/80 px-1.5 py-0.5 font-medium dark:bg-gray-700/80">
                              {year}
                            </span>
                          )}
                          {journal && <span>{journal}</span>}
                          {authors && <span className="italic">{authors}</span>}
                        </div>
                      </div>
                      <svg className="mt-1 h-4 w-4 shrink-0 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-100/80 px-3 py-2 text-xs text-gray-600 dark:bg-gray-800/50 dark:text-gray-400">
            <span>Showing {publications.length} publications{hasMore ? '+' : ''} · scroll for more</span>
            {loadingMore && <span className="font-medium text-emerald-600 dark:text-emerald-400">Loading more…</span>}
          </div>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">No publications. Run sync to fetch from PubMed.</div>
      )}
    </Figure>
  );
}
