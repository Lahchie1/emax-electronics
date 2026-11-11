import { DataService } from "@/lib/supabase/data-service";
import Link from "next/link";
import { Layers, Plus, ExternalLink } from "lucide-react";

export default async function AdminCategoriesPage() {
  const [categories, products] = await Promise.all([
    DataService.getCategories(),
    DataService.getAllProductsAdmin(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Category Architecture Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize products into intuitive energy, storage, and mobility taxonomies.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-glowTeal transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#122436] text-[10px] uppercase font-bold text-slate-400 border-b border-[#1e3a52]">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Category Name & Slug</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-center">Assigned Items</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a52]/60 font-medium">
              {categories.map((c) => {
                const count = products.filter((p) => p.category_id === c.id).length;
                return (
                  <tr key={c.id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      #{c.sort_order}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{c.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        /products?cat={c.slug}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">
                      {c.description}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-white">
                      {count}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/60 text-emerald-300">
                        Active
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/products?cat=${c.id}`}
                        target="_blank"
                        className="text-slate-400 hover:text-[#F2A541] inline-flex items-center gap-1"
                      >
                        <span>View</span>
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

