# AMW-HQ — Plan & Architecture

> Renamed from AMW-SPORTS-HQ. Scope expanded from a sports app to a personal
> hub that will hold several independent domains. Sports is the first one built;
> the others are planned and stubbed for now.

## What it is

A personal PWA hub, installed on the home screen and used on both phone and
desktop. One front door, several self-contained "domains" behind it.

**Domains**
- **Sports** — *active.* Chelsea FC dashboard live; SA Spurs planned.
- **Amharic** — *planned.* Language-learning area. Stub only for now.
- **Fitness** — *planned.* Stub only for now.

## Architecture — three tiers

The scope change turns the app into a hub-of-hubs. The old top-level team
picker is no longer the entry point; it drops down one level under Sports.

```
Tier 1  Hub selector        /                  pick a domain (Sports / Amharic / Fitness)
Tier 2  Domain landing      /sports            pick a team (Chelsea / Spurs)
                            /amharic           (stub: coming soon)
                            /fitness           (stub: coming soon)
Tier 3  Sub-view            /sports/chelsea        Chelsea dashboard
                            /sports/chelsea/watch  watch page
```

Route namespacing is the key structural change: Chelsea moves from `/chelsea`
to `/sports/chelsea`. Amharic and Fitness get placeholder landing pages using
the shared visual style so the hub feels complete even before they're built.

## Identity (unchanged)

Keep the existing look — do not reinvent it.
- Background `#0f0f0f`; surfaces `#131316` / `#17171c` / `#1d1d24`
- Chelsea blue `#034694`, accent `#2a7de1` (this is the *sports* accent; other
  domains may get their own accent later, layered on the same dark base)
- Tracked-uppercase labels; Geist type; hairline borders `rgba(255,255,255,.08)`
- Form colours W `#22a05a` / D `#6f6f7a` / L `#cf4a45`

## Tech stack

- Next.js 14 (App Router) + Tailwind, deployed on Vercel (auto-deploy from
  `main` on GitHub `Ammanuell/AMW-HQ`)
- PWA (home-screen install, web push later)
- Sports data: football-data.org free tier, server-side only via API routes.
  Key in `.env.local` as `FOOTBALL_DATA_API_KEY` (sports-scoped; keep as-is).

## Rename checklist (branding — no behaviour change)

- `package.json` "name" → `amw-hq`
- PWA `manifest` name / short_name → "AMW HQ"
- Root metadata `<title>` → "AMW HQ"
- In-app copy: "AMW SPORTS HQ" → "AMW HQ" at the hub; the Sports area can read
  "Sports" / "Who are you watching?"
- `README.md`

## Roadmap

1. **Refactor + rename** — introduce the hub layering, namespace routes under
   `/sports`, stub Amharic/Fitness, apply the rename checklist. No dashboard
   build yet; the Chelsea route keeps its current placeholder.
2. **Chelsea dashboard** — build `components/ChelseaDashboard.tsx` to the
   Broadcast Lite mockup (`docs/chelsea-dashboard-mockup.html`), static data.
3. **Sports data layer** — football-data.org API routes; swap placeholders for
   live fixtures, standings, scorers. (Chelsea team ID 61, PL 2021, UCL 2001.)
4. **Later** — SA Spurs dashboard; Amharic and Fitness domains; web push.
