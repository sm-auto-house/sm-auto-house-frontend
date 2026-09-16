import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  /** One entry per masked line of the headline. */
  lines: string[];
  description?: string;
  align?: "left" | "center";
  className?: string;
  headingClassName?: string;
  as?: "h1" | "h2" | "h3";
  action?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  lines,
  description,
  align = "left",
  className,
  headingClassName,
  as = "h2",
  action,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        action && !centered
          ? "lg:flex-row lg:items-end lg:justify-between lg:gap-16"
          : null,
        className,
      )}
    >
      <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
        {eyebrow ? (
          <Reveal direction="up" duration={0.6}>
            <EyebrowLabel className={cn(centered && "justify-center")}>
              {eyebrow}
            </EyebrowLabel>
          </Reveal>
        ) : null}

        <TextReveal
          as={as}
          lines={lines}
          delay={0.06}
          className={cn(
            "mt-6 font-display font-extrabold uppercase display-tight",
            "text-[clamp(2.1rem,6.2vw,4.5rem)]",
            headingClassName,
          )}
        />

        {description ? (
          <Reveal direction="up" delay={0.18} duration={0.7}>
            <p
              className={cn(
                "mt-6 max-w-xl text-[0.975rem] leading-relaxed text-carbon-300 sm:text-base",
                centered && "mx-auto",
              )}
            >
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? (
        <Reveal direction="up" delay={0.24} className={cn(centered && "self-center")}>
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
