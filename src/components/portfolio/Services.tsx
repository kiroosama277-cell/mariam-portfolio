"use client";

import { motion } from "framer-motion";
import { Megaphone, Sparkles, MonitorSmartphone } from "lucide-react";
import { services } from "./data";
import { FadeUp, WordsReveal } from "./fx";

const icons: Record<string, React.ReactNode> = {
  megaphone: <Megaphone className="h-6 w-6" />,
  sparkles: <Sparkles className="h-6 w-6" />,
  devices: <MonitorSmartphone className="h-6 w-6" />,
};

const TOOLS = [
  "Photoshop",
  "Illustrator",
  "Premiere",
  "After Effects",
  "CapCut",
  "Meta Suite",
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#eadcc2] bg-[#fdf9f0] px-5 py-2 text-[11px] font-bold tracking-[0.3em] text-[#8a6d35]">
              <span className="text-[#c39c52]">✦</span> {services.pill}
            </span>
          </FadeUp>
          <h2 className="font-serif-display mt-5 text-4xl text-[#3f2f3a] sm:text-6xl">
            <WordsReveal
              text={services.title1}
              accent={services.titleAccent}
              accentClassName="underline-gold italic text-[#7c3552]"
            />
          </h2>
          <FadeUp delay={0.15}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#7a6771] sm:text-lg">
              {services.subtitle}
            </p>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl border border-[#efe4cf] bg-[#fdfaf3] p-7 shadow-[0_14px_40px_rgba(90,40,60,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#e5d5b8] hover:shadow-[0_26px_56px_rgba(90,40,60,0.14)] sm:p-8"
            >
              {/* corner glow */}
              <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f3e2c4]/50 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

              <motion.span
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5e1d35] text-[#f6ead4] shadow-[0_10px_24px_rgba(94,29,53,0.35)]"
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                {icons[s.icon]}
              </motion.span>
              <h3 className="font-serif-display mt-6 text-2xl leading-snug text-[#3f2f3a] sm:text-[1.65rem]">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#7a6771]">{s.desc}</p>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2.5 text-[15px] font-semibold text-[#5f4d57] transition-transform duration-300 hover:translate-x-1"
                  >
                    <span className="text-[#c39c52] transition-transform duration-300 group-hover:rotate-90">✦</span> {p}
                  </li>
                ))}
              </ul>

              {/* index number watermark */}
              <span className="font-serif-display pointer-events-none absolute bottom-3 right-6 select-none text-6xl italic text-[#5e1d35]/[0.06]">
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>

        {/* tools belt */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {TOOLS.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.05 }}
              className={`cursor-default rounded-full border px-6 py-3 text-[15px] font-bold shadow-sm transition-colors ${
                i === 0
                  ? "border-[#e5d5b8] bg-[#fdfaf3] text-[#5e1d35]"
                  : "border-[#eadcc2] bg-[#fbf6ec]/70 text-[#5a4750] hover:border-[#c39c52] hover:text-[#5e1d35]"
              }`}
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
