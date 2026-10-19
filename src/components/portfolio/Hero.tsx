"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Sparkle } from "lucide-react";
import { hero } from "./data";
import { Magnetic } from "./fx";

/* ============================================================
   "Mariam" — the name is always visible and softly glowing
   (never fully off). Move the mouse ANYWHERE on the screen:
   a warm light travels across the letters, and every letter
   the cursor touches lights up brighter, lifted and glowing.
   ============================================================ */
const LETTERS = [
  { ch: "M", color: "#a4546e", glow: "rgba(164, 84, 110, 0.55)" },
  { ch: "a", color: "#96455f", glow: "rgba(150, 69, 95, 0.55)" },
  { ch: "r", color: "#833b56", glow: "rgba(131, 59, 86, 0.55)" },
  { ch: "i", color: "#7c3552", glow: "rgba(124, 53, 82, 0.62)" },
  { ch: "a", color: "#96593d", glow: "rgba(150, 89, 61, 0.52)" },
  { ch: "m", color: "#b98d5e", glow: "rgba(185, 141, 94, 0.62)" },
];
const BASE_DELAY = 0.45;
const STEP = 0.14;

function GlowName() {
  const [lit, setLit] = useState(false);
  const [haloOn, setHaloOn] = useState(false);
  /* warm light follows the cursor anywhere on the screen */
  const [spot, setSpot] = useState({ x: 50, y: 50, on: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setLit(true), 350);
    const t2 = setTimeout(() => setHaloOn(true), 1750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      setSpot({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
        on: 1,
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      {/* frosted glass panel floating BEHIND the name — like the reference */}
      <span aria-hidden className="name-glass pointer-events-none absolute left-[53%] top-1/2 hidden h-[124%] w-[6.5rem] sm:block" />
      <span
        aria-hidden
        className={`name-halo pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[62%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full ${
          haloOn ? "is-lit" : ""
        }`}
      />
      {/* warm light that follows the cursor across the letters */}
      <span
        aria-hidden
        className="name-light pointer-events-none absolute inset-[-18%] z-[2] rounded-full"
        style={
          {
            "--lx": `${spot.x}%`,
            "--ly": `${spot.y}%`,
            opacity: spot.on,
          } as React.CSSProperties
        }
      />
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Mariam"
        className="font-serif-display relative z-[3] cursor-default whitespace-nowrap text-[21.5vw] font-black italic leading-[1.05] sm:text-[11rem] lg:text-[13rem]"
      >
        {LETTERS.map((l, i) => (
          <span
            key={i}
            aria-hidden
            className={`name-letter ${lit ? "is-lit" : ""}`}
            style={
              {
                color: l.color,
                "--lit-delay": `${BASE_DELAY + i * STEP}s`,
                "--lit-glow": l.glow,
              } as React.CSSProperties
            }
          >
            {l.ch}
            <span className="letter-spark">✦</span>
          </span>
        ))}
      </motion.h1>
    </div>
  );
}

/* ============================================================
   Floating shapes — sized like the reference:
   • small glossy PINK donut, half off-screen beside the carousel
   • glossy burgundy blob peeking from the right edge
   • pearl sphere + wireframe polyhedron
   Two parallax layers react to the mouse.
   ============================================================ */
function HeroShapes({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const sx = useSpring(mx, { stiffness: 42, damping: 16 });
  const sy = useSpring(my, { stiffness: 42, damping: 16 });

  const nearX = useTransform(sx, (v) => v * 24);
  const nearY = useTransform(sy, (v) => v * 16);
  const farX = useTransform(sx, (v) => v * -14);
  const farY = useTransform(sy, (v) => v * -9);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* ---- FAR layer: morphing glossy burgundy blob (right edge, half peeking) ---- */}
      <motion.div className="absolute inset-0" style={{ x: farX, y: farY }}>
        <div
          className="shape-float-b absolute -right-14 -top-10 h-36 w-36 sm:-right-16 sm:-top-12 sm:h-60 sm:w-60"
          style={{ ["--rot" as string]: "6deg" }}
        >
          {/* morphing glossy blob */}
          <div className="blob-morph relative h-full w-full drop-shadow-[0_26px_46px_rgba(94,29,53,0.32)]">
            <span className="blob-gloss" />
            <span className="blob-glint" />
          </div>
        </div>

        {/* wireframe polyhedron — bottom left, like the reference */}
        <svg
          className="shape-float-a absolute -left-4 bottom-8 hidden h-20 w-20 text-[#c98da4] sm:block lg:left-8 lg:h-24 lg:w-24"
          style={{ ["--rot" as string]: "10deg", animationDuration: "10s" }}
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M50 8 L88 32 L88 68 L50 92 L12 68 L12 32 Z M50 8 L50 50 M88 32 L50 50 M12 32 L50 50 M50 50 L50 92 M12 68 L50 50 M88 68 L50 50"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
      </motion.div>

      {/* ---- NEAR layer: small glossy GOLD donut at the carousel level + pearl sphere ---- */}
      <motion.div className="absolute inset-0" style={{ x: nearX, y: nearY }}>
        <div
          className="donut-scene absolute -left-6 top-[68%] h-16 w-20 sm:-left-4 sm:top-[67%] sm:h-[4.5rem] sm:w-[5.5rem] lg:left-2"
          style={{ ["--rot" as string]: "-12deg" }}
        >
          <div className="donut-wobble relative h-full w-full">
            <svg viewBox="0 0 240 200" className="h-full w-full drop-shadow-[0_14px_24px_rgba(150,110,40,0.38)]">
              <defs>
                <radialGradient id="donutBody" cx="36%" cy="30%" r="80%">
                  <stop offset="0%" stopColor="#fff6dc" />
                  <stop offset="28%" stopColor="#f4d88e" />
                  <stop offset="60%" stopColor="#d9a441" />
                  <stop offset="100%" stopColor="#8a5f1c" />
                </radialGradient>
                <radialGradient id="donutHole" cx="50%" cy="42%" r="62%">
                  <stop offset="0%" stopColor="#4a3312" />
                  <stop offset="58%" stopColor="#6e4d1d" />
                  <stop offset="100%" stopColor="#b08233" />
                </radialGradient>
                <filter id="donutBlur" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="3.2" />
                </filter>
                <filter id="donutSoft" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="1.1" />
                </filter>
              </defs>
              {/* torus body — gold */}
              <ellipse cx="120" cy="100" rx="104" ry="72" fill="url(#donutBody)" />
              {/* lower inner shade — gives the tube its roundness */}
              <ellipse cx="120" cy="118" rx="104" ry="56" fill="#a97e2f" opacity="0.32" filter="url(#donutBlur)" />
              {/* the hole */}
              <ellipse cx="132" cy="96" rx="40" ry="27" fill="url(#donutHole)" />
              <ellipse cx="138" cy="90" rx="34" ry="21" fill="#3a2708" opacity="0.85" filter="url(#donutSoft)" />
              {/* big glossy specular highlight */}
              <ellipse cx="62" cy="48" rx="30" ry="14" fill="#ffffff" opacity="0.92" transform="rotate(-24 62 48)" filter="url(#donutSoft)" />
              <ellipse cx="150" cy="34" rx="16" ry="7" fill="#fff3cf" opacity="0.75" transform="rotate(-10 150 34)" filter="url(#donutSoft)" />
              {/* rim light bottom-right */}
              <path d="M196 142 Q170 168 128 170" stroke="#ffe9b8" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.55" filter="url(#donutBlur)" />
            </svg>
          </div>
        </div>

        <div className="shape-float-c absolute right-3 top-[52%] hidden h-12 w-12 sm:block lg:right-12">
          <div
            className="h-full w-full rounded-full shadow-[0_14px_26px_rgba(90,60,70,0.24)]"
            style={{
              background:
                "radial-gradient(circle at 34% 30%, #ffffff 0%, #f6f0f4 45%, #dcd0dc 78%, #c6b6c8 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* twinkling sparkles */}
      <span className="shape-twinkle absolute left-[16%] top-[30%] text-base text-[#c39c52]">✦</span>
      <span className="shape-twinkle absolute right-[24%] top-[16%] text-sm text-[#c98da4]" style={{ animationDelay: "1.2s" }}>
        ✦
      </span>
      <span className="shape-twinkle absolute left-[30%] bottom-[16%] text-xs text-[#b98d5e]" style={{ animationDelay: "2.1s" }}>
        ✦
      </span>
    </div>
  );
}

/* ============================================================
   The rotating carousel — ONLY the four project logos
   (Burger / Costa / Fashion / Education covers, nothing else):
   each logo appears twice so the cylinder stays evenly
   filled, spinning non-stop, tilting WITH THE MOUSE,
   with the project names cycling faintly above.
   ============================================================ */
const PROJECT_CARDS: { img: string; label: string }[] = [
  { img: "/work/project-bnb.jpg", label: "Burger In Box" },
  { img: "/work/project-costa.jpg", label: "Costa Coffee" },
  { img: "/work/project-english.jpg", label: "English Course" },
  { img: "/work/project-kids.jpg", label: "Kids Fashion" },
];
/* duplicate the four covers to keep the wheel balanced */
const CAROUSEL_CARDS = [...PROJECT_CARDS, ...PROJECT_CARDS];
const PROJECT_LABELS = [...new Set(PROJECT_CARDS.map((c) => c.label))];

function ProjectCarousel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 55, damping: 15 });
  const sry = useSpring(ry, { stiffness: 55, damping: 15 });

  /* faint project label cycling above the banner */
  const [labelIdx, setLabelIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLabelIdx((i) => (i + 1) % PROJECT_LABELS.length), 3000);
    return () => clearInterval(id);
  }, []);

  const N = CAROUSEL_CARDS.length;
  const RADIUS = 342;

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className="perspective-1400 relative mx-auto h-[380px] w-full max-w-3xl select-none sm:h-[460px]"
        onMouseMove={(e) => {
          const r = wrapRef.current?.getBoundingClientRect();
          if (!r) return;
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry.set(px * 14);
          rx.set(-py * 10);
        }}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        {/* faint cycling project label */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 text-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={labelIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.4, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55 }}
              className="font-serif-display text-2xl italic text-[#b98d5e] sm:text-3xl"
            >
              {PROJECT_LABELS[labelIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* mouse tilt layer */}
        <motion.div
          className="preserve-3d absolute inset-0"
          style={{ rotateX: srx, rotateY: sry }}
        >
          {/* the endlessly spinning carousel — exactly like the reference */}
          <motion.div
            className="preserve-3d absolute inset-0"
            animate={{ rotateY: 360 }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {CAROUSEL_CARDS.map((c, i) => {
              const angle = (360 / N) * i;
              return (
                <div
                  key={i}
                  className="preserve-3d absolute left-1/2 top-1/2"
                  style={{ transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${RADIUS}px)` }}
                >
                  <div
                    className="relative h-[92px] w-[164px] overflow-hidden rounded-2xl bg-white shadow-[0_26px_60px_rgba(90,40,60,0.24)] sm:h-[141px] sm:w-[250px]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <img
                      src={c.img}
                      alt={c.label}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2c0a18]/25 via-transparent to-white/10" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ground glow under the carousel */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 h-24 w-[130%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(150,90,115,0.28),transparent_70%)] blur-md" />
      </div>
    </div>
  );
}

export default function Hero({ onOpenWork }: { onOpenWork?: () => void }) {
  const [wordIdx, setWordIdx] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  /* parallax layers — cards drift up slower, glow drifts opposite */
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  /* mouse parallax driver for the floating shapes */
  const shapeMx = useMotionValue(0);
  const shapeMy = useMotionValue(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIdx((i) => (i + 1) % hero.rotatingWords.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pb-10 pt-32 sm:pt-36"
      id="hero"
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        shapeMx.set((e.clientX - r.left) / r.width - 0.5);
        shapeMy.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        shapeMx.set(0);
        shapeMy.set(0);
      }}
    >
      {/* soft pink glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 drift"
        style={{
          y: glowY,
          background:
            "radial-gradient(60% 45% at 50% 68%, rgba(238,180,205,0.5) 0%, rgba(238,180,205,0.18) 45%, transparent 75%)",
        }}
      />

      {/* floating shapes with mouse parallax */}
      <HeroShapes mx={shapeMx} my={shapeMy} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-[#eadcc2] bg-[#fdf9f0]/90 px-5 py-2.5 shadow-sm"
        >
          <Sparkle className="h-4 w-4 text-[#c39c52]" />
          <span className="text-sm font-semibold text-[#5a4750]">{hero.badge}</span>
          <span className="h-2 w-2 rounded-full bg-[#c39c52]" />
        </motion.div>

        {/* hello */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-7 text-xs font-bold tracking-[0.45em] text-[#a08a92] sm:text-sm"
        >
          ✦ &nbsp;{hero.hello}&nbsp; ✦
        </motion.p>

        {/* name — always softly glowing, lights follow the cursor anywhere */}
        <motion.div className="relative mt-2">
          <span
            aria-hidden
            className="hero-name-ghost font-serif-display pointer-events-none absolute inset-0 select-none whitespace-nowrap translate-x-3 translate-y-2 text-[21.5vw] font-black italic leading-[1.05] sm:text-[11rem] lg:text-[13rem]"
          >
            Mariam
          </span>
          <GlowName />
        </motion.div>

        {/* rotating headline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif-display mt-2 text-2xl text-[#43333e] sm:text-4xl"
        >
          a{" "}
          <span className="relative inline-block text-[#7c3552] italic">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                {hero.rotatingWords[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          <span className="font-body text-[#6b5760]">{hero.rest}</span>
        </motion.p>

        {/* paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#7a6771] sm:text-lg"
        >
          {hero.paragraph}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#work"
              className="group relative inline-block overflow-hidden rounded-full bg-[#5e1d35] px-8 py-4 text-base font-bold text-[#fbf3e6] shadow-[0_10px_28px_rgba(94,29,53,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#4a1229]"
            >
              <span className="shine-host absolute inset-0 rounded-full" />
              <span className="relative">{hero.primaryCta}</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-block rounded-full border border-[#d9c8b2] bg-[#fdf9f0]/80 px-8 py-4 text-base font-bold text-[#5a4750] transition-all hover:-translate-y-0.5 hover:border-[#c39c52] hover:text-[#5e1d35]"
            >
              {hero.secondaryCta}
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* rotating carousel — project covers + glass panels */}
      <motion.div className="relative z-10 mt-8" style={{ y: cardsY, opacity: fade }}>
        <ProjectCarousel />
      </motion.div>

      {/* bottom labels */}
      <div className="relative z-10 mx-auto mt-10 flex max-w-6xl items-center justify-between px-6 text-[11px] font-bold tracking-[0.3em] text-[#a08a92] sm:text-xs">
        <span>{hero.bottomLabels[0]}</span>
        <span className="hidden sm:block">{hero.bottomLabels[1]}</span>
        <span>{hero.bottomLabels[2]}</span>
      </div>
    </section>
  );
}
