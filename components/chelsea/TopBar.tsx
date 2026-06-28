import Link from "next/link";

/** Sticky-on-mobile header: back to team picker and wordmark. */
export function TopBar() {
  return (
    <div className="sticky top-0 z-30 -mx-4 flex items-center gap-2.5 bg-gradient-to-b from-[#0f0f0f] via-[#0f0f0f]/85 to-transparent px-4 pb-[11px] pt-[15px] backdrop-blur-[7px] min-[720px]:static min-[720px]:mx-0 min-[720px]:bg-none min-[720px]:px-0 min-[720px]:pb-1 min-[720px]:pt-0 min-[720px]:backdrop-blur-none min-[720px]:[grid-area:bar]">
      <Link
        href="/sports"
        aria-label="Back to teams"
        className="text-lg leading-none text-white/[0.46] transition-colors hover:text-white/80"
      >
        ‹
      </Link>
      <span className="text-[13px] font-bold uppercase tracking-[0.26em]">Chelsea</span>
    </div>
  );
}
