import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollObserver from "@/components/ScrollObserver";
import { headers } from "next/headers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Emax Electronics Enterprises | Clean Energy & E-Mobility Intelligence",
  description: "Lagos premier hub for genuine Grade-A LiFePO4 cells, active Smart BMS hardware, solar generator components, and high-torque urban e-bikes.",
  keywords: ["LiFePO4 Lagos", "E-Bike Lagos", "Smart BMS Nigeria", "Solar Generator Nigeria", "EVE 280Ah", "Emax Electronics"],
  openGraph: {
    title: "Emax Electronics Enterprises | Ride Smarter, Live Greener",
    description: "Verified-spec lithium battery components, active Smart BMS, and urban e-bikes in Lagos, Nigeria.",
    images: ["/images/emax-hero-banner-reference.jpg"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased selection:bg-[#087e8b] selection:text-white min-h-screen flex flex-col justify-between">
        <ScrollObserver />
        {!isAdmin && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
