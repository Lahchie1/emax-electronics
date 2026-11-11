import { MessageSquare, Phone, ArrowUpRight } from "lucide-react";

export default function AdminEnquiriesPage() {
  const events = [
    {
      id: "enq-1",
      type: "product_whatsapp_click",
      target: "EVE LF280K v3 280Ah LiFePO4 Cell",
      source: "/products/eve-lf280k-280ah-lifepo4-cell",
      timestamp: "Today, 11:04 AM",
      status: "Qualified Lead",
    },
    {
      id: "enq-2",
      type: "calculator_whatsapp_click",
      target: "48V 16S 280Ah Lithium Pack Sizing",
      source: "/build-calculator?tab=battery",
      timestamp: "Today, 10:48 AM",
      status: "Technical Audit Sent",
    },
    {
      id: "enq-3",
      type: "ebike_whatsapp_click",
      target: "Emax VeloFlow 750W E-Bike Test Ride",
      source: "/ebikes",
      timestamp: "Today, 09:32 AM",
      status: "Test Ride Booked",
    },
    {
      id: "enq-4",
      type: "calculator_whatsapp_click",
      target: "Solar Generator 3.5kVA Inverter Sizing",
      source: "/build-calculator?tab=solar",
      timestamp: "Yesterday, 05:15 PM",
      status: "Quote Requested",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Enquiries & Funnel Conversion Events
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track user-initiated WhatsApp clicks, sizing handoffs, and customer interaction telemetry.
          </p>
        </div>
      </div>

      <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#122436] text-[10px] uppercase font-bold text-slate-400 border-b border-[#1e3a52]">
              <tr>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Subject / Context Payload</th>
                <th className="py-3 px-4">Origin Path</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a52]/60 font-medium">
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[#F2A541] text-[11px] font-bold">
                      {e.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {e.target}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {e.source}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {e.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-900/60 text-blue-300 border border-blue-700/50">
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

