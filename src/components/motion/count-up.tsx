"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts from zero to `value` the first time it scrolls into view. */
export function CountUp({
  value,
  suffix = "",
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [tally, setTally] = useState(0);

  // Reduced motion skips the tween entirely, so the final figure is derived
  // rather than pushed through state.
  const display = reduced ? value : tally;

  useEffect(() => {
    if (!inView || reduced) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setTally(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
