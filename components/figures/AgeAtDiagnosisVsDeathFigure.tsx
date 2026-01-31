'use client';

import Figure from '@/components/Figure';
import GroupedBarChart from '@/components/charts/GroupedBarChart';
import { ageAtDiagnosisVsDeathData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

const series = [
  { key: 'atDiagnosis', label: 'At diagnosis' },
  { key: 'atDeath', label: 'At death' },
];

export default function AgeAtDiagnosisVsDeathFigure() {
  const hasData = ageAtDiagnosisVsDeathData.length > 0;

  return (
    <Figure
      title="Age at Diagnosis vs Age at Death"
      description="Distribution comparison"
      externalSource={{ name: 'SEER / ACS', url: ONLINE_SOURCES.NCI_SEER.url }}
      status="Draft"
      caption="Age distribution at diagnosis vs at death. SEER age variables."
      summary="The shift between age at diagnosis and age at death shows that older patients more often die from MBC. In younger age groups, diagnosis predominates; in the oldest groups, death from breast cancer or other causes increases."
    >
      {hasData ? (
        <div role="img" aria-label="Grouped bar chart comparing age at diagnosis vs age at death by age group">
          <GroupedBarChart
            data={ageAtDiagnosisVsDeathData}
            xKey="ageGroup"
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
