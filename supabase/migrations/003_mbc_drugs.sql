-- OpenFDA drug labels for breast cancer / MBC treatments
-- Run with: npx supabase db push

CREATE TABLE IF NOT EXISTS mbc_drugs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_number TEXT UNIQUE NOT NULL,
  brand_name TEXT,
  generic_name TEXT,
  manufacturer_name TEXT,
  indications TEXT,
  purpose TEXT,
  active_ingredient TEXT,
  drug_class TEXT,
  raw_json JSONB,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE mbc_drugs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on mbc_drugs" ON mbc_drugs FOR SELECT USING (true);
