'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Figure from '@/components/Figure';
import { ONLINE_SOURCES } from '@/lib/online-sources';
import type { MBC_Drug } from '@/lib/types/mbc-data';

const ROWS_PER_PAGE = 20;
const ROW_HEIGHT_PX = 40;
const VISIBLE_ROWS = 10;
const SCROLL_CONTAINER_HEIGHT = ROW_HEIGHT_PX * VISIBLE_ROWS; // 400px

/** Drugs@FDA drug overview by application number (e.g. NDA208051 → 208051). */
function drugsAtFdaUrl(applicationNumber: string): string {
  const digits = applicationNumber.replace(/\D/g, '') || applicationNumber;
  return `https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=${encodeURIComponent(digits)}`;
}

export default function MBCDrugsFigure() {
  const [drugs, setDrugs] = useState<MBC_Drug[]>([]);
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
      const res = await fetch(`/api/data/drugs?limit=${ROWS_PER_PAGE}&offset=${offset}`);
      const json = await res.json();
      if (!res.ok) {
        if (!append) setError(json.error ?? `HTTP ${res.status}`);
        return;
      }
      const list = (json.data ?? []) as MBC_Drug[];
      setDrugs((prev) => (append ? [...prev, ...list] : list));
      setHasMore(list.length >= ROWS_PER_PAGE);
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
        loadPage(drugs.length, true);
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [drugs.length, hasMore, loadingMore, loading, loadPage]);

  const hasData = drugs.length > 0;

  if (loading && drugs.length === 0) {
    return (
      <Figure title="FDA-Approved Drugs for Breast Cancer" description="Drug labels from OpenFDA" status="Draft" caption="Loading...">
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading drugs...</div>
      </Figure>
    );
  }

  if (error && drugs.length === 0) {
    return (
      <Figure title="FDA-Approved Drugs for Breast Cancer" description="Drug labels from OpenFDA" status="Draft" caption={error}>
        <div className="flex h-64 items-center justify-center text-sm text-red-500 dark:text-red-400">{error}</div>
      </Figure>
    );
  }

  return (
    <Figure
      title="FDA-Approved Drugs for Breast Cancer"
      description="Drugs with breast cancer indications from FDA labels"
      externalSource={{ name: 'OpenFDA', url: ONLINE_SOURCES.OPENFDA.url }}
      status="Draft"
      caption="Drug labels from FDA via OpenFDA. Run POST /api/sync/drugs to refresh."
      summary="This table lists FDA-approved drugs with breast cancer indications—targeted therapies, endocrine agents, chemotherapy, and others—sourced from drug labels. We show it to give a concrete picture of the treatment toolkit available for breast cancer and MBC. Conclusion: many drugs are approved for breast cancer, spanning multiple mechanisms; the list reflects the evolution of targeted and systemic therapy. What this means: clinicians and patients have a growing array of options, but access, sequencing, and combination strategies remain complex; this resource supports reference and discussion."
    >
      {hasData ? (
        <div className="space-y-2">
          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700"
            style={{ maxHeight: SCROLL_CONTAINER_HEIGHT }}
          >
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800/95">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Brand / Generic</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Manufacturer</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Class</th>
                </tr>
              </thead>
              <tbody>
                {drugs.map((d, index) => (
                  <tr key={`${d.id}-${index}`} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="px-3 py-2">
                      <a
                        href={drugsAtFdaUrl(d.application_number)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        {d.brand_name || d.generic_name || d.application_number}
                      </a>
                      {d.generic_name && d.brand_name && d.generic_name !== d.brand_name && (
                        <span className="ml-1 text-gray-500 dark:text-gray-400">({d.generic_name})</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{d.manufacturer_name ?? '—'}</td>
                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{d.drug_class ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Showing {drugs.length} drugs{hasMore ? '+' : ''}. Scroll to load more.</span>
            {loadingMore && <span>Loading more…</span>}
          </div>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No drug data. Run POST /api/sync/drugs to fetch from OpenFDA.
        </div>
      )}
    </Figure>
  );
}
