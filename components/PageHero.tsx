import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  /** Short pill badge text e.g. "Products & Shop" */
  badge: string;
  /** Main headline – supports a JSX accent span */
  headline: ReactNode;
  /** Descriptive subtext */
  subtext: string;
  /** Optional breadcrumb: [{label, href}] — last item is current page (no href) */
  breadcrumb?: { label: string; href?: string }[];
  /** Right-side decorative image src. Defaults to brand hero image to keep dimensions uniform. */
  imageSrc?: string;
  imageAlt?: string;
  /** Additional decorative floating stat chips rendered inside the image panel */
  chips?: { icon: ReactNode; label: string; sub: string }[];
  /** Background gradient variation: 'navy' (default) | 'teal' */
  variant?: "navy" | "teal";
}

export default function PageHero({
  badge,
  headline,
  subtext,
  breadcrumb,
  imageSrc = "/images/emax-ebike-hero.jpg",
  imageAlt = "Emax Electronics Engineering",
  chips = [],
  variant = "navy",
}: PageHeroProps) {
  const bg =
    variant === "teal"
      ? "bg-gradient-to-br from-[#087E8B] via-[#0d7a86] to-[#123047]"
      : "bg-gradient-to-br from-[#123047] via-[#0d2844] to-[#0a1e30]";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${bg} text-white mb-12 shadow-2xl border border-white/10 w-full min-h-[380px] sm:min-h-[400px] lg:min-h-[420px] flex items-stretch`}
    >
      {/* Decorative background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Ambient Radial Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#087E8B]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F2A541]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Uniform 12-Column Grid */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-0 items-stretch w-full">
        {/* Left: Text Content (7 Cols) */}
        <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center animate-fadeInUp">
          {/* Breadcrumb Navigation */}
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 mb-3.5 tracking-wide">
              {breadcrumb.map((crumb, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-white/40" />}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#F2A541] mb-3.5 self-start border border-white/15 shadow-sm transition-transform hover:scale-105 duration-200">
            <span className="w-2 h-2 rounded-full bg-[#F2A541] animate-pulse" />
            <span>{badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-[1.12] mb-3.5 text-white">
            {headline}
          </h1>

          {/* Subtext */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-xl">
            {subtext}
          </p>
        </div>

        {/* Right: Aligned Visual Image Panel with Floating Stat Chips (5 Cols) */}
        <div className="lg:col-span-5 relative hidden lg:block overflow-hidden">
          {/* Soft gradient edge fade into the dark left panel */}
          <div
            className={`absolute inset-y-0 left-0 w-28 ${
              variant === "teal"
                ? "bg-gradient-to-r from-[#0d7a86] to-transparent"
                : "bg-gradient-to-r from-[#0d2844] to-transparent"
            } z-10 pointer-events-none`}
          />

          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover object-center opacity-85 transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />

          {/* Floating Stat Chips */}
          {chips.length > 0 && (
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-end gap-3.5 pr-7 pointer-events-none">
              {chips.map((chip, i) => (
                <div
                  key={i}
                  className={`pointer-events-auto flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-glass border border-white/90 max-w-[210px] transition-transform duration-300 hover:scale-105 hover:-translate-y-1 ${
                    i === 0
                      ? "animate-float"
                      : i === 1
                      ? "animate-floatDelayed"
                      : "animate-float"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 text-[#087E8B] shadow-inner">
                    {chip.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#123047] leading-tight">
                      {chip.label}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5 leading-none">
                      {chip.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
