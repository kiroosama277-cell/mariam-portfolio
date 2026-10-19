"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Marquees from "@/components/portfolio/Marquees";
import BrandsSlider from "@/components/portfolio/Brands";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import MotionGraphics from "@/components/portfolio/MotionGraphics";
import Services from "@/components/portfolio/Services";
import Journey from "@/components/portfolio/Journey";
import Contact from "@/components/portfolio/Contact";
import CaseStudy from "@/components/portfolio/CaseStudy";
import ProjectPage from "@/components/portfolio/ProjectPage";
import ButterflyCursor from "@/components/portfolio/ButterflyCursor";
import { WhatsAppIcon } from "@/components/portfolio/Contact";
import { site, brands, projects } from "@/components/portfolio/data";

type View =
  | { name: "home" }
  | { name: "case" }
  | { name: "project"; slug: string };

/* full-screen burgundy wipe used for view transitions */
function Wipe({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="wipe"
          className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-gradient-to-b from-[#5e1d35] via-[#471228] to-[#2c0a18]"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1, originY: 1 }}
          exit={{ scaleY: 0, originY: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif-display text-4xl font-black italic text-[#f0dcae]/90">
              M <span className="not-italic text-[#d8b25e]">✦</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* floating WhatsApp button — always one tap away */
function WhatsAppFab() {
  return (
    <motion.a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 220, damping: 16 }}
      whileHover={{ scale: 1.1, rotate: -6 }}
      whileTap={{ scale: 0.94 }}
      className="fab-ring fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.45)]"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}

export default function Home() {
  const [view, setView] = useState<View>({ name: "home" });
  const [wipe, setWipe] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  /* Lenis smooth scrolling */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* route all in-page anchors through lenis */
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -76, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* view swap hidden behind a wipe */
  const transitionTo = useCallback((next: View, scrollTo?: string) => {
    setWipe(true);
    window.setTimeout(() => {
      setView(next);
      window.scrollTo({ top: 0, behavior: "auto" });
      if (scrollTo) {
        window.setTimeout(() => {
          lenisRef.current?.scrollTo(scrollTo, { offset: -76, duration: 1.4 });
        }, 120);
      }
    }, 560);
    window.setTimeout(() => setWipe(false), 1150);
  }, []);

  const openProject = useCallback(
    (slug: string) => {
      const item = projects.items.find((p) => p.slug === slug);
      if (item?.hasCaseStudy) transitionTo({ name: "case" });
      else transitionTo({ name: "project", slug });
    },
    [transitionTo]
  );
  const backHome = useCallback(
    (scrollTo?: string) => transitionTo({ name: "home" }, scrollTo ?? "#work"),
    [transitionTo]
  );

  return (
    <div className="relative">
      <ButterflyCursor />
      <Wipe active={wipe} />
      <WhatsAppFab />

      <div className="relative">
        {view.name === "home" && <Navbar />}
        <main>
          {view.name === "home" ? (
            <>
              <Hero />
              <Marquees />
              <BrandsSlider
                items={brands.map((b) => ({ name: b.name, img: b.img }))}
              />
              <About />
              <Projects onOpenProject={openProject} />
              <MotionGraphics />
              <Services />
              <Journey />
              <Contact />
            </>
          ) : view.name === "case" ? (
            <CaseStudy onBack={() => backHome()} />
          ) : (
            <ProjectPage
              key={view.slug}
              item={projects.items.find((p) => p.slug === view.slug)!}
              onBack={() => backHome()}
              onOpenProject={openProject}
              onContact={() => backHome("#contact")}
            />
          )}
        </main>
      </div>
    </div>
  );
}
