"use client";

import { BrandWordmark } from "@/components/brand/brand-wordmark";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { brands } from "@/lib/content";

export function BrandGrid() {
  return (
    <section
      id="brands"
      className="relative scroll-mt-24 border-y border-ink/[0.06] bg-carbon-925 py-20 lg:py-28"
    >
      <Container>
        <Reveal direction="up" className="flex flex-col items-center text-center">
          <EyebrowLabel tone="muted">Partners</EyebrowLabel>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.35rem,3.2vw,2rem)] font-bold uppercase leading-[1.15] tracking-[-0.012em] text-carbon-100">
            Trusted by Leading Automotive Brands
          </h2>
        </Reveal>

        <RevealGroup
          stagger={0.05}
          amount={0.1}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-ink/[0.06] sm:grid-cols-3 lg:mt-16 lg:grid-cols-4 xl:grid-cols-6"
        >
          {brands.map((brand, i) => (
            <RevealItem key={brand} className="bg-carbon-925">
              <div className="group flex h-24 items-center justify-center px-4 transition-colors duration-500 hover:bg-carbon-900 sm:h-28">
                <BrandWordmark
                  name={brand}
                  index={i}
                  /* Monochrome and dimmed at rest; resolves to full contrast on hover. */
                  className="text-carbon-300 opacity-55 grayscale transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:text-ink group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal direction="up" delay={0.15}>
          <p className="mt-10 text-center font-tech text-[0.5625rem] uppercase tracking-[0.11em] text-carbon-500">
            Placeholder marks. Replace with supplied brand assets
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
