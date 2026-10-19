"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Hand,
  CalendarHeart,
  Star,
  Quote,
  Lightbulb,
  HeartHandshake,
  Clapperboard,
  Megaphone,
  Sparkles,
} from "lucide-react";
import {
  CasePill,
  CaseHeading,
  CaseSection,
  SlideCard,
  ArabicNote,
  InfoCard,
  ObjectiveCard,
  TagRow,
  fadeUp,
} from "./case-bits";
import Slideshow from "./Slideshow";
import { caseHero, brief, competitors, audience, strategy, ideation, calendar, contentPlan, adScript, influencer, seasonal, caseEnding } from "./case-data";

/* every page of the original BNB deck */
const bnbDeck = Array.from(
  { length: 38 },
  (_, i) => `/work/slides/bnb/p-${String(i + 1).padStart(2, "0")}.jpg`
);

export default function CaseStudy({ onBack }: { onBack: () => void }) {
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
            {caseHero.backLabel}
          </button>
          <p className="font-serif-display text-xl italic text-[#5e1d35] sm:text-2xl">
            {caseHero.brand}
          </p>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden pb-10 pt-14 sm:pt-20">
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
              ✦ {caseHero.pill} ✦
            </span>
            <h1 className="font-serif-display mt-4 text-[15vw] font-black italic leading-[1.02] text-[#5e1d35] sm:text-8xl">
              {caseHero.title}
            </h1>
            <p dir="rtl" className="font-arabic mt-3 text-2xl font-semibold text-[#7c3552] sm:text-4xl">
              {caseHero.arabicTitle}
            </p>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-7 max-w-2xl text-left text-lg leading-[1.85] text-[#6b5760]"
          >
            {caseHero.description}
          </motion.p>

          <TagRow tags={caseHero.tags} />

          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }} className="mt-10">
            <SlideCard src={caseHero.banner} label={caseHero.bannerLabel} />
          </motion.div>
        </div>
      </section>

      {/* ---------- 01 the brief ---------- */}
      <CaseSection>
        <CasePill text={brief.pill} />
        <CaseHeading title1={brief.title1} accent={brief.titleAccent} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {brief.cards.map((c) => (
            <InfoCard key={c.title} {...c} />
          ))}
        </div>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
          <SlideCard src={brief.slide} label={brief.slideLabel} />
          <ArabicNote text={brief.noteAr} />
        </div>
      </CaseSection>

      {/* ---------- 02 competitor analysis ---------- */}
      <CaseSection>
        <CasePill text={competitors.pill} />
        <CaseHeading title1={competitors.title1} accent={competitors.titleAccent} />
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
          <ArabicNote text={competitors.noteAr} />
          <SlideCard src={competitors.slideTop} label={competitors.slideTopLabel} />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {competitors.cards.map((c) => (
            <InfoCard key={c.title} {...c} />
          ))}
        </div>
        <SlideCard src={competitors.slideWide} label={competitors.slideWideLabel} className="mt-10" />
      </CaseSection>

      {/* ---------- 03 audience research ---------- */}
      <CaseSection>
        <CasePill text={audience.pill} />
        <CaseHeading title1={audience.title1} accent={audience.titleAccent} />
        <p className="mt-4 max-w-xl text-[17px] text-[#7a6771]">{audience.subtitle}</p>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
          <SlideCard src={audience.slideComments} label={audience.slideCommentsLabel} />
          <ArabicNote text={audience.noteAr} />
        </div>

        {/* persona 1 */}
        <PersonaBlock persona={audience.persona1} flip />
        {/* persona 2 */}
        <PersonaBlock persona={audience.persona2} />
      </CaseSection>

      {/* ---------- 04 content strategy (burgundy) ---------- */}
      <CaseSection dark>
        <CasePill text={strategy.pill} dark />
        <CaseHeading title1={strategy.title1} accent={strategy.titleAccent} dark />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {strategy.cards.map((c) => (
            <InfoCard key={c.title} {...c} dark />
          ))}
        </div>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
          <ArabicNote text={strategy.noteAr} className="!border-white/15 !bg-white/10 shadow-none [&_p]:!text-[#f0dcae]" />
          <div className="hidden lg:block" />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <SlideCard src={strategy.slideLeft} label={strategy.slideLeftLabel} />
          <SlideCard src={strategy.slideRight} label={strategy.slideRightLabel} />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {strategy.objectives.map((o) => (
            <ObjectiveCard key={o.num} {...o} />
          ))}
        </div>
      </CaseSection>

      {/* ---------- 05 ideation ---------- */}
      <CaseSection>
        <CasePill text={ideation.pill} />
        <CaseHeading title1={ideation.title1} accent={ideation.titleAccent} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ideation.cards.map((c) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-[#efe4cf] bg-[#fdfaf3] p-6 shadow-[0_12px_34px_rgba(60,15,35,0.1)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5e1d35] text-[#f6ead4] shadow-lg [&_svg]:h-6 [&_svg]:w-6">
                {c.icon === "lightbulb" && <Lightbulb />}
                {c.icon === "heartHandshake" && <HeartHandshake />}
                {c.icon === "clapperboard" && <Clapperboard />}
              </span>
              <h3 className="font-serif-display mt-5 text-[1.45rem] text-[#3f2f3a]">{c.title}</h3>
              <ul className="mt-4 space-y-3">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#7a6771]">
                    <span className="mt-1 text-[#c39c52]">✦</span> {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </CaseSection>

      {/* ---------- 06 content calendar ---------- */}
      <CaseSection>
        <CasePill text={calendar.pill} />
        <CaseHeading title1={calendar.title1} accent={calendar.titleAccent} />
        <p className="mt-4 max-w-2xl text-[17px] text-[#7a6771]">{calendar.subtitle}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {calendar.posts.map((p) => (
            <CalendarPost key={p.num} post={p} />
          ))}
        </div>
      </CaseSection>

      {/* ---------- 07 content plan ---------- */}
      <CaseSection>
        <CasePill text={contentPlan.pill} />
        <CaseHeading title1={contentPlan.title1} accent={contentPlan.titleAccent} />
        <div className="mt-10 space-y-10">
          {contentPlan.blocks.map((b, i) => (
            <div key={i} className="grid items-center gap-8 lg:grid-cols-2">
              <PlanCard block={b} />
              {b.slide ? (
                <SlideCard src={b.slide} label={b.slideLabel} />
              ) : (
                <div className="hidden lg:block" />
              )}
            </div>
          ))}
        </div>
      </CaseSection>

      {/* ---------- 08 ad script (burgundy) ---------- */}
      <CaseSection dark>
        <CasePill text={adScript.pill} dark />
        <CaseHeading title1={adScript.title1} accent={adScript.titleAccent} dark />
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            {adScript.scenes.map((s) => (
              <motion.div
                key={s.num}
                {...fadeUp}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-white/15 bg-white/10 p-7"
              >
                <span className="font-serif-display text-3xl italic text-[#ecc06a]">{s.num}</span>
                <h3 className="font-serif-display mt-2 text-3xl text-[#f9f1e2]">{s.title}</h3>
                <p dir="rtl" className="font-arabic mt-4 text-lg leading-[2] text-[#e3c9d3]">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SlideCard src={adScript.slideLeft} label={adScript.slideLeftLabel} />
            <SlideCard src={adScript.slideRight} label={adScript.slideRightLabel} />
          </div>
        </div>
        <SlideCard src={adScript.reel} label={adScript.reelLabel} className="mt-10" />
      </CaseSection>

      {/* ---------- influencer spotlight ---------- */}
      <CaseSection>
        <CasePill text={influencer.pill} />
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[5fr_7fr]">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-[#efe4cf] bg-[#fdfaf3] p-7 shadow-[0_12px_34px_rgba(60,15,35,0.1)]"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c39c52] text-white shadow-lg">
              <Megaphone className="h-6 w-6" />
            </span>
            <h3 className="font-serif-display mt-5 text-3xl leading-snug text-[#3f2f3a]">
              {influencer.title}
            </h3>
            <p className="mt-4 text-[16px] leading-[1.85] text-[#7a6771]">{influencer.desc}</p>
            <p className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.22em] text-[#8a6d35]">
              <Star className="h-4 w-4" /> {influencer.badge}
            </p>
          </motion.div>
          <div className="space-y-6">
            <SlideCard src={influencer.slideTop} label={influencer.slideTopLabel} />
            <SlideCard src={influencer.slideBottom} label={influencer.slideBottomLabel} />
          </div>
        </div>
      </CaseSection>

      {/* ---------- 09 seasonal campaigns ---------- */}
      <CaseSection>
        <CasePill text={seasonal.pill} />
        <CaseHeading title1={seasonal.title1} accent={seasonal.titleAccent} />
        <SlideCard src={seasonal.slideGrid} label={seasonal.slideGridLabel} className="mt-10" />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <SlideCard src={seasonal.slideLeft} label={seasonal.slideLeftLabel} />
          <SlideCard src={seasonal.slideRight} label={seasonal.slideRightLabel} />
        </div>

        {/* abaya brand part */}
        <motion.h3
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="font-serif-display mt-16 text-3xl italic text-[#5e1d35] sm:text-4xl"
        >
          {seasonal.abayaTitle}
        </motion.h3>
        <SlideCard src={seasonal.slideBrand} label={seasonal.slideBrandLabel} className="mt-6" />
        <ArabicNote text={seasonal.noteAr1} className="mt-8" />

        {/* awareness */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {seasonal.awareness.map((a, i) => (
            <motion.figure
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-2xl border border-[#efe4cf] bg-white shadow-[0_16px_40px_rgba(90,40,60,0.1)]"
            >
              { }
              <img src={a.slide} alt={a.label} loading="lazy" className="w-full object-cover" />
              <figcaption className="px-4 py-3 text-center text-[11px] font-bold tracking-[0.3em] text-[#a08a92]">
                {a.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* engagement */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {seasonal.engagement.map((e) => (
            <div key={e.slideLabel} className="space-y-3">
              <SlideCard src={e.slide} label={e.slideLabel} />
              <p className="text-center text-[11px] font-bold tracking-[0.3em] text-[#7c3552]">
                {e.label}
              </p>
            </div>
          ))}
        </div>

        {/* sales captions */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {seasonal.sales.map((s, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-[#efe4cf] bg-[#fdfaf3] p-7 shadow-[0_12px_34px_rgba(60,15,35,0.08)]"
            >
              <span className="float-right rounded-full bg-[#5e1d35] px-4 py-1.5 text-[10px] font-bold tracking-[0.25em] text-[#f6ead4]">
                {s.label}
              </span>
              <Quote className="h-6 w-6 text-[#e0cba4]" />
              <p dir="rtl" className="font-arabic mt-4 clear-right text-lg leading-[2] text-[#4d3c46] sm:text-xl">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </CaseSection>

      {/* ---------- the full deck ---------- */}
      <CaseSection dark>
        <div className="text-center">
          <CasePill text="THE FULL DECK" dark />
          <CaseHeading title1="Flip through " accent="every page" dark />
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#e3c9d3] sm:text-base">
            The whole presentation exactly as it was delivered — swipe, drag or use the arrows,
            and every page stays big and crisp.
          </p>
        </div>
        <div className="mt-10">
          <Slideshow slides={bnbDeck} fallbackTitle="Burger In Box" compact />
        </div>
      </CaseSection>

      {/* ---------- ending ---------- */}
      <section className="border-t border-[#eadcc2] py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.h2 {...fadeUp} transition={{ duration: 0.7 }} className="font-serif-display text-3xl italic leading-snug text-[#3f2f3a] sm:text-5xl">
            {caseEnding.title1}
            <span className="text-[#c39c52]">{caseEnding.titleAccent}</span> ✦
          </motion.h2>
          <motion.button
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            onClick={onBack}
            className="group mx-auto mt-9 flex items-center gap-3 rounded-full bg-[#5e1d35] px-8 py-4.5 text-base font-bold text-[#fbf3e6] shadow-[0_12px_32px_rgba(94,29,53,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#4a1229]"
          >
            <Hand className="h-5 w-5" />
            {caseEnding.cta}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 inline-flex items-center gap-2 text-sm text-[#a08a92]"
          >
            <CalendarHeart className="h-4 w-4" /> {caseEnding.credit}
          </motion.p>
        </div>
      </section>
    </div>
  );
}

/* ---------- persona block ---------- */

function PersonaBlock({
  persona,
  flip = false,
}: {
  persona: (typeof audience)["persona1"];
  flip?: boolean;
}) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.7 }}
      className="mt-12 rounded-3xl border border-[#efe4cf] bg-[#fdfaf3] p-7 shadow-[0_16px_44px_rgba(90,40,60,0.09)] sm:p-10"
    >
      <div className={`grid items-start gap-8 lg:grid-cols-2 ${flip ? "" : ""}`}>
        <div className={flip ? "lg:order-1" : ""}>
          <p className="text-[12px] font-bold tracking-[0.3em] text-[#b98d5e]">{persona.label}</p>
          <h3 className="font-serif-display mt-2 text-4xl text-[#3f2f3a]">{persona.name}</h3>
          <p className="mt-4 text-[16.5px] leading-[1.85] text-[#7a6771]">{persona.desc}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#eadcc2] bg-[#f8f1e2] p-5">
              <p className="flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] text-[#8a6d35]">
                <Sparkles className="h-4 w-4" /> MOTIVATION
              </p>
              <ul className="mt-3 space-y-2.5">
                {persona.motivation.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-[14.5px] leading-relaxed text-[#5f4d57]">
                    <span className="mt-0.5 text-[#c39c52]">✦</span> {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#f0d7e0] bg-[#fbeef3] p-5">
              <p className="flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] text-[#a5527a]">
                <Quote className="h-4 w-4" /> PAIN POINTS
              </p>
              <ul className="mt-3 space-y-2.5">
                {persona.pains.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[14.5px] leading-relaxed text-[#5f4d57]">
                    <span className="mt-0.5 text-[#d990ad]">✦</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={flip ? "lg:order-2" : ""}>
          <SlideCard src={persona.slide} label={persona.slideLabel} />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- calendar post card ---------- */

function CalendarPost({ post }: { post: (typeof calendar)["posts"][number] }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-[#efe4cf] bg-[#fdfaf3] p-7 shadow-[0_12px_34px_rgba(60,15,35,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-sm text-[#a08a92]">{post.platform}</span>
          <span className="rounded-full bg-[#f3e9d5] px-3.5 py-1 text-[13px] font-bold text-[#8a6d35]">
            {post.objective}
          </span>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5e1d35] font-serif-display text-lg italic text-[#f6ead4]">
          {post.num}
        </span>
      </div>
      <p dir="rtl" className="font-arabic mt-4 text-xl leading-[2] text-[#4d3c46]">
        {post.text}
      </p>
    </motion.div>
  );
}

/* ---------- content plan card ---------- */

function PlanCard({ block }: { block: (typeof contentPlan)["blocks"][number] }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-[#efe4cf] bg-[#fdfaf3] p-7 shadow-[0_12px_34px_rgba(60,15,35,0.08)] sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-full bg-[#5e1d35] px-4 py-1.5 text-[13px] font-bold capitalize text-[#f6ead4]">
          {block.type}
        </span>
        <span className="rounded-full bg-[#f3e9d5] px-4 py-1.5 text-[13px] font-bold text-[#8a6d35]">
          {block.objective}
        </span>
        <span className="text-sm text-[#a08a92]">{block.platform}</span>
      </div>
      <p className="mt-6 text-[12px] font-bold tracking-[0.3em] text-[#b98d5e]">KEYWORDS</p>
      <div className="mt-2.5 flex flex-wrap justify-end gap-2.5">
        {block.keywords.map((k) => (
          <span
            key={k}
            dir="auto"
            className="rounded-full border border-[#eadcc2] bg-[#f8f1e2] px-4 py-1.5 font-arabic text-[15px] font-semibold text-[#7c3552]"
          >
            {k}
          </span>
        ))}
      </div>
      <p className="mt-6 text-[12px] font-bold tracking-[0.3em] text-[#b98d5e]">CAPTION</p>
      <p dir="rtl" className="font-arabic mt-2.5 text-xl leading-[2] text-[#4d3c46]">
        {block.caption}
      </p>
    </motion.div>
  );
}
