// Extended data types for survival studies table
// This represents the structured table data from "Table 1. Studies of change in survival over time"

export type DiseaseStatus = 'Recurrent' | 'Stage IV' | 'Recurrent & Stage IV';

export type StatisticalSignificance = 
  | 'UV only'
  | 'UV (no MV done)'
  | 'UV & MV'
  | 'UV & MV**'
  | 'UV & MV++'
  | 'No improvement';

export type SurvivalStudiesTableEntry = {
  // Table columns
  diagnosisPeriod: string; // e.g., "1974-1994", "Any year"
  recurrenceTimePeriodsCompared: string; // e.g., "1974-1979 to 1995-2000"
  diseaseStatus: DiseaseStatus | string; // e.g., "Recurrent (90%) & stage IV"
  sourcePopulation: string; // e.g., "Adjuvant clinical trials, MD Anderson Cancer Center"
  sampleSize: string | number; // e.g., "70", "15438", or "NR*" (not reported)
  medianSurvival: string; // e.g., "15 to 58", "26 to 33", "5 yrt: 19% to 34%"
  statisticalSignificance: StatisticalSignificance | string;
  references: string; // e.g., "Giordano et al. (25)" or "Vogel et al., Zeichner et al. (49,50)"
  
  // Metadata for mapping to existing system
  sourceRefId?: string; // Will be mapped from references field
  filename?: string; // Will be mapped from sourceRefId
  notes?: string; // Additional context or footnotes
};

// Helper function to parse median survival string into structured data
export function parseMedianSurvival(medianSurvival: string): {
  value: number | null;
  valueRange: { min: number; max: number } | null;
  unit: string;
  isPercentage: boolean;
  isYearRate: boolean;
} {
  const result = {
    value: null as number | null,
    valueRange: null as { min: number; max: number } | null,
    unit: 'months',
    isPercentage: false,
    isYearRate: false,
  };

  // Check for year rate format: "5 yrt: 19% to 34%"
  const yearRateMatch = medianSurvival.match(/(\d+)\s*yrt?:\s*(\d+)%\s*to\s*(\d+)%/i);
  if (yearRateMatch) {
    result.isYearRate = true;
    result.unit = `years (${yearRateMatch[1]}-year rate)`;
    result.valueRange = {
      min: parseFloat(yearRateMatch[2]),
      max: parseFloat(yearRateMatch[3]),
    };
    result.isPercentage = true;
    return result;
  }

  // Check for percentage range: "19% to 34%"
  const percentRangeMatch = medianSurvival.match(/(\d+(?:\.\d+)?)%\s*to\s*(\d+(?:\.\d+)?)%/);
  if (percentRangeMatch) {
    result.valueRange = {
      min: parseFloat(percentRangeMatch[1]),
      max: parseFloat(percentRangeMatch[2]),
    };
    result.isPercentage = true;
    result.unit = '%';
    return result;
  }

  // Check for number range: "15 to 58", "26 to 33"
  const rangeMatch = medianSurvival.match(/(\d+(?:\.\d+)?)\s*to\s*(\d+(?:\.\d+)?)/);
  if (rangeMatch) {
    result.valueRange = {
      min: parseFloat(rangeMatch[1]),
      max: parseFloat(rangeMatch[2]),
    };
    result.unit = 'months'; // Default assumption
    return result;
  }

  // Check for single number with unit
  const singleNumberMatch = medianSurvival.match(/(\d+(?:\.\d+)?)\s*(months?|years?|%)/i);
  if (singleNumberMatch) {
    result.value = parseFloat(singleNumberMatch[1]);
    const unit = singleNumberMatch[2].toLowerCase();
    if (unit.includes('year')) {
      result.unit = 'years';
    } else if (unit.includes('%')) {
      result.unit = '%';
      result.isPercentage = true;
    } else {
      result.unit = 'months';
    }
    return result;
  }

  // Check for single number without unit (assume months)
  const singleNumberOnly = medianSurvival.match(/^(\d+(?:\.\d+)?)$/);
  if (singleNumberOnly) {
    result.value = parseFloat(singleNumberOnly[1]);
    result.unit = 'months';
    return result;
  }

  return result;
}

// Helper function to parse sample size
export function parseSampleSize(sampleSize: string | number): {
  value: number | null;
  isNotReported: boolean;
  notes: string;
} {
  if (typeof sampleSize === 'number') {
    return { value: sampleSize, isNotReported: false, notes: '' };
  }

  const str = String(sampleSize).trim();
  
  if (str === 'NR*' || str === 'NR' || str.toLowerCase().includes('not reported')) {
    return { value: null, isNotReported: true, notes: 'Not reported' };
  }

  // Remove commas and parse
  const cleaned = str.replace(/,/g, '');
  const num = parseFloat(cleaned);
  
  if (!isNaN(num)) {
    return { value: num, isNotReported: false, notes: '' };
  }

  return { value: null, isNotReported: true, notes: `Could not parse: ${str}` };
}
