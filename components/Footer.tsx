import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { generateWhatsAppUrl } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-[#123047] text-white pt-16 pb-12 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group" title="Emax Electronics Enterprises">
              <div className="relative h-11 w-40 sm:w-44 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo/Emax-logo-w-nbg.png"
                  alt="Emax Electronics Enterprises"
                  fill
                  className="object-contain object-left"
                  sizes="176px"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Lagos premier hub for genuine Grade-A LiFePO4 cells, active Smart BMS hardware, hybrid inverters, and high-torque urban e-bikes. Batch verified on our Ikeja bench.
            </p>
            <div className="pt-2">
              <a
                href={generateWhatsAppUrl("Hello Emax Electronics Enterprises, I would like to inquire about your products.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs px-4 py-2 rounded-full transition shadow-sm"
              >
                <span>Direct WhatsApp Technical Desk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Core Destinations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2A541] mb-4">
              Website Destinations
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">Home</Link></li>
              <li><Link href="/products" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">Products / Shop</Link></li>
              <li><Link href="/build-calculator" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">Build Calculator</Link></li>
              <li><Link href="/ebikes" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">E-Bikes Collection</Link></li>
              <li><Link href="/about-us" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2A541] mb-4">
              Component Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/products?cat=cat-lithium-cells" className="hover:text-white transition">Grade-A LiFePO4 Cells</Link></li>
              <li><Link href="/products?cat=cat-bms" className="hover:text-white transition">Smart Active BMS</Link></li>
              <li><Link href="/products?cat=cat-ebikes" className="hover:text-white transition">VeloFlow E-Bikes</Link></li>
              <li><Link href="/products?cat=cat-inverters-solar" className="hover:text-white transition">Hybrid Solar Inverters</Link></li>
              <li><Link href="/products?cat=cat-hardware" className="hover:text-white transition">Flexible Copper Busbars</Link></li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2A541] mb-4">
              Lagos Hub & Dispatch
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F2A541] flex-shrink-0 mt-0.5" />
                <span>Ikeja Technology Hub, Lagos State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F2A541] flex-shrink-0" />
                <span>+234 903 835 9288</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F2A541] flex-shrink-0" />
                <span>support@emaxelectronics.ng</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#F2A541] flex-shrink-0" />
                <span>Mon – Sat: 8:30 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Emax Electronics Enterprises. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="hover:text-[#F2A541] transition">
              Staff Portal (CMS)
            </Link>
            <span>•</span>
            <span>Lagos & Nationwide Waybill Transit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

