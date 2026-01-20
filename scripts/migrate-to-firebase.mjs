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
import { getFirestore, collection, doc, setDoc, writeBatch, getDocs, query, limit } from 'firebase/firestore';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = join(__dirname, '..', '.env.local');
  
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      // Skip comments and empty lines
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      // Parse KEY=VALUE format
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        // Only set if not already in process.env (system env takes precedence)
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
    console.log('✓ Loaded environment variables from .env.local');
  } else {
    console.log('⚠ .env.local not found. Using system environment variables.');
  }
}

// Try to load dotenv if available (optional dependency)
try {
  const dotenv = (await import('dotenv')).default;
  dotenv.config({ path: join(__dirname, '..', '.env.local') });
  console.log('✓ Loaded environment variables using dotenv');
} catch (e) {
  // Fallback to manual parsing
  loadEnvFile();
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
    try {
      await batches[i].commit();
      importedCount += Math.min(BATCH_SIZE, data.length - (i * BATCH_SIZE));
      console.log(`   ✓ Batch ${i + 1}/${batches.length} committed (${importedCount}/${data.length} records)`);
    } catch (error) {
      console.error(`   ❌ Batch ${i + 1}/${batches.length} failed:`, error.message);
      
      // Check for common errors and provide helpful messages
      if (error.message && error.message.includes('PERMISSION_DENIED')) {
        if (error.message.includes('Cloud Firestore API has not been used')) {
          console.error('\n⚠️  Firestore API is not enabled for your project!');
          console.error('   Please enable it at:');
          console.error(`   https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
          console.error('   Then wait a few minutes and try again.\n');
        } else {
          console.error('\n⚠️  Permission denied. Check your Firestore security rules and authentication.\n');
        }
      }
      throw error;
    }
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
 * Verify Firestore connection
 */
async function verifyFirestoreConnection() {
  try {
    // Try to read from a test collection to verify connection
    const testCollection = collection(db, '_test');
    await getDocs(query(testCollection, limit(1)));
    return true;
  } catch (error) {
    const errorMsg = error.message || error.code || '';
    
    if (errorMsg.includes('PERMISSION_DENIED') || errorMsg.includes('permission') || errorMsg.includes('Missing or insufficient permissions')) {
      if (errorMsg.includes('Cloud Firestore API has not been used')) {
        console.error('\n❌ Firestore API is not enabled!');
        console.error('   Please enable it at:');
        console.error(`   https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
        console.error('   Then wait a few minutes and try again.\n');
      } else {
        console.error('\n❌ Permission denied - Firestore security rules are blocking access!');
        console.error('\n   To fix this:');
        console.error('   1. Go to https://console.firebase.google.com/');
        console.error(`   2. Select project: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
        console.error('   3. Go to Build → Firestore Database → Rules');
        console.error('   4. Temporarily set rules to allow writes (for migration only):');
        console.error('\n   rules_version = \'2\';');
        console.error('   service cloud.firestore {');
        console.error('     match /databases/{database}/documents {');
        console.error('       match /{document=**} {');
        console.error('         allow read, write: if true;');
        console.error('       }');
        console.error('     }');
        console.error('   }\n');
        console.error('   5. Click "Publish"');
        console.error('   6. Wait a few seconds and try the migration again');
        console.error('   7. IMPORTANT: After migration, update rules for production!\n');
      }
    } else if (errorMsg.includes('NOT_FOUND')) {
      console.error('\n❌ Firestore database not found!');
      console.error('   Please create a Firestore database:');
      console.error('   1. Go to https://console.firebase.google.com/');
      console.error(`   2. Select project: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`);
      console.error('   3. Go to Build → Firestore Database');
      console.error('   4. Click "Create database"');
      console.error('   5. Choose "Start in test mode" (easier for migration)');
      console.error('   6. Select a location and click "Enable"\n');
    } else {
      console.error('\n❌ Error connecting to Firestore:', error.message || error.code);
    }
    return false;
  }
}

/**
 * Main migration function
 */
async function main() {
  console.log('🚀 Starting Firebase migration...\n');

  // Verify connection first
  console.log('🔍 Verifying Firestore connection...');
  const canConnect = await verifyFirestoreConnection();
  if (!canConnect) {
    process.exit(1);
  }
  console.log('✅ Firestore connection verified\n');

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

