'use client';

import Figure from '@/components/Figure';
import StackedBarChart from '@/components/charts/StackedBarChart';
import { useFigureData } from '@/lib/use-figure-data';
import { mbcIncidenceByRaceData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function MBCIncidenceByRaceFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/mbcIncidenceByRace');
  const chartData = (data && data.length > 0 ? data : mbcIncidenceByRaceData) as Record<string, unknown>[];

  return (
    <Figure
      title="MBC Incidence by Race/Ethnicity"
      description="Proportion of MBC cases by race"
      externalSource={{ name: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.name, url: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.url }}
      status="Draft"
      caption="MBC case counts by race/ethnicity from SEER. ACS for demographic categories."
      summary="Racial and ethnic distribution of MBC cases reflects population demographics and disparities in access to care. White women account for the largest share of cases; Black women often have higher rates of aggressive subtypes and later-stage diagnosis."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Stacked bar chart of MBC incidence by race">
          <StackedBarChart
            data={chartData}
            xKey="year"
            series={[
              { key: 'White', label: 'White', color: '#3b82f6' },
              { key: 'Black', label: 'Black', color: '#10b981' },
              { key: 'Asian', label: 'Asian', color: '#f59e0b' },
              { key: 'Hispanic', label: 'Hispanic', color: '#ef4444' },
              { key: 'Other', label: 'Other', color: '#8b5cf6' },
            ]}
            xLabel="Year"
            yLabel="Count"
          />
        </div>
      )}
    </Figure>
  );
}
