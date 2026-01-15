import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfParse from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PDF source mapping
const PDF_SOURCES = [
  { refId: 'ref-001', filename: 'Caswell_et_al.pdf' },
  { refId: 'ref-002', filename: 'Lord_et_ al.pdf' },
  { refId: 'ref-004', filename: 'Hudock_et_al.pdf' },
  { refId: 'ref-005', filename: 'Hendrick_et_al.pdf' },
  { refId: 'ref-006', filename: 'Bonotto_et_al.pdf' },
  { refId: 'ref-007', filename: 'Xiao_et_al.pdf' },
  { refId: 'ref-011', filename: 'Mariotto_et_al.pdf' },
];

const PDF_DIR = path.join(__dirname, '..', 'public', 'pdfs');
const OUTPUT_DIR = path.join(__dirname, '..', 'data', 'extracted');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extract text from PDF page by page
 */
async function extractPdfText(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    
    // pdf-parse doesn't provide page-by-page extraction directly
    // We'll use the full text and try to infer page breaks
    // For better page-level extraction, we'd need pdfjs-dist
    const fullText = data.text;
    const numPages = data.numpages;
    
    // Simple heuristic: split by common page break indicators
    // This is approximate - for accurate page tracking, pdfjs-dist would be better
    const pages = [];
    const textChunks = fullText.split(/\n\s*\n/);
    const avgChunkSize = fullText.length / numPages;
    
    let currentPage = 1;
    let currentPageText = '';
    let charCount = 0;
    
    for (const chunk of textChunks) {
      currentPageText += chunk + '\n\n';
      charCount += chunk.length;
      
      // Estimate page breaks based on character count
      if (charCount >= avgChunkSize * currentPage && currentPage < numPages) {
        pages.push({
          pageNumber: currentPage,
          text: currentPageText.trim(),
        });
        currentPageText = '';
        currentPage++;
      }
    }
    
    // Add remaining text to last page
    if (currentPageText.trim()) {
      pages.push({
        pageNumber: currentPage <= numPages ? currentPage : numPages,
        text: currentPageText.trim(),
      });
    }
    
    return pages;
  } catch (error) {
    console.error(`Error extracting text from ${pdfPath}:`, error.message);
    return [];
  }
}

/**
 * Extract numeric candidates from text using regex patterns
 */
function extractNumericCandidates(text, pageNumber, sourceRefId, filename) {
  const candidates = [];
  
  // Regex patterns for different numeric types
  const patterns = [
    {
      name: 'percentage',
      regex: /(\d+\.?\d*)\s*%/gi,
      unit: '%',
    },
    {
      name: 'hazard_ratio',
      regex: /HR\s*[=:]\s*(\d+\.?\d*)/gi,
      unit: null,
    },
    {
      name: 'survival_months',
      regex: /(\d+\.?\d*)\s*(?:months?|mo\.?)\b/gi,
      unit: 'months',
    },
    {
      name: 'survival_years',
      regex: /(\d+\.?\d*)\s*(?:years?|yr\.?)\b/gi,
      unit: 'years',
    },
    {
      name: 'rate_per',
      regex: /(\d+\.?\d*)\s*(?:per|\/)\s*(\d+)/gi,
      unit: null, // Will be determined from context
    },
    {
      name: 'count',
      regex: /(\d+\.?\d*)\s*(?:patients?|cases?|women|men|subjects?|individuals?)\b/gi,
      unit: 'count',
    },
    {
      name: 'year',
      regex: /\b(19|20)\d{2}\b/g,
      unit: 'year',
    },
    {
      name: 'decimal',
      regex: /\b(\d+\.\d+)\b/g,
      unit: null,
    },
    {
      name: 'integer',
      regex: /\b(\d{2,})\b/g, // At least 2 digits to avoid page numbers, etc.
      unit: null,
    },
  ];
  
  // Extract context around matches (surrounding sentence)
  const sentences = text.split(/[.!?]\s+/);
  
  for (const pattern of patterns) {
    let match;
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    
    while ((match = regex.exec(text)) !== null) {
      const value = parseFloat(match[1] || match[0]);
      if (isNaN(value)) continue;
      
      // Find the sentence containing this match
      const matchIndex = match.index;
      let context = '';
      let sentenceStart = 0;
      
      for (const sentence of sentences) {
        const sentenceEnd = sentenceStart + sentence.length;
        if (matchIndex >= sentenceStart && matchIndex <= sentenceEnd) {
          context = sentence;
          break;
        }
        sentenceStart = sentenceEnd + 2; // +2 for '. ' or similar
      }
      
      // If no sentence found, get surrounding text
      if (!context) {
        const start = Math.max(0, matchIndex - 100);
        const end = Math.min(text.length, matchIndex + match[0].length + 100);
        context = text.substring(start, end);
      }
      
      // Determine confidence based on context
      let confidence = 'low';
      if (pattern.name === 'percentage' || pattern.name === 'hazard_ratio') {
        confidence = 'high';
      } else if (pattern.name === 'survival_months' || pattern.name === 'survival_years') {
        confidence = 'high';
      } else if (pattern.name === 'count' && context.toLowerCase().includes('patient')) {
        confidence = 'medium';
      } else if (pattern.name === 'year' && (value >= 1990 && value <= 2025)) {
        confidence = 'medium';
      }
      
      candidates.push({
        sourceRefId,
        filename,
        pageNumber,
        rawText: context.trim(),
        extractedValue: value,
        unit: pattern.unit,
        patternType: pattern.name,
        confidence,
      });
    }
  }
  
  return candidates;
}

/**
 * Map candidates to structured datasets using conservative rules
 */
function mapToDatasets(candidates) {
  const survivalOverTime = [];
  const prevalenceBurden = [];
  const demographicsAgeRace = [];
  const metastaticSiteOutcomes = [];
  
  // Keywords for each dataset type
  const survivalKeywords = ['survival', 'survived', 'mortality', 'death', 'died', 'os', 'overall survival', 'disease-free', 'progression-free'];
  const prevalenceKeywords = ['prevalence', 'prevalent', 'burden', 'cases', 'incidence', 'diagnosed'];
  const demographicsKeywords = ['age', 'aged', 'race', 'racial', 'ethnic', 'demographic', 'black', 'white', 'hispanic', 'asian'];
  const siteKeywords = ['brain', 'liver', 'lung', 'bone', 'lymph node', 'metastatic site', 'metastasis to', 'metastases'];
  
  for (const candidate of candidates) {
    const textLower = candidate.rawText.toLowerCase();
    let assigned = false;
    
    // Check for survival over time
    if (survivalKeywords.some(kw => textLower.includes(kw))) {
      const timeMatch = textLower.match(/(\d+)\s*(?:year|month|yr|mo)/);
      const yearMatch = textLower.match(/(19|20)\d{2}/);
      
      survivalOverTime.push({
        sourceRefId: candidate.sourceRefId,
        filename: candidate.filename,
        metricName: extractMetricName(candidate.rawText, survivalKeywords),
        timePeriod: yearMatch ? yearMatch[0] : (timeMatch ? timeMatch[0] : null),
        value: candidate.patternType === 'year' ? null : candidate.extractedValue,
        unit: candidate.unit || extractUnit(candidate.rawText),
        population: extractPopulation(candidate.rawText),
        notes: candidate.rawText.substring(0, 200),
        pageHint: candidate.pageNumber,
        needsManualReview: candidate.confidence === 'low' || candidate.patternType === 'year',
      });
      assigned = true;
    }
    
    // Check for prevalence/survivorship burden
    if (!assigned && prevalenceKeywords.some(kw => textLower.includes(kw))) {
      const yearMatch = textLower.match(/(19|20)\d{2}/);
      
      prevalenceBurden.push({
        sourceRefId: candidate.sourceRefId,
        filename: candidate.filename,
        metricName: extractMetricName(candidate.rawText, prevalenceKeywords),
        yearOrRange: yearMatch ? yearMatch[0] : extractYearRange(candidate.rawText),
        value: candidate.patternType === 'year' ? null : candidate.extractedValue,
        unit: candidate.unit || extractUnit(candidate.rawText) || 'cases',
        population: extractPopulation(candidate.rawText),
        notes: candidate.rawText.substring(0, 200),
        pageHint: candidate.pageNumber,
        needsManualReview: candidate.confidence === 'low' || candidate.patternType === 'year',
      });
      assigned = true;
    }
    
    // Check for demographics (age/race)
    if (!assigned && demographicsKeywords.some(kw => textLower.includes(kw))) {
      const ageMatch = textLower.match(/(\d+)[-\s](\d+)\s*years?/);
      const ageRange = ageMatch ? `${ageMatch[1]}-${ageMatch[2]}` : extractAgeRange(candidate.rawText);
      
      demographicsAgeRace.push({
        sourceRefId: candidate.sourceRefId,
        filename: candidate.filename,
        metricName: extractMetricName(candidate.rawText, demographicsKeywords),
        groupLabel: extractGroupLabel(candidate.rawText),
        ageRange: ageRange,
        value: candidate.patternType === 'year' ? null : candidate.extractedValue,
        unit: candidate.unit || extractUnit(candidate.rawText),
        notes: candidate.rawText.substring(0, 200),
        pageHint: candidate.pageNumber,
        needsManualReview: candidate.confidence === 'low' || candidate.patternType === 'year',
      });
      assigned = true;
    }
    
    // Check for metastatic site outcomes
    if (!assigned && siteKeywords.some(kw => textLower.includes(kw))) {
      const site = extractMetastaticSite(candidate.rawText, siteKeywords);
      
      metastaticSiteOutcomes.push({
        sourceRefId: candidate.sourceRefId,
        filename: candidate.filename,
        site: site,
        metricName: extractMetricName(candidate.rawText, [...siteKeywords, ...survivalKeywords]),
        value: candidate.patternType === 'year' ? null : candidate.extractedValue,
        unit: candidate.unit || extractUnit(candidate.rawText),
        notes: candidate.rawText.substring(0, 200),
        pageHint: candidate.pageNumber,
        needsManualReview: candidate.confidence === 'low' || candidate.patternType === 'year' || !site,
      });
      assigned = true;
    }
    
    // If not assigned to any dataset, still add to one with needsManualReview=true
    // We'll add unassigned candidates to a catch-all category
    // For now, we'll skip them to be conservative
  }
  
  return {
    survivalOverTime,
    prevalenceBurden,
    demographicsAgeRace,
    metastaticSiteOutcomes,
  };
}

/**
 * Helper functions for extracting structured information
 */
function extractMetricName(text, keywords) {
  // Try to find a metric name near keywords
  const textLower = text.toLowerCase();
  for (const kw of keywords) {
    const index = textLower.indexOf(kw);
    if (index !== -1) {
      const start = Math.max(0, index - 30);
      const end = Math.min(text.length, index + kw.length + 30);
      const snippet = text.substring(start, end);
      // Extract a reasonable metric name
      const match = snippet.match(/(?:overall|median|mean|5-year|10-year)?\s*(?:survival|prevalence|incidence|rate|burden)/i);
      if (match) {
        return match[0].trim();
      }
    }
  }
  return null;
}

function extractUnit(text) {
  const unitPatterns = [
    /per\s*100[,.]?000/gi,
    /per\s*100/gi,
    /months?/gi,
    /years?/gi,
    /%/g,
  ];
  
  for (const pattern of unitPatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0].toLowerCase();
    }
  }
  return null;
}

function extractPopulation(text) {
  const populationPatterns = [
    /(?:US|United States)\s*(?:women|men|patients?|population)/gi,
    /metastatic\s*breast\s*cancer/gi,
    /(?:women|men|patients?)\s*with\s*metastatic/gi,
  ];
  
  for (const pattern of populationPatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }
  return null;
}

function extractYearRange(text) {
  const yearPattern = /(19|20)\d{2}/g;
  const years = [];
  let match;
  while ((match = yearPattern.exec(text)) !== null) {
    years.push(match[0]);
  }
  if (years.length >= 2) {
    return `${years[0]}-${years[years.length - 1]}`;
  } else if (years.length === 1) {
    return years[0];
  }
  return null;
}

function extractAgeRange(text) {
  const agePattern = /(\d+)[-\s](\d+)\s*years?/i;
  const match = text.match(agePattern);
  if (match) {
    return `${match[1]}-${match[2]}`;
  }
  return null;
}

function extractGroupLabel(text) {
  const groupPatterns = [
    /(?:non-?)?hispanic\s*(?:black|white|asian|native)/gi,
    /(?:black|white|asian|native)\s*(?:women|men|patients?)/gi,
    /african\s*american/gi,
  ];
  
  for (const pattern of groupPatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }
  return null;
}

function extractMetastaticSite(text, siteKeywords) {
  const textLower = text.toLowerCase();
  for (const kw of siteKeywords) {
    if (textLower.includes(kw)) {
      // Return a normalized site name
      if (kw.includes('brain')) return 'brain';
      if (kw.includes('liver')) return 'liver';
      if (kw.includes('lung')) return 'lung';
      if (kw.includes('bone')) return 'bone';
      if (kw.includes('lymph')) return 'lymph node';
      return kw;
    }
  }
  return null;
}

/**
 * Main extraction function
 */
async function main() {
  console.log('Starting PDF numeric extraction...\n');
  
  const allCandidates = [];
  
  // Process each PDF
  for (const source of PDF_SOURCES) {
    const pdfPath = path.join(PDF_DIR, source.filename);
    
    if (!fs.existsSync(pdfPath)) {
      console.warn(`Warning: PDF not found: ${source.filename}`);
      continue;
    }
    
    console.log(`Processing: ${source.filename} (${source.refId})...`);
    
    try {
      const pages = await extractPdfText(pdfPath);
      console.log(`  Extracted ${pages.length} pages`);
      
      for (const page of pages) {
        const candidates = extractNumericCandidates(
          page.text,
          page.pageNumber,
          source.refId,
          source.filename
        );
        allCandidates.push(...candidates);
      }
      
      console.log(`  Found ${allCandidates.filter(c => c.sourceRefId === source.refId).length} numeric candidates\n`);
    } catch (error) {
      console.error(`  Error processing ${source.filename}:`, error.message);
    }
  }
  
  console.log(`Total candidates extracted: ${allCandidates.length}\n`);
  
  // Save raw candidates
  const rawCandidatesPath = path.join(OUTPUT_DIR, 'raw_candidates.json');
  fs.writeFileSync(rawCandidatesPath, JSON.stringify(allCandidates, null, 2));
  console.log(`Saved raw candidates to: ${rawCandidatesPath}`);
  
  // Map to structured datasets
  console.log('\nMapping candidates to structured datasets...');
  const datasets = mapToDatasets(allCandidates);
  
  // Save datasets
  const datasetFiles = [
    { name: 'survival_over_time.json', data: datasets.survivalOverTime },
    { name: 'prevalence_or_survivorship_burden.json', data: datasets.prevalenceBurden },
    { name: 'demographics_age_race.json', data: datasets.demographicsAgeRace },
    { name: 'metastatic_site_outcomes.json', data: datasets.metastaticSiteOutcomes },
  ];
  
  for (const file of datasetFiles) {
    const filePath = path.join(OUTPUT_DIR, file.name);
    fs.writeFileSync(filePath, JSON.stringify(file.data, null, 2));
    console.log(`  Saved ${file.name}: ${file.data.length} entries`);
  }
  
  console.log('\nExtraction complete!');
  console.log(`\nSummary:`);
  console.log(`  Raw candidates: ${allCandidates.length}`);
  console.log(`  Survival over time: ${datasets.survivalOverTime.length}`);
  console.log(`  Prevalence/burden: ${datasets.prevalenceBurden.length}`);
  console.log(`  Demographics: ${datasets.demographicsAgeRace.length}`);
  console.log(`  Metastatic sites: ${datasets.metastaticSiteOutcomes.length}`);
}

// Run the extraction
main().catch(console.error);

