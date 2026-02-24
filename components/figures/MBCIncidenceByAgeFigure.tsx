'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { mbcIncidenceByAgeData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function MBCIncidenceByAgeFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/mbcIncidenceByAge');
  const chartData = (data && data.length > 0 ? data : mbcIncidenceByAgeData) as Record<string, unknown>[];

  return (
    <Figure
      title="MBC Incidence by Age Group"
      description="Stage IV incidence across age brackets"
      externalSource={{ name: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.name, url: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.url }}
      status="Draft"
      caption="Incidence rates by age from SEER and USCS. Count or rate per 100,000."
      summary="This chart shows metastatic breast cancer incidence by age group—how many new MBC cases occur in each age bracket (often per 100,000). We show it because age is a major driver of risk and detection; screening guidelines and resource planning depend on who is most affected. Conclusion: MBC incidence rises with age and typically peaks in older adults. What this means: screening and care capacity should be aligned with the age distribution of cases, and older adults deserve focused attention for both prevention and treatment, while younger patients with MBC need tailored support and research."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Bar chart of MBC incidence by age group">
          <BarCategoryChart data={chartData} xKey="ageGroup" yKey="incidence" xLabel="Age group" yLabel="Incidence" />
        </div>
      )}
    </Figure>
  );
}
