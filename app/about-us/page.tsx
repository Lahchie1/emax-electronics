import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import {
  ShieldCheck,
  Zap,
  MapPin,
  CheckCircle2,
  Wrench,
  BatteryCharging,
  Gauge,
  ArrowRight,
  Sparkles,
  Award,
  Users,
  Compass,
} from "lucide-react";

export const metadata = {
  title: "About Us | Emax Electronics Enterprises",
  description:
    "Learn about Emax Electronics Enterprises — Lagos premier hub for genuine Grade-A LiFePO4 cells, active Smart BMS hardware, and high-torque urban e-bikes.",
};

export default function AboutUsPage() {
  const pillars = [
    {
      icon: <Award className="w-5 h-5 text-[#087E8B]" />,
      title: "100% Verified Grade-A Cells",
      desc: "We strictly stock factory-fresh prismatic cells with intact manufacturer QR codes. Zero re-sleeved, recycled, or automotive B-grade cells.",
    },
    {
      icon: <Gauge className="w-5 h-5 text-[#F2A541]" />,
      title: "Bench-Calibrated Impedance",
      desc: "Every single cell is individually tested on our Ikeja bench using precision YR1035+ Kelvin four-wire micro-ohmmeters before dispatch.",
    },
    {
      icon: <BatteryCharging className="w-5 h-5 text-[#087E8B]" />,
      title: "Active Balance Smart BMS",
      desc: "We engineer battery systems with genuine Daly & JBD Smart BMS units featuring Bluetooth telemetry and active 1A–2A cell equalization.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#217A50]" />,
      title: "Engineered for Nigerian Realities",
      desc: "Our solar battery banks and high-torque e-bikes are built to withstand high ambient temperatures, grid volatility, and Lagos road terrain.",
    },
  ];

  const protocolSteps = [
    {
      step: "01",
      title: "Factory QR Integrity",
      desc: "Laser code scanned to confirm genuine manufacturer origin (EVE, CATL) and factory-rated nominal capacity.",
    },
    {
      step: "02",
      title: "AC Internal Resistance Check",
      desc: "Bench measurement with calibrated YR1035+ meters ensuring IR reads under 0.22mΩ for true low-impedance high-discharge performance.",
    },
    {
      step: "03",
      title: "Open-Circuit Voltage Matching",
      desc: "Delta V strictly matched within 5mV across all cells in a series set before pack assembly or customer delivery.",
    },
    {
      step: "04",
      title: "Mechanical Compression Spec",
      desc: "Pack assembly guidelines providing 300kgf spring compression to prevent lithium dendrite formation and maximize 6,000-cycle life.",
    },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Uniform Page Hero */}
        <PageHero
          badge="About Us"
          headline={
            <>
              Pioneering Clean Power{" "}
              <span className="text-[#F2A541]">in Lagos.</span>
            </>
          }
          subtext="Bridging Nigeria's energy trust gap through transparent cell testing, genuine Grade-A LiFePO4 verification, active Smart BMS hardware, and high-performance urban electric mobility."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
          imageSrc="/images/page-heroes/about-us-hero.jpg"
          imageAlt="Emax Electronics Enterprises Lagos Clean Energy Hub"
          chips={[
            {
              icon: <ShieldCheck className="w-4 h-4" />,
              label: "YR1035+ Tested",
              sub: "Internal IR <0.22mΩ",
            },
            {
              icon: <Zap className="w-4 h-4" />,
              label: "100% Grade-A",
              sub: "Zero Re-sleeved Cells",
            },
            {
              icon: <MapPin className="w-4 h-4" />,
              label: "Ikeja Tech Hub",
              sub: "Lagos Dispatch Store",
            },
          ]}
        />

        {/* Founding Story Section */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-10 border border-slate-200/80 shadow-sm space-y-5 reveal-fade-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-xs font-bold text-[#087E8B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Origins & Purpose</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123047] tracking-tight">
              Why Emax Exists: Eliminating Counterfeit Energy Components
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nigeria’s shift to solar energy and lithium batteries is accelerated by rising fuel costs and grid instability. However, thousands of DIY builders and homeowners have been misled by re-wrapped degraded electric vehicle cells, inflated amp-hour ratings, and cheap passive balancing boards that destroy expensive battery packs within months.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Emax Electronics Enterprises was established in Lagos to provide an unapologetic standard of technical transparency. Every cell we import is physically matched and tested on our Ikeja bench. We welcome builders and solar installers to bring their own meters to inspect our warehouse inventory before purchasing.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#123047]">
                <CheckCircle2 className="w-4 h-4 text-[#087E8B]" />
                <span>Physical Lagos Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#123047]">
                <CheckCircle2 className="w-4 h-4 text-[#087E8B]" />
                <span>1-Year Direct Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#123047]">
                <CheckCircle2 className="w-4 h-4 text-[#087E8B]" />
                <span>Nationwide Secure Freight</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#123047] to-[#087E8B] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col justify-between min-h-[360px] reveal-fade-right">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#F2A541] mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight mb-3">
                Serving Builders, Installers & Urban Commuters
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Whether you are assembling a 15kWh 48V home storage system, retrofitting an electric vehicle, or bypassing Lagos traffic on our 750W VeloFlow e-bikes, Emax supplies verified hardware that delivers true cycle longevity.
              </p>
            </div>
            <div className="pt-6 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="text-slate-300">Technical Hub Location</span>
              <strong className="text-white font-bold">Ikeja, Lagos State</strong>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid with Subtle Hover Motions */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8 reveal-on-scroll">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123047] tracking-tight">
              The Emax Engineering Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              How our hardware testing protocol guarantees safety and long-term cycle performance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1.5 flex flex-col justify-between group reveal-on-scroll"
                data-delay={Math.min(500, (idx + 1) * 100).toString()}
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-xs">
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#123047] tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Stage Bench Testing Protocol */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm mb-16 reveal-scale">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#087E8B] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                Quality Assurance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123047] mt-3 tracking-tight">
                Our 4-Stage Ikeja Bench Verification Protocol
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Every cell lot passes strict electrical inspection before entering inventory or leaving for dispatch.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {protocolSteps.map((s, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 relative reveal-on-scroll"
                data-delay={Math.min(500, (i + 1) * 100).toString()}
              >
                <div className="text-3xl font-extrabold text-[#F2A541]/40 mb-2 font-mono">
                  {s.step}
                </div>
                <h4 className="font-bold text-sm text-[#123047] mb-1.5">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="bg-gradient-to-r from-[#123047] via-[#0d2844] to-[#123047] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden reveal-scale">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Engineer Your Clean Power System?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore our verified Grade-A components, run sizing calculations on our Build Calculator, or connect directly with our technical team in Ikeja.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs px-6 py-3.5 rounded-full shadow-glowTeal transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/build-calculator"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-6 py-3.5 rounded-full border border-white/20 backdrop-blur-md transition-all duration-200"
              >
                <span>Launch Build Calculator</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-white hover:text-[#F2A541] font-semibold text-xs px-4 py-3.5 transition-colors"
              >
                <span>Contact Lagos Desk →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

