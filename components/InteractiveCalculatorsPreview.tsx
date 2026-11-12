"use client";

import { useState } from "react";
import { ArrowUpRight, Gauge, Zap } from "lucide-react";
import { calculateBatteryPack } from "@/lib/calculators";
import { generateWhatsAppUrl, formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function InteractiveCalculatorsPreview() {
  // Calculator 1: Lithium Pack
  const [packVoltage, setPackVoltage] = useState<12 | 24 | 48>(48);
  const [cellCap, setCellCap] = useState<number>(280);

  const packResult = calculateBatteryPack({
    systemVoltage: packVoltage,
    chemistry: "lifepo4",
    cellCapacityAh: cellCap,
    parallelCount: 1,
  });

  // Calculator 2: Lagos Commute Fuel Savings
  const [dailyKm, setDailyKm] = useState<number>(35);
  // Fuel savings math: Average commercial/car commute in Lagos burns ~1 liter of petrol per 8km in heavy traffic.
  // With petrol at ₦850/L:
  const monthlyWorkdays = 24;
  const monthlyKm = dailyKm * monthlyWorkdays;
  const litersConsumed = monthlyKm / 8;
  const monthlyPetrolNaira = Math.round(litersConsumed * 850);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200" id="builders">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 reveal-on-scroll">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#087e8b] bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Engineering Calculators
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123047] mt-2 tracking-tight">
            Interactive Power Sizing Builders
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Test your energy storage requirements or estimate direct fuel savings before consulting our Lagos technicians.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Builder 1: Lithium Pack */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between reveal-fade-left">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#123047]">
                    Lithium Pack Configuration Builder
                  </h3>
                  <p className="text-xs text-slate-500">Pick target system voltage & energy requirement</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Target System Voltage
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[12, 24, 48].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setPackVoltage(v as 12 | 24 | 48)}
                        className={`py-2 text-xs font-bold rounded-xl border transition ${
                          packVoltage === v
                            ? "bg-[#123047] text-white border-[#123047] shadow-sm"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#087e8b]"
                        }`}
                      >
                        {v}V ({v === 12 ? "4S" : v === 24 ? "8S" : "16S"})
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Prismatic Cell Model
                  </label>
                  <select
                    value={cellCap}
                    onChange={(e) => setCellCap(Number(e.target.value))}
                    className="w-full rounded-xl border-slate-200 text-xs font-semibold py-2.5 px-3 bg-slate-50 focus:border-[#123047] focus:ring-0"
                  >
                    <option value={105}>105Ah LiFePO4 Prismatic Cell</option>
                    <option value={280}>280Ah LiFePO4 Prismatic (LF280K v3)</option>
                    <option value={314}>314Ah High-Density Utility Cell</option>
                  </select>
                </div>

                {/* Sizing Results Box — Left-aligned label+value pairs */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-xs space-y-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-medium">
                      Required Prismatic Cells:
                    </span>
                    <span className="font-extrabold text-[#123047]">
                      {packResult.totalCells} Units{" "}
                      <span className="text-slate-400 font-normal">(Matched IR)</span>
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 flex flex-col gap-0.5">
                    <span className="text-slate-500 font-medium">
                      Recommended Smart BMS:
                    </span>
                    <div>
                      <span className="font-extrabold text-[#087e8b]">
                        JK Smart {packResult.seriesCount}S {Math.max(100, Math.min(300, Math.round((cellCap * 0.75) / 50) * 50))}A
                      </span>{" "}
                      <span className="text-[11px] text-slate-500 font-medium">
                        with 1A–2A Active Balancer & Bluetooth
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 flex flex-col gap-0.5">
                    <span className="text-slate-500 font-medium">
                      Nominal Energy Capacity:
                    </span>
                    <span className="font-extrabold text-emerald-600">
                      ~{packResult.totalEnergyKwh} kWh{" "}
                      <span className="text-emerald-700/80 font-medium">
                        ({packResult.usableEnergyKwh} kWh Usable)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={generateWhatsAppUrl(
                  `Hello Emax Lagos Hub, please provide a quotation for a ${packVoltage}V ${packResult.seriesCount}S pack with ${cellCap}Ah LiFePO4 cells (${packResult.totalEnergyKwh} kWh total energy).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#123047] hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition"
              >
                <span>Send Sizing to Lagos Tech Desk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/build-calculator?tab=battery"
                className="w-full sm:w-auto text-center px-4 py-3 text-xs font-bold text-[#087e8b] hover:underline"
              >
                Full Pack Calculator →
              </Link>
            </div>
          </div>

          {/* Builder 2: Lagos Commute Fuel Savings */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between reveal-fade-right">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#087E8B]/10 text-[#087E8B] flex items-center justify-center font-bold text-lg">
                  <Gauge className="w-5 h-5 text-[#087E8B]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#123047]">
                    Lagos Commute Fuel-Savings Estimator
                  </h3>
                  <p className="text-xs text-slate-500">Calculate direct petrol money saved with Emax VeloFlow</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Daily Return Commute (km)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={dailyKm}
                    onChange={(e) => setDailyKm(Number(e.target.value))}
                    className="w-full accent-[#087e8b] h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mt-2">
                    <span>10 km (Local)</span>
                    <span className="text-[#123047] font-extrabold text-sm">{dailyKm} km / day</span>
                    <span>90 km (Mainland ⇄ Island)</span>
                  </div>
                </div>

                {/* Savings Callout */}
                <div className="bg-gradient-to-br from-[#123047] to-[#0d2844] rounded-2xl p-5 text-white shadow-md">
                  <span className="text-[10px] uppercase font-bold text-[#F2A541] tracking-wider">
                    Estimated Monthly Petrol Money Saved
                  </span>
                  <div className="text-3xl font-extrabold text-[#F2A541] mt-1">
                    {formatCurrency(monthlyPetrolNaira * 100)} / month
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    At ₦850/liter Lagos petrol rates, payback on the Emax VeloFlow is under 10 months while bypassing all Third Mainland Bridge and Lekki-Epe rush hour gridlock.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/ebikes"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs py-3 rounded-xl transition shadow-glowTeal"
              >
                <span>Explore VeloFlow 750W</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/build-calculator?tab=solar"
                className="w-full sm:w-auto text-center px-4 py-3 text-xs font-bold text-[#087e8b] hover:underline"
              >
                Solar Generator Sizer →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
