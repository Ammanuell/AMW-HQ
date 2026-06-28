import type {
  ChelseaData,
  FormResult,
  LastResult,
  Match,
  Scorer,
  TableRow,
} from "@/components/chelsea";
import { SAMPLE_DATA } from "@/components/chelsea";

/**
 * Server-only data layer for the Chelsea dashboard.
 *
 * Produces a `ChelseaData` object from the football-data.org v4 API and feeds
 * it to `ChelseaDashboardView`. Every section maps defensively and falls back
 * to the matching `SAMPLE_DATA` field, so a single failing endpoint (or the
 * off-season) never blanks the page. If the API key is missing, no requests are
 * made and `SAMPLE_DATA` is returned whole.
 *
 * This module is imported only by the server page (app/sports/chelsea/page.tsx),
 * so the API key (an env var without the NEXT_PUBLIC_ prefix) never reaches the
 * client.
 */

const BASE = "https://api.football-data.org/v4";
const CHELSEA_ID = 61;
const PL = 2021; // football-data.org competition ID for the Premier League

/** Raw shapes we read off the football-data.org v4 responses (partial). */
type FdTeam = { id: number; name: string; shortName?: string; crest?: string };
type FdMatch = {
  competition: { name: string };
  matchday: number | null;
  stage?: string;
  homeTeam: FdTeam;
  awayTeam: FdTeam;
  venue?: string | null;
  utcDate: string;
  status: string;
  score: { winner?: string | null; fullTime: { home: number | null; away: number | null } };
};
type FdStandingRow = {
  position: number;
  team: FdTeam;
  playedGames: number;
  points: number;
};
type FdStandingsRes = {
  season?: { startDate?: string };
  standings: { type: string; table: FdStandingRow[] }[];
};
type FdScorer = {
  // The free tier nulls out `position` but populates `section` (e.g.
  // "Centre-Forward", "Attacking Midfield") — use that for the player role.
  player: { name: string; position?: string | null; section?: string | null };
  team: FdTeam;
  playedMatches: number;
  goals: number;
};

/** Fetch + parse a v4 endpoint. Returns null on any failure (never throws). */
async function getJson<T>(path: string): Promise<T | null> {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { "X-Auth-Token": key },
      next: { revalidate: 300 }, // 5 min ISR cache — respects the free-tier rate limit
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function titleCase(stage?: string): string {
  if (!stage) return "";
  return stage
    .split("_")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

function teamRef(team: FdTeam) {
  return {
    name: team.shortName ?? team.name,
    chelsea: team.id === CHELSEA_ID,
    crest: team.crest,
  };
}

/** The TOTAL (home+away) standings table, or [] if unavailable. */
function totalTable(res: FdStandingsRes | null): FdStandingRow[] {
  return res?.standings?.find((s) => s.type === "TOTAL")?.table ?? [];
}

/** Season start year from a standings response, e.g. "2026-08-21" → 2026. */
function startYear(res: FdStandingsRes | null): number | null {
  const y = Number(res?.season?.startDate?.slice(0, 4));
  return Number.isFinite(y) ? y : null;
}

/** W/D/L for Chelsea in a finished match. Null if scores are unavailable. */
function chelseaOutcome(m: FdMatch): { cs: number; os: number; result: FormResult } | null {
  const chelseaHome = m.homeTeam.id === CHELSEA_ID;
  const home = m.score.fullTime.home;
  const away = m.score.fullTime.away;
  if (home == null || away == null) return null;
  const cs = chelseaHome ? home : away;
  const os = chelseaHome ? away : home;
  return { cs, os, result: cs > os ? "W" : cs < os ? "L" : "D" };
}

function mapNextMatch(matches: FdMatch[]): Match | null {
  const now = Date.now();
  const upcoming = matches
    .filter((m) => (m.status === "TIMED" || m.status === "SCHEDULED") && new Date(m.utcDate).getTime() >= now)
    .sort((a, b) => a.utcDate.localeCompare(b.utcDate));
  const m = upcoming[0];
  if (!m) return null;
  return {
    competition: m.competition.name,
    matchweek: m.matchday != null ? `MW ${m.matchday}` : titleCase(m.stage),
    home: teamRef(m.homeTeam),
    away: teamRef(m.awayTeam),
    // The free tier omits `venue`, so show an honest Home/Away rather than a
    // guessed stadium name.
    venue: m.venue ?? (m.homeTeam.id === CHELSEA_ID ? "Home" : "Away"),
    kickoff: m.utcDate, // absolute instant; Countdown reads it as such
  };
}

/** Finished matches, oldest → newest. */
function finishedChrono(matches: FdMatch[]): FdMatch[] {
  return matches
    .filter((m) => m.status === "FINISHED")
    .sort((a, b) => a.utcDate.localeCompare(b.utcDate));
}

function mapLastResult(matches: FdMatch[]): LastResult | null {
  const finished = finishedChrono(matches);
  const m = finished[finished.length - 1];
  if (!m) return null;
  const o = chelseaOutcome(m);
  if (!o) return null;
  const opponent = m.homeTeam.id === CHELSEA_ID ? m.awayTeam : m.homeTeam;
  return {
    score: `${o.cs}–${o.os}`,
    opponent: opponent.shortName ?? opponent.name,
    ground: m.homeTeam.id === CHELSEA_ID ? "H" : "A",
    result: o.result,
  };
}

function mapRecentForm(matches: FdMatch[]): FormResult[] {
  return finishedChrono(matches)
    .slice(-5)
    .map(chelseaOutcome)
    .filter((o): o is NonNullable<typeof o> => o != null)
    .map((o) => o.result);
}

function mapTable(rows: FdStandingRow[]): TableRow[] {
  const toRow = (r: FdStandingRow): TableRow => ({
    pos: r.position,
    team: r.team.shortName ?? r.team.name,
    played: r.playedGames,
    points: r.points,
    isChelsea: r.team.id === CHELSEA_ID,
    crest: r.team.crest,
  });
  const top = rows.slice(0, 5);
  // Always include Chelsea, even if outside the top 5.
  if (!top.some((r) => r.team.id === CHELSEA_ID)) {
    const chelsea = rows.find((r) => r.team.id === CHELSEA_ID);
    if (chelsea) top.push(chelsea);
  }
  return top.map(toRow);
}

function mapScorers(scorers: FdScorer[]): Scorer[] {
  return scorers
    .filter((s) => s.team.id === CHELSEA_ID)
    .slice(0, 4)
    .map((s) => ({
      name: s.player.name,
      role: s.player.section ?? s.player.position ?? "—",
      apps: s.playedMatches,
      goals: s.goals,
    }));
}

export async function getChelseaData(): Promise<ChelseaData> {
  if (!process.env.FOOTBALL_DATA_API_KEY) return SAMPLE_DATA;

  // Current season — drives the upcoming fixture and tells us whether the
  // season has actually started.
  const [currentMatchesRes, currentStandingsRes] = await Promise.all([
    getJson<{ matches: FdMatch[] }>(`/teams/${CHELSEA_ID}/matches`),
    getJson<FdStandingsRes>(`/competitions/${PL}/standings`),
  ]);

  const currentMatches = currentMatchesRes?.matches ?? [];
  const currentTable = totalTable(currentStandingsRes);
  const seasonStarted = currentTable.some((r) => r.playedGames > 0);

  // The completed-results widgets (last result, form, table, scorers) come from
  // the current season once it has begun, otherwise from the most-recently
  // completed one (the off-season: the new schedule is out but no games played).
  // The next fixture always comes from the current season's matches above.
  let resultsMatches = currentMatches;
  let resultsTable = currentTable;
  let scorers: FdScorer[];

  if (seasonStarted) {
    const sc = await getJson<{ scorers: FdScorer[] }>(`/competitions/${PL}/scorers?limit=100`);
    scorers = sc?.scorers ?? [];
  } else {
    const prev = startYear(currentStandingsRes);
    const season = prev != null ? `?season=${prev - 1}` : "";
    const [prevMatchesRes, prevStandingsRes, prevScorersRes] = await Promise.all([
      getJson<{ matches: FdMatch[] }>(`/teams/${CHELSEA_ID}/matches${season}`),
      getJson<FdStandingsRes>(`/competitions/${PL}/standings${season}`),
      getJson<{ scorers: FdScorer[] }>(
        `/competitions/${PL}/scorers${season ? `${season}&` : "?"}limit=100`,
      ),
    ]);
    resultsMatches = prevMatchesRes?.matches?.length ? prevMatchesRes.matches : currentMatches;
    resultsTable = totalTable(prevStandingsRes).length ? totalTable(prevStandingsRes) : currentTable;
    scorers = prevScorersRes?.scorers ?? [];
  }

  // Per-section fallback: any empty/failed section keeps its SAMPLE_DATA value.
  const nextMatch = mapNextMatch(currentMatches);
  const lastResult = mapLastResult(resultsMatches);
  const recentForm = mapRecentForm(resultsMatches);
  const mappedTable = mapTable(resultsTable);
  const mappedScorers = mapScorers(scorers);

  return {
    nextMatch: nextMatch ?? SAMPLE_DATA.nextMatch,
    lastResult: lastResult ?? SAMPLE_DATA.lastResult,
    recentForm: recentForm.length ? recentForm : SAMPLE_DATA.recentForm,
    table: mappedTable.length ? mappedTable : SAMPLE_DATA.table,
    scorers: mappedScorers.length ? mappedScorers : SAMPLE_DATA.scorers,
    news: SAMPLE_DATA.news, // default; the page overrides this with live RSS (getChelseaNews)
  };
}
