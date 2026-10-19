"use client";

import { motion, type Variants } from "framer-motion";
import { motionGraphics } from "./data";
import { FadeUp, WordsReveal } from "./fx";

type VideoItem = (typeof motionGraphics.videos)[number];

/* ============================================================
   MOTION GRAPHICS — reference-style entrance:
   each card OBSERVED on a stable wrapper (so the trigger is
   based on its resting spot, never on the flight transform),
   then the inner card FLIES IN from the screen edges with a
   little rotation, spring-lands on its spot… and FREEZES.
   01 sweeps in from the LEFT, 02 rises from BELOW, 03 sweeps
   in from the RIGHT — one choreography that fits every screen
   (on mobile the same edges read as a full sweep-in).
   Theme untouched.
   ============================================================ */

/* entrance start per card: [x, y, extra rotation] */
const FLIGHT = [
  { ex: -440, ey: -40, er: -13 }, // 01 — sweeps in from the LEFT edge
  { ex: 0, ey: 440, er: 9 }, //    02 — rises from BELOW
  { ex: 440, ey: -40, er: 13 }, // 03 — sweeps in from the RIGHT edge
];

function cardV(f: { ex: number; ey: number; er: number }, delay: number): Variants {
  return {
    hidden: { opacity: 0, x: f.ex, y: f.ey, rotate: f.er, scale: 0.84 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 16, delay },
    },
  };
}

/* ---------- one motion piece: framed like the deck pages ---------- */
function MotionCard({ item, i, wide }: { item: VideoItem; i: number; wide: boolean }) {
  return (
    /* stable wrapper = the observer (never transformed) */
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
      className={wide ? "w-full sm:w-[62%] lg:w-[38%]" : "w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"}
    >
      <motion.figure variants={cardV(FLIGHT[i % FLIGHT.length], i * 0.1)} className="group">
        <div className="relative rounded-3xl border border-[#efe4cf] bg-white p-2.5 shadow-[0_16px_44px_rgba(90,40,60,0.10)] transition-shadow duration-500 group-hover:shadow-[0_26px_60px_rgba(90,40,60,0.18)]">
          <span className="font-serif-display absolute left-6 top-6 z-10 rounded-full bg-white/85 px-3 py-1 text-xl italic text-[#5e1d35] shadow-sm backdrop-blur-sm">
            {item.num}
          </span>
          <video
            src={item.src}
            poster={item.poster}
            controls
            preload="none"
            playsInline
            loop
            aria-label={item.title}
            className="w-full rounded-2xl bg-[#f3ecdd]"
          />
        </div>
        <figcaption className="px-2 pt-4 text-center">
          <h3 className="font-serif-display text-2xl text-[#3f2f3a]">{item.title}</h3>
          <p className="mt-1 text-[11px] font-bold tracking-[0.22em] text-[#b98d5e]">{item.category}</p>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

/* ---------- the section: sits right after Selected Work ---------- */
export default function MotionGraphics() {
  const wide = motionGraphics.videos.length === 1;

  return (
    <section id="motion" className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#eadcc2] bg-[#fdf9f0] px-5 py-2 text-[11px] font-bold tracking-[0.3em] text-[#8a6d35]">
              <span className="text-[#c39c52]">✦</span> {motionGraphics.pill}
            </span>
          </FadeUp>
          <h2 className="font-serif-display mt-5 text-4xl text-[#3f2f3a] sm:text-6xl">
            <WordsReveal
              text={motionGraphics.title1}
              accent={motionGraphics.titleAccent}
              accentClassName="underline-gold italic text-[#7c3552]"
            />
          </h2>
          <FadeUp delay={0.15}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#7a6771] sm:text-lg">
              {motionGraphics.subtitle}
            </p>
          </FadeUp>
        </div>

        <div className="mt-14 flex flex-wrap items-start justify-center gap-8">
          {motionGraphics.videos.map((v, i) => (
            <MotionCard key={v.num + v.src} item={v} i={i} wide={wide} />
          ))}
        </div>
      </div>
    </section>
  );
}
