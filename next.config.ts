import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/definition", destination: "/", permanent: true }];
  },
  // Turbopack resolve alias for Tailwind CSS v4 (Next.js 16: top-level turbopack, not experimental.turbo)
  turbopack: {
    resolveAlias: {
      tailwindcss: resolve(process.cwd(), "node_modules/tailwindcss"),
    },
  },
};

export default nextConfig;
