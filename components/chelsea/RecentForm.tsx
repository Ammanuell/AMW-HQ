import type { FormResult } from "./types";
import { Eyebrow, FormChip, PANEL } from "./primitives";

/** Last-N form as W/D/L chips with a points tally. */
export function RecentForm({ form }: { form: FormResult[] }) {
  const points = form.reduce((sum, r) => sum + (r === "W" ? 3 : r === "D" ? 1 : 0), 0);
  return (
    <section className="min-[720px]:[grid-area:form]">
      <Eyebrow>Recent form</Eyebrow>
      <div className={`${PANEL} flex items-center justify-between px-[15px] py-[13px]`}>
        <span className="flex gap-1.5">
          {form.map((r, i) => (
            <FormChip key={i} result={r} />
          ))}
        </span>
        <span className="text-[11px] text-white/[0.46]">
          Last {form.length} · {points} pts
        </span>
      </div>
    </section>
  );
}
