import Link from "next/link";

export default function HubSelector() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center gap-16 px-4">
      <div className="text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-[#666] mb-2">AMW HQ</p>
        <h1 className="text-2xl font-light tracking-widest text-white/80">
          Where to?
        </h1>
      </div>

      <div className="flex gap-12 items-center flex-wrap justify-center">
        <DomainCard
          name="Sports"
          emoji="⚽"
          href="/sports"
          hoverColor="rgba(42,125,225,0.55)"
          ringFrom="#616c79"
          ringTo="#2a3036"
          bgColor="#1e2125"
        />
        <DomainCard
          name="Amharic"
          emoji="🇪🇹"
          comingSoon
        />
        <DomainCard
          name="Fitness"
          emoji="🏋🏿"
          comingSoon
        />
      </div>
    </main>
  );
}

type DomainCardProps = {
  name: string;
  emoji: string;
  href?: string;
  hoverColor?: string;
  ringFrom?: string;
  ringTo?: string;
  bgColor?: string;
  comingSoon?: boolean;
};

function DomainCard({ name, emoji, href, hoverColor, ringFrom, ringTo, bgColor, comingSoon }: DomainCardProps) {
  const icon = (
    <span className="text-[6.5rem] leading-none select-none" aria-hidden="true">
      {emoji}
    </span>
  );

  const circle = (
    <div
      className={`relative w-44 h-44 rounded-full p-[3px] ${
        comingSoon
          ? "bg-gradient-to-br from-[#444] to-[#222] opacity-40"
          : "bg-gradient-to-br transition-all duration-300 group-hover:scale-105"
      }`}
      style={
        !comingSoon
          ? {
              backgroundImage: `linear-gradient(to bottom right, ${ringFrom}, ${ringTo})`,
            }
          : undefined
      }
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: bgColor ?? "#1a1a1a" }}
      >
        {icon}
      </div>

      {comingSoon && (
        <div className="absolute inset-0 rounded-full flex items-end justify-center pb-6">
          <span className="bg-black/70 text-[#aaa] text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );

  const label = (
    <span
      className={`text-sm tracking-widest uppercase transition-colors duration-200 ${
        comingSoon
          ? "text-white/25"
          : "text-white/60 group-hover:text-white/90"
      }`}
    >
      {name}
    </span>
  );

  if (comingSoon || !href) {
    return (
      <div className="flex flex-col items-center gap-5 cursor-not-allowed">
        {circle}
        {label}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-5 outline-none"
      style={
        {
          "--hover-glow": hoverColor,
        } as React.CSSProperties
      }
    >
      <div
        className="relative w-44 h-44 rounded-full p-[3px] transition-all duration-300 group-hover:scale-105"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${ringFrom}, ${ringTo})`,
        }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_40px_8px_var(--hover-glow)]"
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>
      </div>
      {label}
    </Link>
  );
}
