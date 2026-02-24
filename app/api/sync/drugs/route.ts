import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { MBC_Drug } from '@/lib/types/mbc-data';

const OPENFDA_URL = 'https://api.fda.gov/drug/label.json';
const SEARCH = 'indications_and_usage:breast+cancer';
const LIMIT = 100;

interface OpenFDALabel {
  openfda?: {
    application_number?: string[];
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
    pharm_class_epc?: string[];
  };
  indications_and_usage?: string[];
  purpose?: string[];
  active_ingredient?: string[];
  [key: string]: unknown;
}

function first(arr: string[] | undefined): string | null {
  if (!arr || arr.length === 0) return null;
  const s = arr[0]?.trim();
  return s && s.length > 0 ? s : null;
}

function truncate(s: string | null, max: number): string | null {
  if (!s) return null;
  return s.length > max ? s.slice(0, max) + '…' : s;
}

export async function POST() {
  const errors: string[] = [];
  let synced = 0;
  let skip = 0;

  try {
    const supabase = createServerSupabaseClient();

    do {
      const url = new URL(OPENFDA_URL);
      url.searchParams.set('search', SEARCH);
      url.searchParams.set('limit', String(LIMIT));
      url.searchParams.set('skip', String(skip));

      const res = await fetch(url.toString());
      if (!res.ok) {
        errors.push(`OpenFDA error: ${res.status}`);
        break;
      }

      const json = await res.json();
      const results: OpenFDALabel[] = json.results ?? [];
      const total = json.meta?.results?.total ?? 0;

      for (const label of results) {
        const ofda = label.openfda;
        const appNum = ofda?.application_number?.[0];
        if (!appNum) continue;

        const row: Omit<MBC_Drug, 'id' | 'synced_at'> = {
          application_number: appNum,
          brand_name: first(ofda?.brand_name) ?? null,
          generic_name: first(ofda?.generic_name) ?? null,
          manufacturer_name: first(ofda?.manufacturer_name) ?? null,
          indications: truncate(first(label.indications_and_usage), 2000) ?? null,
          purpose: truncate(first(label.purpose), 500) ?? null,
          active_ingredient: first(label.active_ingredient) ?? null,
          drug_class: first(ofda?.pharm_class_epc) ?? null,
          raw_json: label as Record<string, unknown>,
        };

        const { error } = await supabase.from('mbc_drugs').upsert(row, {
          onConflict: 'application_number',
          ignoreDuplicates: false,
        });

        if (error) errors.push(`Upsert ${appNum}: ${error.message}`);
        else synced++;
      }

      skip += results.length;
      if (results.length < LIMIT || skip >= total) break;
    } while (true);

    return NextResponse.json({ synced, errors });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ synced, errors: [...errors, msg] }, { status: 500 });
  }
}
