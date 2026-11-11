"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { generateWhatsAppUrl } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolledPast200, setIsScrolledPast200] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPast200(window.scrollY >= 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Build Calculator", href: "/build-calculator" },
    { name: "E-Bikes", href: "/ebikes" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 max-w-6xl mx-auto transition-all duration-300">
      <nav
        className={`rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
          isScrolledPast200
            ? "bg-white border border-slate-200/90 shadow-xl"
            : "glass-nav shadow-glass hover:bg-white/95"
        }`}
      >
        {/* Official Brand Logo (Primary Home Access) */}
        <Link
          href="/"
          className="flex items-center gap-2 group py-1"
          title="Emax Electronics Enterprises - Home"
        >
          <div className="relative h-9 w-32 sm:w-36 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
            <Image
              src="/logo/Emax-logo-c-nbg.png"
              alt="Emax Electronics Enterprises"
              fill
              priority
              className="object-contain object-left"
              sizes="144px"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-700 tracking-wide">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-all duration-200 py-1 relative hover:-translate-y-0.5 ${
                  isActive
                    ? "text-[#123047] font-bold"
                    : "text-slate-600 hover:text-[#087E8B]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#087E8B] rounded-full shadow-xs transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={generateWhatsAppUrl("Hello Emax Electronics Enterprises, I want to inquire about verified lithium packs and e-bikes.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs px-4 py-2 rounded-full shadow-glowTeal transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>WhatsApp Desk</span>
            <div className="w-4 h-4 rounded-full bg-[#F2A541] text-[#123047] flex items-center justify-center text-[10px] font-bold transition-transform group-hover:rotate-45">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-700 hover:text-[#123047] rounded-lg focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden mt-2 p-5 rounded-3xl shadow-xl flex flex-col gap-3 border transition-all duration-300 ${
            isScrolledPast200
              ? "bg-white border-slate-200"
              : "glass-card border-white/80"
          } animate-in fade-in slide-in-from-top-2 duration-200`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#123047] text-white shadow-xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-200">
            <a
              href={generateWhatsAppUrl("Hello Emax Electronics Enterprises, I want to inquire about verified lithium packs and e-bikes.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#087E8B] text-white font-bold text-xs py-2.5 rounded-xl shadow-glowTeal"
            >
              <span>WhatsApp Desk (Lagos)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
