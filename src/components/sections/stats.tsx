"use client";

import { CountUp } from "@/components/motion/count-up";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { stats } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Stats({ className }: { className?: string }) {
  return (
    <RevealGroup
      stagger={0.1}
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden bg-ink/[0.08]",
        className,
      )}
    >
      {stats.map((stat) => (
        <RevealItem key={stat.label} className="bg-carbon-925">
          <div className="group flex h-full flex-col justify-between gap-3 px-3 py-6 sm:py-7 xl:px-3.5">
            <CountUp
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-none tracking-[-0.025em] text-ink transition-colors duration-500 group-hover:text-signal"
            />
            <span className="font-tech text-[0.625rem] uppercase leading-[1.6] tracking-[0.13em] text-carbon-400">
              {stat.label}
            </span>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
