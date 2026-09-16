"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { categories, type Category } from "@/lib/content";
import { cn } from "@/lib/utils";

export function CategoryGrid() {
  return (
    <section
      id="products"
      className="relative scroll-mt-24 bg-carbon-925 py-(--spacing-section)"
    >
      <Container>
        <SectionHeading
          eyebrow="Product Range"
          lines={["Everything Your", "Vehicle Needs."]}
          description="Explore our complete range of automotive products and components: sourced, tested and stocked for workshops across Sri Lanka."
        />

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-4">
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <Reveal
      direction="up"
      delay={(index % 3) * 0.08}
      amount={0.18}
      className={cn("sm:col-span-1", category.span)}
    >
      <motion.a
        href="#showcase"
        data-surface="media"
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "group relative block w-full overflow-hidden rounded-md bg-carbon-850",
          "ring-1 ring-ink/[0.06] transition-[box-shadow,--tw-ring-color] duration-500",
          "hover:ring-ink/20 hover:shadow-[0_32px_70px_-40px_var(--shadow-plate)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal",
          category.height,
        )}
      >
        {/* Photography */}
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.09]"
        />

        {/* Base legibility wash */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/55 to-carbon-950/10"
        />
        {/* Accent glaze that sweeps in on hover */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-signal/35 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
        {/* Hairline that draws itself along the top edge */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />

        {/* Index */}
        <span className="absolute left-5 top-5 font-tech text-[0.625rem] tracking-[0.11em] text-ink/45 sm:left-6 sm:top-6">
          {category.index}
        </span>

        {/* Content */}
        <span className="absolute inset-x-0 bottom-0 flex flex-col p-5 sm:p-6 lg:p-8">
          <span className="font-display text-[1.375rem] font-extrabold uppercase leading-[1.05] tracking-[-0.012em] text-ink sm:text-2xl lg:text-[1.75rem]">
            {category.title}
          </span>

          {/* Description + link slide up together on hover; always visible on touch */}
          <span className="mt-2 block max-w-sm text-[0.8125rem] leading-relaxed text-carbon-300 transition-colors duration-500 group-hover:text-carbon-200 sm:text-sm">
            {category.description}
          </span>

          <span className="mt-4 inline-flex items-center gap-2 font-tech text-[0.625rem] uppercase tracking-[0.1em] text-ink lg:mt-5">
            <span className="transition-colors duration-500 group-hover:text-signal">
              Explore
            </span>
            <ArrowRight
              className="size-3.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-signal"
              strokeWidth={1.8}
            />
          </span>
        </span>
      </motion.a>
    </Reveal>
  );
}
