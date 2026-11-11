"use client";

import { useState } from "react";
import { Settings, Save, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";

export default function AdminSettingsPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("2348000000000");
  const [warehouseAddress, setWarehouseAddress] = useState("Ikeja Technology Hub, Lagos State, Nigeria");
  const [operatingHours, setOperatingHours] = useState("Monday – Saturday: 8:30 AM – 6:00 PM WAT");
  const [defaultCurrency, setDefaultCurrency] = useState("NGN (₦)");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            System & Technical Configuration
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global site settings, WhatsApp routing numbers, and operational parameters.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* WhatsApp Channel Config */}
        <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1e3a52]">
            <MessageCircle className="w-4 h-4 text-[#087E8B]" />
            <h2 className="text-sm font-extrabold text-white">WhatsApp Direct Desk Configuration</h2>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Official WhatsApp Phone Number (International E.164 format without +)
            </label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full text-xs font-mono font-semibold px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none focus:border-[#087e8b]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              All public product enquiry buttons, battery sizers, and contact links route through this central setting.
            </p>
          </div>
        </div>

        {/* Lagos Warehouse & Operations */}
        <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-white">Physical Location & Business Hours</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Warehouse / Dispatch Store Address
              </label>
              <input
                type="text"
                required
                value={warehouseAddress}
                onChange={(e) => setWarehouseAddress(e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Service & Dispatch Hours
              </label>
              <input
                type="text"
                required
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Currency & Financial Policy */}
        <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-white">Catalogue Currency & Stock Policies</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Default Currency
              </label>
              <input
                type="text"
                disabled
                value={defaultCurrency}
                className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-slate-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Stale Stock Policy
              </label>
              <div className="p-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-xs text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Defaults unverified items to &quot;Contact to Confirm&quot;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          {saved ? (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings updated successfully!</span>
            </span>
          ) : (
            <span />
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-glowTeal transition"
          >
            <Save className="w-4 h-4" />
            <span>Save System Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

