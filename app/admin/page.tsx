import { DataService } from "@/lib/supabase/data-service";
import Link from "next/link";
import { 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Layers, 
  Image as ImageIcon, 
  FileText, 
  ArrowUpRight 
} from "lucide-react";
import { formatCurrency, getStockStatusDisplay } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [products, categories, auditLogs] = await Promise.all([
    DataService.getAllProductsAdmin(),
    DataService.getCategories(),
    DataService.getAuditLogs(),
  ]);

  const publishedCount = products.filter((p) => p.status === 'published').length;
  const draftCount = products.filter((p) => p.status === 'draft').length;
  const alertStockCount = products.filter(
    (p) => p.stock?.status === 'low_stock' || p.stock?.status === 'contact_to_confirm' || p.stock?.status === 'out_of_stock'
  ).length;

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Administrative CMS Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time operational summary of catalogue inventory, stock alerts, and audit logs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-glowTeal transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0c141c] p-5 rounded-2xl border border-[#1e3a52]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Published Products</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{publishedCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Active on public catalogue</div>
        </div>

        <div className="bg-[#0c141c] p-5 rounded-2xl border border-[#1e3a52]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Draft / Staged</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{draftCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Unpublished items</div>
        </div>

        <div className="bg-[#0c141c] p-5 rounded-2xl border border-[#1e3a52]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Stock Review Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400 mt-2">{alertStockCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Contact to confirm or low</div>
        </div>

        <div className="bg-[#0c141c] p-5 rounded-2xl border border-[#1e3a52]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Categories</span>
            <Layers className="w-4 h-4 text-[#087e8b]" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{categories.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Active architectural trees</div>
        </div>
      </div>

      {/* 2-Column: Product Stock Status & Recent Audit Activity */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Products List (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0c141c] rounded-2xl border border-[#1e3a52] p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#1e3a52]">
            <h2 className="font-extrabold text-sm text-white">Catalogue & Stock Overview</h2>
            <Link href="/admin/products" className="text-xs font-semibold text-[#F2A541] hover:underline">
              Manage All Products →
            </Link>
          </div>

          <div className="divide-y divide-[#1e3a52]/60">
            {products.slice(0, 5).map((p) => {
              const stockInfo = getStockStatusDisplay(p.stock?.status || 'contact_to_confirm');
              return (
                <div key={p.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="font-bold text-white hover:text-[#F2A541] transition">
                      {p.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      SKU: {p.sku || 'N/A'} • {formatCurrency(p.price_minor)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${stockInfo.badgeClass}`}>
                      {stockInfo.label}
                    </span>
                    <Link
                      href={`/admin/products`}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit Log (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0c141c] rounded-2xl border border-[#1e3a52] p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#1e3a52]">
            <h2 className="font-extrabold text-sm text-white">System Audit Log</h2>
            <Link href="/admin/audit" className="text-xs font-semibold text-[#F2A541] hover:underline">
              View Trail →
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-[#122436] border border-[#1e3a52] text-xs">
                <div className="flex items-center justify-between text-[10px] font-semibold">
                  <span className="text-[#F2A541] font-mono">{log.action}</span>
                  <span className="text-slate-400">
                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-white font-medium mt-1">
                  {log.entity_type}: <span className="font-mono text-slate-300">{log.entity_id}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Actor: {log.actor_email}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

