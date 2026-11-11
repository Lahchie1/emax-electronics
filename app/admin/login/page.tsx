"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@emaxelectronics.ng");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070f17] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0c141c] border border-[#1e3a52] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-slate-100">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block" title="Back to home">
            <div className="relative h-11 w-44 mx-auto transition-transform hover:scale-105">
              <Image
                src="/logo/Emax-logo-w-nbg.png"
                alt="Emax Electronics Enterprises"
                fill
                priority
                className="object-contain"
                sizes="176px"
              />
            </div>
          </Link>
          <div className="inline-block px-3 py-1 rounded-full bg-[#087E8B]/20 border border-[#087E8B]/40 text-[11px] font-bold text-[#F2A541] tracking-wider uppercase">
            Staff CMS Portal
          </div>
          <p className="text-xs text-slate-400">
            Authenticated access for Emax inventory & content administrators
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-xs text-white placeholder-slate-500 focus:border-[#087e8b] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#122436] border border-[#1e3a52] text-xs text-white placeholder-slate-500 focus:border-[#087e8b] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs py-3.5 rounded-xl shadow-glowTeal transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating Session..." : "Sign In to Admin CMS"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-[#1e3a52] text-center text-xs text-slate-500 flex items-center justify-between">
          <Link href="/" className="hover:text-slate-300 transition">
            ← Public Website
          </Link>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Supabase Auth Session</span>
          </div>
        </div>
      </div>
    </div>
  );
}

