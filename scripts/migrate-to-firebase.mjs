#!/usr/bin/env node

/**
 * Migration script to import JSON data into Firebase Firestore
 * 
 * Usage:
 * 1. Set up Firebase project and get credentials
 * 2. Set environment variables (see .env.example)
 * 3. Run: node scripts/migrate-to-firebase.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
// Try to load dotenv if available (optional dependency)
let dotenv;
try {
  dotenv = (await import('dotenv')).default;
  dotenv.config({ path: join(__dirname, '..', '.env.local') });
} catch (e) {
  // dotenv not installed, assume environment variables are set
  console.log('Note: dotenv not found. Using environment variables from system.');
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate config
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collections
const COLLECTIONS = {
  SURVIVAL_OVER_TIME: 'survival_over_time',
  PREVALENCE_BURDEN: 'prevalence_burden',
  DEMOGRAPHICS_AGE_RACE: 'demographics_age_race',
  METASTATIC_SITE_OUTCOMES: 'metastatic_site_outcomes',
  REFERENCES: 'references',
};

// Batch size for Firestore writes (max 500)
const BATCH_SIZE = 500;

/**
 * Import data to Firestore collection
 */
async function importCollection(collectionName, data, transformFn = null) {
  console.log(`\n📦 Importing ${collectionName}...`);
  console.log(`   Total records: ${data.length}`);

  const batches = [];
  let currentBatch = writeBatch(db);
  let batchCount = 0;
  let importedCount = 0;

  for (let i = 0; i < data.length; i++) {
    const item = transformFn ? transformFn(data[i], i) : data[i];
    
    // Create document ID (use index or generate unique ID)
    const docId = `${collectionName}_${i}`;
    const docRef = doc(db, collectionName, docId);
    
    currentBatch.set(docRef, item);
    batchCount++;

    // Commit batch when it reaches BATCH_SIZE or at the end
    if (batchCount >= BATCH_SIZE || i === data.length - 1) {
      batches.push(currentBatch);
      currentBatch = writeBatch(db);
      batchCount = 0;
    }
  }

  // Execute all batches
  console.log(`   Executing ${batches.length} batch(es)...`);
  for (let i = 0; i < batches.length; i++) {
    await batches[i].commit();
    importedCount += Math.min(BATCH_SIZE, data.length - (i * BATCH_SIZE));
    console.log(`   ✓ Batch ${i + 1}/${batches.length} committed (${importedCount}/${data.length} records)`);
  }

  console.log(`✅ Successfully imported ${data.length} records to ${collectionName}`);
}

/**
 * Extract unique references from datasets
 */
function extractReferences(datasets) {
  const refMap = new Map();

  // Collect all unique references
  Object.values(datasets).forEach((dataset) => {
    dataset.forEach((entry) => {
      if (!refMap.has(entry.sourceRefId)) {
        refMap.set(entry.sourceRefId, {
          id: entry.sourceRefId,
          filename: entry.filename,
        });
      }
    });
  });

  return Array.from(refMap.values());
}

/**
 * Transform entry for Firestore (convert null to undefined for cleaner storage)
 */
function transformEntry(entry) {
  const transformed = {};
  for (const [key, value] of Object.entries(entry)) {
    // Firestore doesn't store null, so convert to undefined
    transformed[key] = value === null ? undefined : value;
  }
  return transformed;
}

/**
 * Main migration function
 */
async function main() {
  console.log('🚀 Starting Firebase migration...\n');

  try {
    // Load JSON files
    const dataDir = join(__dirname, '..', 'data', 'extracted');
    
    console.log('📂 Loading JSON files...');
    const survivalOverTime = JSON.parse(
      readFileSync(join(dataDir, 'survival_over_time.json'), 'utf-8')
    );
    const prevalenceBurden = JSON.parse(
      readFileSync(join(dataDir, 'prevalence_or_survivorship_burden.json'), 'utf-8')
    );
    const demographicsAgeRace = JSON.parse(
      readFileSync(join(dataDir, 'demographics_age_race.json'), 'utf-8')
    );
    const metastaticSiteOutcomes = JSON.parse(
      readFileSync(join(dataDir, 'metastatic_site_outcomes.json'), 'utf-8')
    );

    console.log('✅ JSON files loaded\n');

    // Extract and import references first
    const references = extractReferences({
      survivalOverTime,
      prevalenceBurden,
      demographicsAgeRace,
      metastaticSiteOutcomes,
    });
    
    await importCollection(COLLECTIONS.REFERENCES, references);

    // Import datasets
    await importCollection(
      COLLECTIONS.SURVIVAL_OVER_TIME,
      survivalOverTime,
      transformEntry
    );

    await importCollection(
      COLLECTIONS.PREVALENCE_BURDEN,
      prevalenceBurden,
      transformEntry
    );

    await importCollection(
      COLLECTIONS.DEMOGRAPHICS_AGE_RACE,
      demographicsAgeRace,
      transformEntry
    );

    await importCollection(
      COLLECTIONS.METASTATIC_SITE_OUTCOMES,
      metastaticSiteOutcomes,
      transformEntry
    );

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - References: ${references.length}`);
    console.log(`   - Survival Over Time: ${survivalOverTime.length}`);
    console.log(`   - Prevalence Burden: ${prevalenceBurden.length}`);
    console.log(`   - Demographics Age/Race: ${demographicsAgeRace.length}`);
    console.log(`   - Metastatic Site Outcomes: ${metastaticSiteOutcomes.length}`);

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
main();

