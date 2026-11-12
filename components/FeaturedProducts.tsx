import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatCurrency, generateWhatsAppUrl, getStockStatusDisplay } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

interface Props {
  products: Product[];
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto" id="inventory">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-on-scroll">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#087e8b]">
            Immediate Warehouse Availability
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123047] mt-1 tracking-tight">
            Featured In-Stock Components
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mt-3 md:mt-0">
          Stock levels and NGN rates updated daily. Pick up same-day at our Ikeja dispatch store or request insured interstate transit.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, idx) => {
          const stockInfo = getStockStatusDisplay(p.stock?.status || 'contact_to_confirm');
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
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">
                    {p.stock?.status === 'contact_to_confirm'
                      ? 'Stock Status'
                      : p.price_mode === 'from'
                      ? 'Starting From'
                      : 'Unit Price'}
                  </span>
                  <div className="text-base sm:text-lg font-extrabold text-[#123047]">
                    {p.stock?.status === 'contact_to_confirm' || p.price_minor === 0
                      ? 'Price TBD'
                      : formatCurrency(p.price_minor)}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <AddToCartButton product={p} />
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-xs font-bold text-[#087e8b] hover:underline px-1.5"
                  >
                    Details
                  </Link>
                  <a
                    href={generateWhatsAppUrl(`Hello Emax Enterprises, I want to inquire about purchasing: ${p.name} (SKU: ${p.sku || 'N/A'})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#087E8B] group-hover:text-white text-[#123047] flex items-center justify-center font-bold text-sm transition shadow-xs flex-shrink-0"
                    title="Enquire on WhatsApp"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#123047] hover:bg-slate-800 text-white font-bold text-xs transition"
        >
          <span>View All Products in Catalogue</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

