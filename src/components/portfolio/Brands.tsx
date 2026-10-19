"use client";

import { motion, type Variants } from "framer-motion";
import { FadeUp } from "./fx";

/* ============================================================
   BRANDS — coordinated ring collage (clean & calm):
   ALL 10 logo cards sit in ONE mirror-symmetric elliptical
   ring around the headline — evenly spaced, slight neighbour
   overlap so it still reads "stacked ورا بعض", yet every
   single logo stays fully visible (desktop AND mobile).
   On scroll-in the WHOLE ring flies in together — one
   scene-driven staggered entrance (no per-card observers,
   so no card can ever fail to appear), lands… and FREEZES.
   Cream / burgundy / gold theme.
   ============================================================ */

type Ring = {
  x: number; y: number;   // resting spot on the ellipse (px from scene center)
  r: number;              // resting tilt (deg)
  ex: number; ey: number; // entrance start offset (px)
  er: number;             // extra entrance rotation (deg)
};

/* order = clockwise from the top:
   shutny, bnb, costa, wahsh, balbaa, kabbani, maestro, zara, walgreens, goldmark */

/* ---- desktop ring (sm and up) — wide enough that the side
   cards clear the huge headline; only their corners tuck
   under the words (the reference's woven look) ---- */
const RING: Ring[] = [
  { x: 0,    y: -232, r: 0,   ex: -30,  ey: -240, er: -10 }, // shutny  (top)
  { x: 205,  y: -192, r: 8,   ex: 240,  ey: -180, er: 18  }, // bnb
  { x: 380,  y: -70,  r: 14,  ex: 310,  ey: -70,  er: 22  }, // costa
  { x: 380,  y: 70,   r: 14,  ex: 310,  ey: 70,   er: 22  }, // wahsh
  { x: 205,  y: 192,  r: 8,   ex: 240,  ey: 180,  er: 18  }, // balbaa
  { x: 0,    y: 232,  r: 0,   ex: 30,   ey: 240,  er: 10  }, // kabbani (bottom)
  { x: -205, y: 192,  r: -8,  ex: -240, ey: 180,  er: -18 }, // maestro
  { x: -380, y: 70,   r: -14, ex: -310, ey: 70,   er: -22 }, // zara
  { x: -380, y: -70,  r: -14, ex: -310, ey: -70,  er: -22 }, // walgreens
  { x: -205, y: -192, r: -8,  ex: -240, ey: -180, er: -18 }, // goldmark
];

/* ---- mobile ring (below sm): SAME 10 brands, tighter ellipse ---- */
const RING_M: Ring[] = [
  { x: 0,    y: -150, r: 0,   ex: -20,  ey: -150, er: -8  },
  { x: 70,   y: -121, r: 7,   ex: 130,  ey: -110, er: 16  },
  { x: 114,  y: -46,  r: 13,  ex: 150,  ey: -50,  er: 20  },
  { x: 114,  y: 46,   r: 13,  ex: 150,  ey: 50,   er: 20  },
  { x: 70,   y: 121,  r: 7,   ex: 130,  ey: 110,  er: 16  },
  { x: 0,    y: 150,  r: 0,   ex: 20,   ey: 150,  er: 8   },
  { x: -70,  y: 121,  r: -7,  ex: -130, ey: 110,  er: -16 },
  { x: -114, y: 46,   r: -13, ex: -150, ey: 50,   er: -20 },
  { x: -114, y: -46,  r: -13, ex: -150, ey: -50,  er: -20 },
  { x: -70,  y: -121, r: -7,  ex: -130, ey: -110, er: -16 },
];

const sceneV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

function cardV(c: Ring): Variants {
  return {
    hidden: { opacity: 0, x: c.ex, y: c.ey, rotate: c.er, scale: 0.82 },
    show: {
      opacity: 1, x: 0, y: 0, rotate: 0, scale: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 16 },
    },
  };
}

export type BrandSlide = { name: string; img: string };

function BrandCard({
  b,
  c,
  mobile = false,
}: {
  b: BrandSlide;
  c: Ring;
  mobile?: boolean;
}) {
  return (
    <motion.div
      variants={cardV(c)}
      className={`absolute left-1/2 top-1/2 ${mobile ? "sm:hidden" : "hidden sm:block"}`}
    >
      {/* resting spot on the ring — static, nothing animates after landing */}
      <div
        style={{
          transform: `translate(${c.x}px, ${c.y}px) rotate(${c.r}deg)`,
          marginLeft: mobile ? -44 : -88,
          marginTop: mobile ? -31 : -68,
        }}
      >
        <div
          className={
            mobile
              ? "flex w-[88px] items-center justify-center rounded-xl border border-[#efe4cf] bg-white/95 p-2.5 shadow-[0_10px_24px_rgba(90,40,60,0.14)]"
              : "flex w-44 flex-col items-center justify-center gap-2 rounded-2xl border border-[#efe4cf] bg-white/95 p-4 shadow-[0_16px_36px_rgba(90,40,60,0.14)]"
          }
        >
          <div className="flex h-10 w-full items-center justify-center sm:h-20">
            <img
              src={b.img}
              alt={b.name}
              loading="eager"
              decoding="async"
              className="max-h-full max-w-[86%] object-contain"
            />
          </div>
          {!mobile && (
            <p className="max-w-full truncate text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#a08a92]">
              {b.name.split("—")[0].trim().length > 12
                ? b.name.split("—")[0].trim().split(" ")[0]
                : b.name.split("—")[0].trim()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function BrandsSlider({
  items,
  pill = "CLIENTS & COLLABORATIONS",
}: {
  items: BrandSlide[];
  pill?: string;
}) {
  return (
    <section id="brands" className="relative overflow-hidden py-20 sm:py-24" aria-label="brands">
      {/* soft cream wash + gold halo behind the whole scene */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 46%, rgba(238,180,205,0.20) 0%, rgba(240,220,174,0.10) 42%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <FadeUp>
          <p className="text-center text-[11px] font-bold tracking-[0.42em] text-[#a08a92] sm:text-xs">
            ✦ &nbsp;{pill}&nbsp; ✦
          </p>
        </FadeUp>

        {/* ================= the scene ================= */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sceneV}
          className="relative mx-auto mt-6 flex min-h-[560px] w-full max-w-4xl items-center justify-center sm:min-h-[700px]"
        >
          {/* ---- the ring: all 10 cards, one layer, tucked under the words.
               The layer scales down on narrow desktops so the ring always
               fits the viewport without ever clipping a card ---- */}
          <div
            className="absolute inset-0 z-0"
            style={{ transform: "scale(min(1, calc((100vw - 32px) / 980)))" }}
          >
            {items.map((b, i) => (
              <BrandCard key={`d-${b.name}`} b={b} c={RING[i % RING.length]} />
            ))}
            {items.map((b, i) => (
              <BrandCard key={`m-${b.name}`} b={b} c={RING_M[i % RING_M.length]} mobile />
            ))}
          </div>

          {/* ---- the huge stacked headline (the anchor) ---- */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-display relative z-10 select-none text-center font-black leading-[0.98] text-[#5e1d35]"
          >
            <span className="block text-[15vw] tracking-tight sm:text-[6.2rem] lg:text-[7rem]">BRANDS I&apos;VE</span>
            <span className="block text-[15vw] italic tracking-tight text-[#c39c52] sm:text-[6.2rem] lg:text-[7rem]">
              worked
            </span>
            <span className="block text-[15vw] tracking-tight sm:text-[6.2rem] lg:text-[7rem]">WITH</span>
          </motion.h2>
        </motion.div>

        <FadeUp delay={0.1}>
          <p className="mt-2 text-center text-[11px] font-bold tracking-[0.42em] text-[#a08a92] sm:text-xs">
            CONTENT &nbsp;·&nbsp; CAMPAIGNS &nbsp;·&nbsp; VISUALS
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
