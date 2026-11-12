"use client";

import { useState, useEffect } from "react";
import { FileText, Edit3, ExternalLink, X, Save, Sparkles, Check, Loader2 } from "lucide-react";
import Link from "next/link";

interface PageField {
  key: string;
  label: string;
  type: "input" | "textarea";
  hint?: string;
}

interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  description: string;
  fields: PageField[];
}

const PAGES_SCHEMA: PageItem[] = [
  // ── HOME PAGE ─────────────────────────────────────────────────────────
  {
    id: "p-home",
    title: "Home Page",
    slug: "/",
    status: "Published",
    description: "Hero slides, stats bar, announcement pill, and FAQ section",
    fields: [
      // Hero Slide 1
      { key: "heroSlide1Badge", label: "Slide 1 — Badge Label", type: "input", hint: "e.g. Urban E-Mobility" },
      { key: "heroSlide1HeadlineMain", label: "Slide 1 — Headline (Main)", type: "input", hint: "e.g. Ride Smarter," },
      { key: "heroSlide1HeadlineAccent", label: "Slide 1 — Headline (Accent / Coloured)", type: "input", hint: "e.g. Move Smarter." },
      { key: "heroSlide1Subhead", label: "Slide 1 — Subtext", type: "textarea" },
      { key: "heroSlide1PrimaryCta", label: "Slide 1 — Primary CTA Text", type: "input", hint: "e.g. Shop E-Bikes" },
      { key: "heroSlide1SecondaryCta", label: "Slide 1 — Secondary CTA Text", type: "input", hint: "e.g. Learn More" },
      // Hero Slide 2
      { key: "heroSlide2Badge", label: "Slide 2 — Badge Label", type: "input", hint: "e.g. Lithium Storage Engineering" },
      { key: "heroSlide2HeadlineMain", label: "Slide 2 — Headline (Main)", type: "input" },
      { key: "heroSlide2HeadlineAccent", label: "Slide 2 — Headline (Accent)", type: "input" },
      { key: "heroSlide2Subhead", label: "Slide 2 — Subtext", type: "textarea" },
      { key: "heroSlide2PrimaryCta", label: "Slide 2 — Primary CTA Text", type: "input" },
      { key: "heroSlide2SecondaryCta", label: "Slide 2 — Secondary CTA Text", type: "input" },
      // Hero Slide 3
      { key: "heroSlide3Badge", label: "Slide 3 — Badge Label", type: "input", hint: "e.g. Smart Active Balance BMS" },
      { key: "heroSlide3HeadlineMain", label: "Slide 3 — Headline (Main)", type: "input" },
      { key: "heroSlide3HeadlineAccent", label: "Slide 3 — Headline (Accent)", type: "input" },
      { key: "heroSlide3Subhead", label: "Slide 3 — Subtext", type: "textarea" },
      { key: "heroSlide3PrimaryCta", label: "Slide 3 — Primary CTA Text", type: "input" },
      { key: "heroSlide3SecondaryCta", label: "Slide 3 — Secondary CTA Text", type: "input" },
      // Stats Bar
      { key: "statPacksBuilt", label: "Stats Bar — Packs Built Count", type: "input", hint: "e.g. 450+" },
      { key: "statIrStandard", label: "Stats Bar — IR Test Standard", type: "input", hint: "e.g. < 0.22 mΩ" },
      { key: "statCycleLife", label: "Stats Bar — Cycle Life", type: "input", hint: "e.g. 6,000+" },
      { key: "statLagosStock", label: "Stats Bar — Lagos Stock Label", type: "input", hint: "e.g. 100%" },
      // FAQ
      { key: "faq1Question", label: "FAQ 1 — Question", type: "input" },
      { key: "faq1Answer", label: "FAQ 1 — Answer", type: "textarea" },
      { key: "faq2Question", label: "FAQ 2 — Question", type: "input" },
      { key: "faq2Answer", label: "FAQ 2 — Answer", type: "textarea" },
      { key: "faq3Question", label: "FAQ 3 — Question", type: "input" },
      { key: "faq3Answer", label: "FAQ 3 — Answer", type: "textarea" },
      { key: "faq4Question", label: "FAQ 4 — Question", type: "input" },
      { key: "faq4Answer", label: "FAQ 4 — Answer", type: "textarea" },
    ],
  },

  // ── PRODUCTS PAGE ─────────────────────────────────────────────────────
  {
    id: "p-products",
    title: "Products & Shop Catalogue",
    slug: "/products",
    status: "Published",
    description: "Hero section, search placeholder, and category tag line",
    fields: [
      { key: "heroBadge", label: "Hero Badge", type: "input", hint: "e.g. Verified Inventory" },
      { key: "heroHeadline", label: "Hero Headline", type: "input" },
      { key: "heroSubhead", label: "Hero Subtext & Guarantee", type: "textarea" },
      { key: "searchPlaceholder", label: "Search Bar Placeholder Text", type: "input", hint: "e.g. Search by cell model, BMS, brand, or SKU..." },
      { key: "emptyStateTitle", label: "Empty Search State — Title", type: "input", hint: "e.g. No matching products found" },
      { key: "emptyStateBody", label: "Empty Search State — Body", type: "textarea" },
    ],
  },

  // ── BUILD CALCULATOR ─────────────────────────────────────────────────
  {
    id: "p-build",
    title: "Build Calculator (Battery & Solar)",
    slug: "/build-calculator",
    status: "Published",
    description: "Calculator page hero, tab labels, result copy, and CTA text",
    fields: [
      { key: "heroBadge", label: "Hero Badge", type: "input", hint: "e.g. Engineering Sizing Tools" },
      { key: "heroHeadline", label: "Hero Headline", type: "input" },
      { key: "heroSubhead", label: "Hero Description & Guidance", type: "textarea" },
      { key: "batteryTabLabel", label: "Battery Tab Label", type: "input", hint: "e.g. Lithium Pack Builder" },
      { key: "solarTabLabel", label: "Solar Tab Label", type: "input", hint: "e.g. Solar Generator Sizer" },
      { key: "batteryCtaText", label: "Battery Result CTA Text", type: "input", hint: "e.g. Send to WhatsApp Tech Desk" },
      { key: "solarCtaText", label: "Solar Result CTA Text", type: "input", hint: "e.g. Get Solar Sizing Quote" },
      { key: "disclaimerText", label: "Calculator Disclaimer Notice", type: "textarea", hint: "Safety and accuracy disclaimer shown below results" },
    ],
  },

  // ── E-BIKES PAGE ─────────────────────────────────────────────────────
  {
    id: "p-ebikes",
    title: "Urban E-Bikes Showcase",
    slug: "/ebikes",
    status: "Published",
    description: "E-bikes page hero, feature highlights, and specs section",
    fields: [
      { key: "heroBadge", label: "Hero Badge", type: "input", hint: "e.g. E-Bikes" },
      { key: "heroHeadline", label: "Hero Headline", type: "input" },
      { key: "heroSubhead", label: "Hero Subtext", type: "textarea" },
      { key: "featureHighlightsTitle", label: "Features Section Title", type: "input", hint: "e.g. Why Choose Emax VeloFlow?" },
      { key: "feature1Title", label: "Feature 1 — Title", type: "input" },
      { key: "feature1Desc", label: "Feature 1 — Description", type: "textarea" },
      { key: "feature2Title", label: "Feature 2 — Title", type: "input" },
      { key: "feature2Desc", label: "Feature 2 — Description", type: "textarea" },
      { key: "feature3Title", label: "Feature 3 — Title", type: "input" },
      { key: "feature3Desc", label: "Feature 3 — Description", type: "textarea" },
      { key: "specsHeading", label: "Tech Specs Section Title", type: "input", hint: "e.g. VeloFlow 750W Technical Specifications" },
      { key: "bikeCtaText", label: "Primary CTA Button Text", type: "input", hint: "e.g. Order Your VeloFlow Today" },
    ],
  },

  // ── ABOUT US ─────────────────────────────────────────────────────────
  {
    id: "p-about",
    title: "About Us (Mission & Standards)",
    slug: "/about-us",
    status: "Published",
    description: "Mission statement, founding story, pillars, and 4-stage protocol",
    fields: [
      { key: "heroBadge", label: "Hero Badge", type: "input", hint: "e.g. About Us" },
      { key: "heroHeadline", label: "Hero Headline", type: "input" },
      { key: "heroSubhead", label: "Hero Mission Statement", type: "textarea" },
      { key: "storyHeading", label: "Founding Story — Section Heading", type: "input", hint: "e.g. Why Emax Exists: Eliminating Counterfeit Energy Components" },
      { key: "storyParagraph1", label: "Founding Story — Paragraph 1", type: "textarea" },
      { key: "storyParagraph2", label: "Founding Story — Paragraph 2", type: "textarea" },
      { key: "servingCardHeading", label: "\"Who We Serve\" Card — Heading", type: "input" },
      { key: "servingCardBody", label: "\"Who We Serve\" Card — Body Text", type: "textarea" },
      { key: "servingCardLocation", label: "\"Who We Serve\" Card — Location Text", type: "input", hint: "e.g. Ikeja, Lagos State" },
      { key: "pillarsHeading", label: "Engineering Pillars — Section Heading", type: "input" },
      { key: "pillar1Title", label: "Pillar 1 — Title", type: "input" },
      { key: "pillar1Desc", label: "Pillar 1 — Description", type: "textarea" },
      { key: "pillar2Title", label: "Pillar 2 — Title", type: "input" },
      { key: "pillar2Desc", label: "Pillar 2 — Description", type: "textarea" },
      { key: "pillar3Title", label: "Pillar 3 — Title", type: "input" },
      { key: "pillar3Desc", label: "Pillar 3 — Description", type: "textarea" },
      { key: "pillar4Title", label: "Pillar 4 — Title", type: "input" },
      { key: "pillar4Desc", label: "Pillar 4 — Description", type: "textarea" },
      { key: "protocolHeading", label: "4-Stage Protocol — Section Heading", type: "input" },
      { key: "protocol1Title", label: "Protocol Step 1 — Title", type: "input" },
      { key: "protocol1Desc", label: "Protocol Step 1 — Description", type: "textarea" },
      { key: "protocol2Title", label: "Protocol Step 2 — Title", type: "input" },
      { key: "protocol2Desc", label: "Protocol Step 2 — Description", type: "textarea" },
      { key: "protocol3Title", label: "Protocol Step 3 — Title", type: "input" },
      { key: "protocol3Desc", label: "Protocol Step 3 — Description", type: "textarea" },
      { key: "protocol4Title", label: "Protocol Step 4 — Title", type: "input" },
      { key: "protocol4Desc", label: "Protocol Step 4 — Description", type: "textarea" },
      { key: "ctaHeading", label: "Bottom CTA — Heading", type: "input" },
      { key: "ctaSubtext", label: "Bottom CTA — Subtext", type: "textarea" },
    ],
  },

  // ── CONTACT PAGE ─────────────────────────────────────────────────────
  {
    id: "p-contact",
    title: "Contact Desk & Ikeja Hub",
    slug: "/contact",
    status: "Published",
    description: "Contact info cards, operating hours, FAQ, and form labels",
    fields: [
      { key: "heroBadge", label: "Hero Badge", type: "input", hint: "e.g. Contact Desk" },
      { key: "heroHeadline", label: "Hero Headline", type: "input" },
      { key: "heroSubhead", label: "Hero Subtext & Hours", type: "textarea" },
      { key: "whatsappCardTitle", label: "WhatsApp Card — Title", type: "input", hint: "e.g. Official WhatsApp Desk" },
      { key: "whatsappCardNumber", label: "WhatsApp Card — Displayed Number", type: "input", hint: "e.g. +234 903 835 9288" },
      { key: "whatsappCardSubtext", label: "WhatsApp Card — Subtext", type: "textarea" },
      { key: "addressCardTitle", label: "Address Card — Title", type: "input" },
      { key: "addressCardPrimary", label: "Address Card — Primary Line", type: "input", hint: "e.g. Ikeja Technology Hub" },
      { key: "addressCardSecondary", label: "Address Card — Secondary Line", type: "input", hint: "e.g. Lagos State, Nigeria" },
      { key: "emailCardTitle", label: "Email Card — Title", type: "input" },
      { key: "emailCardAddress", label: "Email Card — Email Address", type: "input" },
      { key: "emailCardSubtext", label: "Email Card — Subtext", type: "textarea" },
      { key: "hoursCardTitle", label: "Hours Card — Title", type: "input" },
      { key: "hoursCardLine1", label: "Hours Card — Line 1 (Weekdays)", type: "input", hint: "e.g. Monday – Saturday: 8:30 AM – 6:00 PM WAT" },
      { key: "hoursCardLine2", label: "Hours Card — Line 2 (Sunday / Holiday)", type: "input", hint: "e.g. Sunday & Public Holidays: Closed" },
      { key: "formHeading", label: "Contact Form — Section Heading", type: "input", hint: "e.g. Send a WhatsApp Enquiry" },
      { key: "formNameLabel", label: "Form — Your Name Field Label", type: "input" },
      { key: "formCategoryLabel", label: "Form — Enquiry Category Label", type: "input" },
      { key: "formMessageLabel", label: "Form — Message Field Label", type: "input" },
      { key: "formSubmitText", label: "Form — Submit Button Text", type: "input", hint: "e.g. Send on WhatsApp" },
      { key: "formSuccessMessage", label: "Form — Success Message", type: "textarea", hint: "Shown after WhatsApp is opened" },
    ],
  },

  // ── SETTINGS ─────────────────────────────────────────────────────────
  {
    id: "p-settings",
    title: "Global Site Settings",
    slug: "/admin/settings",
    status: "Published",
    description: "WhatsApp number, address, hours, and site-wide config",
    fields: [
      { key: "whatsappNumber", label: "WhatsApp Number (digits only, with country code)", type: "input", hint: "e.g. 2349038359288" },
      { key: "businessAddress", label: "Business Address", type: "input" },
      { key: "supportEmail", label: "Support Email Address", type: "input" },
      { key: "supportHours", label: "Support Hours", type: "input" },
      { key: "siteTagline", label: "Site Tagline (used in meta & footer)", type: "input" },
      { key: "footerNote", label: "Footer Copyright Note", type: "input", hint: "e.g. © 2026 Emax Electronics Enterprises. All rights reserved." },
      { key: "announcementBadge", label: "Top Announcement Pill Badge", type: "input", hint: "Appears at top of hero — leave blank to hide" },
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
          [editingPage.id]: new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" }),
        }));
        setTimeout(() => setSavedSuccess(false), 2500);
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
            CMS Content &amp; Page Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit live page copy, hero headlines, section text, and marketing disclosures across the entire website.
          </p>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#122436] text-[10px] uppercase font-bold text-slate-400 border-b border-[#1e3a52]">
              <tr>
                <th className="py-3 px-4">Page</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Sections Covered</th>
                <th className="py-3 px-4">Fields</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Saved</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a52]/60 font-medium">
              {PAGES_SCHEMA.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#087E8B] flex-shrink-0" />
                      <div>
                        <div className="font-bold text-white">{p.title}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{p.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{p.slug}</td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">{p.description}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold">
                      {p.fields.length} Fields
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/60 text-emerald-300">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    {updatedTimes[p.id] ?? "—"}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-3">
                    <button
                      type="button"
                      onClick={() => { setEditingPage(p); setFormData({}); }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#087E8B] hover:bg-[#066570] text-white font-bold text-xs transition shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    {p.slug !== "/admin/settings" && (
                      <Link
                        href={p.slug}
                        target="_blank"
                        className="text-slate-400 hover:text-[#F2A541] inline-flex items-center gap-1"
                        title="View Live Page"
                      >
                        <span>Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
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
                  <span>CMS Editor — {editingPage.fields.length} Fields</span>
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
                  {field.hint && (
                    <p className="text-[10px] text-slate-500 leading-relaxed">{field.hint}</p>
                  )}
                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={formData[field.key] ?? ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="w-full rounded-xl border border-[#1e3a52] bg-[#122436] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#087E8B] focus:outline-none leading-relaxed"
                    />
                  ) : (
                    <input
                      type="text"
                      value={formData[field.key] ?? ""}
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
                      <span>Changes Published!</span>
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
                        <span>Save &amp; Publish</span>
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
