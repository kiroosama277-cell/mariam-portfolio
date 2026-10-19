"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * The little butterfly that follows the cursor around the site,
 * just like the original portfolio.
 */
export default function ButterflyCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 120, damping: 14, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 14, mass: 0.6 });
  const [dir, setDir] = useState(1);
  const finePointer = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      // enable on first move (skips touch devices, which rarely fire mousemove)
      if (!finePointer.current && window.matchMedia("(pointer: fine)").matches) {
        finePointer.current = true;
        setEnabled(true);
      }
      if (!finePointer.current) return;
      x.set(e.clientX);
      y.set(e.clientY);
      setDir(e.movementX < -2 ? -1 : e.movementX > 2 ? 1 : dir);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ x: dir === 1 ? 14 : -14, y: 14 }}
        transition={{ type: "spring", stiffness: 90, damping: 12 }}
        style={{ scaleX: dir }}
      >
        <svg width="26" height="22" viewBox="0 0 26 22" className="drop-shadow-sm">
          {/* left wing */}
          <g style={{ transformOrigin: "13px 11px", animation: "flap-left 0.5s ease-in-out infinite" }}>
            <path d="M13 10 C9 2, 1 1, 2 7 C2.6 11, 8 12.5, 12 12 Z" fill="#7c1f3e" />
            <path d="M12.6 12.5 C8 13, 4 16, 7 18.5 C9.5 20, 12.4 15.5, 13 13.5 Z" fill="#d98aa8" />
          </g>
          {/* right wing */}
          <g style={{ transformOrigin: "13px 11px", animation: "flap-right 0.5s ease-in-out infinite" }}>
            <path d="M13 10 C17 2, 25 1, 24 7 C23.4 11, 18 12.5, 14 12 Z" fill="#7c1f3e" />
            <path d="M13.4 12.5 C18 13, 22 16, 19 18.5 C16.5 20, 13.6 15.5, 13 13.5 Z" fill="#d98aa8" />
          </g>
          {/* body */}
          <ellipse cx="13" cy="11.5" rx="1.3" ry="4" fill="#4a1028" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
