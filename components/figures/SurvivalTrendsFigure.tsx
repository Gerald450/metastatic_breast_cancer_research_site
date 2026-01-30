'use client';

import { useMemo, useState, useEffect } from 'react';
import Figure, { FigureStatus } from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { getSurvivalOverTime, getSourceRefIds, type SurvivalOverTimeEntry } from '@/lib/extracted-data';
import { filterOutlierValues, isYearLike, SURVIVAL_MONTHS_MAX, PERCENT_MIN, PERCENT_MAX } from '@/lib/chart-utils';

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

  // Filter to main survival metric or allow selection
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    if (metricNames.length === 0) return;
    const current = selectedMetric?.toLowerCase();
    const stillValid = current && metricNames.some((m) => m.toLowerCase() === current);
    if (!stillValid) {
      const preferred = metricNames.find((m) => m.toLowerCase().includes('survival')) || metricNames[0];
      setSelectedMetric(preferred ?? null);
    }
  }, [metricNames, selectedMetric]);

  // Filter data by selected metric (case-insensitive to match all variants in data)
  const filteredData = useMemo(() => {
    if (!selectedMetric) return data;
    const key = selectedMetric.toLowerCase();
    return data.filter((entry) => entry.metricName && entry.metricName.toLowerCase() === key);
  }, [data, selectedMetric]);

  // Transform data for chart: group by timePeriod, exclude outliers for consistent scale
  const chartData = useMemo(() => {
    const grouped = new Map<string, number[]>();

    filteredData.forEach((entry) => {
      const period = entry.timePeriod || 'Unknown';
      if (!grouped.has(period)) grouped.set(period, []);
      const v = entry.value;
      if (v === null || v === undefined || typeof v !== 'number' || isNaN(v) || isYearLike(v)) return;
      const unit = (entry.unit || '').toLowerCase();
      const isMonths = unit.includes('month');
      const isPercent = unit.includes('%') || unit === 'percent';
      if (isMonths && (v < 0 || v > SURVIVAL_MONTHS_MAX)) return;
      if (isPercent && (v < PERCENT_MIN || v > PERCENT_MAX)) return;
      grouped.get(period)!.push(v);
    });

    return Array.from(grouped.entries())
      .map(([period, values]) => {
        const cleaned = filterOutlierValues(values, {
          excludeYearLike: true,
          useIQR: values.length >= 4,
        });
        const avg = cleaned.length > 0 ? cleaned.reduce((a, b) => a + b, 0) / cleaned.length : 0;
        return { timePeriod: period, value: isNaN(avg) ? 0 : avg };
      })
      .filter((row) => row.value > 0)
      .sort((a, b) => {
        const yearA = parseInt(a.timePeriod);
        const yearB = parseInt(b.timePeriod);
        if (!isNaN(yearA) && !isNaN(yearB)) return yearA - yearB;
        return a.timePeriod.localeCompare(b.timePeriod);
      });
  }, [filteredData]);

  const status: FigureStatus = hasReviewFlag ? 'Needs Review' : 'Verified';
  const hasData = chartData.length > 0;
  const caption = hasData
    ? 'Data extracted from uploaded PDFs; verify page ranges.'
    : 'No data available for this figure yet.';

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
        <LineTimeSeriesChart
          data={chartData}
          xKey="timePeriod"
          yKey="value"
          yLabel={(filteredData[0]?.unit && typeof filteredData[0].unit === 'string') ? filteredData[0].unit : 'Value'}
        />
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data available for this figure yet.
        </div>
      )}
    </Figure>
  );
}

