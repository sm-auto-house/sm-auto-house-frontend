import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { site } from "@/lib/site";
import { DEFAULT_THEME, THEME_SCRIPT } from "@/lib/theme";

import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
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
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  // Browser chrome follows the OS preference. A visitor who has explicitly
  // chosen the other theme keeps the default bar colour — a meta tag cannot
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
      className={`${DEFAULT_THEME} ${archivo.variable} ${inter.variable} ${jetbrains.variable}`}
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
