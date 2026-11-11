"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import { generateWhatsAppUrl } from "@/lib/utils";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Zap,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Lithium Battery Cells");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = `Hello Emax Lagos Hub, my name is ${name}. I am inquiring regarding ${category}: ${message}`;
    window.open(generateWhatsAppUrl(encoded), "_blank");
    setSubmitted(true);
  };

  const contactCards = [
    {
      icon: <MessageCircle className="w-5 h-5 text-[#087E8B]" />,
      title: "Official WhatsApp Desk",
      primary: "+234 903 835 9288",
      secondary: "Fastest response for quotes & technical sizing",
      actionText: "Chat on WhatsApp",
      actionUrl: generateWhatsAppUrl("Hello Emax Lagos Hub, I would like to inquire about your products and services."),
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#F2A541]" />,
      title: "Warehouse & Dispatch Store",
      primary: "Ikeja Technology Hub",
      secondary: "Lagos State, Nigeria",
      actionText: "Get Directions",
      actionUrl: "https://maps.google.com/?q=Ikeja+Lagos+Nigeria",
    },
    {
      icon: <Mail className="w-5 h-5 text-[#087E8B]" />,
      title: "Technical Email",
      primary: "support@emaxelectronics.ng",
      secondary: "For formal RFQs and commercial procurement",
      actionText: "Send Email",
      actionUrl: "mailto:support@emaxelectronics.ng",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#217A50]" />,
      title: "Operating Hours",
      primary: "Mon – Sat: 8:30 AM – 6:00 PM",
      secondary: "West Africa Time (WAT) • Sunday closed",
      actionText: "Schedule Visit",
      actionUrl: generateWhatsAppUrl("Hello Emax, I would like to schedule a visit to your Ikeja store."),
    },
  ];

  const faqs = [
    {
      q: "Can I inspect the cells with my own meter before buying?",
      a: "Yes, absolutely! We actively encourage customers and solar installers to bring their own YR1035+ or precision multimeters to test internal resistance and open-circuit voltage at our Ikeja dispatch store.",
    },
    {
      q: "Do you ship outside Lagos?",
      a: "Yes. We offer secure, palletized nationwide freight across all 36 Nigerian states through vetted logistics partners with tracking and transit insurance.",
    },
    {
      q: "How does the 1-year warranty work?",
      a: "All genuine Grade-A lithium cells, Daly/JBD Smart BMS units, and Emax VeloFlow e-bikes come with a 1-year direct replacement warranty against manufacturing defects handled locally in Lagos.",
    },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Uniform Page Hero matching other pages */}
        <PageHero
          badge="Contact"
          headline={
            <>
              Direct Contact{" "}
              <span className="text-[#F2A541]">& Lagos Desk.</span>
            </>
          }
          subtext="Have questions on inverter sizing, cell chemistry, busbar configurations, or e-bike test rides? Reach our Ikeja technical team directly or send an instant WhatsApp inquiry."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
          imageSrc="/images/page-heroes/contact-hero.jpg"
          imageAlt="Emax Electronics Enterprises Contact Lagos Desk"
          chips={[
            {
              icon: <ShieldCheck className="w-4 h-4" />,
              label: "Ikeja Hub",
              sub: "Lagos Dispatch",
            },
            {
              icon: <Zap className="w-4 h-4" />,
              label: "WhatsApp Desk",
              sub: "Instant Response",
            },
            {
              icon: <MapPin className="w-4 h-4" />,
              label: "Lagos, Nigeria",
              sub: "Mon–Sat 8:30–6PM",
            },
          ]}
        />

        {/* 4 Contact Cards Grid with Interactive Motion */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1.5 flex flex-col justify-between group reveal-on-scroll"
              data-delay={Math.min(500, (i + 1) * 100).toString()}
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-xs">
                  {card.icon}
                </div>
                <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  {card.title}
                </h3>
                <div className="font-extrabold text-sm sm:text-base text-[#123047] mt-1 tracking-tight">
                  {card.primary}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {card.secondary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <a
                  href={card.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#087E8B] hover:text-[#066570] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200"
                >
                  <span>{card.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 2-Column: Direct Inquiry Form + In-Person Verification Invite */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Interactive Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm reveal-fade-left">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#087E8B]">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#123047]">
                  Send a Direct Message
                </h2>
                <p className="text-xs text-slate-400">
                  Pre-formats and routes directly to our WhatsApp Lagos technical desk
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeInUp">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-emerald-950">
                  Enquiry Transmitted!
                </h3>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Your enquiry has opened in WhatsApp. If it did not launch automatically, tap below to continue:
                </p>
                <a
                  href={generateWhatsAppUrl(`Hello Emax Lagos Hub, my name is ${name}. Inquiring regarding ${category}: ${message}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-[#087E8B] hover:bg-[#066570] text-white text-xs font-bold transition-all duration-200 shadow-glowTeal"
                >
                  Open WhatsApp Chat
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Babatunde Adeleke"
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#087E8B] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Product / Project Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#087E8B] focus:outline-none transition-colors"
                  >
                    <option value="Lithium Battery Cells">Grade-A LiFePO4 Prismatic Cells (105Ah, 280Ah, 314Ah)</option>
                    <option value="Active Smart BMS">Smart Active Balance BMS (Daly / JBD)</option>
                    <option value="Solar Generators & Inverters">Hybrid Inverters & Solar Generators</option>
                    <option value="E-Bikes VeloFlow">Emax VeloFlow Urban E-Bikes (Test Ride & Purchase)</option>
                    <option value="Hardware & Busbars">Flexible Copper Busbars & Compression Hardware</option>
                    <option value="Custom Energy Project">Custom High-Voltage Battery Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message / System Specs
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inverter wattage, desired kWh capacity, or e-bike test ride preferences..."
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#087E8B] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-glowTeal transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Enquiry via WhatsApp Desk</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: In-Person Verification & Hub Invite (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 reveal-fade-right">
            <div className="bg-[#123047] text-white rounded-3xl p-7 sm:p-9 shadow-xl border border-white/10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#F2A541]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>In-Person Testing Invite</span>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">
                Inspect Before You Buy at Ikeja
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We believe you should never pay for battery cells blind. Visit our dispatch warehouse in Ikeja to personally verify internal resistance (&lt;0.22mΩ) and inspect factory QR codes before collection.
              </p>

              <div className="pt-2 space-y-2.5 text-xs">
                <div className="flex items-center gap-2.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#F2A541] flex-shrink-0" />
                  <span>YR1035+ Kelvin four-wire testing on site</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#F2A541] flex-shrink-0" />
                  <span>VeloFlow e-bike test rides available</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#F2A541] flex-shrink-0" />
                  <span>Same-day collection and dispatch</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href={generateWhatsAppUrl("Hello Emax Lagos Hub, I want to schedule an in-person visit to your Ikeja store.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F2A541] hover:bg-[#e09331] text-[#123047] font-extrabold text-xs py-3 rounded-xl transition-all duration-200 shadow-glowAmber"
                >
                  <span>Book In-Person Visit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Response Guarantee */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#087E8B] flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#123047]">
                  Fast Technical Response
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Typical WhatsApp reply time: &lt; 15 minutes during business hours.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ordering & Dispatch FAQs */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm reveal-scale">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <HelpCircle className="w-5 h-5 text-[#087E8B]" />
            <h2 className="text-lg font-extrabold text-[#123047]">
              Frequently Asked Questions About Ordering & Dispatch
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 transition-all hover:bg-white hover:shadow-xs reveal-on-scroll"
                data-delay={Math.min(500, (idx + 1) * 100).toString()}
              >
                <h3 className="font-bold text-xs sm:text-sm text-[#123047] mb-2 leading-snug">
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

