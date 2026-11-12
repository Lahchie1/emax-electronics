"use client";

import { useState, useEffect } from "react";
import { FileText, Edit3, CheckCircle2, ExternalLink, X, Save, Sparkles, Check, Loader2 } from "lucide-react";
import Link from "next/link";

interface PageItem {
  id: string;
  title: string;
  slug: string;
  sectionsCount: number;
  status: string;
  lastUpdated: string;
  publishedBy: string;
  fields: { key: string; label: string; type: "input" | "textarea"; placeholder?: string }[];
}

const PAGES_SCHEMA: PageItem[] = [
  {
    id: "p-home",
    title: "Home Page (Hero, Metrics & Protocol)",
    slug: "/",
    sectionsCount: 6,
    status: "Published",
    lastUpdated: "Today, 10:30 AM",
    publishedBy: "admin@emaxelectronics.ng",
    fields: [
      { key: "heroSlide1Headline", label: "Slide 1 Headline (E-Mobility)", type: "input" },
      { key: "heroSlide1Subhead", label: "Slide 1 Subtext", type: "textarea" },
      { key: "heroSlide2Headline", label: "Slide 2 Headline (Lithium Packs)", type: "input" },
      { key: "heroSlide2Subhead", label: "Slide 2 Subtext", type: "textarea" },
      { key: "heroSlide3Headline", label: "Slide 3 Headline (BMS & Balancers)", type: "input" },
      { key: "heroSlide3Subhead", label: "Slide 3 Subtext", type: "textarea" },
      { key: "announcementBadge", label: "Top Announcement Pill Badge", type: "input" },
    ],
  },
  {
    id: "p-products",
    title: "Products & Shop Catalogue",
    slug: "/products",
    sectionsCount: 3,
    status: "Published",
    lastUpdated: "Today, 09:15 AM",
    publishedBy: "admin@emaxelectronics.ng",
    fields: [
      { key: "heroBadge", label: "Hero Badge", type: "input" },
      { key: "heroHeadline", label: "Hero Headline", type: "input" },
      { key: "heroSubhead", label: "Hero Subtext & Guarantee", type: "textarea" },
    ],
  },
  {
    id: "p-build",
    title: "Build Calculator (Battery & Solar)",
    slug: "/build-calculator",
    sectionsCount: 4,
    status: "Published",
    lastUpdated: "Yesterday, 4:00 PM",
    publishedBy: "admin@emaxelectronics.ng",
    fields: [
      { key: "heroBadge", label: "Hero Badge", type: "input" },
      { key: "heroHeadline", label: "Hero Headline", type: "input" },
      { key: "heroSubhead", label: "Hero Description & Guidance", type: "textarea" },
    ],
  },
  {
    id: "p-ebikes",
    title: "Urban E-Bikes Showcase",
    slug: "/ebikes",
    sectionsCount: 4,
    status: "Published",
    lastUpdated: "Today, 08:45 AM",
    publishedBy: "admin@emaxelectronics.ng",
    fields: [
      { key: "heroBadge", label: "Hero Badge", type: "input" },
      { key: "heroHeadline", label: "Hero Headline", type: "input" },
      { key: "heroSubhead", label: "Hero Subtext", type: "textarea" },
    ],
  },
  {
    id: "p-about",
    title: "About Us (Mission & Standards)",
    slug: "/about-us",
    sectionsCount: 4,
    status: "Published",
    lastUpdated: "Today, 11:30 AM",
    publishedBy: "admin@emaxelectronics.ng",
    fields: [
      { key: "heroBadge", label: "Hero Badge", type: "input" },
      { key: "heroHeadline", label: "Hero Headline", type: "input" },
      { key: "heroSubhead", label: "Mission Statement", type: "textarea" },
    ],
  },
  {
    id: "p-contact",
    title: "Contact Desk & Ikeja Hub",
    slug: "/contact",
    sectionsCount: 3,
    status: "Published",
    lastUpdated: "Today, 11:30 AM",
    publishedBy: "admin@emaxelectronics.ng",
    fields: [
      { key: "heroBadge", label: "Hero Badge", type: "input" },
      { key: "heroHeadline", label: "Hero Headline", type: "input" },
      { key: "heroSubhead", label: "Support & Hours Subtext", type: "textarea" },
    ],
  },
];

export default function AdminContentPage() {
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [updatedTimes, setUpdatedTimes] = useState<Record<string, string>>({});

  // Load content when modal opens
  useEffect(() => {
    if (!editingPage) return;

    const loadContent = async () => {
      try {
        const res = await fetch(`/api/admin/content?pageId=${editingPage.id}`);
        const data = await res.json();
        if (data.content) {
          setFormData(data.content);
        }
      } catch (err) {
        console.error("Failed to load page content:", err);
      }
    };

    loadContent();
  }, [editingPage]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: editingPage.id,
          content: formData,
          actorEmail: "admin@emaxelectronics.ng",
        }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setUpdatedTimes((prev) => ({
          ...prev,
          [editingPage.id]: "Just now",
        }));
        setTimeout(() => {
          setSavedSuccess(false);
        }, 2500);
      }
    } catch (err) {
      console.error("Failed to save content:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            CMS Content & Page Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit live page copy, slide headlines, and marketing disclosures across the website.
          </p>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#122436] text-[10px] uppercase font-bold text-slate-400 border-b border-[#1e3a52]">
              <tr>
                <th className="py-3 px-4">Page Title</th>
                <th className="py-3 px-4">Route Path</th>
                <th className="py-3 px-4">Editable Fields</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a52]/60 font-medium">
              {PAGES_SCHEMA.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#087E8B]" />
                    <span>{p.title}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {p.slug}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold">
                      {p.fields.length} Fields
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/60 text-emerald-300">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    <div>{updatedTimes[p.id] || p.lastUpdated}</div>
                    <div className="text-[10px] text-slate-500">{p.publishedBy}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-3">
                    <button
                      type="button"
                      onClick={() => setEditingPage(p)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#087E8B] hover:bg-[#066570] text-white font-bold text-xs transition shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Content</span>
                    </button>
                    <Link
                      href={p.slug}
                      target="_blank"
                      className="text-slate-400 hover:text-[#F2A541] inline-flex items-center gap-1"
                      title="View Live Page"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over / Modal Content Editor */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0c141c] border border-[#1e3a52] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#1e3a52]">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#F2A541] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive CMS Editor</span>
                </div>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  {editingPage.title}
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Route: {editingPage.slug}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingPage(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editing Form */}
            <form onSubmit={handleSave} className="space-y-4">
              {editingPage.fields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[#1e3a52] bg-[#122436] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#087E8B] focus:outline-none leading-relaxed"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[#1e3a52] bg-[#122436] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#087E8B] focus:outline-none"
                    />
                  )}
                </div>
              ))}

              {/* Status and Action Buttons */}
              <div className="pt-4 border-t border-[#1e3a52] flex items-center justify-between">
                <div>
                  {savedSuccess && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-xl animate-fadeIn">
                      <Check className="w-4 h-4" />
                      <span>Changes Published Successfully!</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingPage(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#087E8B] hover:bg-[#066570] text-white text-xs font-bold shadow-glowTeal transition disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save & Publish Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
