'use client';

import Figure from '@/components/Figure';
import TableFallback from '@/components/charts/TableFallback';
import { references } from '@/lib/references';
import type { SurvivalStudiesTableEntry } from '@/lib/survival-studies-table';

// Table 1 data: single source from JSON (see data/extracted/README / SURVIVAL_STUDIES_TABLE_README)
import tableDataJson from '@/data/extracted/survival_studies_table.json';

const tableData = tableDataJson as SurvivalStudiesTableEntry[];

/** Try to resolve a reference string (e.g. "Giordano et al. (25)") to a ref id for linking */
function refStringToId(refString: string): string | null {
  if (!refString?.trim()) return null;
  const lower = refString.toLowerCase();
  for (const ref of references) {
    const authorMatch = ref.authors && lower.includes(ref.authors.split(',')[0].split(' ').pop()?.toLowerCase() ?? '');
    if (authorMatch || lower.includes(ref.id)) return ref.id;
  }
  return null;
}

export default function SurvivalStudiesTable() {
  const sources = Array.from(
    new Set(
      tableData
        .map((row) => refStringToId(row.references))
        .filter((id): id is string => id != null)
    )
  ).sort();

  const columns = [
    { key: 'diagnosisPeriod', label: 'Diagnosis period' },
    { key: 'recurrenceTimePeriodsCompared', label: 'Recurrence time periods compared' },
    { key: 'diseaseStatus', label: 'Disease status' },
    { key: 'sourcePopulation', label: 'Source population' },
    { key: 'sampleSize', label: 'Sample size' },
    { key: 'medianSurvival', label: 'Median survival' },
    { key: 'statisticalSignificance', label: 'Statistical significance' },
    { key: 'references', label: 'References' },
  ];

  const tableRows = tableData.map((row) => ({
    diagnosisPeriod: row.diagnosisPeriod,
    recurrenceTimePeriodsCompared: row.recurrenceTimePeriodsCompared,
    diseaseStatus: row.diseaseStatus,
    sourcePopulation: row.sourcePopulation,
    sampleSize: row.sampleSize,
    medianSurvival: row.medianSurvival,
    statisticalSignificance: row.statisticalSignificance,
    references: row.references,
  }));

  return (
    <Figure
      title="Studies of Change in Survival Over Time"
      description="Comparison of survival outcomes across different studies and time periods for patients with metastatic breast cancer"
      sources={sources}
      status="Verified"
      caption="Data from Table 1: Studies of change in survival over time. Verify page ranges in source PDFs."
    >
      <div className="overflow-x-auto">
        <TableFallback data={tableRows} columns={columns} maxRows={20} />
      </div>
    </Figure>
  );
}
