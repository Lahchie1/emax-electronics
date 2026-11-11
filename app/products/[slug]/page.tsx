import { DataService } from "@/lib/supabase/data-service";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, generateWhatsAppUrl, getStockStatusDisplay } from "@/lib/utils";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, AlertTriangle, Truck } from "lucide-react";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await DataService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const stockInfo = getStockStatusDisplay(product.stock?.status || 'contact_to_confirm');
  const whatsappUrl = generateWhatsAppUrl(
    `Hello Emax Enterprises Lagos Hub, I want to confirm availability and order: ${product.name} (SKU: ${product.sku || 'N/A'}, Price: ${formatCurrency(product.price_minor)})`
  );

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#087e8b] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products Catalogue</span>
          </Link>
        </div>

        {/* Product Overview Layout */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm grid lg:grid-cols-2 gap-10">
          {/* Left Column: Product Image Showcase */}
          <div>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-xs ${stockInfo.badgeClass}`}>
                  <span className={`w-2 h-2 rounded-full ${stockInfo.dotClass}`} />
                  {stockInfo.label}
                </span>
              </div>
            </div>

            {/* Verification Guarantee Box */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 text-xs text-emerald-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Emax Verified Engineering Guarantee:</strong>
                <p className="mt-0.5 text-emerald-800 leading-relaxed">
                  Every unit is batch-inspected at our Ikeja dispatch store. Laser QR code integrity and calibrated YR1035+ internal resistance measurements are guaranteed upon receipt.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Specs & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Product Type & Brand Tags */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#087e8b] bg-teal-50 px-2.5 py-0.5 rounded-full">
                  {product.brand || "Emax"}
                </span>
                {product.sku && (
                  <span className="text-[11px] font-mono text-slate-400">
                    SKU: {product.sku}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123047] tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price Banner */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400">
                    {product.price_mode === 'from' ? 'Starting From' : 'Unit Price'}
                  </span>
                  <div className="text-3xl font-extrabold text-[#123047] tracking-tight mt-0.5">
                    {formatCurrency(product.price_minor)}
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500 font-medium">
                  <div>Lagos Warehouse Dispatch</div>
                  <div className="text-[11px] text-emerald-600 font-bold">Tested & Ready</div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Technical Summary
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description || product.summary}
                </p>
              </div>

              {/* Specifications Table */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Structured Specifications
                  </h2>
                  <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                    {product.specifications.map((spec) => (
                      <div key={spec.id} className="grid grid-cols-2 p-3 bg-white hover:bg-slate-50 transition">
                        <span className="font-medium text-slate-500">{spec.label}</span>
                        <span className="font-bold text-[#123047] text-right">{spec.value_text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety & Warning notice */}
              <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Installation Note:</strong> Prismatic lithium cells must be assembled under appropriate mechanical compression and paired with dedicated Smart Active BMS fusing. Never short battery terminals.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-glowTeal transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Enquire & Order on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-center gap-6 text-[11px] font-semibold text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ikeja Store Pickup</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#087e8b]" />
                  <span>Insured Interstate Transit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

