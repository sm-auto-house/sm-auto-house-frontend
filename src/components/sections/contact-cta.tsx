"use client";

import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { img, photo } from "@/lib/images";
import { site } from "@/lib/site";

export function ContactCTA() {
  const { contact } = site;

  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden bg-carbon-950 py-(--spacing-section)"
    >
      {/* Heavily dimmed plate — texture, not subject matter */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.16]"
        style={{
          backgroundImage: `url(${img(photo.darkGarageLineup, { w: 2000, h: 1200 })})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-carbon-950 via-carbon-950/85 to-carbon-950"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-signal/[0.09] blur-[150px]"
      />

      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal direction="up" duration={0.6}>
              <EyebrowLabel>Get in Touch</EyebrowLabel>
            </Reveal>

            <TextReveal
              lines={["Let's Keep Your Vehicle", "Moving Forward."]}
              delay={0.08}
              className="mt-6 font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold uppercase text-ink display-tight"
            />

            <Reveal direction="up" delay={0.18}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-carbon-300">
                Talk to our team about automotive parts, products and solutions.
                Tell us the vehicle and the fault — we will identify the right
                part and confirm availability.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.26}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Magnetic strength={0.22} className="w-full sm:w-auto">
                  <Button
                    size="cta-lg"
                    variant="signal"
                    className="group/cta w-full sm:w-auto"
                    nativeButton={false}
                    render={<a href={contact.emailHref} />}
                  >
                    Contact Us
                    <ArrowRight className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1.5" />
                  </Button>
                </Magnetic>

                <Magnetic strength={0.22} className="w-full sm:w-auto">
                  <Button
                    size="cta-lg"
                    variant="hairline"
                    className="w-full sm:w-auto"
                    nativeButton={false}
                    render={
                      <a
                        href={contact.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    <MapPin />
                    Get Directions
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Contact panel */}
          <Reveal direction="left" delay={0.15} className="lg:col-span-5">
            <div className="h-full rounded-md border border-ink/10 bg-ink/[0.035] p-7 backdrop-blur-xl lg:p-9">
              <p className="font-tech text-[0.5625rem] uppercase tracking-[0.28em] text-carbon-400">
                Direct Lines
              </p>

              <ul className="mt-7 flex flex-col divide-y divide-ink/[0.08]">
                <ContactRow
                  icon={<Phone className="size-4" strokeWidth={1.6} />}
                  label="Telephone"
                  value={contact.phone}
                  href={contact.phoneHref}
                />
                <ContactRow
                  icon={<Phone className="size-4" strokeWidth={1.6} />}
                  label="Hotline"
                  value={contact.hotline}
                  href={contact.hotlineHref}
                />
                <ContactRow
                  icon={<Mail className="size-4" strokeWidth={1.6} />}
                  label="Email"
                  value={contact.email}
                  href={contact.emailHref}
                />
                <ContactRow
                  icon={<MapPin className="size-4" strokeWidth={1.6} />}
                  label="Showroom"
                  value={`${contact.address.line1}, ${contact.address.line2}`}
                  href={contact.mapsUrl}
                  external
                />
              </ul>

              <p className="mt-7 border-t border-ink/[0.08] pt-6 font-tech text-[0.625rem] uppercase tracking-[0.18em] text-carbon-400">
                {contact.hours}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center gap-4 py-5 transition-colors"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-carbon-300 transition-all duration-500 group-hover:border-signal/60 group-hover:text-signal">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-tech text-[0.5625rem] uppercase tracking-[0.22em] text-carbon-500">
            {label}
          </span>
          <span className="mt-1.5 block truncate text-sm text-carbon-100 transition-colors duration-500 group-hover:text-ink">
            {value}
          </span>
        </span>
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 text-carbon-600 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-signal"
          strokeWidth={1.6}
        />
      </a>
    </li>
  );
}
