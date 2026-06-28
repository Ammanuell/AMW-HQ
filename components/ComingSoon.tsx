import Link from "next/link";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center gap-6">
      <p className="text-white/40 tracking-widest uppercase text-sm">
        {title} — coming soon
      </p>
      <Link
        href="/"
        className="text-xs tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors"
      >
        ← Back
      </Link>
    </main>
  );
}
