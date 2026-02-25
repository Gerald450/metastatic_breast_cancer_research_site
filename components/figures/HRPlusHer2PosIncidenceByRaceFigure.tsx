'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { SEER_DATA_SOURCE } from '@/lib/online-sources';

export default function HRPlusHer2PosIncidenceByRaceFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>(
    '/api/data/seer/charts/hr-her2-pos-incidence-by-race'
  );
  const chartData = (data ?? []) as { race: string; age_adjusted_rate: number }[];

  return (
    <Figure
      title="HR+/HER2+ Breast Cancer Incidence by Race/Ethnicity"
      description="5-year age-adjusted rates (2018-2022), per 100,000"
      dataSourceCitation={SEER_DATA_SOURCE}
      status="Verified"
      caption="Luminal B (HR+/HER2+) subtype. Data from SEER Research Data (txtData), 21 Registries, Nov 2024 Sub (2000-2022). Female, age-adjusted rate per 100,000."
      summary="This chart shows age-adjusted incidence rates of HR+/HER2+ (Luminal B) breast cancer by race and ethnicity—how common this subtype is in each group per 100,000. Subtype incidence differs by race, which can inform screening and research priorities. Racial and ethnic variation in subtype distribution may reflect both biology and ascertainment; understanding these patterns supports equitable research and care."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          No data. Run ingest:seer and ensure her2_by_race.txt is loaded.
        </div>
      ) : (
        <div role="img" aria-label="Bar chart of HR+/HER2+ incidence rate by race/ethnicity">
          <BarCategoryChart
            data={chartData}
            xKey="race"
            yKey="age_adjusted_rate"
            xLabel="Race / ethnicity"
            yLabel="Rate per 100,000"
          />
        </div>
      )}
    </Figure>
  );
}
