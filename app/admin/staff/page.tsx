import { Users, Plus, ShieldCheck, Mail } from "lucide-react";

export default function AdminStaffPage() {
  const staff = [
    {
      id: "u-1",
      name: "Lead System Administrator",
      email: "admin@emaxelectronics.ng",
      role: "Administrator",
      permissions: "Full Read/Write, Publishing, Settings & Audit Logs",
      status: "Active",
      lastLogin: "Active Now",
    },
    {
      id: "u-2",
      name: "Ikeja Bench Technician",
      email: "technician@emaxelectronics.ng",
      role: "Catalog Editor",
      permissions: "Stock Updates, Cell Verification & Media Upload",
      status: "Active",
      lastLogin: "Today, 08:30 AM",
    },
    {
      id: "u-3",
      name: "Sales Desk Lead",
      email: "sales@emaxelectronics.ng",
      role: "Viewer / Sales Lead",
      permissions: "Catalogue Read-only, Enquiries & WhatsApp Funnel",
      status: "Active",
      lastLogin: "Yesterday, 06:12 PM",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Staff & Role-Based Access Control
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Administrator-controlled staff provisioning linked to Supabase Auth subjects.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-glowTeal transition"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Staff Member</span>
        </button>
      </div>

      <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#122436] text-[10px] uppercase font-bold text-slate-400 border-b border-[#1e3a52]">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Permissions Scope</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Last Session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a52]/60 font-medium">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{s.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3 h-3" />
                      <span>{s.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#F2A541]">
                    {s.role}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {s.permissions}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-900/60 text-emerald-300">
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-400 font-mono text-[11px]">
                    {s.lastLogin}
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

