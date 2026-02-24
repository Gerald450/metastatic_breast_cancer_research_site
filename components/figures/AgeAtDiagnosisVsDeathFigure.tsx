'use client';

import Figure from '@/components/Figure';
import GroupedBarChart from '@/components/charts/GroupedBarChart';
import { useFigureData } from '@/lib/use-figure-data';
import { ageAtDiagnosisVsDeathData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function AgeAtDiagnosisVsDeathFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/ageAtDiagnosisVsDeath');
  const chartData = (data && data.length > 0 ? data : ageAtDiagnosisVsDeathData) as Record<string, unknown>[];

  return (
    <Figure
      title="Age at Diagnosis vs Age at Death"
      description="Distribution comparison"
      status="Draft"
      externalSource={{ name: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.name, url: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.url }}
      caption="Age distribution at diagnosis vs at death. Data are illustrative; source to be verified. Similar variables: SEER (age at diagnosis), NCHS mortality (age at death). Data from public/csv/Subtypes/."
      summary="This grouped bar chart compares the age distribution at diagnosis with the age distribution at death—where in the lifespan people are when they are diagnosed with MBC vs when they die (from breast cancer or other causes). We show it to illustrate how the burden of diagnosis and death shifts across age; in older adults, competing causes of death also rise. Conclusion: in younger age groups, the distribution is dominated by new diagnoses; in the oldest groups, the share of deaths (from breast cancer and other causes) increases. What this means: both cancer-specific and overall mortality matter in older patients; care planning should consider age and competing risks."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Grouped bar chart of age at diagnosis vs age at death">
          <GroupedBarChart
            data={chartData}
            xKey="ageGroup"
            series={[
              { key: 'atDiagnosis', label: 'At diagnosis', color: '#3b82f6' },
              { key: 'atDeath', label: 'At death', color: '#ef4444' },
            ]}
            xLabel="Age group"
            yLabel="Percent"
          />
        </div>
      )}
    </Figure>
  );
}
