export default function FaqSection() {
  const faqs = [
    {
      q: "How do you verify that your LiFePO4 cells are genuine Grade-A?",
      a: "Every single cell features original factory laser-etched QR codes intact. We measure AC internal resistance (typically <0.22mΩ on 280Ah units) using calibrated YR1035+ meters and test open circuit voltage consistency. We welcome customers with their own meters to inspect on our Ikeja bench before payment.",
    },
    {
      q: "Can I recharge the Emax VeloFlow e-bike with my home solar system?",
      a: "Yes! The included smart charger draws only 120W to 150W of power, which works easily even with a modest 500VA inverter or small portable solar generator. A full recharge takes approximately 4.5 to 5 hours.",
    },
    {
      q: "Do you ship components and e-bikes outside Lagos?",
      a: "Yes. All cells, batteries, and e-bikes are secured inside shock-resistant foam crating and dispatched via verified interstate logistics networks (GIGL, Peace Mass, etc.) with tracking to all 36 states across Nigeria.",
    },
    {
      q: "What is the warranty coverage on e-bikes and battery cells?",
      a: "Emax VeloFlow e-bikes come with a 1-Year manufacturer warranty on frame, motor, and BMS electronics, plus dedicated replacement parts stocked in Lagos. Prismatic cells are guaranteed matched with authentic factory QR codes upon delivery.",
    },
    {
      q: "How does the ordering and payment process work?",
      a: "Because battery configurations require technical matching, clicking any WhatsApp action connects you directly with our Lagos engineering desk. We verify cell compatibility, confirm real-time warehouse inventory, share test reports, and provide official invoice details for pickup or delivery.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal-on-scroll">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#087e8b]">
            Transparent Answers
          </span>
          <h2 className="text-3xl font-extrabold text-[#123047] mt-1 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm group transition-all reveal-on-scroll"
              data-delay={Math.min(500, (idx + 1) * 100).toString()}
            >
              <summary className="font-bold text-sm sm:text-base text-[#123047] cursor-pointer list-none flex justify-between items-center gap-4">
                <span>{item.q}</span>
                <span className="text-slate-400 group-open:rotate-180 transition font-mono text-lg flex-shrink-0">
                  ↓
                </span>
              </summary>
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed border-t border-slate-100 pt-3">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

