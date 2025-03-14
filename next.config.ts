import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["books.google.com"],
  },
  output: "standalone"
};

export default nextConfig;
