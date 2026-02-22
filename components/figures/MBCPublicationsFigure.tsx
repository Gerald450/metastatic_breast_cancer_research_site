'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import type { MBC_Publication } from '@/lib/types/mbc-data';

export default function MBCPublicationsFigure() {
  const { data, loading, error } = useFigureData<MBC_Publication[]>('/api/data/publications');

  const publications = Array.isArray(data) ? (data as MBC_Publication[]).slice(0, 10) : [];
  const hasData = publications.length > 0;

  if (loading) {
    return (
      <Figure title="Recent MBC Publications" description="PubMed articles on metastatic breast cancer" status="Draft" caption="Loading...">
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading publications...</div>
      </Figure>
    );
  }

  if (error) {
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
      summary="Ongoing research informs clinical practice and treatment guidelines for MBC."
    >
      {hasData ? (
        <ul className="space-y-3 text-sm">
          {publications.map((p) => (
            <li key={p.pmid}>
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${p.pmid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {p.title ?? 'Untitled'}
              </a>
              {p.pub_date && <span className="ml-2 text-gray-500 dark:text-gray-400">({p.pub_date})</span>}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">No publications. Run sync to fetch from PubMed.</div>
      )}
    </Figure>
  );
}
