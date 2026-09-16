"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -36 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  as?: "div" | "section" | "span" | "li" | "article" | "header";
};

/**
 * Scroll-triggered fade + slide. Animates once, and collapses to a plain
 * fade-free render when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = OFFSET[direction];

  const variants: Variants = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, x: offset.x, y: offset.y, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: reduced ? 0.2 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct children. Pair with <RevealItem /> for grids and lists.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  amount = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
  duration = 0.75,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const offset = OFFSET[direction];

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: reduced
          ? { opacity: 0 }
          : { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: reduced ? 0.2 : duration,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
