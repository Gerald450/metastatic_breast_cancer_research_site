-- Demographics figure data: HR+/HER2+ incidence by race/year and median age by subtype

-- HR+/HER2+ (Luminal B) incidence rates by race and year (from her2_by_race.txt)
CREATE TABLE IF NOT EXISTS hr_her2_pos_incidence_by_race_year (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  race TEXT NOT NULL,
  age_adjusted_rate DECIMAL,
  count INTEGER,
  population BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year, race)
);

-- Median age at diagnosis by breast cancer subtype (computed from median_age.txt case listing)
CREATE TABLE IF NOT EXISTS median_age_by_subtype (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtype TEXT NOT NULL UNIQUE,
  median_age DECIMAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hr_her2_race_year ON hr_her2_pos_incidence_by_race_year(year);
CREATE INDEX IF NOT EXISTS idx_hr_her2_race_race ON hr_her2_pos_incidence_by_race_year(race);

ALTER TABLE hr_her2_pos_incidence_by_race_year ENABLE ROW LEVEL SECURITY;
ALTER TABLE median_age_by_subtype ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on hr_her2_pos_incidence_by_race_year" ON hr_her2_pos_incidence_by_race_year FOR SELECT USING (true);
CREATE POLICY "Allow public read on median_age_by_subtype" ON median_age_by_subtype FOR SELECT USING (true);
