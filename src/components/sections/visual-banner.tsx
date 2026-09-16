"use client";

import { ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { ParallaxImage } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { scrollToSection } from "@/components/providers/smooth-scroll";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { img, photo } from "@/lib/images";

export function VisualBanner() {
  return (
    <section data-surface="media" className="relative isolate">
      <ParallaxImage
        src={img(photo.blackCoupeIndustrial, { w: 2400, h: 1400 })}
        alt="Performance coupe parked beside freight crates at a distribution yard"
        distance={16}
        sizes="100vw"
        className="min-h-[30rem] w-full lg:min-h-[42rem]"
        overlayClassName="bg-carbon-950/45"
      />

      {/* Directional wash so the type always has a dark side to sit on */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-carbon-950/95 via-carbon-950/45 to-carbon-950/75"
      />

      <div className="absolute inset-0 flex items-center">
        <Container>
          <div className="max-w-3xl">
            <TextReveal
              lines={["Keep Your Vehicle", "Performing at Its Best."]}
              className="font-display text-[clamp(1.9rem,6vw,4.25rem)] font-extrabold uppercase text-ink display-tight"
            />

            <Reveal direction="up" delay={0.2} className="mt-9 inline-block">
              <Magnetic strength={0.24}>
                <Button
                  size="cta-lg"
                  variant="signal"
                  className="group/cta"
                  onClick={() => scrollToSection("#products")}
                >
                  Explore Our Products
                  <ArrowRight className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1.5" />
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
