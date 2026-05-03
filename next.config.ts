import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
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
