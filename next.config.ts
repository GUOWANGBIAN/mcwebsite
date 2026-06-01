import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crafatar.com",
      },
      {
        protocol: "https",
        hostname: "minotar.net",
      },
      {
        protocol: "https",
        hostname: "mc-heads.net",
      },
      {
        protocol: "https",
        hostname: "discord.com",
      },
    ],
  },
};

export default nextConfig;
