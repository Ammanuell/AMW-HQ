import type { LastResult } from "./types";
import { Eyebrow, FormChip, PANEL } from "./primitives";

/** Most recent result: scoreline, opponent and outcome chip. */
export function LastResultPanel({ result }: { result: LastResult }) {
  return (
    <section className="min-[720px]:[grid-area:result]">
      <Eyebrow>Last result</Eyebrow>
      <div className={`${PANEL} flex items-center gap-3 px-[15px] py-[13px]`}>
        <span className="text-[20px] font-bold tabular-nums">{result.score}</span>
        <span className="text-[11px] text-white/[0.46]">
          v {result.opponent} ({result.ground})
        </span>
        <span className="ml-auto flex">
          <FormChip result={result.result} />
        </span>
      </div>
    </section>
  );
}
