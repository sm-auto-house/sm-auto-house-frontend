import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Editorial photography is served from Unsplash's CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Next 16 requires every quality we ask for to be allowlisted.
    qualities: [60, 75, 90],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
