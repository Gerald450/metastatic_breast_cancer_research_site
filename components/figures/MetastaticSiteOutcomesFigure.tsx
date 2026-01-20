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

  // Get unique metric names
  const metricNames = useMemo(() => {
    const metrics = new Set<string>();
    data.forEach((entry) => {
      if (entry.metricName) {
        metrics.add(entry.metricName);
      }
    });
    return Array.from(metrics).sort();
  }, [data]);

  // Default to first metric or allow selection
  const [selectedMetric, setSelectedMetric] = useState<string | null>(
    metricNames[0] || null
  );

  // Filter data by selected metric
  const filteredData = useMemo(() => {
    if (!selectedMetric) return data;
    return data.filter((entry) => entry.metricName === selectedMetric);
  }, [data, selectedMetric]);

  // Transform data for chart: group by site
  const chartData = useMemo(() => {
    const grouped = new Map<string, number[]>();
    
    filteredData.forEach((entry) => {
      const site = entry.site || 'Unknown';
      if (!grouped.has(site)) {
        grouped.set(site, []);
      }
      if (entry.value !== null) {
        grouped.get(site)!.push(entry.value);
      }
    });

    return Array.from(grouped.entries())
      .map(([site, values]) => ({
        site: site,
        value: values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0,
      }))
      .filter((item) => item.site !== 'Unknown')
      .sort((a, b) => b.value - a.value) // Sort by value descending
      .slice(0, 20); // Limit for readability
  }, [filteredData]);

  const status: FigureStatus = hasReviewFlag ? 'Needs Review' : 'Verified';
  const unit = filteredData[0]?.unit || 'Value';

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
      caption="Data extracted from uploaded PDFs; verify page ranges"
    >
      {metricNames.length > 1 && (
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
      <BarCategoryChart
        data={chartData}
        xKey="site"
        yKey="value"
        yLabel={unit}
      />
    </Figure>
  );
}

