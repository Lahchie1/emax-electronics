import { DataService } from "@/lib/supabase/data-service";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, generateWhatsAppUrl } from "@/lib/utils";
import { Zap, ShieldCheck, BatteryCharging, Gauge, ArrowUpRight, Leaf, Wrench, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";

export default async function EBikesPage() {
  const ebikes = await DataService.getEBikes();
  const flagship = ebikes.find((b) => b.model?.includes("VeloFlow")) || ebikes[0];

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Hero */}
        <PageHero
          badge="E-Bikes"
          headline={
            <>
              Ride Smarter,{" "}
              <span className="text-[#F2A541]">Live Greener.</span>
            </>
          }
          subtext="Eliminate petrol queues and high transport expenses. Emax high-torque electric bicycles are engineered for Lagos roads with Grade-A lithium batteries, hydraulic suspension, and fast charging."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "E-Bikes" },
          ]}
          imageSrc="/images/page-heroes/ebikes-hero.jpg"
          imageAlt="Emax VeloFlow 750W Urban E-Bike"
          chips={[
            {
              icon: <BatteryCharging className="w-4 h-4" />,
              label: "Grade-A Battery",
              sub: "Long-Range Cell",
            },
            {
              icon: <Gauge className="w-4 h-4" />,
              label: "750W Motor",
              sub: "Powerful Torque",
            },
            {
              icon: <ShieldCheck className="w-4 h-4" />,
              label: "1-Year Warranty",
              sub: "Ride with Confidence",
            },
          ]}
        />

        {/* Flagship Feature Card */}
        {flagship && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm mb-16 grid lg:grid-cols-2 gap-10 items-center reveal-scale">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src={flagship.image_url}
                alt={flagship.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 550px"
              />
              <span className="absolute top-4 left-4 bg-[#F2A541] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-xs">
                Flagship Model
              </span>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#087e8b]">
                {flagship.brand}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123047] tracking-tight mt-1">
                {flagship.name}
              </h2>
              <div className="mt-3 text-2xl font-extrabold text-[#123047]">
                {formatCurrency(flagship.price_minor)}
              </div>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {flagship.description}
              </p>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Motor Power</div>
                  <div className="font-extrabold text-sm text-[#123047] mt-0.5">750W Peak Hub</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Assisted Range</div>
                  <div className="font-extrabold text-sm text-emerald-600 mt-0.5">Up to 80 km</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Top Speed</div>
                  <div className="font-extrabold text-sm text-[#123047] mt-0.5">45 km/h</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Battery Array</div>
                  <div className="font-extrabold text-sm text-[#087e8b] mt-0.5">48V 15Ah (LG)</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Full Recharge</div>
                  <div className="font-extrabold text-sm text-[#123047] mt-0.5">4.5 - 5 Hours</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Braking</div>
                  <div className="font-extrabold text-sm text-[#123047] mt-0.5">Dual 180mm Disc</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <a
                  href={generateWhatsAppUrl(`Hello Emax Enterprises, I want to purchase or inspect the ${flagship.name} (Price: ${formatCurrency(flagship.price_minor)}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-glowTeal transition transform hover:-translate-y-0.5"
                >
                  <span>Order on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link
                  href={`/products/${flagship.slug}`}
                  className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center transition"
                >
                  View Full Specifications
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* E-Bike Ownership Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1.5 reveal-on-scroll" data-delay="100">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg mb-4">
              ⛽
            </div>
            <h3 className="font-bold text-base text-[#123047]">Zero Petrol Expenses</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Save over ₦60,000 monthly on commuting petrol costs. Charge your battery overnight at home using standard mains or solar.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1.5 reveal-on-scroll" data-delay="200">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-base text-[#123047]">1-Year Local Warranty</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              All Emax e-bikes include a comprehensive 12-month warranty covering frame, motor, controller, and battery pack with local parts in Ikeja.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1.5 reveal-on-scroll" data-delay="300">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg mb-4">
              <Wrench className="w-5 h-5 text-teal-600" />
            </div>
            <h3 className="font-bold text-base text-[#123047]">Dedicated Lagos Servicing</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Our technician team stocks authentic spare tires, inner tubes, brake pads, thumb throttles, and replacement battery arrays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

