"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  /** Total vertical travel across the scroll range, in percent of height. */
  distance?: number;
  sizes?: string;
  eager?: boolean;
  overlayClassName?: string;
};

/**
 * An over-scaled image inside a clipped box that drifts as the section passes
 * the viewport. The 1.25 scale is what stops the edges from revealing gaps.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  distance = 14,
  sizes = "100vw",
  eager = false,
  overlayClassName,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${distance}%`, `${distance}%`],
  );

  return (
    <div
      ref={ref}
      data-surface="media"
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y, scale: 1.25 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={eager}
          loading={eager ? "eager" : "lazy"}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
      {overlayClassName ? (
        <div className={cn("absolute inset-0", overlayClassName)} />
      ) : null}
    </div>
  );
}
