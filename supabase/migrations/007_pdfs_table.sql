-- PDFs / reference literature metadata (links to Supabase Storage for file bytes)
-- Aligns with lib/references.ts Reference type; storage_path points to object in Storage bucket.

CREATE TABLE IF NOT EXISTS pdfs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT,
  year TEXT,
  journal TEXT,
  filename TEXT NOT NULL,
  storage_path TEXT,
  doi TEXT,
  used_for TEXT[] DEFAULT '{}',
  highlight_notes JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE pdfs IS 'Reference PDF metadata; actual files stored in Supabase Storage (bucket path in storage_path).';
COMMENT ON COLUMN pdfs.id IS 'Reference id, e.g. ref-001.';
COMMENT ON COLUMN pdfs.storage_path IS 'Object path in Storage bucket, e.g. pdfs/ref-001.pdf.';
COMMENT ON COLUMN pdfs.used_for IS 'Site sections this reference is used for: definition, epidemiology, etc.';
COMMENT ON COLUMN pdfs.highlight_notes IS 'Array of { section, pages?, excerptHint }.';

CREATE INDEX IF NOT EXISTS idx_pdfs_used_for ON pdfs USING GIN (used_for);

CREATE OR REPLACE FUNCTION set_pdfs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_pdfs_updated_at ON pdfs;
CREATE TRIGGER trigger_pdfs_updated_at
  BEFORE UPDATE ON pdfs
  FOR EACH ROW
  EXECUTE PROCEDURE set_pdfs_updated_at();

ALTER TABLE pdfs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on pdfs" ON pdfs FOR SELECT USING (true);
