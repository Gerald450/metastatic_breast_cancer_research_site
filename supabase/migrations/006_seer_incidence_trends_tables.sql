-- SEER incidence data for three visuals (from txtData)
-- 1) HR+/HER2- Incidence by Stage at Diagnosis
-- 2) Incidence rates by race and year (for trends / AAPC)
-- 3) Incidence rates by age and year (for HR+/HER2- trends by age)

-- 1. Incidence by stage at diagnosis (aggregated to Localized, Regional, Distant)
CREATE TABLE IF NOT EXISTS incidence_by_stage_at_diagnosis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage TEXT NOT NULL,
  rate_per_100k DECIMAL,
  count INTEGER,
  population BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(stage)
);

-- 2. Incidence rates by race and year (for AAPC / time series)
CREATE TABLE IF NOT EXISTS incidence_rates_by_race_year (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  race TEXT NOT NULL,
  age_adjusted_rate DECIMAL,
  count INTEGER,
  population BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year, race)
);

-- 3. Incidence rates by age group and year
CREATE TABLE IF NOT EXISTS incidence_rates_by_age_year (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  age_group TEXT NOT NULL,
  age_adjusted_rate DECIMAL,
  count INTEGER,
  population BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year, age_group)
);

CREATE INDEX IF NOT EXISTS idx_incidence_by_stage_stage ON incidence_by_stage_at_diagnosis(stage);
CREATE INDEX IF NOT EXISTS idx_incidence_rates_by_race_year_year ON incidence_rates_by_race_year(year);
CREATE INDEX IF NOT EXISTS idx_incidence_rates_by_race_year_race ON incidence_rates_by_race_year(race);
CREATE INDEX IF NOT EXISTS idx_incidence_rates_by_age_year_year ON incidence_rates_by_age_year(year);
CREATE INDEX IF NOT EXISTS idx_incidence_rates_by_age_year_age ON incidence_rates_by_age_year(age_group);

ALTER TABLE incidence_by_stage_at_diagnosis ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidence_rates_by_race_year ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidence_rates_by_age_year ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on incidence_by_stage_at_diagnosis" ON incidence_by_stage_at_diagnosis FOR SELECT USING (true);
CREATE POLICY "Allow public read on incidence_rates_by_race_year" ON incidence_rates_by_race_year FOR SELECT USING (true);
CREATE POLICY "Allow public read on incidence_rates_by_age_year" ON incidence_rates_by_age_year FOR SELECT USING (true);
