'use client';

import { useMemo, useState, useEffect } from 'react';
import Figure, { FigureStatus } from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { getSurvivalOverTime, getSourceRefIds, type SurvivalOverTimeEntry } from '@/lib/extracted-data';

export default function SurvivalTrendsFigure() {
  const [data, setData] = useState<(SurvivalOverTimeEntry & { hasReviewFlag: boolean })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getSurvivalOverTime();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching survival over time data:', error);
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

  // Filter to main survival metric or allow selection
  const [selectedMetric, setSelectedMetric] = useState<string | null>(
    metricNames.find((m) => m.toLowerCase().includes('survival')) || metricNames[0] || null
  );

  // Filter data by selected metric
  const filteredData = useMemo(() => {
    if (!selectedMetric) return data;
    return data.filter((entry) => entry.metricName === selectedMetric);
  }, [data, selectedMetric]);

  // Transform data for chart: group by timePeriod
  const chartData = useMemo(() => {
    const grouped = new Map<string, number[]>();
    
    filteredData.forEach((entry) => {
      const period = entry.timePeriod || 'Unknown';
      if (!grouped.has(period)) {
        grouped.set(period, []);
      }
      if (entry.value !== null) {
        grouped.get(period)!.push(entry.value);
      }
    });

    // Convert to array and calculate average if multiple values per period
    return Array.from(grouped.entries())
      .map(([period, values]) => ({
        timePeriod: period,
        value: values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0,
      }))
      .sort((a, b) => {
        // Sort by year if it's a year string
        const yearA = parseInt(a.timePeriod);
        const yearB = parseInt(b.timePeriod);
        if (!isNaN(yearA) && !isNaN(yearB)) {
          return yearA - yearB;
        }
        return a.timePeriod.localeCompare(b.timePeriod);
      });
  }, [filteredData]);

  const status: FigureStatus = hasReviewFlag ? 'Needs Review' : 'Verified';

  if (loading) {
    return (
      <Figure
        title="Survival Trends Over Time"
        description="Survival metrics tracked across time periods"
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
      title="Survival Trends Over Time"
      description="Survival metrics tracked across time periods"
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
      <LineTimeSeriesChart
        data={chartData}
        xKey="timePeriod"
        yKey="value"
        yLabel={filteredData[0]?.unit || 'Value'}
      />
    </Figure>
  );
}

