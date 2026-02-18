'use client';

import { useMemo, useState, useEffect } from 'react';
import Figure, { FigureStatus } from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { getPrevalenceBurden, getSourceRefIds, type PrevalenceBurdenEntry } from '@/lib/extracted-data';
import { filterOutlierValues, isYearLike, PERCENT_MIN, PERCENT_MAX } from '@/lib/chart-utils';

export default function SurvivorshipBurdenFigure() {
  const [data, setData] = useState<(PrevalenceBurdenEntry & { hasReviewFlag: boolean })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getPrevalenceBurden();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching prevalence burden data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const sources = getSourceRefIds(data);
  const hasReviewFlag = data.some((entry) => entry.hasReviewFlag);

  // Determine if we should use line or bar chart based on data structure
  // If we have yearOrRange values that can be sorted, use line chart
  // Otherwise use bar chart
  const useLineChart = useMemo(() => {
    const hasYearData = data.some((entry) => {
      if (!entry.yearOrRange) return false;
      const year = parseInt(entry.yearOrRange);
      return !isNaN(year) && year >= 1900 && year <= 2100;
    });
    return hasYearData && data.length > 3; // Use line if we have year data and enough points
  }, [data]);

  // Transform data for chart; exclude outliers for consistent scale
  const chartData = useMemo(() => {
    const pushValue = (map: Map<string, number[]>, key: string, v: number, unit?: string | null) => {
      if (isYearLike(v)) return;
      const u = (unit ?? '').toLowerCase();
      const isPercent = u.includes('%') || u === 'percent';
      if (isPercent && (v < PERCENT_MIN || v > PERCENT_MAX)) return;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(v);
    };

    if (useLineChart) {
      const grouped = new Map<string, number[]>();
      data.forEach((entry) => {
        const year = entry.yearOrRange || 'Unknown';
        const v = entry.value;
        if (v === null || v === undefined || typeof v !== 'number' || isNaN(v)) return;
        pushValue(grouped, year, v, entry.unit);
      });

      return Array.from(grouped.entries())
        .map(([year, values]) => {
          const cleaned = filterOutlierValues(values, { excludeYearLike: true, useIQR: values.length >= 4 });
          const avg = cleaned.length > 0 ? cleaned.reduce((a, b) => a + b, 0) / cleaned.length : 0;
          return { yearOrRange: year, value: isNaN(avg) ? 0 : avg };
        })
        .filter((item) => item.value > 0 && item.yearOrRange !== 'Unknown')
        .sort((a, b) => {
          const yearA = parseInt(a.yearOrRange);
          const yearB = parseInt(b.yearOrRange);
          if (!isNaN(yearA) && !isNaN(yearB)) return yearA - yearB;
          return a.yearOrRange.localeCompare(b.yearOrRange);
        });
    } else {
      const grouped = new Map<string, number[]>();
      data.forEach((entry) => {
        const key = entry.yearOrRange || entry.metricName || 'Unknown';
        const v = entry.value;
        if (v === null || v === undefined || typeof v !== 'number' || isNaN(v)) return;
        pushValue(grouped, key, v, entry.unit);
      });

      return Array.from(grouped.entries())
        .map(([key, values]) => {
          const cleaned = filterOutlierValues(values, { excludeYearLike: true, useIQR: values.length >= 4 });
          const avg = cleaned.length > 0 ? cleaned.reduce((a, b) => a + b, 0) / cleaned.length : 0;
          return { category: key, value: isNaN(avg) ? 0 : avg };
        })
        .filter((item) => item.value > 0 && item.category !== 'Unknown')
        .slice(0, 20);
    }
  }, [data, useLineChart]);

  const status: FigureStatus = hasReviewFlag ? 'Needs Review' : 'Verified';
  const unit = (data[0]?.unit && typeof data[0].unit === 'string') ? data[0].unit : 'Value';
  const hasData = chartData.length > 0;
  const caption = hasData
    ? 'Data extracted from uploaded PDFs; verify page ranges.'
    : 'No data available for this figure yet.';

  if (loading) {
    return (
      <Figure
        title="Prevalence and Survivorship Burden"
        description="Prevalence estimates and survivorship burden metrics over time"
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
      title="Prevalence and Survivorship Burden"
      description="Prevalence estimates and survivorship burden metrics over time"
      sources={sources}
      status={status}
      caption={caption}
      summary="Prevalence and survivorship burden reflect the growing number of people living with MBC. Rising prevalence due to improved survival increases demand for long-term care and support."
    >
      {hasData ? (
        useLineChart ? (
          <LineTimeSeriesChart
            data={chartData}
            xKey="yearOrRange"
            yKey="value"
            xLabel="Year or period"
            yLabel={unit}
          />
        ) : (
          <BarCategoryChart
            data={chartData}
            xKey="category"
            yKey="value"
            xLabel="Category"
            yLabel={unit}
          />
        )
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data available for this figure yet.
        </div>
      )}
    </Figure>
  );
}

