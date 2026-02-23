'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { mbcIncidenceByRaceData } from '@/lib/mbc-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function MBCIncidenceByRaceFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/seer/charts/incidence-by-race');
  const chartData = (data && data.length > 0 ? data : mbcIncidenceByRaceData) as Record<string, unknown>[];

  return (
    <Figure
      title="MBC Incidence by Race/Ethnicity"
      description="Age-adjusted incidence rate per 100,000 by race"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="Age-adjusted incidence rates by race from SEER. Rates per 100,000."
      summary="Racial and ethnic distribution of MBC cases reflects population demographics and disparities in access to care. White women account for the largest share of cases; Black women often have higher rates of aggressive subtypes and later-stage diagnosis."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Bar chart of age-adjusted incidence rate by race">
          <BarCategoryChart
            data={chartData}
            xKey="race"
            yKey="age_adjusted_rate"
            xLabel="Race"
            yLabel="Age-adjusted rate (per 100,000)"
          />
        </div>
      )}
    </Figure>
  );
}
