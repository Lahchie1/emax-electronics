"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { calculateBatteryPack, calculateSolarGenerator } from "@/lib/calculators";
import { ApplianceRow } from "@/lib/types";
import { generateWhatsAppUrl, formatCurrency } from "@/lib/utils";
import {
  BatteryCharging,
  SunMedium,
  ArrowUpRight,
  ShieldAlert,
  RotateCcw,
  Wrench,
  Plus,
  Trash2,
  CheckCircle2,
  Sliders,
  Zap,
} from "lucide-react";
import PageHero from "@/components/PageHero";

const INITIAL_APPLIANCES: ApplianceRow[] = [
  { id: "1", name: "Inverter Refrigerator", wattage: 120, quantity: 1, hoursPerDay: 12 },
  { id: "2", name: "Smart TV (55-inch)", wattage: 100, quantity: 1, hoursPerDay: 6 },
  { id: "3", name: "LED Lighting & Bulbs", wattage: 15, quantity: 8, hoursPerDay: 7 },
  { id: "4", name: "Ceiling Fans", wattage: 65, quantity: 3, hoursPerDay: 10 },
  { id: "5", name: "Laptops / Workstation", wattage: 65, quantity: 2, hoursPerDay: 8 },
  { id: "6", name: "WiFi Router & CCTV", wattage: 30, quantity: 1, hoursPerDay: 24 },
];

function BuildCalculatorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab State: 'battery' | 'solar'
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"battery" | "solar">(
    tabParam === "solar" ? "solar" : "battery"
  );

  useEffect(() => {
    if (tabParam === "solar" || tabParam === "battery") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabSwitch = (tab: "battery" | "solar") => {
    setActiveTab(tab);
    router.replace(`/build-calculator?tab=${tab}`, { scroll: false });
  };

  // --- 1. Battery Builder State ---
  const [voltage, setVoltage] = useState<12 | 24 | 48>(48);
  const [chemistry, setChemistry] = useState<"lifepo4" | "nmc">("lifepo4");
  const [capacity, setCapacity] = useState<number>(280);
  const [parallel, setParallel] = useState<number>(1);

  const batteryResult = calculateBatteryPack({
    systemVoltage: voltage,
    chemistry,
    cellCapacityAh: capacity,
    parallelCount: parallel,
  });

  const batteryWhatsAppMessage = `Hello Emax Lagos Engineering Desk, I used your Build Calculator (Lithium Battery Pack) and generated this configuration:\n- Chemistry: ${chemistry.toUpperCase()}\n- System Voltage: ${voltage}V (${batteryResult.seriesCount}S ${batteryResult.parallelCount}P)\n- Cell Model: ${capacity}Ah\n- Total Cells Required: ${batteryResult.totalCells} units\n- Total Energy: ${batteryResult.totalEnergyKwh} kWh (${batteryResult.usableEnergyKwh} kWh usable)\n- Recommended BMS: ${batteryResult.recommendedBmsSpec}\nPlease provide an itemized quote for matched cells, busbars, and BMS.`;

  // --- 2. Solar Generator Builder State ---
  const [appliances, setAppliances] = useState<ApplianceRow[]>(INITIAL_APPLIANCES);
  const [solarVoltage, setSolarVoltage] = useState<12 | 24 | 48>(48);
  const [autonomyDays, setAutonomyDays] = useState<number>(1);

  const solarResult = calculateSolarGenerator({
    appliances,
    autonomyDays,
    systemVoltage: solarVoltage,
  });

  const handleUpdateAppliance = (id: string, field: keyof ApplianceRow, val: any) => {
    setAppliances((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handleRemoveAppliance = (id: string) => {
    setAppliances((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddAppliance = () => {
    setAppliances((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "Custom Appliance",
        wattage: 100,
        quantity: 1,
        hoursPerDay: 4,
      },
    ]);
  };

  const solarWhatsAppMessage = `Hello Emax Lagos Engineering Desk, I used your Build Calculator (Solar Generator Sizer) and sized my household load:\n- Daily Energy Demand: ${solarResult.dailyEnergyKwh} kWh (${solarResult.dailyEnergyWh} Wh)\n- Peak Load: ${solarResult.peakLoadWatts} Watts\n- System Voltage: ${solarVoltage}V\n- Recommended Inverter: ${solarResult.recommendedInverterVa} VA Pure Sine Wave\n- Recommended LiFePO4 Storage: ${solarResult.recommendedBatteryKwh} kWh (${solarResult.recommendedBatteryAh}Ah)\n- Recommended Solar PV Array: ${solarResult.recommendedPvWattage} Watts\nPlease recommend matching inverters, cells, and MPPT controllers.`;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Hero */}
        <PageHero
          badge="Build Calculator"
          headline={
            <>
              Build Calculator —{" "}
              <span className="text-[#F2A541]">Plan Your System.</span>
            </>
          }
          subtext="Design your custom clean-energy system with deterministic cell math, appliance load algorithms, and component recommendations optimised for Nigeria's power landscape."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Build Calculator" },
          ]}
          imageSrc="/images/page-heroes/calculator-hero.jpg"
          imageAlt="Emax build calculator — battery and solar engineering tools"
          chips={[
            {
              icon: <BatteryCharging className="w-4 h-4" />,
              label: "Battery Builder",
              sub: "LiFePO4 Cell Sizing",
            },
            {
              icon: <SunMedium className="w-4 h-4" />,
              label: "Solar Sizer",
              sub: "Load & PV Sizing",
            },
            {
              icon: <Zap className="w-4 h-4" />,
              label: "WhatsApp Quote",
              sub: "Direct to Ikeja Desk",
            },
          ]}
        />

        {/* Tab Switcher */}
        <div className="max-w-xl mx-auto mb-10 reveal-on-scroll">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center shadow-inner">
            <button
              type="button"
              onClick={() => handleTabSwitch("battery")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "battery"
                  ? "bg-[#123047] text-white shadow-md"
                  : "text-slate-600 hover:text-[#123047]"
              }`}
            >
              <BatteryCharging
                className={`w-4 h-4 ${activeTab === "battery" ? "text-[#F2A541]" : "text-slate-500"}`}
              />
              <span>Lithium Battery Builder</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch("solar")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "solar"
                  ? "bg-[#123047] text-white shadow-md"
                  : "text-slate-600 hover:text-[#123047]"
              }`}
            >
              <SunMedium
                className={`w-4 h-4 ${activeTab === "solar" ? "text-[#F2A541]" : "text-slate-500"}`}
              />
              <span>Solar Generator Builder</span>
            </button>
          </div>
        </div>

        {/* TAB 1: LITHIUM BATTERY PACK BUILDER */}
        {activeTab === "battery" && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Controls Column (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 reveal-fade-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="font-extrabold text-base text-[#123047] flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#087E8B]" />
                  <span>1. Pack Parameters & Cell Selection</span>
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setVoltage(48);
                    setChemistry("lifepo4");
                    setCapacity(280);
                    setParallel(1);
                  }}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Chemistry Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Cell Chemistry
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setChemistry("lifepo4")}
                    className={`p-3.5 rounded-2xl border text-left transition ${
                      chemistry === "lifepo4"
                        ? "border-[#087E8B] bg-teal-50/50 shadow-xs ring-1 ring-[#087E8B]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="font-bold text-xs text-[#123047] flex items-center gap-1.5">
                      <span>LiFePO4 (LFP)</span>
                      {chemistry === "lifepo4" && <CheckCircle2 className="w-3.5 h-3.5 text-[#087E8B]" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      3.2V Nominal • 6,000+ Cycles • Non-combustible
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChemistry("nmc")}
                    className={`p-3.5 rounded-2xl border text-left transition ${
                      chemistry === "nmc"
                        ? "border-[#087E8B] bg-teal-50/50 shadow-xs ring-1 ring-[#087E8B]"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="font-bold text-xs text-[#123047] flex items-center gap-1.5">
                      <span>NMC Lithium-Ion</span>
                      {chemistry === "nmc" && <CheckCircle2 className="w-3.5 h-3.5 text-[#087E8B]" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      3.7V Nominal • High energy density for e-mobility
                    </div>
                  </button>
                </div>
              </div>

              {/* System Voltage */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  System Architecture Voltage
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[12, 24, 48].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVoltage(v as 12 | 24 | 48)}
                      className={`py-3 px-4 rounded-xl border text-center font-bold text-xs transition ${
                        voltage === v
                          ? "bg-[#123047] text-white border-[#123047] shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#087E8B]"
                      }`}
                    >
                      {v}V System
                      <div className="text-[10px] font-normal opacity-80 mt-0.5">
                        {chemistry === "lifepo4"
                          ? v === 12
                            ? "4S Series"
                            : v === 24
                            ? "8S Series"
                            : "16S Series"
                          : v === 12
                          ? "3S Series"
                          : v === 24
                          ? "7S Series"
                          : "14S Series"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cell Capacity */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Prismatic Cell Capacity (Ah)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[105, 280, 314].map((cap) => (
                    <button
                      key={cap}
                      type="button"
                      onClick={() => setCapacity(cap)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        capacity === cap
                          ? "bg-[#087E8B] text-white border-[#087E8B]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {cap} Ah Standard
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="20"
                    max="1000"
                    value={capacity}
                    onChange={(e) => setCapacity(Math.max(1, Number(e.target.value)))}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                    placeholder="Enter custom Ah capacity"
                  />
                  <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                    Ampere-Hours (Ah)
                  </span>
                </div>
              </div>

              {/* Parallel String Count */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Parallel String Multiplier (P)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setParallel(p)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        parallel === p
                          ? "bg-[#123047] text-white border-[#123047]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {p}P String
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 reveal-fade-right">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#087E8B] shadow-xl">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#087E8B] bg-teal-50 px-3 py-1 rounded-full">
                  Engineering Specification
                </span>
                <h2 className="text-2xl font-extrabold text-[#123047] mt-3 tracking-tight">
                  {voltage}V {batteryResult.totalCapacityAh}Ah Battery Bank
                </h2>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Architecture: <strong>{batteryResult.seriesCount}S {batteryResult.parallelCount}P Configuration</strong>
                </div>

                {/* Core Metric Callouts */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Total Energy</span>
                    <div className="text-xl font-extrabold text-[#123047] mt-0.5">
                      {batteryResult.totalEnergyKwh} <span className="text-xs font-normal">kWh</span>
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                      {batteryResult.usableEnergyKwh} kWh Usable (80% DoD)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Prismatic Cells</span>
                    <div className="text-xl font-extrabold text-[#087E8B] mt-0.5">
                      {batteryResult.totalCells} <span className="text-xs font-normal">Units</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-1">
                      ~{batteryResult.estimatedPackWeightKg} kg Weight
                    </div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="mt-6 space-y-2.5 text-xs border-t border-slate-100 pt-5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nominal Voltage:</span>
                    <span className="font-bold text-[#123047]">{batteryResult.nominalVoltage} Volts DC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Bank Capacity:</span>
                    <span className="font-bold text-[#123047]">{batteryResult.totalCapacityAh} Ah</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Recommended Smart BMS:</span>
                    <span className="font-bold text-[#087E8B] text-right">{batteryResult.recommendedBmsSpec}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Busbar Requirement:</span>
                    <span className="font-bold text-[#123047]">{batteryResult.totalCells - 1} Flexible Busbars</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <a
                    href={generateWhatsAppUrl(batteryWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-glowTeal transition transform hover:-translate-y-0.5"
                  >
                    <span>Send Specs to Lagos Engineer</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Safety Notice */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Important Technical Notice:</strong>
                  <p className="mt-1 leading-relaxed text-amber-800">
                    {batteryResult.safetyNotice} Emax provides bench testing with calibrated YR1035+ meters for all cells before release.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SOLAR GENERATOR BUILDER */}
        {activeTab === "solar" && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Appliances Table (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 reveal-fade-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-extrabold text-base text-[#123047]">
                    1. Appliance Load Schedule
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Adjust quantity, rated wattage, and daily runtime hours
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAppliances(INITIAL_APPLIANCES)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Appliance List */}
              <div className="space-y-3">
                {appliances.map((app) => (
                  <div
                    key={app.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 grid grid-cols-12 gap-3 items-center text-xs"
                  >
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={app.name}
                        onChange={(e) => handleUpdateAppliance(app.id, "name", e.target.value)}
                        className="w-full font-bold text-[#123047] bg-transparent focus:outline-none focus:border-b focus:border-[#087E8B]"
                      />
                      <div className="text-[10px] text-slate-400">
                        {(app.wattage * app.quantity * app.hoursPerDay).toLocaleString()} Wh/day
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[9px] uppercase font-bold text-slate-400">Watts</label>
                      <input
                        type="number"
                        min="1"
                        value={app.wattage}
                        onChange={(e) =>
                          handleUpdateAppliance(app.id, "wattage", Math.max(1, Number(e.target.value)))
                        }
                        className="w-full bg-white font-semibold rounded-lg px-2 py-1 border border-slate-200 text-center"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[9px] uppercase font-bold text-slate-400">Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={app.quantity}
                        onChange={(e) =>
                          handleUpdateAppliance(app.id, "quantity", Math.max(0, Number(e.target.value)))
                        }
                        className="w-full bg-white font-semibold rounded-lg px-2 py-1 border border-slate-200 text-center"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[9px] uppercase font-bold text-slate-400">Hrs/Day</label>
                      <input
                        type="number"
                        min="0.5"
                        max="24"
                        step="0.5"
                        value={app.hoursPerDay}
                        onChange={(e) =>
                          handleUpdateAppliance(
                            app.id,
                            "hoursPerDay",
                            Math.min(24, Math.max(0.1, Number(e.target.value)))
                          )
                        }
                        className="w-full bg-white font-semibold rounded-lg px-2 py-1 border border-slate-200 text-center"
                      />
                    </div>

                    <div className="col-span-1 text-right">
                      <button
                        type="button"
                        onClick={() => handleRemoveAppliance(app.id)}
                        className="text-slate-400 hover:text-rose-600 transition"
                        title="Remove appliance"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddAppliance}
                className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-[#087E8B] text-[#087E8B] font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Appliance</span>
              </button>

              {/* System Assumptions Selectors */}
              <div className="pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    System Architecture Voltage
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[12, 24, 48].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setSolarVoltage(v as 12 | 24 | 48)}
                        className={`py-2 text-xs font-bold rounded-xl border transition ${
                          solarVoltage === v
                            ? "bg-[#123047] text-white border-[#123047]"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        {v}V
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Autonomy Reserve
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setAutonomyDays(days)}
                        className={`py-2 text-xs font-bold rounded-xl border transition ${
                          autonomyDays === days
                            ? "bg-[#087E8B] text-white border-[#087E8B]"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        {days} Day{days > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sizing Results (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 reveal-fade-right">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#087E8B] shadow-xl">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#087E8B] bg-teal-50 px-3 py-1 rounded-full">
                  System Recommendation
                </span>
                <h2 className="text-2xl font-extrabold text-[#123047] mt-3 tracking-tight">
                  Recommended Solar Kit
                </h2>

                {/* Top Totals */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Daily Demand</span>
                    <div className="text-xl font-extrabold text-[#123047] mt-0.5">
                      {solarResult.dailyEnergyKwh} <span className="text-xs font-normal">kWh</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-1">
                      {solarResult.dailyEnergyWh.toLocaleString()} Wh / day
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Peak Load</span>
                    <div className="text-xl font-extrabold text-[#087E8B] mt-0.5">
                      {solarResult.peakLoadWatts} <span className="text-xs font-normal">Watts</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-1">
                      Simultaneous running
                    </div>
                  </div>
                </div>

                {/* Sizing Breakdown List */}
                <div className="mt-6 space-y-3 text-xs border-t border-slate-100 pt-5">
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
                    <span className="font-semibold text-slate-600">Pure Sine Inverter:</span>
                    <span className="font-extrabold text-[#123047] text-sm">
                      {solarResult.recommendedInverterVa} VA / {solarVoltage}V
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
                    <span className="font-semibold text-slate-600">LiFePO4 Battery Bank:</span>
                    <span className="font-extrabold text-emerald-600 text-sm">
                      {solarResult.recommendedBatteryKwh} kWh ({solarResult.recommendedBatteryAh} Ah @ {solarVoltage}V)
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
                    <span className="font-semibold text-slate-600">Recommended Solar PV:</span>
                    <span className="font-extrabold text-[#F2A541] text-sm">
                      ~{solarResult.recommendedPvWattage} W Solar Panels
                    </span>
                  </div>
                </div>

                {/* Assumptions */}
                <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
                  {solarResult.assumptions.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <a
                    href={generateWhatsAppUrl(solarWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-glowTeal transition transform hover:-translate-y-0.5"
                  >
                    <span>Send Load Audit to Lagos Tech Desk</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Solar Notice */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Engineering Disclaimer:</strong>
                  <p className="mt-1 leading-relaxed text-amber-800">
                    Sizing models assume typical Lagos solar irradiance (4.5 sun hours) and 85% DoD on LiFePO4 batteries. Site verification recommended for heavy inductive loads (deep freezers, air conditioners).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuildCalculatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-36 pb-24 flex items-center justify-center bg-slate-50">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#087E8B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Loading Build Calculator...
            </p>
          </div>
        </div>
      }
    >
      <BuildCalculatorContent />
    </Suspense>
  );
}

