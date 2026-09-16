"use client";

import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services, type Service } from "@/lib/content";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 bg-carbon-925 py-(--spacing-section)"
    >
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          lines={["More Than a", "Parts Counter."]}
          description="Supply is the starting point. The work around it (specification, planning and support) is what keeps vehicles on the road."
          headingClassName="text-[clamp(1.9rem,5vw,3.4rem)]"
        />

        <RevealGroup
          stagger={0.1}
          amount={0.12}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-20"
        >
          {services.map((service, i) => (
            <RevealItem key={service.title} className="h-full">
              <ServiceCard service={service} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md bg-carbon-850 ring-1 ring-ink/[0.06] transition-[box-shadow,--tw-ring-color] duration-500 hover:ring-ink/[0.16] hover:shadow-[0_30px_60px_-42px_var(--shadow-plate)]">
      <div className="relative h-52 shrink-0 overflow-hidden lg:h-56">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-carbon-850 via-carbon-850/35 to-transparent"
        />
        <span className="absolute left-5 top-5 font-tech text-[0.625rem] tracking-[0.11em] text-ink/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight
          aria-hidden
          className="absolute right-5 top-5 size-5 text-ink/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-[-0.006em] text-ink lg:text-xl">
          {service.title}
        </h3>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-carbon-400">
          {service.description}
        </p>

        <ul className="mt-6 flex flex-col gap-2.5 border-t border-ink/[0.07] pt-5">
          {service.points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2.5 font-tech text-[0.625rem] uppercase tracking-[0.11em] text-carbon-300"
            >
              <Check className="size-3.5 shrink-0 text-signal" strokeWidth={2} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
