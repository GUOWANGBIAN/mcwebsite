import type { NextConfig } from "next";
import { execSync } from "child_process";

let gitHash = "dev";
try {
  gitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch {}

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_GIT_HASH: gitHash,
  },
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
    ],
  },
};

export default nextConfig;
