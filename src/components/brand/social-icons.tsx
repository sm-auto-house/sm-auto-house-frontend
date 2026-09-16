import type { SVGProps } from "react";

/**
 * lucide-react v1 removed brand glyphs, so the four social marks the footer
 * needs are defined here as simple filled paths.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Glyph({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M14 9V6.6a1.6 1.6 0 0 1 1.6-1.6H17.3V2.1c-.6-.07-1.5-.1-2.5-.1A4.6 4.6 0 0 0 10.2 7v2H7.4v3.2h2.8V22H14v-9.8h2.8l.5-3.2H14Z" />
    </Glyph>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        fillRule="evenodd"
        d="M7.6 2h8.8A5.6 5.6 0 0 1 22 7.6v8.8a5.6 5.6 0 0 1-5.6 5.6H7.6A5.6 5.6 0 0 1 2 16.4V7.6A5.6 5.6 0 0 1 7.6 2Zm0 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm4.4 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.2-2.9a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"
        clipRule="evenodd"
      />
    </Glyph>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M5 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3.1 9.6h3.8V21H3.1V9.6Zm6.3 0h3.6v1.6h.05c.5-.93 1.75-1.9 3.6-1.9 3.5 0 4.35 2.15 4.35 5.1V21h-3.8v-5.7c0-1.36-.03-3.11-1.95-3.11-1.95 0-2.25 1.48-2.25 3.01V21H9.4V9.6Z" />
    </Glyph>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M21.6 7.3a2.55 2.55 0 0 0-1.79-1.8C18.2 5.05 12 5.05 12 5.05s-6.2 0-7.81.45A2.55 2.55 0 0 0 2.4 7.3 26.6 26.6 0 0 0 2 12a26.6 26.6 0 0 0 .4 4.7 2.55 2.55 0 0 0 1.79 1.8c1.61.45 7.81.45 7.81.45s6.2 0 7.81-.45a2.55 2.55 0 0 0 1.79-1.8A26.6 26.6 0 0 0 22 12a26.6 26.6 0 0 0-.4-4.7ZM10.05 15.02V8.98L15.3 12l-5.25 3.02Z" />
    </Glyph>
  );
}

export const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
} as const;
