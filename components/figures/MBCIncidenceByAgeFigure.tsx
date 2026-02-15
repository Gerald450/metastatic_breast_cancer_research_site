'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { mbcIncidenceByAgeData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function MBCIncidenceByAgeFigure() {
  const hasData = mbcIncidenceByAgeData.length > 0;

  return (
    <Figure
      title="MBC Incidence by Age Group"
      description="Stage IV incidence across age brackets"
      externalSource={{ name: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.name, url: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.url }}
      status="Draft"
      caption="Incidence rates by age from SEER and USCS. Count or rate per 100,000."
      summary="MBC incidence increases with age, peaking in older adults. The age distribution informs screening guidelines and resource allocation for different populations."
    >
      {hasData ? (
        <div role="img" aria-label="Bar chart of MBC incidence by age group">
          <BarCategoryChart
            data={mbcIncidenceByAgeData}
            xKey="ageGroup"
            yKey="incidence"
            yLabel="Incidence (rate per 100,000)"
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
