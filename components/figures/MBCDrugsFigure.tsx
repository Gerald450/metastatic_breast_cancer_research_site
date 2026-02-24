'use client';

import Figure from '@/components/Figure';
import { useFigureData } from '@/lib/use-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';
import type { MBC_Drug } from '@/lib/types/mbc-data';

export default function MBCDrugsFigure() {
  const { data, loading, error } = useFigureData<MBC_Drug[]>('/api/data/drugs');

  const drugs = (Array.isArray(data) ? data : []) as MBC_Drug[];
  const hasData = drugs.length > 0;

  if (loading) {
    return (
      <Figure title="FDA-Approved Drugs for Breast Cancer" description="Drug labels from OpenFDA" status="Draft" caption="Loading...">
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading drugs...</div>
      </Figure>
    );
  }

  if (error) {
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Brand / Generic</th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Manufacturer</th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Class</th>
              </tr>
            </thead>
            <tbody>
              {drugs.slice(0, 50).map((d) => (
                <tr key={d.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-3 py-2">
                    <span className="font-medium text-gray-900 dark:text-white">{d.brand_name || d.generic_name || d.application_number}</span>
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
          {drugs.length > 50 && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Showing 50 of {drugs.length} drugs.</p>
          )}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No drug data. Run POST /api/sync/drugs to fetch from OpenFDA.
        </div>
      )}
    </Figure>
  );
}
