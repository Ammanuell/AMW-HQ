import type { ChelseaData } from "./types";

/**
 * Placeholder data. Replace this object (or pass your own `data` to
 * `ChelseaDashboardView`) once a real data layer is wired in.
 */
export const SAMPLE_DATA: ChelseaData = {
  nextMatch: {
    competition: "Premier League",
    matchweek: "MW 1",
    home: { name: "Chelsea", chelsea: true },
    away: { name: "Arsenal" },
    venue: "Stamford Bridge",
    // Placeholder kickoff anchored to Melbourne time.
    kickoff: "2026-08-15T19:30:00+10:00",
  },
  recentForm: ["W", "W", "D", "L", "W"],
  lastResult: { score: "2–1", opponent: "Liverpool", ground: "A", result: "W" },
  table: [
    { pos: 1, team: "Man City", played: 5, points: 13 },
    { pos: 2, team: "Arsenal", played: 5, points: 12 },
    { pos: 3, team: "Liverpool", played: 5, points: 11 },
    { pos: 4, team: "Chelsea", played: 5, points: 10, isChelsea: true },
    { pos: 5, team: "Spurs", played: 5, points: 9 },
  ],
  scorers: [
    { name: "Palmer", role: "Midfield", apps: 12, goals: 7 },
    { name: "Jackson", role: "Forward", apps: 11, goals: 5 },
    { name: "Madueke", role: "Winger", apps: 12, goals: 3 },
  ],
  news: [
    { source: "Sky Sports", headline: "Maresca confirms rotated XI for midweek tie", href: "#" },
    { source: "BBC Sport", headline: "Cole Palmer named Player of the Month", href: "#" },
    { source: "The Athletic", headline: "Inside Chelsea's set-piece resurgence", href: "#" },
  ],
};
