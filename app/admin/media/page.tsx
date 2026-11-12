import Image from "next/image";
import { Upload, Image as ImageIcon, Copy, ExternalLink } from "lucide-react";

export default function AdminMediaPage() {
  const mediaItems = [
    {
      id: "media-1",
      filename: "e-bike-hero-rider.jpg",
      url: "/images/hero-images/e-bike-hero.png",
      mime: "image/png",
      size: "1.4 MB",
      dimensions: "1920 × 1080",
      alt: "Emax VeloFlow E-Bike Urban Rider in Victoria Island, Lagos",
      usedIn: "Home Hero & E-Bikes Showcase",
    },
    {
      id: "media-2",
      filename: "lithium-battery.jpg",
      url: "/images/products/lithium-battery.jpg",
      mime: "image/jpeg",
      size: "215 KB",
      dimensions: "1024 × 1024",
      alt: "EVE LF280K v3 280Ah Prismatic Cells Stack",
      usedIn: "Product: EVE LF280K v3",
    },
    {
      id: "media-3",
      filename: "bms-16s.jpg",
      url: "/images/products/bms-16s.jpg",
      mime: "image/jpeg",
      size: "185 KB",
      dimensions: "1024 × 1024",
      alt: "JK Smart Active BMS 16S 200A Board",
      usedIn: "Product: JK Smart Active BMS",
    },
    {
      id: "media-4",
      filename: "active-balancer.jpg",
      url: "/images/products/active-balancer.jpg",
      mime: "image/jpeg",
      size: "160 KB",
      dimensions: "1024 × 1024",
      alt: "JIKONG 16S 5A Active Cell Balancer",
      usedIn: "Product: Active Balancer Board",
    },
    {
      id: "media-5",
      filename: "arduino-uno.jpg",
      url: "/images/products/arduino-uno.jpg",
      mime: "image/jpeg",
      size: "175 KB",
      dimensions: "1024 × 1024",
      alt: "Arduino Uno R3 Development Board",
      usedIn: "Product: Arduino Uno R3",
    },
    {
      id: "media-6",
      filename: "spot-welder.jpg",
      url: "/images/products/spot-welder.jpg",
      mime: "image/jpeg",
      size: "190 KB",
      dimensions: "1024 × 1024",
      alt: "Mini Portable Battery Spot Welder",
      usedIn: "Product: Battery Spot Welder",
    },
    {
      id: "media-7",
      filename: "electric-bike.jpg",
      url: "/images/products/electric-bike.jpg",
      mime: "image/jpeg",
      size: "220 KB",
      dimensions: "1024 × 1024",
      alt: "Emax VeloFlow 750W Electric Bicycle",
      usedIn: "Product: Emax VeloFlow 750W",
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

