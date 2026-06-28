import type { TableRow } from "./types";
import { Crest, Eyebrow, PANEL } from "./primitives";

/** League standings; Chelsea row highlighted. */
export function LeagueTable({ rows }: { rows: TableRow[] }) {
  return (
    <section className="min-[720px]:[grid-area:table]">
      <Eyebrow>League table</Eyebrow>
      <div className={`${PANEL} overflow-hidden`}>
        {rows.map((row) => (
          <div
            key={row.pos}
            className={`grid grid-cols-[22px_1fr_26px_32px] items-center gap-2 px-3.5 py-2.5 text-[12.5px] [&+&]:border-t [&+&]:border-white/[0.08] ${
              row.isChelsea
                ? "bg-gradient-to-r from-[#034694]/[0.34] to-[#034694]/[0.05]"
                : ""
            }`}
          >
            <span className="text-center tabular-nums text-white/[0.26]">{row.pos}</span>
            <span className={`flex min-w-0 items-center gap-2 ${row.isChelsea ? "font-bold" : ""}`}>
              <Crest
                team={{ name: row.team, chelsea: row.isChelsea, crest: row.crest }}
                size={18}
                fontSize={9}
              />
              <span className="truncate">{row.team}</span>
            </span>
            <span className="text-center tabular-nums text-white/[0.46]">{row.played}</span>
            <span className="text-center font-semibold tabular-nums">{row.points}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
