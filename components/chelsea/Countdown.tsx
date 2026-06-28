"use client";

import { useEffect, useState } from "react";

/**
 * The only client component in the dashboard: ticks once per second and
 * flips to a LIVE treatment once kickoff passes. Everything else can stay
 * a server component and simply render this.
 */

type Remaining = { live: boolean; d: number; h: number; m: number; s: number };

function computeRemaining(kickoff: string): Remaining {
  let diff = new Date(kickoff).getTime() - Date.now();
  if (diff <= 0) return { live: true, d: 0, h: 0, m: 0, s: 0 };
  const d = Math.floor(diff / 86_400_000);
  diff -= d * 86_400_000;
  const h = Math.floor(diff / 3_600_000);
  diff -= h * 3_600_000;
  const m = Math.floor(diff / 60_000);
  diff -= m * 60_000;
  const s = Math.floor(diff / 1000);
  return { live: false, d, h, m, s };
}

const pad = (n: number) => String(n).padStart(2, "0");

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1 rounded-[10px] border border-white/[0.13] bg-white/[0.04] py-[9px] text-center">
      <b className="block text-[26px] font-bold leading-none tracking-[-0.01em] min-[720px]:text-[30px]">
        {pad(value)}
      </b>
      <small className="mt-1 block text-[8.5px] uppercase tracking-[0.13em] text-white/[0.26]">
        {label}
      </small>
    </div>
  );
}

export function Countdown({ kickoff }: { kickoff: string }) {
  const [t, setT] = useState<Remaining>(() => computeRemaining(kickoff));

  useEffect(() => {
    setT(computeRemaining(kickoff));
    const id = setInterval(() => setT(computeRemaining(kickoff)), 1000);
    return () => clearInterval(id);
  }, [kickoff]);

  if (t.live) {
    return (
      <div className="mt-3.5 flex items-center justify-center gap-2.5 rounded-[10px] border border-white/[0.13] bg-white/[0.04] py-[18px]">
        <i className="block h-2 w-2 rounded-full bg-[#ff4d4d] motion-safe:animate-pulse" aria-hidden />
        <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-white">
          Live now
        </span>
      </div>
    );
  }

  return (
    <div className="mt-3.5 flex gap-1.5 tabular-nums">
      <CountdownUnit value={t.d} label="days" />
      <CountdownUnit value={t.h} label="hrs" />
      <CountdownUnit value={t.m} label="min" />
      <CountdownUnit value={t.s} label="sec" />
    </div>
  );
}
