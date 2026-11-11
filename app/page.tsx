import HeroSection from "@/components/HeroSection";
import VerificationProtocol from "@/components/VerificationProtocol";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import InteractiveCalculatorsPreview from "@/components/InteractiveCalculatorsPreview";
import FaqSection from "@/components/FaqSection";
import { DataService } from "@/lib/supabase/data-service";
import { ArrowUpRight } from "lucide-react";
import { generateWhatsAppUrl } from "@/lib/utils";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    DataService.getCategories(),
    DataService.getProducts(),
  ]);

  return (
    <div>
      {/* 1. Hero Section matching the shared image & Stitch design */}
      <HeroSection />

      {/* 2. Quick Stat Counters */}
      <section className="relative z-30 -mt-8 max-w-5xl mx-auto px-4 reveal-scale">
        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-glass border border-white grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="border-r border-slate-100 last:border-0 pr-2 reveal-on-scroll" data-delay="50">
            <div className="text-3xl font-extrabold text-[#123047] tracking-tight">450+</div>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Packs Built & Deployed
            </p>
          </div>
          <div className="border-r border-slate-100 last:border-0 pr-2 reveal-on-scroll" data-delay="150">
            <div className="text-3xl font-extrabold text-[#087e8b] tracking-tight">&lt; 0.22 mΩ</div>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Bench IR Test Standard
            </p>
          </div>
          <div className="border-r border-slate-100 last:border-0 pr-2 reveal-on-scroll" data-delay="250">
            <div className="text-3xl font-extrabold text-[#123047] tracking-tight">6,000+</div>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Cycle Longevity (80% DoD)
            </p>
          </div>
          <div className="reveal-on-scroll" data-delay="350">
            <div className="text-3xl font-extrabold text-emerald-600 tracking-tight">100%</div>
            <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              Physical Lagos Stock
            </p>
          </div>
        </div>
      </section>

      {/* 3. Engineering Protocol & Market Reality Comparison */}
      <VerificationProtocol />

      {/* 4. Core Product Categories */}
      <CategoryGrid categories={categories} />

      {/* 5. Featured In-Stock Inventory */}
      <FeaturedProducts products={products.slice(0, 6)} />

      {/* 6. Interactive Calculators Preview (Pack Builder & Fuel Savings) */}
      <InteractiveCalculatorsPreview />

      {/* 7. Frequently Asked Questions */}
      <FaqSection />

      {/* 8. Bottom CTA Banner */}
      <section className="py-20 px-4 sm:px-6 reveal-scale">
        <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-[#123047] via-[#0d2844] to-[#123047] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#087e8b]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F2A541]">
              Direct Lagos Supply & Technical Support
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Ready to transition to reliable, zero-fuel power?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Chat directly with our Lagos battery technicians and mobility specialists on WhatsApp for verified cell matching, custom pack construction, or warehouse pickup.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={generateWhatsAppUrl("Hello Emax Lagos Hub, I would like to speak with a technician about custom pack construction.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-glowTeal transition transform hover:-translate-y-0.5"
              >
                <span>Chat with Lagos Technician</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

