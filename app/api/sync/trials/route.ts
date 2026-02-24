import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { MBC_Trial } from '@/lib/types/mbc-data';

const CTGOV_API = 'https://classic.clinicaltrials.gov/api/v2/studies';
const PAGE_SIZE = 100;

interface CTStudy {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string; officialTitle?: string };
    statusModule?: { overallStatus?: string; startDateStruct?: { date?: string }; completionDateStruct?: { date?: string } };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string } };
    conditionsModule?: { conditions?: string[] };
    designModule?: { phases?: string[]; enrollmentInfo?: { count?: number } };
  };
}

export async function POST() {
  const errors: string[] = [];
  let synced = 0;
  let nextPageToken: string | null = null;

  try {
    const supabase = createServerSupabaseClient();

    do {
      const url = new URL(CTGOV_API);
      url.searchParams.set('query.cond', 'metastatic breast cancer');
      url.searchParams.set('pageSize', String(PAGE_SIZE));
      url.searchParams.set('format', 'json');
      if (nextPageToken) url.searchParams.set('pageToken', nextPageToken);

      const res = await fetch(url.toString());
      if (!res.ok) {
        errors.push(`CTGov API error: ${res.status}`);
        break;
      }

      const json = await res.json();
      const studies: CTStudy[] = json.studies ?? [];
      nextPageToken = json.nextPageToken ?? null;

      for (const study of studies) {
        const ps = study.protocolSection;
        const idMod = ps?.identificationModule;
        const statusMod = ps?.statusModule;
        const sponsorMod = ps?.sponsorCollaboratorsModule;
        const designMod = ps?.designModule;
        const condMod = ps?.conditionsModule;

        const nctId = idMod?.nctId;
        if (!nctId) continue;

        const row: Omit<MBC_Trial, 'id' | 'synced_at'> = {
          nct_id: nctId,
          brief_title: idMod?.briefTitle ?? null,
          official_title: idMod?.officialTitle ?? null,
          conditions: condMod?.conditions ?? null,
          phases: designMod?.phases ?? null,
          overall_status: statusMod?.overallStatus ?? null,
          start_date: statusMod?.startDateStruct?.date ?? null,
          completion_date: statusMod?.completionDateStruct?.date ?? null,
          enrollment: designMod?.enrollmentInfo?.count ?? null,
          sponsor: sponsorMod?.leadSponsor?.name ?? null,
          raw_json: study as unknown as Record<string, unknown>,
        };

        const { error } = await supabase.from('mbc_trials').upsert(row, {
          onConflict: 'nct_id',
          ignoreDuplicates: false,
        });

        if (error) errors.push(`Upsert ${nctId}: ${error.message}`);
        else synced++;
      }
    } while (nextPageToken);

    return NextResponse.json({ synced, errors });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ synced, errors: [...errors, msg] }, { status: 500 });
  }
}
