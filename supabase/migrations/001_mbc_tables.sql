-- MBC Supabase tables migration (API-verified data only)
-- Run with: supabase db push (or apply manually via SQL Editor)

-- API-sourced tables (ClinicalTrials.gov, PubMed, CDC WONDER)
CREATE TABLE IF NOT EXISTS mbc_trials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nct_id TEXT UNIQUE NOT NULL,
  brief_title TEXT,
  official_title TEXT,
  conditions TEXT[],
  phases TEXT[],
  overall_status TEXT,
  start_date TEXT,
  completion_date TEXT,
  enrollment INTEGER,
  sponsor TEXT,
  raw_json JSONB,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mbc_publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pmid TEXT UNIQUE NOT NULL,
  title TEXT,
  authors TEXT,
  journal TEXT,
  pub_date TEXT,
  doi TEXT,
  abstract TEXT,
  raw_json JSONB,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mbc_mortality (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER,
  state TEXT,
  rate_per_100k NUMERIC,
  deaths INTEGER,
  population INTEGER,
  raw_json JSONB,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE mbc_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE mbc_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE mbc_mortality ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on mbc_trials" ON mbc_trials FOR SELECT USING (true);
CREATE POLICY "Allow public read on mbc_publications" ON mbc_publications FOR SELECT USING (true);
CREATE POLICY "Allow public read on mbc_mortality" ON mbc_mortality FOR SELECT USING (true);
