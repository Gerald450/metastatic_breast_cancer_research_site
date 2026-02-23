'use client';

import Figure from '@/components/Figure';
import BarCategoryChart from '@/components/charts/BarCategoryChart';
import { useFigureData } from '@/lib/use-figure-data';
import { insuranceVsStageAtDiagnosisData } from '@/lib/mbc-figure-data';
import { ONLINE_SOURCES } from '@/lib/online-sources';

export default function InsuranceVsStageAtDiagnosisFigure() {
  const { data, loading } = useFigureData<Record<string, unknown>[]>('/api/data/figure/insuranceVsStageAtDiagnosis');
  const chartData = (data && data.length > 0 ? data : insuranceVsStageAtDiagnosisData) as Record<string, unknown>[];

  return (
    <Figure
      title="Insurance Status vs Stage at Diagnosis"
      description="Later-stage diagnosis among uninsured"
      externalSource={{ name: 'SEER / USCS', url: ONLINE_SOURCES.USCS.url }}
      status="Draft"
      caption="Percent diagnosed at late stage (regional or distant) by insurance status. SEER and USCS."
      summary="Uninsured and Medicaid patients are more likely to be diagnosed at late stage, reflecting barriers to screening and timely care. Improving access to insurance and preventive services could reduce late-stage diagnoses."
    >
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <div role="img" aria-label="Bar chart of late-stage diagnosis by insurance status">
          <BarCategoryChart data={chartData} xKey="insuranceStatus" yKey="lateStagePercent" xLabel="Insurance status" yLabel="Late stage (%)" />
        </div>
      )}
    </Figure>
  );
}
