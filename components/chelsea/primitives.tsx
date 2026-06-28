import type { FormResult, TeamRef } from "./types";

/** Chelsea crest asset — also reused as the hero watermark. */
export const CHELSEA_LOGO = "/logos/chelsea.svg";

/** Shared card shell: hairline surface with a motion-safe hover-lift. */
export const PANEL =
  "bg-[#131316] border border-white/[0.08] rounded-[14px] " +
  "motion-safe:transition-[transform,border-color] motion-safe:duration-200 " +
  "motion-safe:hover:-translate-y-0.5 hover:border-[#2a7de1]/40";

/** Section label — tracked uppercase with the blue accent dash. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/[0.46]">
      <span className="h-0.5 w-3.5 rounded-sm bg-[#2a7de1]" aria-hidden />
      {children}
    </div>
  );
}

/**
 * Crest image when a URL is available (remote crest, or the local Chelsea
 * asset); otherwise an initial roundel. Remote crests come from the data layer
 * (football-data.org), so no team logos are stored in the app.
 */
export function Crest({
  team,
  size,
  fontSize,
}: {
  team: TeamRef;
  size: number;
  fontSize: number;
}) {
  const src = team.crest ?? (team.chelsea ? CHELSEA_LOGO : null);
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={team.name}
        className="flex-none object-contain"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="grid flex-none place-items-center rounded-full border border-white/[0.13] bg-[#1d1d24] font-extrabold text-white/[0.72]"
      style={{ width: size, height: size, fontSize }}
      aria-hidden
    >
      {team.name.charAt(0)}
    </span>
  );
}

const FORM_BG: Record<FormResult, string> = {
  W: "#22a05a",
  D: "#6f6f7a",
  L: "#cf4a45",
};

/** Single W/D/L form chip. */
export function FormChip({ result }: { result: FormResult }) {
  return (
    <i
      className="grid h-[22px] w-[22px] place-items-center rounded-md text-[10px] font-extrabold not-italic text-[#0a0a0b]"
      style={{ backgroundColor: FORM_BG[result] }}
    >
      {result}
    </i>
  );
}
