# SEER Trusted Data

SEER data is now ingested from **verified SEER*Stat exports** in `public/txtData/` into Supabase. The static JSON files in this directory are legacy; figures fetch from Supabase.

## Source

- **SEER Research Data (21 Registries, 2000–2022)**  
  SEER*Stat Nov 2024 Submission. National Cancer Institute.
- **Export location:** `public/txtData/` — comma-separated TXT files from SEER*Stat

## Citation

> Data Source: SEER Research Data (21 Registries, 2000–2022), SEER*Stat Nov 2024 Submission. National Cancer Institute.

## Pipeline

1. **Migrations:** `supabase/migrations/005_seer_tables.sql` creates `survival_by_stage`, `survival_by_subtype`, `survival_by_year`, `incidence_by_race`, `incidence_by_year`, `cause_of_death`
2. **Ingestion:** Run `npm run ingest:seer` or POST `/api/sync/seer` to parse TXT files and upsert into Supabase
3. **API:** `/api/data/seer/*` and `/api/data/seer/charts/*` serve data for figures

## Legacy Files (reference only)

| File | Description |
|------|-------------|
| `survival_by_stage.json` | 5-year relative survival by stage (legacy) |
| `distant_stage_by_subtype.json` | 5-year relative survival by subtype (legacy) |
