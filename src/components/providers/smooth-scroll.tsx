"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/** Module singleton so anchor navigation can hand off to the same instance. */
let lenisInstance: Lenis | null = null;

/**
 * Sections carry `scroll-mt-*` for the sticky navbar and Lenis honours that
 * scroll-margin, so no extra offset is applied here; adding one stacks with
 * the CSS and drops the target too far down the viewport.
 */
const NAV_OFFSET = 0;

/**
 * Scrolls to an in-page anchor. Falls back to the native API when Lenis is
 * absent (reduced motion, or before hydration completes).
 */
export function scrollToSection(hash: string) {
  const id = hash.replace(/^#/, "");
  const target = document.getElementById(id);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: NAV_OFFSET, duration: 1.2 });
  } else {
    // The native path applies scroll-margin itself.
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Lenis drives real window scrolling (not a transformed wrapper), so
 * `position: sticky`, IntersectionObserver and framer-motion's `useScroll`
 * all keep working. Disabled entirely when the user asks for reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let cancelled = false;

    void (async () => {
      const { default: LenisCtor } = await import("lenis");
      if (cancelled) return;

      const lenis = new LenisCtor({
        duration: 1.05,
        // Gentle exponential ease-out: momentum without feeling slippery.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });
      lenisInstance = lenis;

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
