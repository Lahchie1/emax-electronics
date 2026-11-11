import Image from "next/image";
import { Upload, Image as ImageIcon, Copy, ExternalLink } from "lucide-react";

export default function AdminMediaPage() {
  const mediaItems = [
    {
      id: "media-1",
      filename: "emax-ebike-hero.jpg",
      url: "/images/emax-ebike-hero.jpg",
      mime: "image/jpeg",
      size: "345 KB",
      dimensions: "1920 × 1080",
      alt: "Emax VeloFlow E-Bike by Waterfront Park",
      usedIn: "Home Hero & E-Bikes Collection",
    },
    {
      id: "media-2",
      filename: "eve-280k-lifepo4.jpg",
      url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      mime: "image/jpeg",
      size: "215 KB",
      dimensions: "800 × 600",
      alt: "EVE LF280K v3 280Ah Prismatic Cell",
      usedIn: "Product: EVE LF280K v3",
    },
    {
      id: "media-3",
      filename: "jk-smart-bms.jpg",
      url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      mime: "image/jpeg",
      size: "185 KB",
      dimensions: "800 × 600",
      alt: "JK Smart Active BMS 16S 200A",
      usedIn: "Product: JK Smart Active BMS",
    },
    {
      id: "media-4",
      filename: "copper-busbars.jpg",
      url: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80",
      mime: "image/jpeg",
      size: "160 KB",
      dimensions: "800 × 600",
      alt: "Pure Copper Flexible Busbars",
      usedIn: "Product: Flexible Busbars 16-Pack",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e3a52]">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Supabase Media Storage Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Product photography, technical drawings, and marketing banners stored in Supabase Storage.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-glowTeal transition"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Asset</span>
        </button>
      </div>

      {/* Grid of Media Assets */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#0c141c] rounded-2xl border border-[#1e3a52] overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-video w-full bg-[#122436] border-b border-[#1e3a52] overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="font-bold text-xs text-white truncate" title={item.filename}>
                  {item.filename}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{item.dimensions}</span>
                  <span>{item.size}</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate" title={item.alt}>
                  Alt: {item.alt}
                </div>
                <div className="text-[10px] font-semibold text-[#087e8b]">
                  {item.usedIn}
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#122436] border-t border-[#1e3a52] flex items-center justify-between text-xs text-slate-400">
              <span className="text-[10px] font-mono">{item.mime}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F2A541] p-1"
                title="Open original"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

