-- SEER Research Data tables (21 Registries, 2000–2022)
-- Populated from public/txtData/ SEER*Stat exports

CREATE TABLE IF NOT EXISTS survival_by_stage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage TEXT NOT NULL,
  interval_month INTEGER NOT NULL,
  relative_survival DECIMAL,
  ci_lower DECIMAL,
  ci_upper DECIMAL,
  n INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(stage, interval_month)
);

CREATE TABLE IF NOT EXISTS survival_by_subtype (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subtype TEXT NOT NULL,
  interval_month INTEGER NOT NULL,
  relative_survival DECIMAL,
  ci_lower DECIMAL,
  ci_upper DECIMAL,
  n INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(subtype, interval_month)
);

CREATE TABLE IF NOT EXISTS survival_by_year (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  relative_survival_5yr DECIMAL,
  n INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year)
);

CREATE TABLE IF NOT EXISTS incidence_by_race (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  race TEXT NOT NULL,
  age_adjusted_rate DECIMAL,
  count INTEGER,
  population BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(race)
);

CREATE TABLE IF NOT EXISTS incidence_by_year (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  age_adjusted_rate DECIMAL,
  count INTEGER,
  population BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year)
);

CREATE TABLE IF NOT EXISTS cause_of_death (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cause TEXT NOT NULL,
  count INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cause)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_survival_by_stage_stage ON survival_by_stage(stage);
CREATE INDEX IF NOT EXISTS idx_survival_by_stage_interval ON survival_by_stage(interval_month);
CREATE INDEX IF NOT EXISTS idx_survival_by_subtype_subtype ON survival_by_subtype(subtype);
CREATE INDEX IF NOT EXISTS idx_survival_by_subtype_interval ON survival_by_subtype(interval_month);
CREATE INDEX IF NOT EXISTS idx_survival_by_year_year ON survival_by_year(year);
CREATE INDEX IF NOT EXISTS idx_incidence_by_race_race ON incidence_by_race(race);
CREATE INDEX IF NOT EXISTS idx_incidence_by_year_year ON incidence_by_year(year);

ALTER TABLE survival_by_stage ENABLE ROW LEVEL SECURITY;
ALTER TABLE survival_by_subtype ENABLE ROW LEVEL SECURITY;
ALTER TABLE survival_by_year ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidence_by_race ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidence_by_year ENABLE ROW LEVEL SECURITY;
ALTER TABLE cause_of_death ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on survival_by_stage" ON survival_by_stage FOR SELECT USING (true);
CREATE POLICY "Allow public read on survival_by_subtype" ON survival_by_subtype FOR SELECT USING (true);
CREATE POLICY "Allow public read on survival_by_year" ON survival_by_year FOR SELECT USING (true);
CREATE POLICY "Allow public read on incidence_by_race" ON incidence_by_race FOR SELECT USING (true);
CREATE POLICY "Allow public read on incidence_by_year" ON incidence_by_year FOR SELECT USING (true);
CREATE POLICY "Allow public read on cause_of_death" ON cause_of_death FOR SELECT USING (true);
