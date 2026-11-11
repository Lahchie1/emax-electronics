import { FileText, Edit3, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminContentPage() {
  const pages = [
    {
      id: "p-home",
      title: "Home Page (Hero, Metrics & Protocol)",
      slug: "/",
      sectionsCount: 6,
      status: "Published",
      lastUpdated: "Today, 10:30 AM",
      publishedBy: "admin@emaxelectronics.ng",
    },
    {
      id: "p-products",
      title: "Products & Shop Catalogue",
      slug: "/products",
      sectionsCount: 3,
      status: "Published",
      lastUpdated: "Today, 09:15 AM",
      publishedBy: "admin@emaxelectronics.ng",
    },
    {
      id: "p-build",
      title: "Build Calculator (Battery & Solar)",
      slug: "/build-calculator",
      sectionsCount: 4,
      status: "Published",
      lastUpdated: "Yesterday, 4:00 PM",
      publishedBy: "admin@emaxelectronics.ng",
    },
    {
      id: "p-ebikes",
      title: "Urban E-Bikes Showcase",
      slug: "/ebikes",
      sectionsCount: 4,
      status: "Published",
      lastUpdated: "Today, 08:45 AM",
      publishedBy: "admin@emaxelectronics.ng",
    },
    {
      id: "p-about",
      title: "About Us (Mission & Standards)",
      slug: "/about-us",
      sectionsCount: 4,
      status: "Published",
      lastUpdated: "Today, 11:30 AM",
      publishedBy: "admin@emaxelectronics.ng",
    },
    {
      id: "p-contact",
      title: "Contact Desk & Ikeja Hub",
      slug: "/contact",
      sectionsCount: 3,
      status: "Published",
      lastUpdated: "Today, 11:30 AM",
      publishedBy: "admin@emaxelectronics.ng",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            CMS Content & Page Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Structured section editing for headlines, marketing banners, and engineering disclosures.
          </p>
        </div>
      </div>

      <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#122436] text-[10px] uppercase font-bold text-slate-400 border-b border-[#1e3a52]">
              <tr>
                <th className="py-3 px-4">Page Title</th>
                <th className="py-3 px-4">Route Path</th>
                <th className="py-3 px-4">Sections</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a52]/60 font-medium">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4 font-bold text-white">
                    {p.title}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {p.slug}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {p.sectionsCount} Sections
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/60 text-emerald-300">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    <div>{p.lastUpdated}</div>
                    <div className="text-[10px] text-slate-500">{p.publishedBy}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-3">
                    <Link
                      href={p.slug}
                      target="_blank"
                      className="text-slate-400 hover:text-[#F2A541] inline-flex items-center gap-1"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
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

