import type { NewsItem } from "@/components/chelsea";
import { SAMPLE_DATA } from "@/components/chelsea";

/**
 * Server-side news layer for the Chelsea dashboard.
 *
 * Fetches Chelsea-relevant RSS feeds, parses them without a dependency, and
 * produces a `NewsItem[]` for `ChelseaDashboardView`. On total failure it falls
 * back to `SAMPLE_DATA.news`, so the panel never empties or throws.
 *
 * Add a second source by appending to FEEDS — fetch/merge/sort handle the rest.
 */

type Feed = { source: string; url: string };

const FEEDS: Feed[] = [
  { source: "BBC Sport", url: "https://feeds.bbci.co.uk/sport/football/teams/chelsea/rss.xml" },
];

const ITEM_COUNT = 4;

/** Strip CDATA / trim, then decode the entities that show up in RSS text. */
function unwrap(raw: string): string {
  const cdata = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  const text = (cdata ? cdata[1] : raw).trim();
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function field(itemXml: string, tag: string): string | null {
  const m = itemXml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? unwrap(m[1]) : null;
}

/** Extract (item, timestamp) pairs from a feed's XML. Item blocks only. */
function parseRss(xml: string, source: string): { item: NewsItem; ts: number }[] {
  const blocks = xml.match(/<item\b[^>]*>([\s\S]*?)<\/item>/g) ?? [];
  const out: { item: NewsItem; ts: number }[] = [];
  for (const block of blocks) {
    const headline = field(block, "title");
    const href = field(block, "link");
    if (!headline || !href) continue;
    const pubDate = field(block, "pubDate");
    const ts = pubDate ? Date.parse(pubDate) : 0;
    out.push({ item: { source, headline, href }, ts: Number.isFinite(ts) ? ts : 0 });
  }
  return out;
}

async function fetchFeed(feed: Feed): Promise<{ item: NewsItem; ts: number }[]> {
  try {
    const res = await fetch(feed.url, {
      headers: { "User-Agent": "AMW-HQ/1.0" },
      next: { revalidate: 900 }, // 15 min — news moves slower than scores
    });
    if (!res.ok) return [];
    return parseRss(await res.text(), feed.source);
  } catch {
    return [];
  }
}

export async function getChelseaNews(): Promise<NewsItem[]> {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const merged = results
    .flat()
    .sort((a, b) => b.ts - a.ts) // newest first
    .slice(0, ITEM_COUNT)
    .map((r) => r.item);
  return merged.length ? merged : SAMPLE_DATA.news;
}
