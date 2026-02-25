-- HR+/HER2- (Luminal A) incidence counts by age group and year (for AAPC by age).
-- Source: Incidence_trends_by_agetxt.txt (luminal.txt from SEER*Stat), rates often missing (~), counts used for trend.
CREATE TABLE IF NOT EXISTS hr_her2_neg_incidence_by_age_year (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  age_group TEXT NOT NULL,
  count INTEGER,
  population BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year, age_group)
);

CREATE INDEX IF NOT EXISTS idx_hr_her2_neg_incidence_age_year ON hr_her2_neg_incidence_by_age_year(year);
CREATE INDEX IF NOT EXISTS idx_hr_her2_neg_incidence_age_group ON hr_her2_neg_incidence_by_age_year(age_group);

ALTER TABLE hr_her2_neg_incidence_by_age_year ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on hr_her2_neg_incidence_by_age_year" ON hr_her2_neg_incidence_by_age_year FOR SELECT USING (true);
