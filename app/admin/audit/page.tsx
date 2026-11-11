import { DataService } from "@/lib/supabase/data-service";
import { History, ShieldCheck } from "lucide-react";

export default async function AdminAuditPage() {
  const logs = await DataService.getAuditLogs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Immutable Audit Trail
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-resistant append-only logging of stock movements, price changes, and publishing actions.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/60">
          <ShieldCheck className="w-4 h-4" />
          <span>PostgreSQL Append-Only Verification</span>
        </div>
      </div>

      <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#122436] text-[10px] uppercase font-bold text-slate-400 border-b border-[#1e3a52]">
              <tr>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity Type</th>
                <th className="py-3 px-4">Entity Reference</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Details / Mutations</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a52]/60 font-medium">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#F2A541]">
                    {l.action}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {l.entity_type}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {l.entity_id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {l.actor_email}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 max-w-xs truncate">
                    {JSON.stringify(l.after_json || l.before_json || {})}
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-400 font-mono text-[11px]">
                    {new Date(l.created_at).toLocaleString()}
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

