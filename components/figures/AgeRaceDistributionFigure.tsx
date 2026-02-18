'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Figure, { FigureStatus } from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { getDemographicsAgeRace, getSourceRefIds, type DemographicsAgeRaceEntry } from '@/lib/extracted-data';
import { filterOutlierValues, isYearLike, PERCENT_MIN, PERCENT_MAX } from '@/lib/chart-utils';

type GroupByOption = 'groupLabel' | 'ageRange';

export default function AgeRaceDistributionFigure() {
  const [data, setData] = useState<(DemographicsAgeRaceEntry & { hasReviewFlag: boolean })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getDemographicsAgeRace();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching demographics age/race data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const sources = getSourceRefIds(data);
  const hasReviewFlag = data.some((entry) => entry.hasReviewFlag);

  const [groupBy, setGroupBy] = useState<GroupByOption>('ageRange');
  const hasAdaptedDefault = useRef(false);

  // When data loads, prefer groupLabel if present so default adapts to available dimensions (once)
  useEffect(() => {
    if (loading || data.length === 0 || hasAdaptedDefault.current) return;
    const hasGroupLabel = data.some((entry) => entry.groupLabel);
    if (hasGroupLabel) {
      setGroupBy('groupLabel');
      hasAdaptedDefault.current = true;
    }
  }, [loading, data]);

  // Transform data for chart; exclude outliers for consistent scale
  const chartData = useMemo(() => {
    const grouped = new Map<string, number[]>();
    data.forEach((entry) => {
      const key = groupBy === 'groupLabel' ? (entry.groupLabel || 'Unknown') : (entry.ageRange || 'Unknown');
      const v = entry.value;
      if (v === null || v === undefined || typeof v !== 'number' || isNaN(v) || isYearLike(v)) return;
      const unit = (entry.unit ?? '').toLowerCase();
      const isPercent = unit.includes('%') || unit === 'percent';
      if (isPercent && (v < PERCENT_MIN || v > PERCENT_MAX)) return;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(v);
    });

    return Array.from(grouped.entries())
      .map(([key, values]) => {
        const cleaned = filterOutlierValues(values, { excludeYearLike: true, useIQR: values.length >= 4 });
        const avg = cleaned.length > 0 ? cleaned.reduce((a, b) => a + b, 0) / cleaned.length : 0;
        return { category: key, value: isNaN(avg) ? 0 : avg };
      })
      .filter((item) => item.category !== 'Unknown' && item.value > 0)
      .sort((a, b) => {
        if (groupBy === 'ageRange') {
          const ageA = parseInt(a.category.split('-')[0]);
          const ageB = parseInt(b.category.split('-')[0]);
          if (!isNaN(ageA) && !isNaN(ageB)) return ageA - ageB;
        }
        return a.category.localeCompare(b.category);
      })
      .slice(0, 30);
  }, [data, groupBy]);

  const status: FigureStatus = hasReviewFlag ? 'Needs Review' : 'Verified';
  const hasGroupLabel = data.some((entry) => entry.groupLabel);
  const hasAgeRange = data.some((entry) => entry.ageRange);
  const unit = (data[0]?.unit && typeof data[0].unit === 'string') ? data[0].unit : 'Value';

  if (loading) {
    return (
      <Figure
        title="Age and Race Distribution"
        description="Demographic breakdowns by age range and race/ethnicity"
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

  const hasData = chartData.length > 0;
  const caption = hasData
    ? 'Data extracted from uploaded PDFs; verify page ranges.'
    : 'No data available for this figure yet.';

  return (
    <Figure
      title="Age and Race Distribution"
      description="Demographic breakdowns by age range and race/ethnicity"
      sources={sources}
      status={status}
      caption={caption}
      summary="Demographic patterns by age and race help target screening and care. Incidence and mortality distributions inform who is most affected and where interventions may have the largest impact."
    >
      {hasData && (hasGroupLabel || hasAgeRange) && (
        <div className="mb-4">
          <label htmlFor="groupby-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Group By:
          </label>
          <select
            id="groupby-select"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as GroupByOption)}
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {hasGroupLabel && <option value="groupLabel">Race/Ethnicity</option>}
            {hasAgeRange && <option value="ageRange">Age Range</option>}
          </select>
        </div>
      )}
      {hasData ? (
      <BarCategoryChart
        data={chartData}
        xKey="category"
        yKey="value"
        xLabel={groupBy === 'groupLabel' ? 'Race/ethnicity' : 'Age range'}
        yLabel={unit}
      />
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No demographic breakdown in this extract.
        </div>
      )}
    </Figure>
  );
}

