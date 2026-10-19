"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Megaphone, Palette, MapPin, Camera, ArrowUpRight } from "lucide-react";
import { about } from "./data";
import { Counter, FadeUp, WordsReveal } from "./fx";

const chipIcons: Record<string, React.ReactNode> = {
  graduation: <GraduationCap className="h-4 w-4" />,
  megaphone: <Megaphone className="h-4 w-4" />,
  palette: <Palette className="h-4 w-4" />,
  mapPin: <MapPin className="h-4 w-4" />,
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const polaroidY = useTransform(scrollYProgress, [0, 1], [46, -46]);

  return (
    <section ref={ref} id="about" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        {/* heading */}
        <div className="text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#eadcc2] bg-[#fdf9f0] px-5 py-2 text-[11px] font-bold tracking-[0.3em] text-[#8a6d35]">
              <span className="text-[#c39c52]">✦</span> {about.pill}
            </span>
          </FadeUp>
          <h2 className="font-serif-display mt-5 text-4xl text-[#3f2f3a] sm:text-6xl">
            <WordsReveal
              text={about.title1}
              accent={about.titleAccent}
              accentClassName="underline-gold italic text-[#7c3552]"
            />
          </h2>
          <FadeUp delay={0.15}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#7a6771] sm:text-lg">
              {about.subtitle}
            </p>
          </FadeUp>
        </div>

        {/* content — bio beside the photo, like the reference */}
        <div className="mt-14 grid items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-12 lg:gap-14">
          {/* polaroid */}
          <motion.div
            style={{ y: polaroidY }}
            className="relative mx-auto w-full max-w-sm"
          >
            {/* tape */}
            <div className="absolute -top-4 left-1/2 z-10 h-9 w-32 -translate-x-1/2 rotate-2 rounded-sm bg-[#e9d3a6]/80 shadow-sm" />
            <div className="shine-host rounded-2xl border border-[#efe4cf] bg-[#fdfaf3] p-4 pb-6 shadow-[0_24px_60px_rgba(90,40,60,0.14)]">
              <div className="relative overflow-hidden rounded-xl">
                { }
                <img
                  src="/work/mariam.jpg"
                  alt="Mariam"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.05]"
                />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#c39c52]/90 text-white shadow">
                  <Camera className="h-4.5 w-4.5" />
                </span>
              </div>
              <p className="font-serif-display mt-4 text-center text-lg italic text-[#5a4750]">
                {about.photoCaption}
              </p>
              <div className="mx-auto mt-3 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#8e3057] to-[#5e1d35]" />
            </div>
          </motion.div>

          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mb-5 text-[17px] leading-[1.9] text-[#5f4d57]"
              >
                {i === 0 ? (
                  <>
                    <span className="font-serif-display float-left mr-3 mt-1 text-6xl font-bold leading-[0.85] text-[#5e1d35]">
                      H
                    </span>
                    {p}
                  </>
                ) : (
                  p.replace("*and*", "and")
                )}
              </p>
            ))}

            {/* chips */}
            <div className="mt-7 flex flex-wrap gap-3">
              {about.chips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#eadcc2] bg-[#fdf9f0] px-4 py-2.5 text-sm font-semibold text-[#5a4750] shadow-sm transition-colors hover:border-[#c39c52]"
                >
                  <span className="text-[#8a6d35]">{chipIcons[chip.icon]}</span>
                  {chip.label}
                </span>
              ))}
            </div>

            {/* CV link */}
            <motion.a
              href="#contact"
              whileHover="hover"
              className="group/cv mt-8 inline-flex items-center gap-2 pb-1 text-[17px] font-semibold text-[#5e1d35]"
            >
              <span className="relative">
                Grab my CV — coming with your real info
                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-100 rounded-full bg-[#c39c52] transition-transform duration-300 group-hover/cv:scale-x-110" />
              </span>
              <motion.span
                variants={{ hover: { x: 3, y: -3 } }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="inline-block text-[#c39c52]"
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {about.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="shine-host group rounded-2xl border border-[#efe4cf] bg-[#fdfaf3] px-4 py-8 text-center shadow-[0_10px_30px_rgba(90,40,60,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#e5d5b8] hover:shadow-[0_20px_44px_rgba(90,40,60,0.12)]"
            >
              <div className="font-serif-display text-5xl text-[#5e1d35] sm:text-6xl">
                <Counter to={parseInt(s.value, 10)} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold text-[#8d7a84] sm:text-[15px]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
