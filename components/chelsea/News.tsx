import type { NewsItem } from "./types";
import { Eyebrow, PANEL } from "./primitives";

/** Latest news headlines with source eyebrows. */
export function News({ items }: { items: NewsItem[] }) {
  return (
    <section className="min-[720px]:[grid-area:news]">
      <Eyebrow>Latest news</Eyebrow>
      <div className={`${PANEL} px-[15px] py-1`}>
        {items.map((item) => (
          <a
            key={item.headline}
            href={item.href}
            className="block py-2.5 text-[13px] text-white/[0.82] no-underline [&+a]:border-t [&+a]:border-white/[0.08]"
          >
            <small className="mb-[3px] block text-[9.5px] uppercase tracking-[0.12em] text-white/[0.26]">
              {item.source}
            </small>
            {item.headline}
          </a>
        ))}
      </div>
    </section>
  );
}
