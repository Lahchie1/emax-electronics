import { Check, X, ShieldAlert, ShieldCheck } from "lucide-react";

export default function VerificationProtocol() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto" id="protocol">
      <div className="text-center max-w-2xl mx-auto mb-14 reveal-on-scroll">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#087e8b] bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
          The Engineering Reality
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123047] mt-3 tracking-tight">
          Nigerian Open Market vs Emax Verified Protocol
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-3 font-medium">
          Unverified open-market lithium cells pose silent capacity loss, thermal imbalance, and costly inverter shut-downs. Here is how Emax protects your capital.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* Open Market Card */}
        <div className="bg-rose-50/50 rounded-3xl p-7 border border-rose-200/80 shadow-sm relative overflow-hidden reveal-fade-left">
          <div className="flex items-center justify-between pb-5 border-b border-rose-200/60">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-lg text-rose-950">Generic Open Market Cells</h3>
              </div>
              <p className="text-xs text-rose-700 font-medium mt-0.5">Alaba & Unverified Online Sellers</p>
            </div>
            <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-base">✕</span>
          </div>

          <ul className="space-y-4 text-xs sm:text-sm text-slate-700 mt-6">
            <li className="flex items-start gap-3">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>Re-wrapped B/C Grade:</strong> Automotive scrap cells re-sleeved with counterfeit Grade-A QR stickers.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>Unmatched Internal Impedance:</strong> Cells drift rapidly within 6 months, causing inverter low-voltage cut-offs.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>Passive 30mA Balancing:</strong> Inadequate bleeding current unable to balance heavy 200Ah+ banks under peak solar loads.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-rose-500 font-bold">✕</span>
              <span><strong>No Bench Verification:</strong> Zero test reports, no calibrated internal resistance logs, and no pre-purchase inspection.</span>
            </li>
          </ul>
        </div>

        {/* Emax Verified Card */}
        <div className="bg-white rounded-3xl p-7 border-2 border-emerald-500/40 shadow-xl relative overflow-hidden reveal-fade-right">
          <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-lg text-[#123047]">Emax Verified Engineering Protocol</h3>
              </div>
              <p className="text-xs text-emerald-600 font-semibold mt-0.5">Every Single Batch Bench-Tested in Ikeja</p>
            </div>
            <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">✓</span>
          </div>

          <ul className="space-y-4 text-xs sm:text-sm text-slate-700 mt-6">
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Laser QR Verification & YR1035+ Meter:</strong> Factory laser codes verified, AC internal resistance tested (&lt;0.22mΩ) and signed.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Smart BMS Active Balancing (1A - 2A):</strong> Constant active energy transfer between high and low cells prevents thermal stress.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Real-time Bluetooth Telemetry:</strong> Live millivolt delta, dual temp probes, and state-of-health tracking on your smartphone.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>In-Person Bench Inspection:</strong> Bring your multimeter or book an in-person bench verification at our Ikeja dispatch hub.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

