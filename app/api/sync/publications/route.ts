import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import type { MBC_Publication } from '@/lib/types/mbc-data';

const NCBI_ESEARCH = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
const NCBI_EFETCH = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi';
const BATCH_SIZE = 20;

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST() {
  const errors: string[] = [];
  let synced = 0;

  try {
    const supabase = createServerSupabaseClient();
    const apiKey = process.env.NCBI_API_KEY;

    // ESearch for PMIDs
    const searchParams = new URLSearchParams({
      db: 'pubmed',
      term: 'metastatic breast cancer',
      retmode: 'json',
      retmax: '100',
      tool: 'mbc-app',
      email: 'mbc@example.com',
    });
    if (apiKey) searchParams.set('api_key', apiKey);

    const searchRes = await fetch(`${NCBI_ESEARCH}?${searchParams.toString()}`);
    if (!searchRes.ok) {
      return NextResponse.json({ synced, errors: [`ESearch failed: ${searchRes.status}`] }, { status: 500 });
    }

    const searchJson = await searchRes.json();
    const idList: string[] = searchJson.esearchresult?.idlist ?? [];
    if (idList.length === 0) {
      return NextResponse.json({ synced, errors: [] });
    }

    // EFetch in batches (PubMed rate limit: 3/sec without key)
    for (let i = 0; i < idList.length; i += BATCH_SIZE) {
      const batch = idList.slice(i, i + BATCH_SIZE);
      const fetchParams = new URLSearchParams({
        db: 'pubmed',
        id: batch.join(','),
        retmode: 'xml',
        rettype: 'abstract',
        tool: 'mbc-app',
        email: 'mbc@example.com',
      });
      if (apiKey) fetchParams.set('api_key', apiKey);

      const fetchRes = await fetch(`${NCBI_EFETCH}?${fetchParams.toString()}`);
      if (!fetchRes.ok) {
        errors.push(`EFetch batch failed: ${fetchRes.status}`);
        continue;
      }

      const xml = await fetchRes.text();
      const articles = parsePubMedXML(xml);

      for (const art of articles) {
        if (!art.pmid) continue;
        const row: Omit<MBC_Publication, 'id' | 'synced_at'> = {
          pmid: art.pmid,
          title: art.title ?? null,
          authors: art.authors ?? null,
          journal: art.journal ?? null,
          pub_date: art.pubDate ?? null,
          doi: art.doi ?? null,
          abstract: art.abstract ?? null,
          raw_json: art as unknown as Record<string, unknown>,
        };

        const { error } = await supabase.from('mbc_publications').upsert(row, {
          onConflict: 'pmid',
          ignoreDuplicates: false,
        });

        if (error) errors.push(`Upsert ${art.pmid}: ${error.message}`);
        else synced++;
      }

      await delay(400);
    }

    return NextResponse.json({ synced, errors });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ synced, errors: [...errors, msg] }, { status: 500 });
  }
}

function parsePubMedXML(xml: string): Array<{ pmid: string; title?: string; authors?: string; journal?: string; pubDate?: string; doi?: string; abstract?: string }> {
  const articles: Array<{ pmid: string; title?: string; authors?: string; journal?: string; pubDate?: string; doi?: string; abstract?: string }> = [];
  const blocks = xml.split(/<PubmedArticle/).slice(1);

  for (const block of blocks) {
    const pmidMatch = block.match(/<PMID[^>]*>(\d+)<\/PMID>/);
    if (!pmidMatch) continue;
    const pmid = pmidMatch[1];
    const article: { pmid: string; title?: string; authors?: string; journal?: string; pubDate?: string; doi?: string; abstract?: string } = { pmid };

    const titleMatch = block.match(/<ArticleTitle[^>]*>([\s\S]*?)<\/ArticleTitle>/);
    if (titleMatch) article.title = decodeEntities(titleMatch[1].trim());

    const abstractMatch = block.match(/<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>/);
    if (abstractMatch) article.abstract = decodeEntities(abstractMatch[1].trim());

    const pubDateMatch = block.match(/<PubDate[^>]*>([^<]+)</);
    if (pubDateMatch) article.pubDate = pubDateMatch[1].trim();

    const journalMatch = block.match(/<Title[^>]*>([^<]+)</);
    if (journalMatch) article.journal = decodeEntities(journalMatch[1].trim());

    const doiMatch = block.match(/<ArticleId[^>]*IdType="doi"[^>]*>([^<]+)</);
    if (doiMatch) article.doi = doiMatch[1].trim();

    const authorMatches = [...block.matchAll(/<LastName>([^<]+)<\/LastName>\s*<ForeName>([^<]*)<\/ForeName>/g)];
    article.authors = authorMatches.map((m) => `${m[2]} ${m[1]}`.trim()).join(', ') || undefined;

    articles.push(article);
  }

  return articles;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
