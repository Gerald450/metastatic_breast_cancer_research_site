#!/usr/bin/env npx tsx
/**
 * Upload all PDFs from public/pdfs/ to the Supabase Storage bucket "pdfs".
 * Run: npm run upload:pdfs
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import * as path from 'path';
import * as fs from 'fs';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '..', '.env.local') });

import { createClient } from '@supabase/supabase-js';

const PDFS_DIR = path.join(__dirname, '..', 'public', 'pdfs');
const BUCKET = 'pdfs';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  }
  return createClient(url, key);
}

async function ensureBucket(supabase: ReturnType<typeof createClient>) {
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (error) {
    if (error.message?.includes('already exists') || error.message?.toLowerCase().includes('duplicate')) {
      console.log('Bucket "%s" already exists, continuing.', BUCKET);
      return;
    }
    throw new Error(`Failed to create bucket "${BUCKET}": ${error.message}`);
  }
  console.log('Created bucket "%s".', BUCKET);
}

async function main() {
  if (!fs.existsSync(PDFS_DIR)) {
    console.error('Directory not found: %s', PDFS_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(PDFS_DIR).filter((f) => f.toLowerCase().endsWith('.pdf'));
  if (files.length === 0) {
    console.log('No PDF files in %s', PDFS_DIR);
    process.exit(0);
  }

  const supabase = getSupabase();
  await ensureBucket(supabase);

  console.log('Uploading %d file(s) to bucket "%s"...', files.length, BUCKET);
  let ok = 0;
  let fail = 0;

  for (const filename of files) {
    const filePath = path.join(PDFS_DIR, filename);
    const buffer = fs.readFileSync(filePath);

    const { error } = await supabase.storage.from(BUCKET).upload(filename, buffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

    if (error) {
      console.error('  FAIL %s: %s', filename, error.message);
      fail++;
    } else {
      console.log('  OK   %s', filename);
      ok++;
    }
  }

  console.log('Done. Uploaded: %d, failed: %d.', ok, fail);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
