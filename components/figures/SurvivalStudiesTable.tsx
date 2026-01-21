'use client';

import { useMemo, useState, useEffect } from 'react';
import Figure, { FigureStatus } from '@/components/Figure';
import TableFallback from '@/components/charts/TableFallback';
import { getSurvivalOverTime, getSourceRefIds, type SurvivalOverTimeEntry } from '@/lib/extracted-data';

/**
 * Component to display survival studies table data
 * Groups entries by study and displays in a structured table format
 */
export default function SurvivalStudiesTable() {
  const [data, setData] = useState<(SurvivalOverTimeEntry & { hasReviewFlag: boolean })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getSurvivalOverTime();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching survival over time data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const sources = getSourceRefIds(data);
  const hasReviewFlag = data.some((entry) => entry.hasReviewFlag);

  // Group data by study (using population field which contains study info)
  const groupedStudies = useMemo(() => {
    const groups = new Map<string, SurvivalOverTimeEntry[]>();
    
    data.forEach((entry) => {
      // Extract study identifier from population field
      // Format: "Source Population | Disease Status | N=sampleSize"
      // Or use notes to extract study info
      let studyKey = entry.population || 'Unknown Study';
      
      // If population doesn't have the expected format, try to extract from notes
      if (!studyKey.includes('|')) {
        const notesMatch = entry.notes?.match(/(Start period|End period|Diagnosis period):\s*([^.]+)/);
        if (notesMatch) {
          studyKey = notesMatch[2] + ' | ' + (entry.population || '');
        }
      }
      
      if (!groups.has(studyKey)) {
        groups.set(studyKey, []);
      }
      groups.get(studyKey)!.push(entry);
    });
    
    return Array.from(groups.entries()).map(([key, entries]) => {
      // Parse study info from population field
      // Format: "Source Population | Disease Status | N=sampleSize"
      const parts = key.split(' | ');
      const sourcePopulation = parts[0] || 'Unknown';
      const diseaseStatus = parts[1] || '';
      const sampleSizePart = parts[2] || '';
      const sampleSize = sampleSizePart.replace('N=', '').trim();
      
      // Get time periods - sort them chronologically
      const timePeriods = Array.from(new Set(entries.map(e => e.timePeriod).filter(Boolean)))
        .sort((a, b) => {
          // Try to extract year for sorting
          const yearA = parseInt(a?.match(/\d{4}/)?.[0] || '0');
          const yearB = parseInt(b?.match(/\d{4}/)?.[0] || '0');
          return yearA - yearB;
        })
        .join(' to ');
      
      // Get values and format median survival
      const values = entries.map(e => e.value).filter(v => v !== null && v !== undefined && typeof v === 'number') as number[];
      const unit = entries[0]?.unit || 'months';
      const medianSurvival = values.length > 0 
        ? values.length === 1 
          ? `${values[0]} ${unit}`
          : `${Math.min(...values)} to ${Math.max(...values)} ${unit}`
        : 'N/A';
      
      // Get reference from notes
      const referenceMatch = entries[0]?.notes?.match(/Reference:\s*([^.]+)/);
      const reference = referenceMatch ? referenceMatch[1].trim() : '';
      
      // Get statistical significance from notes
      const sigMatch = entries[0]?.notes?.match(/Statistical significance:\s*([^.]+)/);
      const statisticalSignificance = sigMatch ? sigMatch[1].trim() : '';
      
      return {
        sourcePopulation,
        diseaseStatus,
        sampleSize,
        timePeriods,
        medianSurvival,
        statisticalSignificance,
        reference,
        entries,
      };
    }).sort((a, b) => {
      // Sort by source population name
      return a.sourcePopulation.localeCompare(b.sourcePopulation);
    });
  }, [data]);

  const status: FigureStatus = hasReviewFlag ? 'Needs Review' : 'Verified';

  if (loading) {
    return (
      <Figure
        title="Studies of Change in Survival Over Time"
        description="Comparison of survival outcomes across different studies and time periods"
        sources={[]}
        status="Verified"
        caption="Loading data..."
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading data...</p>
        </div>
      </Figure>
    );
  }

  if (groupedStudies.length === 0) {
    return (
      <Figure
        title="Studies of Change in Survival Over Time"
        description="Comparison of survival outcomes across different studies and time periods"
        sources={sources}
        status={status}
        caption="No study data available"
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 dark:text-gray-400">No study data available</p>
        </div>
      </Figure>
    );
  }

  // Prepare table data
  const tableData = groupedStudies.map((study) => ({
    sourcePopulation: study.sourcePopulation,
    diseaseStatus: study.diseaseStatus,
    sampleSize: study.sampleSize,
    timePeriods: study.timePeriods,
    medianSurvival: study.medianSurvival,
    statisticalSignificance: study.statisticalSignificance,
    reference: study.reference,
  }));

  const columns = [
    { key: 'sourcePopulation', label: 'Source Population' },
    { key: 'diseaseStatus', label: 'Disease Status' },
    { key: 'sampleSize', label: 'N' },
    { key: 'timePeriods', label: 'Time Periods Compared' },
    { key: 'medianSurvival', label: 'Median Survival' },
    { key: 'statisticalSignificance', label: 'Statistical Significance' },
    { key: 'reference', label: 'Reference' },
  ];

  return (
    <Figure
      title="Studies of Change in Survival Over Time"
      description="Comparison of survival outcomes across different studies and time periods for patients with metastatic breast cancer"
      sources={sources}
      status={status}
      caption="Data from Table 1: Studies of change in survival over time"
    >
      <div className="overflow-x-auto">
        <TableFallback data={tableData} columns={columns} maxRows={20} />
      </div>
    </Figure>
  );
}
