#!/usr/bin/env node

/**
 * Transform survival studies table data into the format expected by the migration script
 * 
 * This script converts the structured table data (survival_studies_table.json) into
 * multiple SurvivalOverTimeEntry records that can be imported into Firebase.
 * 
 * Usage:
 * 1. Fill in survival_studies_table.json with your table data
 * 2. Run: node scripts/transform-survival-studies-table.mjs
 * 3. The output will be saved to data/extracted/survival_over_time_from_table.json
 * 4. Merge or import this data using the migration script
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Reference mapping - maps author names to sourceRefId
// IMPORTANT: Update this based on your actual references from lib/references.ts
// The table uses citation numbers (e.g., "Giordano et al. (25)") - you need to map
// the author names to your reference IDs (ref-001, ref-002, etc.)
const REFERENCE_MAP = {
  // Example mappings - UPDATE THESE:
  'Giordano': 'ref-001',  // If Giordano et al. corresponds to ref-001
  'Vogel': 'ref-002',     // If Vogel et al. corresponds to ref-002
  'Zeichner': 'ref-002',  // If Zeichner is in the same paper as Vogel
  'Caswell': 'ref-001',   // Caswell-Jin et al.
  'Lord': 'ref-002',      // Lord et al.
  'Hudock': 'ref-004',    // Hudock et al.
  'Hendrick': 'ref-005',  // Hendrick et al.
  'Bonotto': 'ref-006',   // Bonotto et al.
  'Xiao': 'ref-007',      // Xiao et al.
  'Mariotto': 'ref-011',  // Mariotto et al.
  // Add more mappings as you identify them from your table
};

// Filename mapping - maps sourceRefId to filename
// This should match the filenames in lib/references.ts
const FILENAME_MAP = {
  'ref-001': 'Caswell_et_al.pdf',
  'ref-002': 'Lord_et_al.pdf',
  'ref-003': 'Jing_Lu_et_al.pdf',
  'ref-004': 'Hudock_et_al.pdf',
  'ref-005': 'Hendrick_et_al.pdf',
  'ref-006': 'Bonotto_et_al.pdf',
  'ref-007': 'Xiao_et_al.pdf',
  'ref-008': 'unknown.pdf',  // Update as needed
  'ref-009': 'unknown.pdf',  // Update as needed
  'ref-010': 'unknown.pdf',  // Update as needed
  'ref-011': 'Mariotto_et_al.pdf',
  'ref-012': 'unknown.pdf',  // Update as needed
  'ref-013': 'unknown.pdf',  // Update as needed
};

/**
 * Parse median survival string into structured data
 */
function parseMedianSurvival(medianSurvival) {
  const result = {
    value: null,
    valueRange: null,
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
    result.unit = 'months';
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

/**
 * Parse sample size
 */
function parseSampleSize(sampleSize) {
  if (typeof sampleSize === 'number') {
    return { value: sampleSize, isNotReported: false };
  }

  const str = String(sampleSize).trim();
  
  if (str === 'NR*' || str === 'NR' || str.toLowerCase().includes('not reported')) {
    return { value: null, isNotReported: true };
  }

  // Remove commas and parse
  const cleaned = str.replace(/,/g, '');
  const num = parseFloat(cleaned);
  
  if (!isNaN(num)) {
    return { value: num, isNotReported: false };
  }

  return { value: null, isNotReported: true };
}

/**
 * Extract source reference ID from references string
 */
function extractSourceRefId(references) {
  // Try to match author names in REFERENCE_MAP (case-insensitive)
  const refLower = references.toLowerCase();
  for (const [author, refId] of Object.entries(REFERENCE_MAP)) {
    if (refLower.includes(author.toLowerCase())) {
      return refId;
    }
  }
  
  // Default fallback - will need manual review
  console.warn(`   ⚠️  Could not map reference: "${references}" - using ref-unknown`);
  return 'ref-unknown';
}

/**
 * Transform a table entry into one or more SurvivalOverTimeEntry records
 */
function transformTableEntry(entry, index) {
  const sourceRefId = extractSourceRefId(entry.references);
  const filename = FILENAME_MAP[sourceRefId] || 'unknown.pdf';
  
  const survivalData = parseMedianSurvival(entry.medianSurvival);
  const sampleSizeData = parseSampleSize(entry.sampleSize);
  
  const entries = [];
  
  // Create entries for each time period in the comparison
  const timePeriods = entry.recurrenceTimePeriodsCompared.split(' to ');
  if (timePeriods.length >= 2) {
    const startPeriod = timePeriods[0].trim();
    const endPeriod = timePeriods[1].trim();
    
    // Entry for start period
    if (survivalData.valueRange) {
      entries.push({
        sourceRefId,
        filename,
        metricName: 'median survival',
        timePeriod: startPeriod,
        value: survivalData.valueRange.min,
        unit: survivalData.unit,
        population: `${entry.sourcePopulation} | ${entry.diseaseStatus} | N=${sampleSizeData.value || 'NR'}`,
        notes: `Start period: ${startPeriod}. ${entry.medianSurvival}. Statistical significance: ${entry.statisticalSignificance}. Reference: ${entry.references}. ${entry.notes || ''}`,
        pageHint: 0, // Will need to be updated manually
        needsManualReview: false,
      });
    }
    
    // Entry for end period
    if (survivalData.valueRange) {
      entries.push({
        sourceRefId,
        filename,
        metricName: 'median survival',
        timePeriod: endPeriod,
        value: survivalData.valueRange.max,
        unit: survivalData.unit,
        population: `${entry.sourcePopulation} | ${entry.diseaseStatus} | N=${sampleSizeData.value || 'NR'}`,
        notes: `End period: ${endPeriod}. ${entry.medianSurvival}. Statistical significance: ${entry.statisticalSignificance}. Reference: ${entry.references}. ${entry.notes || ''}`,
        pageHint: 0, // Will need to be updated manually
        needsManualReview: false,
      });
    }
    
    // If single value, create one entry with the diagnosis period as timePeriod
    if (survivalData.value !== null && !survivalData.valueRange) {
      entries.push({
        sourceRefId,
        filename,
        metricName: 'median survival',
        timePeriod: entry.diagnosisPeriod,
        value: survivalData.value,
        unit: survivalData.unit,
        population: `${entry.sourcePopulation} | ${entry.diseaseStatus} | N=${sampleSizeData.value || 'NR'}`,
        notes: `Diagnosis period: ${entry.diagnosisPeriod}. Recurrence periods: ${entry.recurrenceTimePeriodsCompared}. ${entry.medianSurvival}. Statistical significance: ${entry.statisticalSignificance}. Reference: ${entry.references}. ${entry.notes || ''}`,
        pageHint: 0, // Will need to be updated manually
        needsManualReview: false,
      });
    }
  } else {
    // Single time period or unclear format
    if (survivalData.value !== null) {
      entries.push({
        sourceRefId,
        filename,
        metricName: 'median survival',
        timePeriod: entry.diagnosisPeriod,
        value: survivalData.value,
        unit: survivalData.unit,
        population: `${entry.sourcePopulation} | ${entry.diseaseStatus} | N=${sampleSizeData.value || 'NR'}`,
        notes: `Diagnosis period: ${entry.diagnosisPeriod}. Recurrence periods: ${entry.recurrenceTimePeriodsCompared}. ${entry.medianSurvival}. Statistical significance: ${entry.statisticalSignificance}. Reference: ${entry.references}. ${entry.notes || ''}`,
        pageHint: 0, // Will need to be updated manually
        needsManualReview: false,
      });
    } else if (survivalData.valueRange) {
      // Create entry with average of range
      const avgValue = (survivalData.valueRange.min + survivalData.valueRange.max) / 2;
      entries.push({
        sourceRefId,
        filename,
        metricName: 'median survival',
        timePeriod: entry.diagnosisPeriod,
        value: avgValue,
        unit: survivalData.unit,
        population: `${entry.sourcePopulation} | ${entry.diseaseStatus} | N=${sampleSizeData.value || 'NR'}`,
        notes: `Diagnosis period: ${entry.diagnosisPeriod}. Recurrence periods: ${entry.recurrenceTimePeriodsCompared}. ${entry.medianSurvival} (using average). Statistical significance: ${entry.statisticalSignificance}. Reference: ${entry.references}. ${entry.notes || ''}`,
        pageHint: 0, // Will need to be updated manually
        needsManualReview: true, // Flag for review since we're using average
      });
    }
  }
  
  return entries;
}

/**
 * Main transformation function
 */
function main() {
  console.log('🔄 Transforming survival studies table data...\n');
  
  const inputPath = join(__dirname, '..', 'data', 'extracted', 'survival_studies_table.json');
  const outputPath = join(__dirname, '..', 'data', 'extracted', 'survival_over_time_from_table.json');
  
  // Check if input file exists
  if (!existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${inputPath}`);
    console.error(`\n   Please create the file using the template:`);
    console.error(`   data/extracted/survival_studies_table_template.json`);
    process.exit(1);
  }
  
  try {
    // Read input data
    const tableData = JSON.parse(readFileSync(inputPath, 'utf-8'));
    console.log(`📖 Read ${tableData.length} table entries\n`);
    
    // Transform each entry
    const transformedEntries = [];
    for (let i = 0; i < tableData.length; i++) {
      const entry = tableData[i];
      const entries = transformTableEntry(entry, i);
      transformedEntries.push(...entries);
      console.log(`   ✓ Entry ${i + 1}: Created ${entries.length} survival record(s)`);
    }
    
    // Write output
    writeFileSync(outputPath, JSON.stringify(transformedEntries, null, 2), 'utf-8');
    
    console.log(`\n✅ Transformation complete!`);
    console.log(`   Input: ${tableData.length} table entries`);
    console.log(`   Output: ${transformedEntries.length} survival records`);
    console.log(`   Saved to: ${outputPath}\n`);
    
    console.log('📝 Next steps:');
    console.log('   1. Review the transformed data');
    console.log('   2. Update sourceRefId mappings in this script if needed');
    console.log('   3. Add pageHint values manually if you know the page numbers');
    console.log('   4. Merge with existing survival_over_time.json or import separately\n');
    
  } catch (error) {
    console.error('❌ Error during transformation:', error);
    process.exit(1);
  }
}

// Run transformation
main();
