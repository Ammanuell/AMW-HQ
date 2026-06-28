import type { Movement, TableRow } from "./types";
import { Eyebrow, PANEL } from "./primitives";

const ARROW: Record<Movement, { glyph: string; cls: string }> = {
  up: { glyph: "▲", cls: "text-[#22a05a]" },
  down: { glyph: "▼", cls: "text-[#cf4a45]" },
  same: { glyph: "–", cls: "text-white/[0.26]" },
};

/** League standings with position-movement arrows; Chelsea row highlighted. */
export function LeagueTable({ rows }: { rows: TableRow[] }) {
  return (
    <section className="min-[720px]:[grid-area:table]">
      <Eyebrow>League table</Eyebrow>
      <div className={`${PANEL} overflow-hidden`}>
        {rows.map((row) => {
          const arrow = ARROW[row.move];
          return (
            <div
              key={row.pos}
              className={`grid grid-cols-[22px_1fr_26px_18px_32px] items-center gap-2 px-3.5 py-2.5 text-[12.5px] [&+&]:border-t [&+&]:border-white/[0.08] ${
                row.isChelsea
                  ? "bg-gradient-to-r from-[#034694]/[0.34] to-[#034694]/[0.05]"
                  : ""
              }`}
            >
              <span className="text-center tabular-nums text-white/[0.26]">{row.pos}</span>
              <span className={row.isChelsea ? "font-bold" : ""}>{row.team}</span>
              <span className="text-center tabular-nums text-white/[0.46]">{row.played}</span>
              <span className={`text-[9px] ${arrow.cls}`} aria-hidden>
                {arrow.glyph}
              </span>
              <span className="text-center font-semibold tabular-nums">{row.points}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
