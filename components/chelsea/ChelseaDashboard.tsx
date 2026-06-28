import type { ChelseaData } from "./types";
import { SAMPLE_DATA } from "./sample-data";
import { TopBar } from "./TopBar";
import { Hero } from "./Hero";
import { RecentForm } from "./RecentForm";
import { LastResultPanel } from "./LastResult";
import { LeagueTable } from "./LeagueTable";
import { TopScorers } from "./TopScorers";
import { News } from "./News";
import { WatchLive } from "./WatchLive";

/**
 * Renders the dashboard for the given data. Mobile-first single column;
 * reflows to the 2-col broadcast grid at ≥720px. Pass `data` from a real
 * data layer when one exists.
 */
export function ChelseaDashboardView({ data }: { data: ChelseaData }) {
  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-[18px] px-4 pb-6 min-[720px]:grid min-[720px]:grid-cols-[1.55fr_1fr] min-[720px]:items-start min-[720px]:gap-x-[18px] min-[720px]:gap-y-4 min-[720px]:px-[22px] min-[720px]:pb-[26px] min-[720px]:[grid-template-areas:'bar_bar'_'hero_hero'_'form_scorers'_'result_scorers'_'table_scorers'_'table_news'_'watch_watch']">
        <TopBar />
        <Hero match={data.nextMatch} />
        <RecentForm form={data.recentForm} />
        <LastResultPanel result={data.lastResult} />
        <LeagueTable rows={data.table} />
        <TopScorers scorers={data.scorers} />
        <News items={data.news} />
        <WatchLive />
      </div>
    </main>
  );
}

/** Route entry point — page-compatible (no props), renders sample data. */
export default function ChelseaDashboard() {
  return <ChelseaDashboardView data={SAMPLE_DATA} />;
}
