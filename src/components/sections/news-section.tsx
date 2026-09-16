"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { articles, type Article } from "@/lib/content";

export function NewsSection() {
  return (
    <section
      id="news"
      className="relative scroll-mt-24 bg-carbon-925 py-(--spacing-section)"
    >
      <Container>
        <SectionHeading
          eyebrow="Journal"
          lines={["Latest From", "Our World"]}
          description="Company news, technical notes and seasonal guidance from the workshop floor."
          headingClassName="text-[clamp(1.9rem,5vw,3.4rem)]"
          action={
            <Magnetic strength={0.22}>
              <Button size="cta" variant="hairline" className="group/cta">
                All Articles
                <ArrowRight className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1.5" />
              </Button>
            </Magnetic>
          }
        />

        <RevealGroup
          stagger={0.1}
          amount={0.12}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-20 lg:gap-6"
        >
          {articles.map((article) => (
            <RevealItem key={article.id} className="h-full">
              <ArticleCard article={article} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href="#news"
      className="group flex h-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 focus-visible:outline-none"
    >
      <div
        data-surface="media"
        className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-md bg-carbon-850 ring-1 ring-ink/[0.06] transition-[--tw-ring-color] duration-500 group-hover:ring-ink/20 group-focus-visible:ring-2 group-focus-visible:ring-signal">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.09]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-carbon-950/25 transition-opacity duration-700 group-hover:opacity-0"
        />
        <span className="absolute left-4 top-4 rounded-full border border-ink/15 bg-carbon-950/60 px-3 py-1.5 font-tech text-[0.5625rem] uppercase tracking-[0.18em] text-ink backdrop-blur-md">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <time className="font-tech text-[0.5625rem] uppercase tracking-[0.24em] text-carbon-500">
          {article.date}
        </time>

        <h3 className="mt-3 font-display text-lg font-bold uppercase leading-[1.18] tracking-[-0.015em] text-ink transition-colors duration-500 group-hover:text-signal lg:text-xl">
          {article.title}
        </h3>

        <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-carbon-400">
          {article.excerpt}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 font-tech text-[0.625rem] uppercase tracking-[0.2em] text-carbon-200">
          Read More
          <ArrowRight
            className="size-3.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-signal"
            strokeWidth={1.8}
          />
        </span>
      </div>
    </a>
  );
}
