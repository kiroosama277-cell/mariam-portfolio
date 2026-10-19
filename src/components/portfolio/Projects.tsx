"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "./data";
import { FadeUp, TiltCard, WordsReveal } from "./fx";

type ProjectItem = (typeof projects.items)[number];

/* fanned-deck rest rotations — cards sit slightly tilted like the
   reference spread, then straighten when you hover them */
const REST_ROT = [-2.2, 1.8, -1.6, 2.2, -1.8];

function ProjectVisual({ item, hovered }: { item: ProjectItem; hovered: boolean }) {
  return (
    <div className="relative h-56 overflow-hidden sm:h-60">
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span
        className={`absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#fdf6ea]/95 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-[#5e1d35] shadow transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        {item.hasCaseStudy ? "OPEN CASE STUDY ✦" : "OPEN THE FULL PAGE ✦"}
      </span>
    </div>
  );
}

function ProjectCard({
  item,
  hovered,
}: {
  item: ProjectItem;
  hovered: boolean;
}) {
  return (
    <TiltCard
      className={`h-full overflow-hidden rounded-3xl border border-[#efe4cf] bg-[#fdfaf3] text-left shadow-[0_16px_44px_rgba(90,40,60,0.1)] transition-shadow duration-500 group-hover:shadow-[0_26px_60px_rgba(90,40,60,0.18)] cursor-pointer`}
    >
      <div className="relative">
        <ProjectVisual item={item} hovered={hovered} />
        <span className="font-serif-display absolute left-6 top-5 rounded-full bg-white/85 px-3 py-1 text-xl italic text-[#5e1d35] shadow-sm backdrop-blur-sm">
          {item.num}
        </span>
        {/* tags overlay bottom of visual */}
        <div className="absolute bottom-4 left-5 right-5 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-bold text-[#5a4750] shadow-sm backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 p-6 pt-5">
        <div>
          <h3 className="font-serif-display text-2xl text-[#3f2f3a] sm:text-[1.7rem]">{item.title}</h3>
          <p className="mt-1 text-[11px] font-bold tracking-[0.22em] text-[#b98d5e]">{item.category}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#7a6771]">{item.desc}</p>
        </div>
        <span
          className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            hovered
              ? "scale-110 border-[#5e1d35] bg-[#5e1d35] text-white shadow-[0_10px_24px_rgba(94,29,53,0.35)]"
              : "border-[#e5d9c4] bg-transparent text-[#5e1d35]"
          }`}
        >
          {hovered ? <ArrowRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
        </span>
      </div>
    </TiltCard>
  );
}

export default function Projects({
  onOpenProject,
}: {
  onOpenProject: (slug: string) => void;
}) {
  const [hoveredNum, setHoveredNum] = useState<string | null>(null);

  return (
    <section id="work" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#eadcc2] bg-[#fdf9f0] px-5 py-2 text-[11px] font-bold tracking-[0.3em] text-[#8a6d35]">
              <span className="text-[#c39c52]">✦</span> {projects.pill}
            </span>
          </FadeUp>
          <h2 className="font-serif-display mt-5 text-4xl text-[#3f2f3a] sm:text-6xl">
            <WordsReveal
              text={projects.title1}
              accent={projects.titleAccent}
              accentClassName="underline-gold italic text-[#7c3552]"
            />
          </h2>
          <FadeUp delay={0.15}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#7a6771] sm:text-lg">
              {projects.subtitle}
            </p>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-8 sm:gap-9 md:grid-cols-2">
          {projects.items.map((item, i) => (
            <motion.article
              key={item.num}
              initial={{ opacity: 0, y: 56, rotate: REST_ROT[i % REST_ROT.length] }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: REST_ROT[i % REST_ROT.length],
              }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ rotate: 0, y: -10, scale: 1.012 }}
              transition={{
                opacity: { duration: 0.7, delay: (i % 2) * 0.12 },
                y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                rotate: { type: "spring", stiffness: 200, damping: 17 },
                scale: { type: "spring", stiffness: 200, damping: 17 },
              }}
              className="group"
              onMouseEnter={() => setHoveredNum(item.num)}
              onMouseLeave={() => setHoveredNum(null)}
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={`Open ${item.title}`}
                onClick={() => onOpenProject(item.slug)}
                onKeyDown={(e) => e.key === "Enter" && onOpenProject(item.slug)}
                className="outline-none focus-visible:ring-2 focus-visible:ring-[#c39c52] rounded-3xl"
              >
                <ProjectCard item={item} hovered={hoveredNum === item.num} />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 text-center text-[15px] text-[#8d7a84]"
        >
          {projects.footnote}
        </motion.p>
      </div>
    </section>
  );
}
