import Link from "next/link";
import { Category } from "@/lib/types";
import {
  BatteryCharging,
  Cpu,
  Bike,
  SunMedium,
  Wrench,
  Zap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface Props {
  categories: Category[];
}

interface CategoryMeta {
  icon: React.ReactNode;
  iconBg: string;
  iconHoverBg: string;
  badge: string;
  curatedDescription: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  "lithium-cells": {
    icon: <BatteryCharging className="w-6 h-6 text-[#087E8B] transition-colors group-hover:text-white" />,
    iconBg: "bg-teal-50 border-teal-100/80",
    iconHoverBg: "group-hover:bg-[#087E8B]",
    badge: "Grade-A LiFePO4",
    curatedDescription: "105Ah–314Ah prismatic cells with factory laser QR & low IR.",
  },
  "bms-balancers": {
    icon: <Cpu className="w-6 h-6 text-[#123047] transition-colors group-hover:text-white" />,
    iconBg: "bg-slate-100 border-slate-200/80",
    iconHoverBg: "group-hover:bg-[#123047]",
    badge: "Smart Active Balance",
    curatedDescription: "JK & Daly smart BMS and high-current active cell balancers.",
  },
  "electric-mobility": {
    icon: <Bike className="w-6 h-6 text-[#F2A541] transition-colors group-hover:text-white" />,
    iconBg: "bg-amber-50 border-amber-100/80",
    iconHoverBg: "group-hover:bg-[#F2A541]",
    badge: "Urban E-Mobility",
    curatedDescription: "750W e-bikes, scooters, hub motors, controllers & battery packs.",
  },
  "inverters-solar": {
    icon: <SunMedium className="w-6 h-6 text-orange-600 transition-colors group-hover:text-white" />,
    iconBg: "bg-orange-50 border-orange-100/80",
    iconHoverBg: "group-hover:bg-orange-600",
    badge: "Solar & Inverters",
    curatedDescription: "Hybrid inverters, MPPT chargers & turnkey solar generator crates.",
  },
  "hardware-accessories": {
    icon: <Wrench className="w-6 h-6 text-indigo-600 transition-colors group-hover:text-white" />,
    iconBg: "bg-indigo-50 border-indigo-100/80",
    iconHoverBg: "group-hover:bg-indigo-600",
    badge: "Tools & Hardware",
    curatedDescription: "Busbars, spot welders, DC converters, multimeters & clamp meters.",
  },
  "display-electronics": {
    icon: <Zap className="w-6 h-6 text-emerald-600 transition-colors group-hover:text-white" />,
    iconBg: "bg-emerald-50 border-emerald-100/80",
    iconHoverBg: "group-hover:bg-emerald-600",
    badge: "Display & TV",
    curatedDescription: "Universal LED TV backlight strips, LCD screens & display components.",
  },
};

export default function CategoryGrid({ categories }: Props) {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50 border-y border-slate-200/80 relative overflow-hidden">
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#087e8b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 text-[#087E8B] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Catalog Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123047] tracking-tight">
            Core Component Categories
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium max-w-lg mx-auto">
            Engineered hardware, Grade-A cells, and turnkey clean-power solutions tested and verified in our Lagos workshop.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 items-stretch">
          {categories.map((cat, idx) => {
            const meta = CATEGORY_META[cat.slug] || {
              icon: <Zap className="w-6 h-6 text-[#087E8B]" />,
              iconBg: "bg-teal-50 border-teal-100/80",
              iconHoverBg: "group-hover:bg-[#087E8B]",
              badge: "Component",
              curatedDescription: cat.description,
            };

            return (
              <Link
                key={cat.id}
                href={`/products?cat=${cat.id}`}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#087E8B] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between text-center reveal-scale"
                data-delay={Math.min(500, (idx + 1) * 75).toString()}
              >
                {/* Top Badge & Icon */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-2xl ${meta.iconBg} ${meta.iconHoverBg} border flex items-center justify-center mb-4 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-md`}
                  >
                    {meta.icon}
                  </div>

                  <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400 group-hover:text-[#087E8B] transition-colors mb-1.5">
                    {meta.badge}
                  </span>

                  <h3 className="font-extrabold text-sm sm:text-[15px] text-[#123047] group-hover:text-[#087E8B] transition-colors duration-200 leading-snug">
                    {cat.name}
                  </h3>
                </div>

                {/* Description (no cutoffs) */}
                <div className="mt-3 pt-3 border-t border-slate-100/80 flex flex-col items-center justify-between">
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed min-h-[38px] flex items-center justify-center">
                    {meta.curatedDescription}
                  </p>

                  {/* Micro interaction link */}
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#087E8B] opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
