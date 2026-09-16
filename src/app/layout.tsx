import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Saira } from "next/font/google";

import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { site } from "@/lib/site";
import { DEFAULT_THEME, THEME_SCRIPT } from "@/lib/theme";

import "./globals.css";

/**
 * Three faces, one argument.
 *
 * Saira carries the headlines: squared counters and flat terminals that pick up
 * the geometry of the AUTO HOUSE wordmark in the logo, so the display type and
 * the mark read as the same family of shapes.
 *
 * Body and small technical labels come from one superfamily, IBM Plex. Sharing
 * a skeleton between the running text and the monospace labels is what stops
 * the page looking like three unrelated webfonts stacked together.
 */
const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "automotive spare parts Sri Lanka",
    "engine parts",
    "brake parts",
    "motor oil",
    "automotive filters",
    "car care",
    "SM Auto House",
  ],
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  // Browser chrome follows the OS preference. A visitor who has explicitly
  // chosen the other theme keeps the default bar colour, since a meta tag cannot
  // read localStorage, and the page itself is correct either way.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#07080b" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${DEFAULT_THEME} ${saira.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Corrects the theme class on <html> during HTML parsing, before the
            first paint, so a light-theme visitor never sees a dark flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-carbon-925 text-carbon-100">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
