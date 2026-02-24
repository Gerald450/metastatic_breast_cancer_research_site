'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function SEERIncidenceTrendsByRaceFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/incidence-trends-by-race'
  );
  const rawData = (data ?? []) as { race: string; yearRange: string; aapc: number }[];
  const chartData = rawData.filter((r) => r.yearRange === '2013-2022').map((r) => ({ race: r.race, aapc: r.aapc }));

  return (
    <Figure
      title="SEER Cancer Incidence Trends by Race/Ethnicity"
      description="Average Annual Percent Change (AAPC), 2013-2022"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="All Cancer Sites Combined. AAPC derived from SEER Research Data (txtData) age-adjusted rates."
      summary="This graph shows the average annual percent change (AAPC) in cancer incidence from 2013 to 2022 for each race and ethnicity group—how fast new cancer cases are rising or falling per year. We track this by race because incidence and mortality often differ by population due to biology, screening access, and social determinants of health. The takeaway: incidence trends vary by race/ethnicity; some groups show rising rates while others are stable or declining. In practice, this means public health efforts and screening programs should be tailored by population, and disparities in who gets cancer (and when) need targeted interventions."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data. Run ingest:seer and ensure trends_by_ethnicity.txt is loaded.
        </div>
      ) : (
        <div role="img" aria-label="Bar chart of incidence AAPC by race/ethnicity">
          <BarCategoryChart
            data={chartData}
            xKey="race"
            yKey="aapc"
            xLabel="Race / ethnicity"
            yLabel="AAPC (%)"
          />
        </div>
      )}
    </Figure>
  );
}
