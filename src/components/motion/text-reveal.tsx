"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

type TextRevealProps = {
  /** Each entry becomes its own masked line. */
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
};

/**
 * Masked line-by-line reveal: each line sits inside an overflow-hidden clip and
 * slides up from beneath it.
 *
 * The trigger deliberately watches the wrapper rather than the sliding span.
 * At rest each span is translated fully outside its own clip box, so an
 * observer attached to the span would measure zero intersection and the line
 * could never reveal itself.
 */
export function TextReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const variants: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { y: "110%" }, visible: { y: "0%" } };

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={cn(className)}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
              duration: reduced ? 0.25 : 0.95,
              delay: reduced ? 0 : delay + i * 0.11,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
