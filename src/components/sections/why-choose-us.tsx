"use client";

import { Gauge, Headset, ShieldCheck, Truck, type LucideIcon } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { features, type Feature } from "@/lib/content";

const ICONS: Record<Feature["icon"], LucideIcon> = {
  shield: ShieldCheck,
  gauge: Gauge,
  truck: Truck,
  headset: Headset,
};

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative scroll-mt-24 bg-carbon-900 py-(--spacing-section)"
    >
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          lines={["A Supplier Your", "Workshop Can Trust."]}
          description="Four commitments that shape how we source, stock and support every product we sell."
          headingClassName="text-[clamp(1.9rem,5vw,3.4rem)]"
        />

        <RevealGroup
          stagger={0.1}
          amount={0.15}
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden bg-ink/[0.07] sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = ICONS[feature.icon];
            return (
              <RevealItem key={feature.index} className="bg-carbon-900">
                <article className="group relative flex h-full flex-col overflow-hidden p-7 transition-colors duration-500 hover:bg-carbon-850 lg:p-8">
                  {/* Signal bar that rises from the bottom edge on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between">
                    <Icon
                      className="size-7 text-carbon-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:text-signal"
                      strokeWidth={1.25}
                    />
                    <span className="font-tech text-[0.625rem] tracking-[0.25em] text-carbon-600 transition-colors duration-500 group-hover:text-carbon-400">
                      {feature.index}
                    </span>
                  </div>

                  <h3 className="mt-12 font-display text-lg font-bold uppercase leading-tight tracking-[-0.01em] text-ink lg:mt-16 lg:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-carbon-400 transition-colors duration-500 group-hover:text-carbon-300">
                    {feature.description}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
