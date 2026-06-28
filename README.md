# AMW HQ

A personal PWA hub — one front door, several self-contained "domains" behind
it. Installed on the home screen, used on phone and desktop.

## Domains

- **Sports** — *active.* Chelsea FC dashboard (placeholder for now); SA Spurs planned.
- **Amharic** — *planned.* Language-learning area. Stub only.
- **Fitness** — *planned.* Stub only.

## Architecture — three tiers

```
Tier 1  Hub selector    /                      pick a domain (Sports / Amharic / Fitness)
Tier 2  Domain landing   /sports               pick a team (Chelsea / Spurs)
                         /amharic              (stub: coming soon)
                         /fitness              (stub: coming soon)
Tier 3  Sub-view         /sports/chelsea        Chelsea dashboard
                         /sports/chelsea/watch  watch page
```

Routes are namespaced per domain, so each area grows independently. Amharic and
Fitness ship as placeholder landing pages in the shared visual style until they
are built.

## Tech stack

- Next.js 14 (App Router) + Tailwind CSS, TypeScript
- Deployed on Vercel (auto-deploy from `main` on GitHub `Ammanuell/AMW-HQ`)
- PWA (home-screen install; web push later)
- Sports data: [football-data.org](https://www.football-data.org) free tier,
  server-side only via API routes. Key in `.env.local` as `FOOTBALL_DATA_API_KEY`.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Identity

Dark base `#0f0f0f`; surfaces `#131316` / `#17171c` / `#1d1d24`. Sports accent
`#2a7de1` (Chelsea blue `#034694`). Tracked-uppercase labels, hairline borders
`rgba(255,255,255,.08)`. Form colours W `#22a05a` / D `#6f6f7a` / L `#cf4a45`.
