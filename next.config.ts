import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // Note: Next.js should automatically detect the correct root
  // If you still see lockfile warnings, ensure you're running from my-app directory
  
  // Fix for Tailwind CSS v4 with Turbopack - resolves module resolution issue
  // Uses process.cwd() to get the current working directory (my-app when running npm commands)
  experimental: {
    turbo: {
      resolveAlias: {
        tailwindcss: resolve(process.cwd(), "node_modules/tailwindcss"),
      },
    },
  },
};

export default nextConfig;
