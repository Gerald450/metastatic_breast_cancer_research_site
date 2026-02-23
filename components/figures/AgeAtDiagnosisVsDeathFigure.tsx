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
      summary="The shift between age at diagnosis and age at death shows that older patients more often die from MBC. In younger age groups, diagnosis predominates; in the oldest groups, death from breast cancer or other causes increases."
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
