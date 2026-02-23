-- Static figure data from mbc-figure-data.ts (reference data)
-- Seeded by scripts/seed-figure-data.ts

CREATE TABLE IF NOT EXISTS figure_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dataset_key TEXT NOT NULL,
  row_index INTEGER NOT NULL,
  data JSONB NOT NULL,
  UNIQUE(dataset_key, row_index)
);

CREATE INDEX IF NOT EXISTS idx_figure_data_dataset_key ON figure_data(dataset_key);

ALTER TABLE figure_data ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read on figure_data' AND tablename = 'figure_data') THEN
    CREATE POLICY "Allow public read on figure_data" ON figure_data FOR SELECT USING (true);
  END IF;
END $$;
