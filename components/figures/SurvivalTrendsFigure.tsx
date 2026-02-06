'use client';

import { useMemo, useState, useEffect } from 'react';
import Figure, { FigureStatus } from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import { getSurvivalOverTime, getSourceRefIds, type SurvivalOverTimeEntry } from '@/lib/extracted-data';
import { filterOutlierValues, isYearLike, SURVIVAL_MONTHS_MAX, PERCENT_MIN, PERCENT_MAX } from '@/lib/chart-utils';

type Entry = SurvivalOverTimeEntry & { hasReviewFlag: boolean };

function buildChartDataFromEntries(entries: Entry[]): { timePeriod: string; value: number }[] {
  const grouped = new Map<string, number[]>();
  entries.forEach((entry) => {
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
}

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

  // Build unique metric keys with disambiguating labels; only include metrics that produce at least 2 chart points
  const metricOptions = useMemo(() => {
    const toTitleCase = (s: string) =>
      s.trim().replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    type Variant = { key: string; displayName: string };
    const byKey = new Map<string, Variant>();

    data.forEach((entry) => {
      if (!entry.metricName?.trim()) return;
      const base = entry.metricName.trim();
      const baseLower = base.toLowerCase();
      const pop = (entry.population || '').trim();
      const unit = (entry.unit || '').trim();
      const key = `${baseLower}|${pop}|${unit}`;

      const suffix = [pop, unit].filter(Boolean).join(', ');
      const displayName = suffix ? `${toTitleCase(base)} (${suffix})` : toTitleCase(base);

      if (!byKey.has(key)) {
        byKey.set(key, { key, displayName });
      }
    });

    // Only include metrics that actually produce at least 2 chart data points (after grouping, outlier filter, avg)
    return Array.from(byKey.entries())
      .filter(([key]) => {
        const [baseLower, pop, unit] = key.split('|');
        const entries = data.filter((e) => {
          if (!e.metricName?.trim()) return false;
          return (
            e.metricName.trim().toLowerCase() === baseLower &&
            (e.population || '').trim() === pop &&
            (e.unit || '').trim() === unit
          );
        });
        const chartRows = buildChartDataFromEntries(entries);
        return chartRows.length >= 2;
      })
      .map(([, v]) => v)
      .sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: 'base' }));
  }, [data]);

  // Filter to main survival metric or allow selection
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    if (metricOptions.length === 0) return;
    const stillValid = selectedMetric && metricOptions.some((m) => m.key === selectedMetric);
    if (!stillValid) {
      const preferred = metricOptions.find((m) => m.displayName.toLowerCase().includes('survival')) ?? metricOptions[0];
      setSelectedMetric(preferred?.key ?? null);
    }
  }, [metricOptions, selectedMetric]);

  // Filter data by selected metric key (metricName + population + unit)
  const filteredData = useMemo(() => {
    if (!selectedMetric) return data;
    const [baseLower, pop, unit] = selectedMetric.split('|');
    return data.filter((entry) => {
      if (!entry.metricName?.trim()) return false;
      const eBase = entry.metricName.trim().toLowerCase();
      const ePop = (entry.population || '').trim();
      const eUnit = (entry.unit || '').trim();
      return eBase === baseLower && ePop === pop && eUnit === unit;
    });
  }, [data, selectedMetric]);

  const chartData = useMemo(() => buildChartDataFromEntries(filteredData), [filteredData]);

  const status: FigureStatus = hasReviewFlag ? 'Needs Review' : 'Verified';
  const hasData = metricOptions.length > 0 && chartData.length > 0;
  const caption = hasData
    ? `Data from site PDFs (Caswell et al., Lord et al., Hudock et al.). Source refs: ${sources.length ? sources.join(', ') : 'see extracted data'}. Verify page ranges in PDFs.`
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
      summary="Survival metrics from literature show how outcomes have evolved across study periods. Trends support the value of newer treatments but vary by population and metric type."
    >
      {hasData && metricOptions.length > 1 && (
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
            {metricOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.displayName}
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

