"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  ShieldCheck,
  Gauge,
  Leaf,
  BatteryCharging,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Wrench,
  Radio,
  CheckCircle2,
} from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  headlineMain: string;
  headlineAccent: string;
  subhead: string;
  image: string;
  imageAlt: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  badges: {
    icon: React.ReactNode;
    title: string;
    sub: string;
    bgClass: string;
    iconColor: string;
    position: "left-top" | "left-bottom" | "right-top" | "right-bottom";
  }[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "ebike",
    badge: "Urban E-Mobility",
    badgeIcon: <Zap className="w-3.5 h-3.5 text-[#F2A541] fill-current animate-pulse" />,
    headlineMain: "Ride Smarter,",
    headlineAccent: "Move Smarter.",
    subhead:
      "Experience high-torque urban transit engineered for Lagos roads. Bypass fuel queues and rush-hour gridlock with 750W power, hydraulic suspension, and long-range Grade-A lithium batteries.",
    image: "/images/hero-images/e-bike-hero.png",
    imageAlt: "Emax VeloFlow 750W Urban E-Bike in Lagos",
    primaryCtaText: "Shop E-Bikes",
    primaryCtaHref: "/ebikes",
    secondaryCtaText: "Learn More",
    secondaryCtaHref: "#protocol",
    badges: [
      {
        icon: <BatteryCharging className="w-5 h-5 text-[#087E8B]" />,
        title: "Long-Lasting Battery",
        sub: "Go Further",
        bgClass: "bg-teal-50",
        iconColor: "text-[#087E8B]",
        position: "left-top",
      },
      {
        icon: <Gauge className="w-5 h-5 text-[#F2A541]" />,
        title: "Powerful Performance",
        sub: "Ride Better",
        bgClass: "bg-amber-50",
        iconColor: "text-[#F2A541]",
        position: "left-bottom",
      },
      {
        icon: <Leaf className="w-5 h-5 text-[#217A50]" />,
        title: "Eco-Friendly",
        sub: "A Greener Tomorrow",
        bgClass: "bg-emerald-50",
        iconColor: "text-[#217A50]",
        position: "right-top",
      },
      {
        icon: <ShieldCheck className="w-5 h-5 text-[#123047]" />,
        title: "Enhanced Safety",
        sub: "Ride with Confidence",
        bgClass: "bg-blue-50",
        iconColor: "text-[#123047]",
        position: "right-bottom",
      },
    ],
  },
  {
    id: "battery-pack",
    badge: "Lithium Storage Engineering",
    badgeIcon: <Layers className="w-3.5 h-3.5 text-[#F2A541]" />,
    headlineMain: "Lithium Packs,",
    headlineAccent: "Smart Power.",
    subhead:
      "Design and deploy custom LiFePO4 battery banks with genuine Grade-A prismatic cells, AC internal resistance <0.22mΩ, calibrated YR1035+ matching, and 6,000+ deep cycle longevity.",
    image: "/images/hero-images/battery-pack-hero.png",
    imageAlt: "Emax LiFePO4 Prismatic Lithium Battery Packs",
    primaryCtaText: "Build Your Pack",
    primaryCtaHref: "/build-calculator?tab=battery",
    secondaryCtaText: "Browse Grade-A Cells",
    secondaryCtaHref: "/products?cat=cat-lithium-cells",
    badges: [
      {
        icon: <CheckCircle2 className="w-5 h-5 text-[#087E8B]" />,
        title: "6,000+ Deep Cycles",
        sub: "80% DoD Longevity",
        bgClass: "bg-teal-50",
        iconColor: "text-[#087E8B]",
        position: "left-top",
      },
      {
        icon: <Wrench className="w-5 h-5 text-[#F2A541]" />,
        title: "YR1035+ Tested",
        sub: "Internal IR <0.22mΩ",
        bgClass: "bg-amber-50",
        iconColor: "text-[#F2A541]",
        position: "left-bottom",
      },
      {
        icon: <ShieldCheck className="w-5 h-5 text-[#217A50]" />,
        title: "Zero B-Grade Cells",
        sub: "Factory Laser QR Codes",
        bgClass: "bg-emerald-50",
        iconColor: "text-[#217A50]",
        position: "right-top",
      },
      {
        icon: <BatteryCharging className="w-5 h-5 text-[#123047]" />,
        title: "Precision Sizing",
        sub: "12V, 24V & 48V Banks",
        bgClass: "bg-blue-50",
        iconColor: "text-[#123047]",
        position: "right-bottom",
      },
    ],
  },
  {
    id: "bms",
    badge: "Smart Active Balance BMS",
    badgeIcon: <Cpu className="w-3.5 h-3.5 text-[#F2A541]" />,
    headlineMain: "Smart Protection,",
    headlineAccent: "Active Balancing.",
    subhead:
      "Safeguard your lithium capital with genuine Daly & JBD Smart BMS hardware. Real-time Bluetooth telemetry, high-current active cell balancing (1A–2A), and multi-stage thermal defense.",
    image: "/images/hero-images/bms-hero.png",
    imageAlt: "Emax Smart Active Balancing BMS Hardware",
    primaryCtaText: "Shop Smart BMS",
    primaryCtaHref: "/products?cat=cat-bms",
    secondaryCtaText: "Launch Sizer",
    secondaryCtaHref: "/build-calculator",
    badges: [
      {
        icon: <Cpu className="w-5 h-5 text-[#087E8B]" />,
        title: "1A–2A Active Equalization",
        sub: "Zero Capacity Drift",
        bgClass: "bg-teal-50",
        iconColor: "text-[#087E8B]",
        position: "left-top",
      },
      {
        icon: <Radio className="w-5 h-5 text-[#F2A541]" />,
        title: "Bluetooth Telemetry",
        sub: "Real-time iOS/Android App",
        bgClass: "bg-amber-50",
        iconColor: "text-[#F2A541]",
        position: "left-bottom",
      },
      {
        icon: <ShieldCheck className="w-5 h-5 text-[#217A50]" />,
        title: "Dual Temp Sensors",
        sub: "Thermal Cut-off Protection",
        bgClass: "bg-emerald-50",
        iconColor: "text-[#217A50]",
        position: "right-top",
      },
      {
        icon: <Zap className="w-5 h-5 text-[#123047]" />,
        title: "Short-Circuit Shield",
        sub: "Sub-millisecond Trip",
        bgClass: "bg-blue-50",
        iconColor: "text-[#123047]",
        position: "right-bottom",
      },
    ],
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlideIdx, setPrevSlideIdx] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);
  // Key to force progress-bar re-mount on slide change
  const [progressKey, setProgressKey] = useState(0);

  const goToSlide = useCallback(
    (idx: number, dir: "next" | "prev" = "next") => {
      if (isTransitioning) return;
      setDirection(dir);
      setPrevSlideIdx(currentSlide);
      setIsTransitioning(true);
      setCurrentSlide(idx);
      setProgressKey((k) => k + 1);
      setTimeout(() => {
        setPrevSlideIdx(null);
        setIsTransitioning(false);
      }, 850);
    },
    [currentSlide, isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % HERO_SLIDES.length, "next");
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length, "prev");
  }, [currentSlide, goToSlide]);

  // Auto-play timer (5 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  const leftTopBadge = slide.badges.find((b) => b.position === "left-top");
  const leftBottomBadge = slide.badges.find((b) => b.position === "left-bottom");
  const rightTopBadge = slide.badges.find((b) => b.position === "right-top");
  const rightBottomBadge = slide.badges.find((b) => b.position === "right-bottom");

  return (
    <section
      className="relative min-h-[960px] lg:min-h-[1050px] pt-32 pb-16 overflow-hidden flex flex-col justify-between"
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Emax Featured Showcases"
    >
      {/* 1. Full-Bleed Background Images — Push-Zoom Transition
           Incoming slide: starts scale(1.08) + translateX(100%) → scale(1) translateX(0)
           Outgoing slide: slides from translateX(0) → translateX(-25%) and fades slightly.
           Both always rendered; z-index determines layering so there's never a gap. */}
      {HERO_SLIDES.map((s, index) => {
        const isActive = index === currentSlide;
        const isLeaving = index === prevSlideIdx;
        const isVisible = isActive || isLeaving;

        let animClass = "";
        if (isActive) {
          animClass = direction === "next" ? "hero-slide-enter-next" : "hero-slide-enter-prev";
        } else if (isLeaving) {
          animClass = direction === "next" ? "hero-slide-exit-next" : "hero-slide-exit-prev";
        }

        return (
          <div
            key={s.id}
            className={`absolute inset-0 z-0 ${
              isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            } ${isActive ? "z-[2]" : isLeaving ? "z-[1]" : "z-0"} ${animClass}`}
          >
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              priority={index === 0}
              className="object-cover object-center lg:object-[center_55%]"
              sizes="100vw"
            />
            {/* Atmospheric gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d2844]/55 via-transparent to-[#070f17]/40 pointer-events-none" />
          </div>
        );
      })}

      {/* 2. Top Content: Headline, Subheadline & CTAs (Re-animates on slide change) */}
      <div
        key={`content-${slide.id}`}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center mt-2 flex flex-col items-center justify-center animate-fadeInUp"
      >
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-white text-xs font-semibold mb-5 shadow-sm transition-transform duration-300 hover:scale-105">
          {slide.badgeIcon}
          <span>{slide.badge}</span>
        </div>

        {/* Headline with UI/UX approved Warm Accent #F2A541 (Mathematically and Visually Centered) */}
        <h1 className="w-full text-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md flex items-center justify-center flex-wrap sm:flex-nowrap gap-x-3">
          <span className="drop-shadow-md">{slide.headlineMain}</span>
          <span className="text-[#F2A541] animate-pulseGlow drop-shadow-md inline-block">{slide.headlineAccent}</span>
        </h1>

        {/* Subhead */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {slide.subhead}
        </p>

        {/* CTAs using UI/UX approved Teal Accent #087E8B and Warm Accent #F2A541 */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={slide.primaryCtaHref}
            className="group inline-flex items-center gap-2.5 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-sm px-7 py-3.5 rounded-full shadow-glowTeal transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:translate-y-0"
          >
            <span>{slide.primaryCtaText}</span>
            <div className="w-6 h-6 rounded-full bg-[#F2A541] text-[#123047] flex items-center justify-center text-xs font-bold transition-transform duration-300 group-hover:rotate-45">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href={slide.secondaryCtaHref}
            className="group inline-flex items-center gap-2 text-white hover:text-[#F2A541] font-semibold text-sm px-6 py-3.5 rounded-full border-2 border-white/70 hover:border-[#F2A541] hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 shadow-sm"
          >
            <span>{slide.secondaryCtaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* 3. Middle & Floating Feature Badges Spanning Either Side */}
      <div key={`badges-${slide.id}`} className="relative z-10 max-w-6xl mx-auto px-4 w-full my-auto py-12 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-36 lg:gap-y-48 items-center justify-between">
          {/* Left Side Badges */}
          <div className="flex flex-col gap-24 lg:gap-36 items-start">
            {leftTopBadge && (
              <div className="pointer-events-auto flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-glass transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white max-w-xs animate-float">
                <div className={`w-10 h-10 rounded-xl ${leftTopBadge.bgClass} flex items-center justify-center flex-shrink-0 shadow-inner`}>
                  {leftTopBadge.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123047]">{leftTopBadge.title}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{leftTopBadge.sub}</div>
                </div>
              </div>
            )}

            {leftBottomBadge && (
              <div className="pointer-events-auto flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-glass transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white max-w-xs animate-floatDelayed">
                <div className={`w-10 h-10 rounded-xl ${leftBottomBadge.bgClass} flex items-center justify-center flex-shrink-0 shadow-inner`}>
                  {leftBottomBadge.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123047]">{leftBottomBadge.title}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{leftBottomBadge.sub}</div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side Badges */}
          <div className="flex flex-col gap-24 lg:gap-36 items-end">
            {rightTopBadge && (
              <div className="pointer-events-auto flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-glass transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white max-w-xs animate-floatDelayed">
                <div className={`w-10 h-10 rounded-xl ${rightTopBadge.bgClass} flex items-center justify-center flex-shrink-0 shadow-inner`}>
                  {rightTopBadge.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123047]">{rightTopBadge.title}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{rightTopBadge.sub}</div>
                </div>
              </div>
            )}

            {rightBottomBadge && (
              <div className="pointer-events-auto flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-glass transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-white max-w-xs animate-float">
                <div className={`w-10 h-10 rounded-xl ${rightBottomBadge.bgClass} flex items-center justify-center flex-shrink-0 shadow-inner`}>
                  {rightBottomBadge.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123047]">{rightBottomBadge.title}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{rightBottomBadge.sub}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Docked Bottom Carousel Navigation */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
        {/* Carousel Controls: Arrows + Alvic-style numbered progress indicators */}
        <div className="flex items-center justify-center gap-6 pt-1">
          {/* Previous Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full glass-pill text-white flex items-center justify-center hover:bg-white/40 hover:text-[#F2A541] transition-all duration-200 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Alvic-style: numbered text + animated progress bar beneath the active number */}
          <div className="flex items-end gap-5 px-4 py-2 rounded-2xl glass-pill">
            {HERO_SLIDES.map((s, idx) => {
              const isCurrent = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(idx, idx > currentSlide ? "next" : "prev")}
                  aria-label={`Go to slide ${idx + 1}: ${s.badge}`}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <span
                    className={`text-xs font-bold tracking-wide transition-colors duration-300 ${
                      isCurrent ? "text-white" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {/* Progress bar track */}
                  <div className="w-10 h-[3px] bg-white/20 rounded-full overflow-hidden">
                    {isCurrent && (
                      <div
                        key={progressKey}
                        className="h-full bg-[#F2A541] rounded-full"
                        style={{ animation: "slideProgress 5s linear forwards" }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full glass-pill text-white flex items-center justify-center hover:bg-white/40 hover:text-[#F2A541] transition-all duration-200 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Gentle transition curve into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#f7faff] to-transparent pointer-events-none z-10" />
    </section>
  );
}
