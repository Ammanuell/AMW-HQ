import Link from "next/link";

export default function ProfileSelector() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center gap-16 px-4">
      <div className="text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-[#666] mb-2">Sports</p>
        <h1 className="text-2xl font-light tracking-widest text-white/80">
          Who are you watching?
        </h1>
      </div>

      <div className="flex gap-12 items-center flex-wrap justify-center">
        <ClubCard
          name="Chelsea FC"
          logo="/logos/chelsea.svg"
          href="/sports/chelsea"
          hoverColor="rgba(3,70,148,0.6)"
          ringFrom="#034694"
          ringTo="#021736"
          bgColor="#021736"
        />
        <ClubCard
          name="SA Spurs"
          logo="/logos/spurs.svg"
          comingSoon
        />
      </div>

      <Link
        href="/"
        className="text-xs tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors"
      >
        ← Back
      </Link>
    </main>
  );
}

type ClubCardProps = {
  name: string;
  logo: string;
  href?: string;
  hoverColor?: string;
  ringFrom?: string;
  ringTo?: string;
  bgColor?: string;
  comingSoon?: boolean;
};

function ClubCard({ name, logo, href, hoverColor, ringFrom, ringTo, bgColor, comingSoon }: ClubCardProps) {
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={name}
          className="w-28 h-28 object-contain drop-shadow-lg"
        />
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt={name}
            className="w-28 h-28 object-contain drop-shadow-lg"
          />
        </div>
      </div>
      {label}
    </Link>
  );
}
