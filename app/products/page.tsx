import { DataService } from "@/lib/supabase/data-service";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency, generateWhatsAppUrl, getStockStatusDisplay } from "@/lib/utils";
import { ArrowUpRight, Search, SlidersHorizontal, Package, ShieldCheck, Zap } from "lucide-react";
import PageHero from "@/components/PageHero";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const { cat, q } = await searchParams;
  const [categories, products, allProducts] = await Promise.all([
    DataService.getCategories(),
    DataService.getProducts(cat, q),
    DataService.getProducts(),
  ]);

  const activeCategory = categories.find((c) => c.id === cat);

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Hero */}
        <PageHero
          badge="Products"
          headline={
            <>
              Grade-A Components,{" "}
              <span className="text-[#F2A541]">Bench Verified.</span>
            </>
          }
          subtext={
            activeCategory?.description ||
            "Browse genuine LiFePO4 cells, Smart BMS boards, flexible busbars, hybrid inverters, and e-bikes — all batch-tested at our Ikeja dispatch hub."
          }
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: activeCategory ? activeCategory.name : "Catalogue" },
          ]}
          imageSrc="/images/page-heroes/products-hero.jpg"
          imageAlt="Emax Products — Grade-A LiFePO4 cells and e-bikes"
          chips={[
            {
              icon: <ShieldCheck className="w-4 h-4" />,
              label: "Bench Verified",
              sub: "YR1035+ Tested",
            },
            {
              icon: <Package className="w-4 h-4" />,
              label: "In-Stock Range",
              sub: "Ready to Ship",
            },
            {
              icon: <Zap className="w-4 h-4" />,
              label: "Grade-A Only",
              sub: "No B-Grade Sold",
            },
          ]}
        />

        {/* Search & Category Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-10 space-y-4 reveal-on-scroll">
          <form method="GET" action="/products" className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="q"
                defaultValue={q || ""}
                placeholder="Search by cell model (e.g. 280Ah, LF280K), BMS, brand, or SKU..."
                className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#123047] focus:outline-none transition"
              />
            </div>
            {cat && <input type="hidden" name="cat" value={cat} />}
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#123047] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <span>Search</span>
            </button>
            {(q || cat) && (
              <Link
                href="/products"
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition flex items-center justify-center"
              >
                Reset
              </Link>
            )}
          </form>

          {/* Category Filter Pills (Wrap to fit without horizontal scroll) */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <Link
              href="/products"
              className={`px-3.5 py-1.5 rounded-full font-semibold transition ${
                !cat
                  ? "bg-[#123047] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Items {!cat && `(${allProducts.length})`}
            </Link>
            {categories.map((c) => {
              const count = allProducts.filter((p) => p.category_id === c.id).length;
              const isActive = cat === c.id;
              return (
                <Link
                  key={c.id}
                  href={`/products?cat=${c.id}${q ? `&q=${q}` : ""}`}
                  className={`px-3.5 py-1.5 rounded-full font-semibold transition inline-flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#123047] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{c.name}</span>
                  <span
                    className={`text-[11px] font-bold ${
                      isActive ? "text-[#F2A541]" : "text-slate-400"
                    }`}
                  >
                    ({count})
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl mx-auto mb-3">
              🔍
            </div>
            <h3 className="font-bold text-base text-[#123047]">No matching products found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search terms or clearing the selected category filters.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-block px-4 py-2 rounded-xl bg-[#123047] text-white text-xs font-bold"
            >
              View Full Catalogue
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, idx) => {
              const stockInfo = getStockStatusDisplay(p.stock?.status || "contact_to_confirm");
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:shadow-cardHover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group reveal-on-scroll"
                  data-delay={(((idx % 3) + 1) * 100).toString()}
                >
                  <div>
                    <div className="w-full h-48 rounded-2xl bg-slate-50 relative overflow-hidden mb-4 border border-slate-100">
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        sizes="(max-width: 768px) 100vw, 350px"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${stockInfo.badgeClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${stockInfo.dotClass}`} />
                          {stockInfo.label}
                        </span>
                      </div>
                      {p.is_new && (
                        <span className="absolute top-3 right-3 bg-[#F2A541] text-[#123047] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                          New
                        </span>
                      )}
                    </div>

                    <Link href={`/products/${p.slug}`}>
                      <h3 className="font-bold text-base text-[#123047] group-hover:text-[#087e8b] transition leading-snug">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {p.summary || p.description}
                    </p>

                    {/* Key Specifications badges */}
                    {p.specifications && p.specifications.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.specifications.slice(0, 3).map((spec) => (
                          <span
                            key={spec.id}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                          >
                            {spec.label}: <strong>{spec.value_text}</strong>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        {p.price_mode === "from" ? "Starting From" : "Unit Price"}
                      </span>
                      <div className="text-lg font-extrabold text-[#123047]">
                        {formatCurrency(p.price_minor)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${p.slug}`}
                        className="text-xs font-bold text-[#087e8b] hover:underline px-2"
                      >
                        Details
                      </Link>
                      <a
                        href={generateWhatsAppUrl(`Hello Emax Enterprises, I want to inquire about purchasing: ${p.name} (SKU: ${p.sku || "N/A"})`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#087E8B] text-[#123047] group-hover:text-white flex items-center justify-center font-bold text-sm transition shadow-xs"
                        title="Enquire on WhatsApp"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

