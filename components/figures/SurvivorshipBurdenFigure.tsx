'use client';

import { useMemo, useState, useEffect } from 'react';
import Figure, { FigureStatus } from '@/components/Figure';
import LineTimeSeriesChart from '@/components/charts/LineTimeSeriesChart';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { getPrevalenceBurden, getSourceRefIds, type PrevalenceBurdenEntry } from '@/lib/extracted-data';

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

  // Transform data for chart
  const chartData = useMemo(() => {
    if (useLineChart) {
      // Group by yearOrRange for line chart
      const grouped = new Map<string, number[]>();
      
      data.forEach((entry) => {
        const year = entry.yearOrRange || 'Unknown';
        if (!grouped.has(year)) {
          grouped.set(year, []);
        }
        if (entry.value !== null) {
          grouped.get(year)!.push(entry.value);
        }
      });

      return Array.from(grouped.entries())
        .map(([year, values]) => ({
          yearOrRange: year,
          value: values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0,
        }))
        .sort((a, b) => {
          const yearA = parseInt(a.yearOrRange);
          const yearB = parseInt(b.yearOrRange);
          if (!isNaN(yearA) && !isNaN(yearB)) {
            return yearA - yearB;
          }
          return a.yearOrRange.localeCompare(b.yearOrRange);
        });
    } else {
      // Use bar chart for categorical data
      const grouped = new Map<string, number[]>();
      
      data.forEach((entry) => {
        const key = entry.yearOrRange || entry.metricName || 'Unknown';
        if (!grouped.has(key)) {
          grouped.set(key, []);
        }
        if (entry.value !== null) {
          grouped.get(key)!.push(entry.value);
        }
      });

      return Array.from(grouped.entries())
        .map(([key, values]) => ({
          category: key,
          value: values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0,
        }))
        .slice(0, 20); // Limit to top 20 for readability
    }
  }, [data, useLineChart]);

  const status: FigureStatus = hasReviewFlag ? 'Needs Review' : 'Verified';
  const unit = data[0]?.unit || 'Value';

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
      caption="Data extracted from uploaded PDFs; verify page ranges"
    >
      {useLineChart ? (
        <LineTimeSeriesChart
          data={chartData}
          xKey="yearOrRange"
          yKey="value"
          yLabel={unit}
        />
      ) : (
        <BarCategoryChart
          data={chartData}
          xKey="category"
          yKey="value"
          yLabel={unit}
        />
      )}
    </Figure>
  );
}

