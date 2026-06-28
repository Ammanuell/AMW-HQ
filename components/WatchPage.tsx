import Link from "next/link";

export default function WatchPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-3xl aspect-video bg-[#111115] border border-white/10 rounded-xl flex items-center justify-center">
        <p className="text-white/30 text-lg tracking-wide">🚧 Streams coming soon</p>
      </div>
      <Link
        href="/sports/chelsea"
        className="text-xs tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors"
      >
        ← Back to Dashboard
      </Link>
    </main>
  );
}
