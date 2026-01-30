'use client';

import { useMemo, useState, useEffect } from 'react';
import Figure, { FigureStatus } from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { getMetastaticSiteOutcomes, getSourceRefIds, type MetastaticSiteOutcomesEntry } from '@/lib/extracted-data';

export default function MetastaticSiteOutcomesFigure() {
  const [data, setData] = useState<(MetastaticSiteOutcomesEntry & { hasReviewFlag: boolean })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getMetastaticSiteOutcomes();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching metastatic site outcomes data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const sources = getSourceRefIds(data);
  const hasReviewFlag = data.some((entry) => entry.hasReviewFlag);

  // Get unique metric names: dedupe case-insensitively, display in title case
  const metricNames = useMemo(() => {
    const byLower = new Map<string, string>();
    const toTitleCase = (s: string) =>
      s.trim().replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    data.forEach((entry) => {
      if (entry.metricName && entry.metricName.trim()) {
        const key = entry.metricName.trim().toLowerCase();
        if (!byLower.has(key)) {
          byLower.set(key, toTitleCase(entry.metricName.trim()));
        }
      }
    });
    return Array.from(byLower.values()).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  }, [data]);

  // Default to first metric or allow selection
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    if (metricNames.length === 0) return;
    const current = selectedMetric?.toLowerCase();
    const stillValid = current && metricNames.some((m) => m.toLowerCase() === current);
    if (!stillValid) {
      setSelectedMetric(metricNames[0] ?? null);
    }
  }, [metricNames, selectedMetric]);

  // Filter data by selected metric (case-insensitive to match all variants in data)
  const filteredData = useMemo(() => {
    if (!selectedMetric) return data;
    const key = selectedMetric.toLowerCase();
    return data.filter((entry) => entry.metricName && entry.metricName.toLowerCase() === key);
  }, [data, selectedMetric]);

  // Transform data for chart: group by site
  const chartData = useMemo(() => {
    const grouped = new Map<string, number[]>();
    
    filteredData.forEach((entry) => {
      const site = entry.site || 'Unknown';
      if (!grouped.has(site)) {
        grouped.set(site, []);
      }
      // Check for both null and undefined, and ensure value is a valid number
      if (entry.value !== null && entry.value !== undefined && typeof entry.value === 'number' && !isNaN(entry.value)) {
        grouped.get(site)!.push(entry.value);
      }
    });

    return Array.from(grouped.entries())
      .map(([site, values]) => {
        const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        return {
          site: site,
          value: isNaN(avg) ? 0 : avg,
        };
      })
      .filter((item) => item.site !== 'Unknown')
      .sort((a, b) => b.value - a.value) // Sort by value descending
      .slice(0, 20); // Limit for readability
  }, [filteredData]);

  const status: FigureStatus = hasReviewFlag ? 'Needs Review' : 'Verified';
  const unit = (filteredData[0]?.unit && typeof filteredData[0].unit === 'string') ? filteredData[0].unit : 'Value';
  const hasData = chartData.length > 0;
  const caption = hasData
    ? 'Data extracted from uploaded PDFs; verify page ranges.'
    : 'No data available for this figure yet.';

  if (loading) {
    return (
      <Figure
        title="Metastatic Site Outcomes"
        description="Outcomes by metastatic site location"
        sources={[]}
        status="Verified"
        caption="Loading data..."
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading data...</p>
        </div>
      </Figure>
    );
  }

  return (
    <Figure
      title="Metastatic Site Outcomes"
      description="Outcomes by metastatic site location"
      sources={sources}
      status={status}
      caption={caption}
    >
      {hasData && metricNames.length > 1 && (
        <div className="mb-4">
          <label htmlFor="metric-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Metric:
          </label>
          <select
            id="metric-select"
            value={selectedMetric || ''}
            onChange={(e) => setSelectedMetric(e.target.value || null)}
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {metricNames.map((metric) => (
              <option key={metric} value={metric}>
                {metric}
              </option>
            ))}
          </select>
        </div>
      )}
      {hasData ? (
        <BarCategoryChart
          data={chartData}
          xKey="site"
          yKey="value"
          yLabel={unit}
        />
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data available for this figure yet.
        </div>
      )}
    </Figure>
  );
}

