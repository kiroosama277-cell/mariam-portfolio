"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/* ============================================================
   Designer-style intro (Pinterest reference):
   light gray canvas, sliding double "PORTFOLIO" over a red
   banner, and a wheel of cards that FOLLOWS THE MOUSE —
   the girl portrait card sits in the fan. No 3D character.
   ============================================================ */

/* ---------------- Ambient sound (WebAudio, synthesized) ---------------- */
function useAmbient() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(false);

  const fadeTo = useCallback((v: number, secs = 0.9) => {
    const ctx = ctxRef.current;
    const m = masterRef.current;
    if (!ctx || !m) return;
    m.gain.cancelScheduledValues(ctx.currentTime);
    m.gain.setValueAtTime(Math.max(m.gain.value, 0.0001), ctx.currentTime);
    m.gain.linearRampToValueAtTime(v, ctx.currentTime + secs);
  }, []);

  const start = useCallback(() => {
    if (ctxRef.current) {
      fadeTo(0.07);
      setMuted(false);
      setEnabled(true);
      return;
    }
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 620;
    lp.Q.value = 0.4;
    lp.connect(master);
    [87.31, 130.81, 220.0, 349.23].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i < 3 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = (i - 1.5) * 3;
      const g = ctx.createGain();
      g.gain.value = i < 3 ? 0.26 : 0.05;
      o.connect(g);
      g.connect(lp);
      o.start();
    });
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 170;
    lfo.connect(lfoG);
    lfoG.connect(lp.frequency);
    lfo.start();

    const nbuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = nbuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = nbuf;
    noise.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 5200;
    bp.Q.value = 0.6;
    const ng = ctx.createGain();
    ng.gain.value = 0.006;
    noise.connect(bp);
    bp.connect(ng);
    ng.connect(master);
    noise.start();

    master.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 3);
    ctxRef.current = ctx;
    masterRef.current = master;
    setEnabled(true);
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (!ctxRef.current) {
      start();
      return;
    }
    setMuted((m) => {
      fadeTo(m ? 0.07 : 0.0001);
      return !m;
    });
  }, [start, fadeTo]);

  const stop = useCallback(() => fadeTo(0.0001, 0.6), [fadeTo]);

  useEffect(() => () => void ctxRef.current?.close(), []);

  return { enabled, muted, start, toggle, stop };
}

/* ---------------- Fan deck ---------------- */
type CardSpec =
  | { kind: "img"; src: string; tag?: string; pos?: string }
  | { kind: "eye" }
  | { kind: "dark" }
  | { kind: "cream" };

const FAN: CardSpec[] = [
  { kind: "img", src: "/work/about.jpg", tag: "MARIAM ✦" }, // the girl
  { kind: "eye" },
  { kind: "img", src: "/work/project-bnb.jpg" },
  { kind: "dark" },
  { kind: "img", src: "/work/banner-bnb.jpg", pos: "20% 40%" },
  { kind: "img", src: "/work/abaya-aw1.jpg" },
  { kind: "cream" },
  { kind: "img", src: "/work/reel-big.jpg", pos: "72% 30%" },
  { kind: "img", src: "/work/slide33.jpg" },
];
const N = FAN.length;
const STEP = 360 / N;

const PLUS = [
  { x: "8%", y: "40%", c: "#141414", s: 20 },
  { x: "15%", y: "68%", c: "#9a9a98", s: 15 },
  { x: "89%", y: "36%", c: "#141414", s: 20 },
  { x: "79%", y: "13%", c: "#9a9a98", s: 15 },
  { x: "42%", y: "7.5%", c: "#141414", s: 16 },
  { x: "28%", y: "27%", c: "#9a9a98", s: 14 },
  { x: "70%", y: "58%", c: "#9a9a98", s: 15 },
  { x: "93%", y: "74%", c: "#141414", s: 18 },
  { x: "4%", y: "14%", c: "#9a9a98", s: 14 },
];

/* scalloped seal with an eye — the red card */
function EyeSeal({ className }: { className?: string }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {petals.map((a) => (
        <circle
          key={a}
          cx={50 + 24 * Math.sin((a * Math.PI) / 180)}
          cy={50 - 24 * Math.cos((a * Math.PI) / 180)}
          r="13.5"
          fill="#141414"
        />
      ))}
      <circle cx="50" cy="50" r="27" fill="#141414" />
      <ellipse cx="50" cy="50" rx="17.5" ry="10.5" fill="#d63b2f" />
      <circle cx="50" cy="50" r="5.5" fill="#141414" />
    </svg>
  );
}

function EyeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

function CardFace({ spec }: { spec: CardSpec }) {
  if (spec.kind === "img") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_44px_rgba(20,20,20,0.28)]">
        <img
          src={spec.src}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: spec.pos ?? "50% 45%" }}
          draggable={false}
        />
        {spec.tag && (
          <span className="absolute right-2.5 top-2.5 text-[9px] font-extrabold tracking-[0.18em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
            {spec.tag}
          </span>
        )}
      </div>
    );
  }
  if (spec.kind === "eye") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#d63b2f] shadow-[0_18px_44px_rgba(20,20,20,0.3)]">
        <EyeSeal className="h-[62%] w-[62%]" />
        <span className="absolute left-3 top-3 text-[8px] font-extrabold tracking-[0.2em] text-[#141414]">
          ✦ M
        </span>
        <span className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-[#141414]" />
      </div>
    );
  }
  if (spec.kind === "dark") {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#141414] shadow-[0_18px_44px_rgba(20,20,20,0.35)]">
        <span className="font-serif-display text-4xl font-bold italic text-[#f4efe6]">
          M<span className="not-italic text-[#d63b2f]">✦</span>
        </span>
        <span className="mt-3 text-[7.5px] font-extrabold tracking-[0.34em] text-[#f4efe6]/75">
          MARKETING ✦ DESIGN
        </span>
        <span className="absolute bottom-2.5 left-3 text-[8px] font-extrabold tracking-[0.2em] text-[#f4efe6]/50">
          2025
        </span>
        <div className="absolute inset-x-5 top-5 border-t border-[#f4efe6]/20" />
        <div className="absolute inset-x-5 bottom-8 border-t border-[#f4efe6]/20" />
      </div>
    );
  }
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#f4efe6] shadow-[0_18px_44px_rgba(20,20,20,0.25)]">
      <span className="text-5xl text-[#5e1d35]">✦</span>
      <span className="mt-2 text-[8px] font-extrabold tracking-[0.3em] text-[#5e1d35]">
        PORTFOLIO — 2025
      </span>
      <div className="absolute inset-x-4 top-4 border-t border-[#5e1d35]/25" />
      <div className="absolute inset-x-4 bottom-4 border-t border-[#5e1d35]/25" />
    </div>
  );
}

/* ---------------- Main intro screen ---------------- */
export default function IntroScreen({
  onExited,
}: {
  onExited: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [entering, setEntering] = useState(false);
  const exitingRef = useRef(false);
  const enteringRef = useRef(false);
  const sound = useAmbient();

  /* responsive geometry — also used by the rAF loop through dimsRef */
  const [dims, setDims] = useState({
    w: 1440,
    h: 900,
    cardW: 178,
    cardH: 253,
    R: 400,
    cy: 900,
    bannerW: 186,
    bannerH: 414,
    badge: 176,
  });
  const dimsRef = useRef(dims);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const small = w < 640;
      const cardW = small ? 132 : w < 1024 ? 168 : 208;
      const cardH = Math.round(cardW * 1.42);
      const R = small
        ? Math.min(w * 0.8, h * 0.45)
        : Math.min(w * 0.44, h * 0.43);
      const next = {
        w,
        h,
        cardW,
        cardH,
        R,
        cy: h * 0.975,
        bannerW: small ? Math.round(w * 0.19) : Math.min(190, Math.round(w * 0.132)),
        bannerH: Math.round(h * (small ? 0.35 : 0.41)),
        badge: small ? 128 : 178,
      };
      dimsRef.current = next;
      setDims(next);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* mouse / touch — feeds the wheel */
  const mouse = useRef({ x: 0, tx: 0, y: 0, ty: 0 });
  useEffect(() => {
    const move = (x: number, y: number) => {
      mouse.current.tx = (x / window.innerWidth) * 2 - 1;
      mouse.current.ty = (y / window.innerHeight) * 2 - 1;
    };
    const mm = (e: MouseEvent) => move(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => {
      if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("mousemove", mm);
    window.addEventListener("touchmove", tm, { passive: true });
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("touchmove", tm);
    };
  }, []);

  /* the wheel — one rAF loop drives every card (60fps, zero re-renders) */
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wheel = useRef({ cur: 0, auto: 0, target: 0 });
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const m = mouse.current;
      m.x += (m.tx - m.x) * Math.min(1, dt * 6);
      m.y += (m.ty - m.y) * Math.min(1, dt * 6);

      const wh = wheel.current;
      const speed = enteringRef.current ? 160 : 5.5; /* deg/sec auto drift */
      wh.auto += speed * dt;
      const target = wh.auto + m.x * 46 + wh.target;
      wh.cur += (target - wh.cur) * Math.min(1, dt * 5.2);

      const { cardW, cardH, R, cy, w: vw } = dimsRef.current;
      const cx = vw / 2;
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const aDeg = i * STEP + wh.cur;
        const a = (aDeg * Math.PI) / 180;
        const depth = Math.cos(a);
        const x = cx + R * Math.sin(a) - cardW / 2;
        const y = cy - R * depth - cardH / 2;
        const s = 0.62 + 0.42 * ((depth + 1) / 2);
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${aDeg}deg) scale(${s.toFixed(3)})`;
        el.style.zIndex = String(20 + Math.round(40 * depth));
        const p = parRefs.current[i];
        if (p)
          p.style.transform = `translate3d(${(m.x * -7 * depth).toFixed(2)}px, ${(m.y * -5).toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* opening curtain */
  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(id);
  }, []);

  const nudge = useCallback((dir: number) => {
    wheel.current.target += dir * STEP;
  }, []);

  const enter = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    enteringRef.current = true;
    setEntering(true);
    sound.stop();
    window.setTimeout(onExited, 950);
  }, [onExited, sound]);

  const cardAnim = entering
    ? { opacity: 0, y: 300, scale: 0.85 }
    : loaded
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 300, scale: 0.85 };

  return (
    <motion.section
      id="intro"
      className="font-grotesk fixed inset-0 z-40 overflow-hidden bg-[#d8d8d6] text-[#141414]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
      onClick={() => !sound.enabled && sound.start()}
    >
      {/* scattered plus marks */}
      {PLUS.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute z-[3] select-none font-light leading-none"
          style={{ left: p.x, top: p.y, color: p.c, fontSize: p.s }}
          aria-hidden
        >
          +
        </span>
      ))}

      {/* ================= header ================= */}
      <motion.div
        initial={{ opacity: 0, x: -22 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[5vw] top-[6.5vh] z-20 leading-[1.18]"
      >
        <p className="text-[clamp(0.9rem,1.5vw,1.3rem)] font-extrabold uppercase tracking-[0.05em]">
          Welcome
        </p>
        <p className="text-[clamp(0.9rem,1.5vw,1.3rem)] font-extrabold uppercase tracking-[0.05em]">
          to my
        </p>
      </motion.div>

      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          enter();
        }}
        aria-label="Enter site"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotate: -14, scale: 1.08 }}
        className="absolute right-[5vw] top-[5.6vh] z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#141414] text-[#d8d8d6] transition-colors hover:bg-[#d63b2f] sm:h-12 sm:w-12"
      >
        <EyeMark className="h-5 w-5" />
      </motion.button>

      {/* ================= title block ================= */}
      <div className="absolute inset-x-0 top-[15vh] z-10 sm:top-[12vh]">
        <div className="relative flex flex-col items-center">
          {/* red banner */}
          <motion.div
            className="absolute left-1/2 top-[41%] z-[1] -translate-x-1/2 -translate-y-1/2 bg-[#d63b2f]"
            style={{ width: dims.bannerW, height: dims.bannerH }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: entering ? 40 : 1 }}
            transition={
              entering
                ? { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
                : { delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }
            }
          />

          {/* sliding double PORTFOLIO */}
          <motion.div
            className="pf-strip relative w-full"
            style={{ height: "clamp(76px, 13.5vw, 196px)" }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pf-row pf-outline" aria-hidden>
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="pr-[0.3em]">
                  PORTFOLIO
                </span>
              ))}
            </div>
            <div className="pf-row pf-solid">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="pr-[0.3em]">
                  PORTFOLIO
                </span>
              ))}
            </div>
          </motion.div>

          {/* designer name row */}
          <motion.div
            className="relative z-[4] mt-3 flex w-full items-center justify-between px-[5vw] sm:mt-5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: entering ? 0 : 1, y: entering ? 12 : 0 }}
            transition={{ delay: entering ? 0 : 0.55, duration: 0.6 }}
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] sm:text-xs">
              Mariam
            </p>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] sm:text-xs">
              Marketing &amp; Design
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= side arrows ================= */}
      {[0, 1].map((side) => (
        <motion.button
          key={side}
          onClick={(e) => {
            e.stopPropagation();
            nudge(side === 0 ? 1 : -1);
          }}
          aria-label={side === 0 ? "Rotate cards left" : "Rotate cards right"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          whileHover={{ scale: 1.45, x: side === 0 ? -3 : 3 }}
          whileTap={{ scale: 0.85 }}
          className={`absolute top-[44%] z-30 hidden h-10 w-10 items-center justify-center sm:flex ${
            side === 0 ? "left-[2.1vw]" : "right-[2.1vw]"
          }`}
        >
          <svg
            viewBox="0 0 12 14"
            className={`h-3.5 w-3.5 ${side === 1 ? "rotate-180" : ""}`}
            aria-hidden
          >
            <path d="M11 7 1 13.5V.5L11 7Z" fill="#141414" />
          </svg>
        </motion.button>
      ))}

      {/* ================= card wheel ================= */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {FAN.map((spec, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute left-0 top-0 will-change-transform"
            style={{ width: dims.cardW, height: dims.cardH }}
          >
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0, y: 300, scale: 0.85 }}
              animate={cardAnim}
              transition={
                entering
                  ? { duration: 0.45, ease: [0.76, 0, 0.24, 1] }
                  : {
                      delay: 0.45 + i * 0.07,
                      duration: 0.95,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              <div
                ref={(el) => {
                  parRefs.current[i] = el;
                }}
                className="h-full w-full will-change-transform"
              >
                <CardFace spec={spec} />
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* ================= circular badge — wheel center / enter ================= */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          enter();
        }}
        aria-label="Enter the site"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: entering ? 1.15 : 1, opacity: entering ? 0 : 1 }}
        transition={
          entering
            ? { duration: 0.4 }
            : { delay: 0.95, type: "spring", stiffness: 130, damping: 15 }
        }
        whileHover={{ scale: 1.06 }}
        className="group absolute bottom-0 left-1/2 z-[6] -translate-x-1/2 translate-y-[38%]"
        style={{ width: dims.badge, height: dims.badge }}
      >
        <svg
          viewBox="0 0 200 200"
          className="spin-slow absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <path
              id="badge-circ"
              d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
            />
          </defs>
          <text
            className="fill-[#141414] font-grotesk"
            style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "3px" }}
          >
            <textPath href="#badge-circ">
              MARIAM ✦ PORTFOLIO ✦ MARIAM ✦ PORTFOLIO ✦
            </textPath>
          </text>
        </svg>
        <div className="absolute inset-[16%] rounded-full border border-dashed border-[#141414]/50 transition-colors duration-300 group-hover:border-[#d63b2f]" />
        <div className="absolute inset-x-0 top-[22%] flex flex-col items-center">
          <span className="text-[9px] leading-none text-[#141414]">▲</span>
          <span className="relative mt-1 block h-5 text-[12px] font-extrabold tracking-[0.24em] sm:text-[13px]">
            <span className="transition-opacity duration-300 group-hover:opacity-0">
              ME
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-[#d63b2f] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              ENTER
            </span>
          </span>
        </div>
      </motion.button>

      {/* ================= chrome ================= */}
      <motion.div
        className="absolute inset-0 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: entering ? 0 : 1 }}
        transition={{ duration: 0.5, delay: entering ? 0 : 1.05 }}
      >
        {/* hint — centered above the badge on mobile, corner on desktop */}
        <div className="absolute bottom-[104px] left-1/2 -translate-x-1/2 text-center sm:bottom-[4.5vh] sm:left-[5vw] sm:translate-x-0 sm:text-left">
          <p className="hint-pulse whitespace-nowrap text-[9px] font-extrabold uppercase tracking-[0.3em] sm:text-[10px]">
            ◆ Click the badge to enter
          </p>
        </div>

        {/* sound toggle — bottom right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.toggle();
          }}
          aria-label="Toggle ambient sound"
          className="absolute bottom-[4vh] right-[5vw] flex h-10 w-10 items-center justify-center rounded-full bg-[#141414] text-[#d8d8d6] transition-colors hover:bg-[#d63b2f] sm:h-11 sm:w-11"
        >
          {sound.muted || !sound.enabled ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>
      </motion.div>

      {/* ================= red exit wipe ================= */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[80] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: entering ? 1 : 0 }}
        transition={{ duration: 0.01, delay: entering ? 0.05 : 0 }}
      >
        <motion.div
          className="flex items-center justify-center bg-[#d63b2f]"
          initial={{ width: dims.bannerW, height: dims.bannerH }}
          animate={
            entering
              ? { width: "104vw", height: "104vh" }
              : { width: dims.bannerW, height: dims.bannerH }
          }
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="text-sm font-extrabold uppercase tracking-[0.4em] text-white/95 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: entering ? 1 : 0 }}
            transition={{ delay: entering ? 0.5 : 0, duration: 0.3 }}
          >
            Mariam ✦
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
