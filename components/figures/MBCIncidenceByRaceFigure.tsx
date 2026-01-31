'use client';

import Figure from '@/components/Figure';
import StackedBarChart from '@/components/charts/StackedBarChart';
import { mbcIncidenceByRaceData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const series = [
  { key: 'White', label: 'White' },
  { key: 'Black', label: 'Black' },
  { key: 'Asian', label: 'Asian' },
  { key: 'Hispanic', label: 'Hispanic' },
  { key: 'Other', label: 'Other' },
];

export default function MBCIncidenceByRaceFigure() {
  const hasData = mbcIncidenceByRaceData.length > 0;

  return (
    <Figure
      title="MBC Incidence by Race/Ethnicity"
      description="Proportion of MBC cases by race"
      externalSource={{ name: 'SEER / ACS', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="MBC case counts by race/ethnicity from SEER. ACS for demographic categories."
      summary="Racial and ethnic distribution of MBC cases reflects population demographics and disparities in access to care. White women account for the largest share of cases; Black women often have higher rates of aggressive subtypes and later-stage diagnosis."
    >
      {hasData ? (
        <div role="img" aria-label="Stacked bar chart of MBC incidence by race and year">
          <StackedBarChart
            data={mbcIncidenceByRaceData}
            xKey="year"
            series={series}
            yLabel="Count"
          />
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data available for this figure yet.
        </div>
      )}
    </Figure>
  );
}
