'use client';

import { useMemo, useState } from 'react';
import Figure, { FigureStatus } from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { getDemographicsAgeRace, getSourceRefIds } from '@/lib/extracted-data';

type GroupByOption = 'groupLabel' | 'ageRange';

export default function AgeRaceDistributionFigure() {
  const data = getDemographicsAgeRace();
  const sources = getSourceRefIds(data);
  const hasReviewFlag = data.some((entry) => entry.hasReviewFlag);

  const [groupBy, setGroupBy] = useState<GroupByOption>(() => {
    // Default to groupLabel if available, otherwise ageRange
    const hasGroupLabel = data.some((entry) => entry.groupLabel);
    return hasGroupLabel ? 'groupLabel' : 'ageRange';
  });

  // Transform data for chart
  const chartData = useMemo(() => {
    const grouped = new Map<string, number[]>();
    
    data.forEach((entry) => {
      const key = groupBy === 'groupLabel' 
        ? (entry.groupLabel || 'Unknown')
        : (entry.ageRange || 'Unknown');
      
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
      .filter((item) => item.category !== 'Unknown')
      .sort((a, b) => {
        // Sort age ranges numerically if possible
        if (groupBy === 'ageRange') {
          const ageA = parseInt(a.category.split('-')[0]);
          const ageB = parseInt(b.category.split('-')[0]);
          if (!isNaN(ageA) && !isNaN(ageB)) {
            return ageA - ageB;
          }
        }
        return a.category.localeCompare(b.category);
      })
      .slice(0, 30); // Limit for readability
  }, [data, groupBy]);

  const status: FigureStatus = hasReviewFlag ? 'Needs Review' : 'Verified';
  const hasGroupLabel = data.some((entry) => entry.groupLabel);
  const hasAgeRange = data.some((entry) => entry.ageRange);
  const unit = data[0]?.unit || 'Value';

  return (
    <Figure
      title="Age and Race Distribution"
      description="Demographic breakdowns by age range and race/ethnicity"
      sources={sources}
      status={status}
      caption="Data extracted from uploaded PDFs; verify page ranges"
    >
      {(hasGroupLabel || hasAgeRange) && (
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
      <BarCategoryChart
        data={chartData}
        xKey="category"
        yKey="value"
        yLabel={unit}
      />
    </Figure>
  );
}

