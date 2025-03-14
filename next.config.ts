import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["books.google.com"],
  },
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
