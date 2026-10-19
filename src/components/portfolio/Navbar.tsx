"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress, transformOrigin: "0 50%" }}
      />
      {/* stays with you the whole way — lightly transparent as you scroll */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className={`flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border py-2 pl-5 pr-2 backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? "border-[#e5d9c4]/60 bg-[#faf4e9]/55 shadow-[0_12px_40px_rgba(90,40,60,0.12)]"
              : "border-[#e5d9c4]/80 bg-[#faf4e9]/90 shadow-[0_10px_36px_rgba(90,40,60,0.12)]"
          }`}
        >
          {/* monogram logo — no photo */}
          <a href="#hero" className="group flex items-center gap-2">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e0cba4] bg-gradient-to-br from-[#5e1d35] to-[#8e3057] shadow-[0_6px_16px_rgba(94,29,53,0.3)] transition-transform duration-500 group-hover:rotate-[360deg]">
              <span className="font-serif-display text-xl font-bold italic text-[#f6ead4]">M</span>
            </span>
            <span className="hidden text-sm text-[#c39c52] transition-transform duration-500 group-hover:rotate-180 sm:inline">✦</span>
          </a>

          {/* links — visible on every screen (compact on phones) */}
          <div className="flex items-center gap-0.5 md:gap-1">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative rounded-full px-2 py-1.5 text-[13px] font-semibold text-[#4d3c46] transition-colors sm:px-3 sm:text-sm md:px-4 md:text-[15px] after:absolute after:inset-x-4 after:bottom-1 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-[#c39c52] after:transition-transform after:duration-300 hover:bg-[#f0e5d2]/80 hover:text-[#5e1d35] hover:after:scale-x-100"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA — from small tablets up (on phones the Contact link is right there) */}
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full bg-[#5e1d35] px-5 py-2.5 text-[15px] font-semibold text-[#fbf3e6] shadow-[0_6px_18px_rgba(94,29,53,0.35)] transition-all hover:bg-[#4a1229] hover:shadow-[0_8px_24px_rgba(94,29,53,0.45)] sm:flex"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </nav>
      </motion.header>
    </>
  );
}
