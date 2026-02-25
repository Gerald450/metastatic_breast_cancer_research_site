'use client';

import Figure from '@/components/Figure';
import DotPlotChart from '@/components/charts/DotPlotChart';
import { useFigureData } from '@/lib/use-figure-data';
import { hrHer2NegTrendsByAgeData } from '@/lib/seer-subtypes-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

/** Fallback when DB has no data (e.g. before ingest). From SEER*Explorer explorer_download (2).csv. */
const fallbackData = hrHer2NegTrendsByAgeData.map((r) => ({
  ageGroup: r.subtype,
  aapc: r.aapc,
}));

export default function HRPlusHer2NegTrendsByAgeFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/hr-her2-neg-incidence-trends-by-age'
  );
  const rawData = (data ?? []) as { ageGroup: string; yearRange: string; aapc: number }[];
  const chartData =
    rawData.length > 0
      ? rawData.filter((r) => r.yearRange === '2013-2022').map((r) => ({ ageGroup: r.ageGroup, aapc: r.aapc }))
      : fallbackData;

  return (
    <Figure
      title="HR+/HER2- (Luminal A) Incidence Trends by Age"
      description="Average Annual Percent Change, 2013-2022"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Draft"
      caption="AAPC in HR+/HER2- (Luminal A) incidence by age group. Data from SEER txtData (Incidence_trends_by_agetxt.txt). 2020 excluded from trend per SEER."
      summary="This chart displays the average annual percent change (AAPC) in incidence of HR+/HER2- (Luminal A) breast cancer by age group over 2013–2022—whether this common subtype is becoming more or less frequent in younger vs older women. Age-specific trends matter because screening guidelines and subtype distribution differ by age."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : (
        <div role="img" aria-label="Dot plot of HR+/HER2- incidence AAPC by age group">
          <DotPlotChart
            data={chartData}
            categoryKey="ageGroup"
            valueKey="aapc"
            categoryLabel="Age group"
            valueLabel="AAPC (%)"
            showZeroLine
          />
        </div>
      )}
    </Figure>
  );
}
