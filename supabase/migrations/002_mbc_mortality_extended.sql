-- Extend mbc_mortality with age, race, sex for CDC WONDER extended queries
-- Keeps existing year/state/rate/deaths/population; adds demographic breakdowns

ALTER TABLE mbc_mortality
  ADD COLUMN IF NOT EXISTS age_group TEXT,
  ADD COLUMN IF NOT EXISTS race TEXT,
  ADD COLUMN IF NOT EXISTS sex TEXT,
  ADD COLUMN IF NOT EXISTS cause_filter TEXT;

COMMENT ON COLUMN mbc_mortality.age_group IS 'Ten-year age group from CDC (e.g. 50-54, 55-59)';
COMMENT ON COLUMN mbc_mortality.race IS 'Race from CDC (e.g. White, Black or African American)';
COMMENT ON COLUMN mbc_mortality.sex IS 'Sex from CDC (F/M)';
COMMENT ON COLUMN mbc_mortality.cause_filter IS 'C50 = breast cancer only, all = all causes (for cause-of-death %)';
