"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { products, type Product } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    syncEdges();
    el.addEventListener("scroll", syncEdges, { passive: true });
    window.addEventListener("resize", syncEdges);
    return () => {
      el.removeEventListener("scroll", syncEdges);
      window.removeEventListener("resize", syncEdges);
    };
  }, [syncEdges]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    // Advance by one card plus its gutter, so cards always land flush.
    const card = el.querySelector<HTMLElement>("[data-product-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  return (
    <section
      id="showcase"
      className="relative scroll-mt-24 overflow-hidden bg-carbon-950 py-(--spacing-section)"
    >
      {/* Deep accent bloom behind the rail */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-[160px]"
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Featured Products"
          lines={["Performance", "You Can Trust."]}
          description="A selection from the shelves — lubricants, components and consumables we supply every day."
          action={
            <div className="flex items-center gap-3">
              <Button
                size="dial"
                variant="hairline"
                aria-label="Previous products"
                disabled={atStart}
                onClick={() => scrollByCard(-1)}
                className="disabled:opacity-25"
              >
                <ArrowLeft className="size-4" strokeWidth={1.7} />
              </Button>
              <Button
                size="dial"
                variant="hairline"
                aria-label="Next products"
                disabled={atEnd}
                onClick={() => scrollByCard(1)}
                className="disabled:opacity-25"
              >
                <ArrowRight className="size-4" strokeWidth={1.7} />
              </Button>
            </div>
          }
        />
      </Container>

      {/* Full-bleed rail: it starts at the container gutter but runs off-screen */}
      <div className="relative z-10 mt-14 lg:mt-20">
        <div
          ref={railRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-2 sm:px-8 lg:px-12 xl:px-16
            scroll-pl-5 sm:scroll-pl-8 lg:scroll-pl-12 xl:scroll-pl-16"
          role="region"
          aria-label="Featured products carousel"
          tabIndex={0}
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
          {/* Trailing spacer so the last card can clear the right gutter */}
          <div aria-hidden className="w-1 shrink-0 sm:w-4 lg:w-8" />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="mt-8 flex items-center gap-4">
          <span className="font-tech text-[0.5625rem] uppercase tracking-[0.28em] text-carbon-500">
            Drag or scroll
          </span>
          <span aria-hidden className="h-px flex-1 rule-fade" />
          <span className="font-tech text-[0.5625rem] uppercase tracking-[0.28em] text-carbon-500">
            {String(products.length).padStart(2, "0")} items
          </span>
        </div>
      </Container>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Reveal
      direction="up"
      delay={Math.min(index, 4) * 0.07}
      amount={0.1}
      className="shrink-0 snap-start"
    >
      <a
        data-product-card
        data-surface="media"
        href="#contact"
        className={cn(
          "group relative flex h-[26rem] w-[17rem] flex-col justify-end overflow-hidden rounded-md",
          "bg-carbon-850 ring-1 ring-ink/[0.07] transition-[box-shadow,--tw-ring-color] duration-500",
          "hover:ring-ink/20 hover:shadow-[0_36px_70px_-40px_var(--shadow-plate)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal",
          "sm:h-[30rem] sm:w-[20rem] lg:h-[34rem] lg:w-[23rem]",
        )}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 24vw"
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
        />

        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/45 to-transparent"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-signal/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />

        {/* Spec chip */}
        <span className="absolute left-5 top-5 rounded-full border border-ink/15 bg-carbon-950/45 px-3 py-1.5 font-tech text-[0.5625rem] uppercase tracking-[0.18em] text-carbon-200 backdrop-blur-md">
          {product.spec}
        </span>

        <span className="relative z-10 flex flex-col p-5 sm:p-6">
          <span className="font-tech text-[0.5625rem] uppercase tracking-[0.24em] text-signal">
            {product.category}
          </span>
          <span className="mt-2.5 font-display text-xl font-extrabold uppercase leading-[1.08] tracking-[-0.02em] text-ink sm:text-[1.375rem]">
            {product.name}
          </span>

          <span className="mt-4 flex items-center gap-2 font-tech text-[0.625rem] uppercase tracking-[0.2em] text-carbon-200 transition-colors duration-500 group-hover:text-ink">
            View Product
            <ArrowRight
              className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
              strokeWidth={1.8}
            />
          </span>

          {/* Underline that draws on hover */}
          <span
            aria-hidden
            className="mt-4 h-px w-full origin-left scale-x-0 bg-ink/25 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          />
        </span>
      </a>
    </Reveal>
  );
}
