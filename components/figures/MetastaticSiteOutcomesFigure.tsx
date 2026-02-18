'use client';

import { useMemo, useState, useEffect } from 'react';
import Figure, { FigureStatus } from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { getMetastaticSiteOutcomes, getSourceRefIds, type MetastaticSiteOutcomesEntry } from '@/lib/extracted-data';
import { filterOutlierValues, isYearLike, PERCENT_MIN, PERCENT_MAX, SURVIVAL_MONTHS_MAX } from '@/lib/chart-utils';

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

  // Transform data for chart: group by site; exclude year-like and other outliers
  const chartData = useMemo(() => {
    const grouped = new Map<string, number[]>();
    filteredData.forEach((entry) => {
      const site = entry.site || 'Unknown';
      const v = entry.value;
      if (v === null || v === undefined || typeof v !== 'number' || isNaN(v) || isYearLike(v)) return;
      const unit = (entry.unit ?? '').toLowerCase();
      const isPercent = unit.includes('%') || unit === 'percent';
      const isMonths = unit.includes('month') || unit.includes('year');
      if (isPercent && (v < PERCENT_MIN || v > PERCENT_MAX)) return;
      if (isMonths && (v < 0 || v > SURVIVAL_MONTHS_MAX)) return;
      if (!grouped.has(site)) grouped.set(site, []);
      grouped.get(site)!.push(v);
    });

    return Array.from(grouped.entries())
      .map(([site, values]) => {
        const cleaned = filterOutlierValues(values, { excludeYearLike: true, useIQR: values.length >= 4 });
        const avg = cleaned.length > 0 ? cleaned.reduce((a, b) => a + b, 0) / cleaned.length : 0;
        return { site, value: isNaN(avg) ? 0 : avg };
      })
      .filter((item) => item.site !== 'Unknown' && item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 20);
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
      summary="Outcomes vary by metastatic site, with bone-only disease generally faring better than visceral sites. Site-specific data guides prognosis and treatment sequencing."
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
          xLabel="Metastatic site"
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

