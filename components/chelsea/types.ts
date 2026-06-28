/**
 * Data contract for the Chelsea dashboard.
 * A future data layer only needs to produce a `ChelseaData` object —
 * see `sample-data.ts` for the placeholder implementation.
 */

export type FormResult = "W" | "D" | "L";
export type Movement = "up" | "down" | "same";

export type TeamRef = {
  name: string;
  /** true → render the Chelsea crest; otherwise an initial roundel */
  chelsea?: boolean;
};

export type Match = {
  competition: string;
  matchweek: string;
  home: TeamRef;
  away: TeamRef;
  venue: string;
  /** Absolute kickoff instant — ISO string with Melbourne offset (+10:00 / +11:00) */
  kickoff: string;
};

export type LastResult = {
  score: string;
  opponent: string;
  /** "A" away · "H" home */
  ground: "A" | "H";
  result: FormResult;
};

export type TableRow = {
  pos: number;
  team: string;
  played: number;
  move: Movement;
  points: number;
  isChelsea?: boolean;
};

export type Scorer = {
  name: string;
  role: string;
  apps: number;
  goals: number;
};

export type NewsItem = {
  source: string;
  headline: string;
  href: string;
};

export type ChelseaData = {
  nextMatch: Match;
  recentForm: FormResult[];
  lastResult: LastResult;
  table: TableRow[];
  scorers: Scorer[];
  news: NewsItem[];
};
