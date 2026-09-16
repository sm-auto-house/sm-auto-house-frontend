"use client";

import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { SOCIAL_ICONS } from "@/components/brand/social-icons";
import { Reveal } from "@/components/motion/reveal";
import { scrollToSection } from "@/components/providers/smooth-scroll";
import { Container } from "@/components/ui/container";
import { footerProductLinks, navigation, site, socialLinks } from "@/lib/site";

export function Footer() {
  const { contact } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink/[0.07] bg-carbon-950">
      <Container>
        {/* ---------------- Upper ---------------- */}
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
          {/* Identity */}
          <div className="lg:col-span-4">
            <Reveal direction="up">
              <Logo />
              <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-carbon-400">
                Automotive spare parts, lubricants and vehicle products supplied
                to workshops, dealers and fleets across Sri Lanka since{" "}
                {site.founded}.
              </p>

              <ul className="mt-8 flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon];
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="group flex size-10 items-center justify-center rounded-full border border-ink/10 text-carbon-400 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-signal/60 hover:text-signal"
                      >
                        <Icon className="size-[1.05rem]" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* Navigate */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <Reveal direction="up" delay={0.06}>
              <h3 className="font-tech text-[0.5625rem] uppercase tracking-[0.28em] text-carbon-500">
                Navigate
              </h3>
              <ul className="mt-6 flex flex-col gap-3.5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className="link-underline text-sm text-carbon-400 transition-colors duration-300 hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </nav>

          {/* Products */}
          <div className="lg:col-span-3">
            <Reveal direction="up" delay={0.12}>
              <h3 className="font-tech text-[0.5625rem] uppercase tracking-[0.28em] text-carbon-500">
                Products
              </h3>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3.5 lg:grid-cols-1">
                {footerProductLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className="link-underline text-sm text-carbon-400 transition-colors duration-300 hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <Reveal direction="up" delay={0.18}>
              <h3 className="font-tech text-[0.5625rem] uppercase tracking-[0.28em] text-carbon-500">
                Contact
              </h3>
              <ul className="mt-6 flex flex-col gap-5">
                <li className="flex gap-3">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-signal"
                    strokeWidth={1.6}
                  />
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm leading-relaxed text-carbon-400 transition-colors duration-300 hover:text-ink"
                  >
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}, {contact.address.country}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone
                    className="mt-0.5 size-4 shrink-0 text-signal"
                    strokeWidth={1.6}
                  />
                  <a
                    href={contact.phoneHref}
                    className="text-sm text-carbon-400 transition-colors duration-300 hover:text-ink"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-signal"
                    strokeWidth={1.6}
                  />
                  <a
                    href={contact.emailHref}
                    className="break-all text-sm text-carbon-400 transition-colors duration-300 hover:text-ink"
                  >
                    {contact.email}
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>

        {/* ---------------- Oversized signature ---------------- */}
        <div className="relative border-t border-ink/[0.07] pt-10">
          <Reveal direction="up" amount={0.2}>
            <p
              aria-hidden
              className="select-none font-display text-[clamp(2.5rem,13vw,11rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.045em] text-transparent [-webkit-text-stroke:1px_var(--hairline)]"
            >
              SM Auto House
            </p>
          </Reveal>
        </div>

        {/* ---------------- Lower bar ---------------- */}
        <div className="flex flex-col gap-6 border-t border-ink/[0.07] py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-tech text-[0.625rem] uppercase tracking-[0.18em] text-carbon-500">
            © {year} {site.legalName}. All rights reserved.
          </p>

          <p className="font-tech text-[0.625rem] uppercase tracking-[0.22em] text-carbon-300">
            <span className="text-signal">/</span> {site.signature}
          </p>

          <button
            type="button"
            onClick={() => scrollToSection("#home")}
            className="group inline-flex items-center gap-2 self-start font-tech text-[0.625rem] uppercase tracking-[0.18em] text-carbon-500 transition-colors duration-300 hover:text-ink sm:self-auto"
          >
            Back to top
            <ArrowUp
              className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:text-signal"
              strokeWidth={1.8}
            />
          </button>
        </div>
      </Container>
    </footer>
  );
}
