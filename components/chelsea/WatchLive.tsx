import Link from "next/link";

/** Full-width call-to-action linking to the streams page. */
export function WatchLive() {
  return (
    <Link
      href="/sports/chelsea/watch"
      className="flex items-center justify-center gap-2.5 rounded-[13px] border border-white/[0.12] bg-[#034694] p-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white no-underline min-[720px]:[grid-area:watch]"
    >
      <i className="block h-2 w-2 rounded-full bg-[#ff4d4d]" aria-hidden />
      Watch live
    </Link>
  );
}
