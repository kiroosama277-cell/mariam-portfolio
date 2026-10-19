"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import type { ProjectItem } from "./data";
import { projects } from "./data";
import {
  CasePill,
  CaseHeading,
  CaseSection,
  SlideCard,
  TagRow,
  fadeUp,
} from "./case-bits";

/* ============================================================
   One deck page image with a graceful entrance:
   a soft cream skeleton pulses in the frame while the page
   loads, then the page fades in from a gentle blur + zoom.
   ============================================================ */
function DeckImage({
  src,
  alt,
  eager = false,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  // cached images can finish before React attaches onLoad — catch that too
  const attach = (el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#f3ecdd]">
      {/* skeleton while the page is on its way */}
      <div
        aria-hidden
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#f3ecdd] via-[#faf4e8] to-[#efe5d2]" />
        <span className="relative flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-[#b98d5e]/70">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          LOADING PAGE
        </span>
      </div>

      <img
        ref={attach}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`max-h-[44vh] w-full rounded-2xl object-contain transition-all duration-700 ease-out sm:max-h-[52vh] ${
          loaded ? "scale-100 opacity-100 blur-0" : "scale-[1.045] opacity-0 blur-md"
        }`}
      />
    </div>
  );
}

/* ============================================================
   THE DECK — exactly like reading the original PDF:
   every page is displayed on its own, and its details are
   written right BESIDE it. Sides alternate like a book,
   each row fades up gently as you scroll.
   ============================================================ */
function DeckReader({ item }: { item: ProjectItem }) {
  const total = item.slides?.length ?? 0;
  return (
    <CaseSection>
      <div className="text-center">
        <CasePill text="THE FULL DECK" />
        <CaseHeading title1="Every page, " accent="with its details" />
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#7a6771] sm:text-base">
          Just like the original PDF — every page is here, big and clear,
          with its notes written right beside it. Scroll and read through.
        </p>
      </div>

      <div className="mt-14 space-y-14 sm:space-y-20">
        {item.slides?.map((src, i) => {
          const raw = item.slideCaptions?.[i] ?? `${item.title} — page ${i + 1}`;
          const sep = raw.indexOf(" — ");
          const capTitle = sep > -1 ? raw.slice(0, sep) : raw;
          const capDetail = sep > -1 ? raw.slice(sep + 3) : "";
          const flip = i % 2 === 1;
          return (
            <motion.div
              key={src + i}
              initial={{ opacity: 0, y: 54, scale: 0.965 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-6 md:grid-cols-2 md:gap-10"
            >
              {/* ---- the page itself ---- */}
              <figure className={`group relative ${flip ? "md:order-2" : ""}`}>
                <div className="rounded-3xl border border-[#efe4cf] bg-white p-2.5 shadow-[0_18px_44px_rgba(60,15,35,0.10)] transition-shadow duration-500 group-hover:shadow-[0_26px_60px_rgba(60,15,35,0.16)] sm:p-3">
                  <DeckImage src={src} alt={capTitle} eager={i < 2} />
                </div>
                <span className="absolute -top-3 left-5 rounded-full bg-[#5e1d35] px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] text-[#f0dcae] shadow-md sm:text-[11px]">
                  PAGE {String(i + 1).padStart(2, "0")}
                </span>
              </figure>

              {/* ---- its details, written beside it ---- */}
              <div className={`${flip ? "md:order-1 md:text-right" : ""}`}>
                <span
                  aria-hidden
                  className="font-serif-display pointer-events-none block select-none text-7xl font-black italic leading-none text-[#5e1d35]/10 sm:text-8xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif-display mt-1 text-2xl italic leading-snug text-[#5e1d35] sm:text-3xl">
                  {capTitle}
                </h3>
                {capDetail && (
                  <p className="mt-3 text-[15px] leading-[1.85] text-[#6b5760] sm:text-base">
                    {capDetail}
                  </p>
                )}
                <p className="mt-4 text-[11px] font-bold tracking-[0.3em] text-[#b98d5e]">
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </CaseSection>
  );
}

/* ============================================================
   A full page for EVERY project — exactly like the Burger In
   Box case study: cover, highlights, the whole deck as a
   buttery slideshow, all the details, then next & previous.
   ============================================================ */
export default function ProjectPage({
  item,
  onBack,
  onOpenProject,
  onContact,
}: {
  item: ProjectItem;
  onBack: () => void;
  onOpenProject: (slug: string) => void;
  onContact: () => void;
}) {
  const idx = projects.items.findIndex((p) => p.slug === item.slug);
  const prevItem = projects.items[(idx - 1 + projects.items.length) % projects.items.length];
  const nextItem = projects.items[(idx + 1) % projects.items.length];

  return (
    <div className="min-h-screen bg-[#f6efe4]">
      {/* navbar */}
      <header className="sticky top-0 z-50 border-b border-[#eadcc2]/70 bg-[#f6efe4]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <button
            onClick={onBack}
            className="flex items-center gap-2.5 rounded-full border border-[#e5d9c4] bg-[#fdf9f0] px-5 py-2.5 text-[15px] font-semibold text-[#5a4750] shadow-sm transition-all hover:-translate-x-0.5 hover:border-[#c39c52] hover:text-[#5e1d35]"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            Back to my world
          </button>
          <p className="font-serif-display text-xl italic text-[#5e1d35] sm:text-2xl">
            {item.title}
          </p>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden pb-8 pt-14 sm:pt-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 0%, rgba(238,180,205,0.4) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="text-center">
            <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.5em] text-[#a08a92]">
              ✦ {item.category} ✦
            </span>
            <h1 className="font-serif-display mt-4 text-[13vw] font-black italic leading-[1.02] text-[#5e1d35] sm:text-8xl">
              {item.title}
            </h1>
            <p dir="rtl" className="font-arabic mt-3 text-2xl font-semibold text-[#7c3552] sm:text-4xl">
              {item.arabic}
            </p>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-7 max-w-2xl text-left text-lg leading-[1.85] text-[#6b5760]"
          >
            {item.desc}
          </motion.p>

          <TagRow tags={item.tags} />

          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }} className="mt-10">
            <SlideCard src={item.image} label={item.title} />
          </motion.div>
        </div>
      </section>

      {/* ---------- highlights ---------- */}
      {item.highlights && item.highlights.length > 0 && (
        <CaseSection>
          <CasePill text="WHAT'S INSIDE" />
          <CaseHeading title1="The sweet " accent="highlights" />
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {item.highlights.map((h, i) => (
              <motion.div
                key={h}
                {...fadeUp}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="flex items-center gap-4 rounded-2xl border border-[#efe4cf] bg-[#fdfaf3] p-5 shadow-[0_10px_28px_rgba(60,15,35,0.07)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5e1d35] text-[#f0dcae] shadow-md">
                  <Sparkles className="h-5 w-5" />
                </span>
                <p className="text-[15px] font-semibold leading-snug text-[#4d3c46]">{h}</p>
              </motion.div>
            ))}
          </div>
        </CaseSection>
      )}

      {/* ---------- the full deck — like the PDF, page beside its details ---------- */}
      {item.slides && item.slides.length > 0 && <DeckReader item={item} />}

      {/* ---------- all the details ---------- */}
      {item.info && item.info.length > 0 && (
        <CaseSection>
          <CasePill text="THE DETAILS" />
          <CaseHeading title1="Everything in " accent="black & white" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {item.info.map((block) => (
              <motion.div
                key={block.heading}
                {...fadeUp}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-[#efe4cf] bg-white/80 p-6 shadow-[0_12px_34px_rgba(60,15,35,0.08)] sm:p-7"
              >
                <p className="font-serif-display text-xl italic text-[#5e1d35]">{block.heading}</p>
                <dl className="mt-4 space-y-2.5">
                  {block.rows.map((r) => (
                    <div
                      key={r.k}
                      className="grid gap-0.5 border-b border-[#f3ead8] pb-2.5 last:border-0 last:pb-0 sm:grid-cols-[170px_1fr] sm:gap-4"
                    >
                      <dt className="text-[13px] font-bold tracking-wide text-[#b98d5e]">{r.k}</dt>
                      <dd className="text-[15px] leading-relaxed text-[#5f4d57]">{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            ))}
          </div>
        </CaseSection>
      )}

      {/* ---------- CTA ---------- */}
      <CaseSection dark className="!py-14 sm:!py-16">
        <div className="text-center">
          <motion.p {...fadeUp} transition={{ duration: 0.6 }} className="font-serif-display text-3xl text-[#f9f1e2] sm:text-5xl">
            Like this one? <span className="italic text-[#ecc06a]">There's more where it came from.</span>
          </motion.p>
          <motion.button
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={onContact}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f0dcae] px-8 py-4 text-base font-bold text-[#4a1229] shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#f6e6c2]"
          >
            Let's make yours
            <ArrowUpRight className="h-5 w-5" />
          </motion.button>
        </div>
      </CaseSection>

      {/* ---------- prev / next ---------- */}
      <section className="border-t border-[#eadcc2] bg-[#f6efe4] py-12">
        <div className="mx-auto grid max-w-5xl gap-5 px-4 sm:grid-cols-2">
          {[
            { p: prevItem, label: "Previous project", icon: "left" as const },
            { p: nextItem, label: "Next project", icon: "right" as const },
          ].map(({ p, label, icon }) => (
            <button
              key={label}
              onClick={() => onOpenProject(p.slug)}
              className={`group flex items-center gap-4 rounded-3xl border border-[#efe4cf] bg-[#fdfaf3] p-4 text-left shadow-[0_12px_30px_rgba(60,15,35,0.07)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(60,15,35,0.12)] ${
                icon === "right" ? "sm:flex-row-reverse sm:text-right" : ""
              }`}
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-20 w-28 flex-none rounded-2xl object-cover shadow-md"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold tracking-[0.28em] text-[#b98d5e] uppercase">
                  {label}
                </span>
                <span className="font-serif-display mt-1 block truncate text-xl text-[#3f2f3a] transition-colors group-hover:text-[#5e1d35]">
                  {p.title}
                </span>
                <span className="mt-0.5 block text-[11px] font-semibold tracking-wide text-[#a08a92]">
                  {p.category}
                </span>
              </span>
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[#e5d9c4] text-[#5e1d35] transition-all group-hover:bg-[#5e1d35] group-hover:text-white">
                {icon === "left" ? <ArrowLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
