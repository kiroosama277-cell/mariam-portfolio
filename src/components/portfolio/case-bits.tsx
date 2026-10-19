"use client";

import { motion } from "framer-motion";
import {
  Store,
  Users,
  Tag,
  Swords,
  Scale,
  Target,
  Flame,
  Share2,
  CalendarDays,
  Lightbulb,
  HeartHandshake,
  Clapperboard,
  Megaphone,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
} as const;

/* ---------- small building blocks ---------- */

export function CasePill({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[11px] font-bold tracking-[0.28em] ${
        dark
          ? "border-[#c39c52]/50 bg-white/10 text-[#f0dcae]"
          : "border-[#eadcc2] bg-[#fdf9f0] text-[#8a6d35]"
      }`}
    >
      <span className="text-[#c39c52]">✦</span> {text}
    </span>
  );
}

export function CaseHeading({
  title1,
  accent,
  dark = false,
  className = "",
}: {
  title1: string;
  accent: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-serif-display mt-5 text-3xl leading-tight sm:text-5xl ${
        dark ? "text-[#f9f1e2]" : "text-[#3f2f3a]"
      } ${className}`}
    >
      {title1}
      <span className={`italic ${dark ? "text-[#ecc06a]" : "text-[#7c3552] underline-gold"}`}>
        {accent}
      </span>
    </h2>
  );
}

export function SlideCard({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.figure
      {...fadeUp}
      transition={{ duration: 0.7 }}
      className={`group relative overflow-hidden rounded-2xl border border-[#efe4cf] bg-white shadow-[0_16px_40px_rgba(90,40,60,0.1)] ${className}`}
    >
      { }
      <img src={src} alt={label} loading="lazy" className="w-full object-cover" />
      {/* label is visually hidden — it's already baked into the artwork itself */}
      <figcaption className="sr-only">{label}</figcaption>
    </motion.figure>
  );
}

export function ArabicNote({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.7 }}
      className={`rounded-2xl border border-[#eaddc4] bg-[#f8f1e2] px-6 py-5 shadow-[0_10px_30px_rgba(90,40,60,0.07)] ${className}`}
    >
      <p dir="rtl" className="font-arabic text-lg leading-[2] text-[#4d3c46] sm:text-xl">
        {text}
      </p>
    </motion.div>
  );
}

function IconBadge({ icon, tone }: { icon: string; tone: string }) {
  const map: Record<string, React.ReactNode> = {
    store: <Store className="h-6 w-6" />,
    users: <Users className="h-6 w-6" />,
    tag: <Tag className="h-6 w-6" />,
    swords: <Swords className="h-6 w-6" />,
    scale: <Scale className="h-6 w-6" />,
    target: <Target className="h-6 w-6" />,
    flame: <Flame className="h-6 w-6" />,
    share: <Share2 className="h-6 w-6" />,
    calendar: <CalendarDays className="h-6 w-6" />,
    lightbulb: <Lightbulb className="h-6 w-6" />,
    heartHandshake: <HeartHandshake className="h-6 w-6" />,
    clapperboard: <Clapperboard className="h-6 w-6" />,
    megaphone: <Megaphone className="h-6 w-6" />,
  };
  const tones: Record<string, string> = {
    burgundy: "bg-[#5e1d35] text-[#f6ead4]",
    gold: "bg-[#c39c52] text-white",
    pink: "bg-[#d990ad] text-white",
  };
  return (
    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${tones[tone] ?? tones.burgundy}`}>
      {map[icon] ?? map.store}
    </span>
  );
}

/* ---------- section wrappers ---------- */

export function CaseSection({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`relative py-16 sm:py-20 ${className}`}
      style={dark ? { background: "#5c1b34" } : undefined}
    >
      <div className="mx-auto max-w-5xl px-4">{children}</div>
    </section>
  );
}

export function InfoCard({
  icon,
  tone = "burgundy",
  title,
  desc,
  dark = false,
}: {
  icon: string;
  tone?: string;
  title: string;
  desc: string;
  dark?: boolean;
}) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6 }}
      className={`rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1 ${
        dark
          ? "border-white/15 bg-white/10 shadow-[0_12px_34px_rgba(30,5,18,0.3)]"
          : "border-[#efe4cf] bg-[#fdfaf3] shadow-[0_12px_34px_rgba(60,15,35,0.1)]"
      }`}
    >
      <IconBadge icon={icon} tone={tone} />
      <h3
        className={`font-serif-display mt-5 text-[1.45rem] leading-snug ${
          dark ? "text-[#f9f1e2]" : "text-[#3f2f3a]"
        }`}
      >
        {title}
      </h3>
      <p className={`mt-2.5 text-[15px] leading-relaxed ${dark ? "text-[#e3c9d3]" : "text-[#7a6771]"}`}>
        {desc}
      </p>
    </motion.div>
  );
}

export function ObjectiveCard({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-white/12 bg-[#6d2440]/70 p-6 shadow-[0_14px_36px_rgba(30,5,18,0.35)]"
    >
      <span className="font-serif-display text-2xl italic text-[#ecc06a]">{num}</span>
      <h3 className="font-serif-display mt-2 text-2xl text-[#f9f1e2]">{title}</h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-[#e3c9d3]">{desc}</p>
    </motion.div>
  );
}

export function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="mt-7 flex flex-wrap justify-center gap-3">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-[#e5d9c4] bg-[#fdf9f0]/90 px-4.5 py-2.5 text-sm font-semibold text-[#5a4750] shadow-sm"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export { fadeUp };
