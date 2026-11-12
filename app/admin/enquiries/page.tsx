import { DataService } from "@/lib/supabase/data-service";
import { MessageSquare, Inbox } from "lucide-react";
import { AuditLog } from "@/lib/types";

export default async function AdminEnquiriesPage() {
  // Load enquiry events from Supabase audit log (WhatsApp click events)
  let events: AuditLog[] = [];

  try {
    const logs = await DataService.getAuditLogs();
    // Filter for enquiry-type events (whatsapp clicks, sizing requests)
    events = logs.filter((l) =>
      l.action?.toLowerCase().includes("whatsapp") ||
      l.action?.toLowerCase().includes("enquiry") ||
      l.action?.toLowerCase().includes("click") ||
      l.entity_type?.toLowerCase().includes("enquiry")
    );
  } catch {
    // Supabase not configured — show empty state
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Enquiries &amp; Funnel Events
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track user-initiated WhatsApp clicks, sizing handoffs, and customer interaction telemetry from live site activity.
          </p>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#122436] flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-7 h-7 text-slate-500" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">No enquiry events recorded yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Enquiry events are captured when visitors click WhatsApp buttons or submit sizing requests on the live website. They will appear here once activity is logged.
          </p>
        </div>
      ) : (
        <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#122436] text-[10px] uppercase font-bold text-slate-400 border-b border-[#1e3a52]">
                <tr>
                  <th className="py-3 px-4">Event Type</th>
                  <th className="py-3 px-4">Subject / Context</th>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e3a52]/60 font-medium">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[#F2A541] text-[11px] font-bold">
                        {e.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {e.entity_type}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {e.entity_id}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {new Date(e.created_at).toLocaleString("en-NG", {
                        timeZone: "Africa/Lagos",
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
