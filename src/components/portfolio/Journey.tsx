"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { journey } from "./data";
import { FadeUp } from "./fx";

export default function Journey() {
  const [active, setActive] = useState(0);

  return (
    <section id="journey" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <FadeUp className="text-center">
          <h2 className="font-serif-display text-4xl italic text-[#3f2f3a] sm:text-5xl">
            {journey.title} <span className="not-italic text-[#c39c52]">✦</span>
          </h2>
        </FadeUp>

        <div className="relative mt-12 space-y-5">
          {/* connector line */}
          <span className="absolute bottom-6 left-[27px] top-6 hidden w-px bg-gradient-to-b from-[#e5d5b8] via-[#d9c8a8] to-transparent sm:block" />

          {journey.items.map((item, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`relative cursor-pointer rounded-3xl border px-7 py-6 transition-all duration-500 sm:px-9 sm:py-7 ${
                  isActive
                    ? "border-[#e5d5b8] bg-[#fdfaf3] shadow-[0_16px_44px_rgba(90,40,60,0.1)]"
                    : "border-[#efe4cf]/70 bg-[#fbf6ec]/40"
                }`}
              >
                {/* node dot on the line */}
                <span
                  className={`absolute -left-[1px] top-8 hidden h-2.5 w-2.5 rounded-full border-2 transition-all duration-500 sm:block ${
                    isActive
                      ? "scale-125 border-[#c39c52] bg-[#5e1d35] shadow-[0_0_10px_rgba(195,156,82,0.6)]"
                      : "border-[#d9c8a8] bg-[#fbf6ec]"
                  }`}
                  style={{ left: "calc(2rem - 34px)" }}
                />

                <motion.div
                  animate={{ scale: isActive ? 1 : 0.985 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-45"}`}
                >
                  <h3 className="font-serif-display flex items-center gap-2 text-2xl text-[#3f2f3a] sm:text-[1.7rem]">
                    {item.title}
                    {item.star && (
                      <motion.span
                        animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className={`inline-block text-lg ${isActive ? "text-[#c39c52]" : "text-[#d9c8a8]"}`}
                      >
                        ✦
                      </motion.span>
                    )}
                  </h3>
                  <p className="mt-1.5 text-[15px] font-semibold text-[#7c3552]">{item.org}</p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#7a6771]">{item.desc}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
