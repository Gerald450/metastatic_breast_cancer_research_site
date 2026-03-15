#!/usr/bin/env npx tsx
/**
 * Seed the Supabase `pdfs` table from lib/references.ts.
 * Run after adding or updating references so the database stays in sync.
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *
 * Run: npm run seed:pdfs
 *
 * Also run `npm run upload:pdfs` to upload PDF files to Supabase Storage.
 */

import * as path from 'path';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '..', '.env.local') });

import { createClient } from '@supabase/supabase-js';
import { references } from '../lib/references';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  }
  return createClient(url, key);
}

async function main() {
  const supabase = getSupabase();

  const rows = references.map((ref) => {
    const filename = ref.localUrl
      ? ref.localUrl.replace(/^\/pdfs\/?/, '').split('/').pop() || ref.filename
      : ref.filename;
    return {
      id: ref.id,
      title: ref.title,
      authors: ref.authors ?? null,
      year: ref.year ?? null,
      journal: ref.journal ?? null,
      filename: ref.filename,
      storage_path: filename,
      doi: ref.doi ?? null,
      used_for: ref.usedFor,
      highlight_notes: ref.highlightNotes ?? [],
    };
  });

  const { data, error } = await supabase.from('pdfs').upsert(rows, {
    onConflict: 'id',
  });

  if (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }

  console.log(`Seeded ${rows.length} reference(s) to Supabase pdfs table.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
