"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { marquee1, brandNames } from "./data";

/* One ribbon inside the twisting pair — text rolls across,
   the whole band sways around its center like a helix strand */
function Strand({
  items,
  direction,
  skew,
  drift,
  tone,
}: {
  items: string[];
  direction: "left" | "right";
  skew: MotionValue<number>;
  drift: MotionValue<number>;
  tone: "burgundy" | "gold";
}) {
  const row = [...items, ...items, ...items, ...items];
  /* the two strands feel the scroll in opposite directions */
  const x = useTransform(drift, (v) => (direction === "left" ? v * 36 : v * -36));
  const sk = useTransform(skew, (v) => (direction === "left" ? v : -v));

  return (
    <motion.div
      style={{ skewX: sk, x }}
      className={`w-[112%] -ml-[6%] py-3.5 sm:py-4 ${
        tone === "burgundy"
          ? "bg-gradient-to-r from-[#4a1229] via-[#5e1d35] to-[#471228] shadow-[0_18px_44px_rgba(70,20,40,0.3)]"
          : "bg-gradient-to-r from-[#cfa75f] via-[#e2c68f] to-[#c39c52] shadow-[0_18px_44px_rgba(120,80,30,0.28)]"
      }`}
    >
      <div
        className={`flex w-max items-center gap-10 ${
          direction === "left" ? "marquee-track-left" : "marquee-track-right"
        }`}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`ribbon-text text-xl sm:text-2xl ${
                tone === "burgundy" ? "text-[#f6ead4]" : "text-[#4a2c10]"
              }`}
            >
              {item}
            </span>
            <span className={tone === "burgundy" ? "text-[#c39c52]" : "text-[#8a6d35]"}>✦</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* Two ribbons twisted AROUND each other — a living helix,
   crossing in the middle and gently swinging the opposite ways */
export default function Marquees() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 55, stiffness: 380 });
  const skew = useTransform(smooth, [-2200, 0, 2200], [-7, 0, 7], { clamp: true });
  const drift = useTransform(smooth, [-2400, 0, 2400], [-1, 0, 1], { clamp: true });

  return (
    <section className="relative overflow-hidden py-16 sm:py-20" aria-label="services and brands">
      <div className="relative h-[168px] sm:h-[200px]">
        {/* strand A — burgundy services, swings + → − */}
        <div className="twist-a absolute inset-x-0 top-[34%] z-0">
          <Strand items={marquee1} direction="left" skew={skew} drift={drift} tone="burgundy" />
        </div>
        {/* strand B — gold brand names, swings − → +  */}
        <div className="twist-b absolute inset-x-0 top-[46%] z-10">
          <Strand items={brandNames} direction="right" skew={skew} drift={drift} tone="gold" />
        </div>
      </div>
    </section>
  );
}
