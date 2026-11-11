"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Image as ImageIcon, 
  FileText, 
  MessageSquare, 
  Users, 
  History, 
  Settings, 
  LogOut, 
  Zap,
  ExternalLink
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If on login screen, don't show admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products & Stock", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Content & Pages", href: "/admin/content", icon: FileText },
    { name: "Enquiries & Leads", href: "/admin/enquiries", icon: MessageSquare },
    { name: "Staff & Roles", href: "/admin/staff", icon: Users },
    { name: "Audit Trail", href: "/admin/audit", icon: History },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0c141c] border-r border-[#1e3a52] flex flex-col justify-between p-5 flex-shrink-0">
        <div>
          {/* Logo & Portal Badge */}
          <div className="pb-5 border-b border-[#1e3a52]">
            <Link href="/admin" className="block group">
              <div className="relative h-8 w-32 mb-1 transition-transform group-hover:scale-105">
                <Image
                  src="/logo/Emax-logo-w-nbg.png"
                  alt="Emax Electronics Enterprises"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="128px"
                />
              </div>
              <div className="text-[10px] uppercase font-bold text-[#F2A541] tracking-wider pl-0.5">
                Staff Control Panel
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? "bg-[#123047] text-[#F2A541] border border-[#1e3a52]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Outbound Links */}
        <div className="pt-6 border-t border-[#1e3a52] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-[#F2A541] px-2"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="p-3 rounded-xl bg-[#122436] border border-[#1e3a52] flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Admin Staff</div>
              <div className="text-[10px] text-emerald-400 font-mono">admin@emax.ng</div>
            </div>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-rose-400 p-1"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#070f17] p-6 sm:p-10">
        {children}
      </main>
    </div>
  );
}

