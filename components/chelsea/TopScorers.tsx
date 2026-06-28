import type { Scorer } from "./types";
import { Crest, Eyebrow, PANEL } from "./primitives";

/** Top scorers with goal-share bars relative to the leader. */
export function TopScorers({ scorers }: { scorers: Scorer[] }) {
  const leader = Math.max(1, ...scorers.map((s) => s.goals));
  return (
    <section className="min-[720px]:[grid-area:scorers]">
      <Eyebrow>Top scorers</Eyebrow>
      <div className={`${PANEL} px-[15px] py-1`}>
        {scorers.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-3 py-2.5 [&+&]:border-t [&+&]:border-white/[0.08]"
          >
            <Crest team={{ name: s.name }} size={30} fontSize={10} />
            <div className="min-w-0 flex-1">
              <div className="text-[13px]">{s.name}</div>
              <div className="text-[10px] text-white/[0.26]">
                {s.role} · {s.apps} apps
              </div>
              <div className="mt-[5px] h-1 overflow-hidden rounded-[3px] bg-[#1d1d24]">
                <i
                  className="block h-full bg-gradient-to-r from-[#034694] to-[#2a7de1]"
                  style={{ width: `${(s.goals / leader) * 100}%` }}
                />
              </div>
            </div>
            <span className="ml-auto text-[15px] font-bold tabular-nums">{s.goals}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
