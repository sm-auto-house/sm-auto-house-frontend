"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ShieldCheck } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";
import { scrollToSection } from "@/components/providers/smooth-scroll";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { img, photo } from "@/lib/images";

const HERO_IMAGE = img(photo.redMuscleHangar, { w: 2400, h: 1600 });

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The plate drifts down and swells slightly while the copy lifts away.
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      data-surface="media"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-carbon-950"
    >
      {/* ---------- Plate ---------- */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { y: plateY, scale: plateScale }}
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Readability stack: vertical falloff, a left-weighted wash, and a vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-carbon-950/75 via-carbon-950/20 to-carbon-950/95"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-carbon-950/95 via-carbon-950/35 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background:radial-gradient(125%_90%_at_52%_18%,transparent_42%,var(--vignette)_100%)]"
      />
      {/* A single warm rake of light, echoing the accent */}
      <div
        aria-hidden
        className="absolute -right-[10%] top-[8%] -z-10 h-[46rem] w-[46rem] rounded-full bg-signal/10 blur-[140px]"
      />

      {/* ---------- Side rail (desktop) ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-16 items-end justify-center pb-32 xl:flex"
      >
        <span className="rotate-180 font-tech text-[0.625rem] uppercase tracking-[0.26em] text-carbon-400 [writing-mode:vertical-rl]">
          Est. 1984 · Colombo, Sri Lanka
        </span>
      </div>

      {/* ---------- Copy ---------- */}
      <motion.div
        className="relative z-10 flex flex-1 items-end pb-28 pt-32 sm:pb-32 lg:items-center lg:pb-40 lg:pt-36"
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <Container>
          <div className="max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
              </span>
              <span className="eyebrow text-carbon-200">
                Premium Automotive Solutions
              </span>
            </motion.div>

            <TextReveal
              as="h1"
              lines={["Engineered", "For", "Performance."]}
              delay={0.28}
              className="mt-7 font-display font-extrabold uppercase text-ink display-tight text-[clamp(2.4rem,10.5vw,8.5rem)]"
            />

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-base leading-relaxed text-carbon-200 sm:text-lg"
            >
              Quality automotive parts, lubricants and solutions built to keep
              every journey moving.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Magnetic strength={0.22} className="w-full sm:w-auto">
                <Button
                  size="cta-lg"
                  variant="signal"
                  className="group/cta w-full sm:w-auto"
                  onClick={() => scrollToSection("#products")}
                >
                  Explore Products
                  <ArrowRight className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1.5" />
                </Button>
              </Magnetic>

              <Magnetic strength={0.22} className="w-full sm:w-auto">
                <Button
                  size="cta-lg"
                  variant="glass"
                  className="w-full sm:w-auto"
                  onClick={() => scrollToSection("#contact")}
                >
                  Contact Us
                </Button>
              </Magnetic>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* ---------- Floating information panel ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 pb-10 lg:absolute lg:bottom-14 lg:right-0 lg:pb-0 xl:bottom-16"
      >
        <Container className="lg:max-w-none lg:pl-0">
          <div className="flex flex-col items-stretch overflow-hidden rounded-md border border-ink/10 bg-ink/[0.045] backdrop-blur-2xl min-[380px]:flex-row lg:ml-auto lg:w-fit">
            <div className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
              <span className="font-display text-[2.25rem] font-extrabold leading-none text-signal sm:text-[2.75rem]">
                40<span className="text-ink">+</span>
              </span>
              <span className="font-tech text-[0.625rem] uppercase leading-[1.5] tracking-[0.13em] text-carbon-200">
                Years of
                <br />
                Experience
              </span>
            </div>

            <div
              aria-hidden
              className="h-px w-full shrink-0 bg-ink/10 min-[380px]:h-auto min-[380px]:w-px"
            />

            <div className="flex items-center gap-3 px-5 py-4 sm:px-6 sm:py-5">
              <ShieldCheck
                className="size-5 shrink-0 text-signal"
                strokeWidth={1.5}
              />
              <span className="font-tech text-[0.625rem] uppercase leading-[1.5] tracking-[0.13em] text-carbon-200">
                Trusted Automotive
                <br />
                Solutions
              </span>
            </div>
          </div>
        </Container>
      </motion.div>

      {/* ---------- Scroll indicator ---------- */}
      <motion.button
        type="button"
        onClick={() => scrollToSection("#products")}
        aria-label="Scroll to products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="group absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="font-tech text-[0.5625rem] uppercase tracking-[0.1em] text-carbon-400 transition-colors group-hover:text-carbon-200">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-ink/15">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-signal"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown
          className="size-3.5 text-carbon-400 transition-colors group-hover:text-signal"
          strokeWidth={1.6}
        />
      </motion.button>
    </section>
  );
}
