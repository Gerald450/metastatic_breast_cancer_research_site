'use client';

import Figure from '@/components/Figure';
import GroupedBarChart from '@/components/charts/GroupedBarChart';
import { ageAtDiagnosisVsDeathData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const series = [
  { key: 'atDiagnosis', label: 'Patients diagnosed' },
  { key: 'atDeath', label: 'Patients who died' },
];

export default function AgeAtDiagnosisVsDeathFigure() {
  const hasData = ageAtDiagnosisVsDeathData.length > 0;

  return (
    <Figure
      title="Age at Diagnosis vs Age at Death"
      description="Distribution comparison"
      status="Draft"
      externalSource={{ name: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.name, url: ONLINE_SOURCES.SEER_EXPLORER_FEMALE_BREAST.url }}
      caption="Age distribution at diagnosis vs at death. Data are illustrative; source to be verified. Similar variables: SEER (age at diagnosis), NCHS mortality (age at death). Data from public/csv/Subtypes/."
      summary="The shift between age at diagnosis and age at death shows that older patients more often die from MBC. In younger age groups, diagnosis predominates; in the oldest groups, death from breast cancer or other causes increases."
    >
      {hasData ? (
        <div role="img" aria-label="Grouped bar chart comparing age at diagnosis vs age at death by age group">
          <GroupedBarChart
            data={ageAtDiagnosisVsDeathData}
            xKey="ageGroup"
            series={series}
            xLabel="Age group"
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
