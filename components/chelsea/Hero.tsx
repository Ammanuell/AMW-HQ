import type { Match } from "./types";
import { CHELSEA_LOGO, Crest, Eyebrow } from "./primitives";
import { Countdown } from "./Countdown";

/** Next-match hero: crest watermark, blue glow, VS row and countdown. */
export function Hero({ match }: { match: Match }) {
  return (
    <section className="min-[720px]:[grid-area:hero]">
      <Eyebrow>Next match</Eyebrow>
      <div
        className="relative overflow-hidden rounded-[18px] border border-white/[0.13] p-[18px]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, rgba(3,70,148,.4), transparent 60%), #131316",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHELSEA_LOGO}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-[22px] -top-[18px] z-0 h-[168px] w-[150px] object-contain opacity-[0.06]"
        />
        <div className="relative z-[2]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[0.46]">
              {match.competition} · {match.matchweek}
            </span>
          </div>

          <div className="my-3.5 mb-1.5 flex items-center gap-3.5 min-[720px]:my-[18px] min-[720px]:mb-2.5">
            <div className="flex flex-1 flex-col items-center gap-1.5 text-center">
              <Crest team={match.home} size={46} fontSize={14} />
              <span className="text-[13px] font-semibold">{match.home.name}</span>
            </div>
            <div>
              <span className="text-[13px] font-semibold tracking-[0.12em] text-white/[0.26]">
                VS
              </span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1.5 text-center">
              <Crest team={match.away} size={46} fontSize={14} />
              <span className="text-[13px] font-semibold">{match.away.name}</span>
            </div>
          </div>

          <div className="text-center text-[11px] text-white/[0.46]">{match.venue}</div>

          <Countdown kickoff={match.kickoff} />
        </div>
      </div>
    </section>
  );
}
