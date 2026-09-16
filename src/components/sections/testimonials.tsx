"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials, type Testimonial } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <section className="relative bg-carbon-900 py-(--spacing-section)">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          lines={["What Our", "Customers Say"]}
          description="Workshops, fleets and retailers who rely on our supply, week in and week out."
          headingClassName="text-[clamp(1.9rem,5vw,3.4rem)]"
        />

        <RevealGroup
          stagger={0.09}
          amount={0.12}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.id} className="h-full">
              <TestimonialCard testimonial={testimonial} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-md p-6 lg:p-7",
        "bg-carbon-850 ring-1 ring-ink/[0.06]",
        "transition-[transform,box-shadow,--tw-ring-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1.5 hover:ring-ink/[0.16] hover:shadow-[0_30px_60px_-40px_var(--shadow-plate)]",
      )}
    >
      <Quote
        aria-hidden
        className="absolute -right-2 -top-1 size-16 text-ink/[0.035] transition-colors duration-500 group-hover:text-signal/10"
        strokeWidth={1}
      />

      <div className="relative">
        <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              aria-hidden
              className={cn(
                "size-3.5",
                i < testimonial.rating
                  ? "fill-signal text-signal"
                  : "text-carbon-600",
              )}
              strokeWidth={1.5}
            />
          ))}
        </div>

        <blockquote className="mt-5 text-[0.9375rem] leading-relaxed text-carbon-200">
          {testimonial.quote}
        </blockquote>
      </div>

      <figcaption className="relative mt-7 flex items-center gap-3 border-t border-ink/[0.07] pt-5">
        <span className="relative size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
          <Image
            src={testimonial.avatar}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[0.8125rem] font-bold uppercase leading-snug tracking-[0.04em] text-ink">
            {testimonial.name}
          </span>
          <span className="mt-1 block font-tech text-[0.5625rem] uppercase leading-[1.6] tracking-[0.1em] text-carbon-400">
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
