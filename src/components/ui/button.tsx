import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",

        /* ---- brand variants ------------------------------------- */

        /** Primary call to action: solid brand violet with a lift on hover.
         *  The label stays literally white in both themes, since it sits on the
         *  filled violet, not on the page, so it must not follow `ink`. */
        signal:
          "overflow-hidden bg-signal-solid text-white shadow-[0_0_0_0_var(--glow-signal-rest)] hover:bg-signal-solid-hover hover:shadow-[0_14px_34px_-12px_var(--glow-signal-lift)]",
        /** Secondary CTA on photography: frosted glass with a hairline edge. */
        glass:
          "overflow-hidden border-ink/20 bg-ink/[0.06] text-ink backdrop-blur-md hover:border-ink/40 hover:bg-ink/[0.14]",
        /** Quiet outline for use on flat carbon backgrounds. */
        hairline:
          "overflow-hidden border-ink/15 bg-transparent text-carbon-100 hover:border-signal/70 hover:text-ink",
        /** Inverted CTA that reads as the opposite of the page, used sparingly. */
        chalk:
          "overflow-hidden bg-ink text-carbon-950 hover:bg-carbon-100",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5",
        icon: "size-8",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)]",
        "icon-lg": "size-9",

        /* ---- brand sizes ---------------------------------------- */

        /** Standard CTA: uppercase, wide tracking, generous hit area. */
        cta: "h-12 gap-2.5 rounded-sm px-6 font-tech text-[0.6875rem] uppercase tracking-[0.13em] [&_svg:not([class*='size-'])]:size-3.5",
        /** Hero-scale CTA. */
        "cta-lg":
          "h-14 gap-3 rounded-sm px-7 font-tech text-xs uppercase tracking-[0.13em] sm:px-9 [&_svg:not([class*='size-'])]:size-4",
        /** Circular control, used by the product rail arrows. */
        dial: "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
