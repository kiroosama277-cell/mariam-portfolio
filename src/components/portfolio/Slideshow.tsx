"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================================
   A big, clear, buttery slideshow that lives INSIDE a page —
   every slide of the actual deliverable glides smoothly with
   arrows, keyboard, swipe and a thumbnail strip.
   ============================================================ */
export default function Slideshow({
  slides,
  captions = [],
  fallbackTitle = "Project",
  compact = false,
}: {
  slides: string[];
  captions?: string[];
  fallbackTitle?: string;
  compact?: boolean;
}) {
  const [[idx, dir], setIdx] = useState<[number, number]>([0, 1]);

  const go = useCallback(
    (next: number, d: number) => {
      setIdx([((next % slides.length) + slides.length) % slides.length, d]);
    },
    [slides.length]
  );
  const next = useCallback(() => go(idx + 1, 1), [go, idx]);
  const prev = useCallback(() => go(idx - 1, -1), [go, idx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const caption = captions[idx] ?? `${fallbackTitle} — page ${idx + 1}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#efe4cf] bg-[#fdfaf3] shadow-[0_22px_60px_rgba(90,40,60,0.12)]">
      {/* stage */}
      <div className="relative flex items-center justify-center overflow-hidden bg-[#f3ecdd]/70 px-14 py-5 sm:px-20 sm:py-7">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={idx}
            src={slides[idx]}
            alt={caption}
            custom={dir}
            initial={{ opacity: 0, x: dir * 90, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir * -90, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 210, damping: 26 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) next();
              else if (info.offset.x > 70) prev();
            }}
            className={`max-h-[46vh] w-auto max-w-full cursor-grab rounded-xl object-contain shadow-[0_22px_54px_rgba(60,20,40,0.3)] active:cursor-grabbing sm:max-h-[52vh] ${
              compact ? "sm:max-h-[40vh]" : ""
            }`}
          />
        </AnimatePresence>

        {/* arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="group absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5d5b8] bg-white/85 text-[#5e1d35] shadow-lg backdrop-blur transition-all hover:scale-110 hover:bg-[#5e1d35] hover:text-white sm:left-5 sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="group absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5d5b8] bg-white/85 text-[#5e1d35] shadow-lg backdrop-blur transition-all hover:scale-110 hover:bg-[#5e1d35] hover:text-white sm:right-5 sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* counter */}
        <span className="absolute right-5 top-4 rounded-full border border-[#eadcc2] bg-white/85 px-3.5 py-1.5 text-xs font-bold tabular-nums text-[#5a4750] shadow-sm">
          {idx + 1} / {slides.length}
        </span>

        {/* caption */}
        <p className="absolute inset-x-0 bottom-1.5 truncate px-16 text-center text-xs font-semibold italic text-[#8d7a84] sm:text-sm">
          {caption}
        </p>
      </div>

      {/* thumbnails */}
      <div className="flex gap-2.5 overflow-x-auto border-t border-[#efe4cf] bg-white/60 px-5 py-3 [scrollbar-width:thin] sm:px-7">
        {slides.map((s, i) => (
          <button
            key={s + i}
            onClick={() => go(i, i > idx ? 1 : -1)}
            aria-label={`Slide ${i + 1}`}
            className={`relative h-14 w-20 flex-none overflow-hidden rounded-lg transition-all duration-300 sm:h-16 sm:w-24 ${
              i === idx
                ? "scale-[1.06] ring-2 ring-[#c39c52] ring-offset-2 ring-offset-[#fdfaf3]"
                : "opacity-55 hover:opacity-90"
            }`}
          >
            <img src={s} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
