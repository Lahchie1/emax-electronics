import { DataService } from "@/lib/supabase/data-service";
import Link from "next/link";
import { Plus, Package, ExternalLink } from "lucide-react";
import { formatCurrency, getStockStatusDisplay } from "@/lib/utils";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    DataService.getAllProductsAdmin(),
    DataService.getCategories(),
  ]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Products & Inventory Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain catalogue pricing, stock status, and structured specifications.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-glowTeal transition"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Product</span>
        </Link>
      </div>

      {/* Products Table Card */}
      <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] overflow-hidden">
        <div className="p-4 border-b border-[#1e3a52] flex items-center justify-between text-xs text-slate-400 font-semibold">
          <span>Total Catalogue Items: {products.length}</span>
          <span>Verified Stock Policy: Stale defaults to &quot;Contact to Confirm&quot;</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#122436] text-[10px] uppercase font-bold text-slate-400 border-b border-[#1e3a52]">
              <tr>
                <th className="py-3 px-4">Product Name & SKU</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Price (NGN)</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Publication</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a52]/60 font-medium">
              {products.map((p) => {
                const stockInfo = getStockStatusDisplay(p.stock?.status || 'contact_to_confirm');
                return (
                  <tr key={p.id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        SKU: {p.sku || 'N/A'} • {p.brand}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize font-mono text-slate-300">
                        {p.product_type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {formatCurrency(p.price_minor)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${stockInfo.badgeClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stockInfo.dotClass}`} />
                        {stockInfo.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        p.status === 'published' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-3">
                      <Link
                        href={`/products/${p.slug}`}
                        target="_blank"
                        className="text-slate-400 hover:text-[#F2A541] inline-flex items-center gap-1"
                        title="View Live Public Preview"
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

