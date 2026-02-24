#!/usr/bin/env npx tsx
/**
 * Seed Supabase - calls sync routes to populate from verified APIs.
 * Requires dev server running: npm run dev
 *
 * Run: npm run seed-supabase
 *
 * If fetch fails, use curl instead:
 *   curl -X POST http://127.0.0.1:3000/api/sync/trials
 *   curl -X POST http://127.0.0.1:3000/api/sync/publications
 */

const BASE = process.env.SEED_BASE_URL ?? 'http://127.0.0.1:3000';
const TIMEOUT_MS = 360_000;

async function post(path: string): Promise<{ synced?: number; errors?: string[] }> {
  const url = `${BASE}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { method: 'POST', signal: controller.signal });
    clearTimeout(timeout);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
    return json;
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
}

async function main() {
  console.log('Seeding Supabase via sync routes...');
  console.log(`Base URL: ${BASE}\n`);

  try {
    const ac = new AbortController();
    setTimeout(() => ac.abort(), 5000);
    const probe = await fetch(BASE, { signal: ac.signal });
    if (!probe.ok) throw new Error(`Server returned ${probe.status}`);
    console.log('Connected.\n');

    console.log('Syncing trials (ClinicalTrials.gov) - may take 1-2 min...');
    const trials = await post('/api/sync/trials');
    console.log(`  Synced: ${trials.synced ?? 0}${trials.errors?.length ? `, errors: ${trials.errors.length}` : ''}\n`);

    console.log('Syncing publications (PubMed)...');
    const pubs = await post('/api/sync/publications');
    console.log(`  Synced: ${pubs.synced ?? 0}${pubs.errors?.length ? `, errors: ${pubs.errors.length}` : ''}\n`);

    console.log('Syncing drugs (OpenFDA)...');
    const drugs = await post('/api/sync/drugs');
    console.log(`  Synced: ${drugs.synced ?? 0}${drugs.errors?.length ? `, errors: ${drugs.errors.length}` : ''}\n`);

    console.log('Done.');
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    const msg = err.message;
    const cause = err.cause instanceof Error ? err.cause.message : '';
    console.error('\nError:', msg, cause ? `(${cause})` : '');
    console.error('\nUse curl instead (with dev server running):');
    console.error(`  curl -X POST ${BASE}/api/sync/trials`);
    console.error(`  curl -X POST ${BASE}/api/sync/publications`);
    console.error(`  curl -X POST ${BASE}/api/sync/drugs`);
    process.exit(1);
  }
}

main();
