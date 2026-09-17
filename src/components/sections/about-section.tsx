"use client";

import { ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { ParallaxImage } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { scrollToSection } from "@/components/providers/smooth-scroll";
import { Stats } from "@/components/sections/stats";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { img, photo } from "@/lib/images";
import { site } from "@/lib/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-carbon-900 py-(--spacing-section)"
    >
      {/* Oversized ghosted year, anchoring the section without adding noise */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-6 select-none font-display text-[16vw] font-extrabold leading-none tracking-[-0.035em] text-ink/[0.022] lg:top-10"
      >
        {site.founded}
      </span>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-24">
          {/* ---------------- Left: imagery ---------------- */}
          <div className="relative lg:col-span-6">
            <Reveal direction="right" amount={0.2}>
              <div className="relative">
                <ParallaxImage
                  src={img(photo.partsShopShelves, { w: 1200, h: 1500 })}
                  alt="Automotive parts stocked floor to ceiling in the SM Auto House warehouse"
                  distance={9}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/5] w-full rounded-md ring-1 ring-ink/[0.08] sm:aspect-[5/6]"
                  overlayClassName="bg-gradient-to-t from-carbon-950/55 to-transparent"
                />

                {/* Overlapping secondary frame */}
                <div className="absolute -bottom-8 -right-4 hidden w-[42%] sm:block lg:-right-10">
                  <ParallaxImage
                    src={img(photo.mechanicCloseUp, { w: 700, h: 700 })}
                    alt="Technician working on an engine assembly"
                    distance={6}
                    sizes="30vw"
                    className="aspect-square w-full rounded-md ring-1 ring-ink/10 shadow-[0_40px_80px_-40px_var(--shadow-plate)]"
                  />
                </div>

                {/* Corner tick: a small engineering-drawing cue */}
                <span
                  aria-hidden
                  className="absolute -left-3 -top-3 hidden size-12 border-l border-t border-signal/70 lg:block"
                />
              </div>
            </Reveal>
          </div>

          {/* ---------------- Right: narrative ---------------- */}
          <div className="lg:col-span-6">
            <Reveal direction="up" duration={0.6}>
              <EyebrowLabel>Our Story</EyebrowLabel>
            </Reveal>

            <TextReveal
              lines={["Built on Experience.", "Driven by Quality."]}
              delay={0.08}
              className="mt-6 font-display text-[clamp(1.9rem,5vw,3.4rem)] font-extrabold uppercase text-ink display-tight"
            />

            <Reveal direction="up" delay={0.16}>
              <div className="mt-7 space-y-5 text-[0.975rem] leading-relaxed text-carbon-300 sm:text-base">
                <p>
                  SM Auto House began as a single parts counter in Colombo and
                  grew, over four decades, into one of the country&rsquo;s most
                  dependable automotive supply networks. Through all of it, one
                  rule has never moved.
                </p>
                <p>
                  Today we supply engine, brake, electrical and suspension
                  components, lubricants, filtration and car care products to
                  workshops, dealers and fleet operators from Jaffna to Matara,
                  backed by technical people who know the catalogue as well as
                  the vehicles it serves.
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.22}>
              <figure className="mt-9 border-l-2 border-signal/70 pl-5 sm:pl-6">
                <blockquote className="hand text-[1.0625rem] leading-[1.7] text-carbon-100 sm:text-[1.1875rem]">
                  If it carries our name, it has to last.
                </blockquote>
                <figcaption className="mt-3.5 font-tech text-[0.5625rem] uppercase tracking-[0.17em] text-carbon-500">
                  The rule at the counter since {site.founded}
                </figcaption>
              </figure>
            </Reveal>

            <Stats className="mt-10 lg:mt-12" />

            <Reveal direction="up" delay={0.1} className="mt-10 inline-block">
              <Magnetic strength={0.24}>
                <Button
                  size="cta"
                  variant="hairline"
                  className="group/cta"
                  onClick={() => scrollToSection("#services")}
                >
                  Discover Our Story
                  <ArrowRight className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1.5" />
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
