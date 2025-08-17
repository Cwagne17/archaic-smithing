import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable experimental features as needed
  },
  // Exclude test files from TypeScript checking in build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    // Run ESLint on these directories during build
    dirs: ['app', 'components', 'lib', 'types'],
  },
};

export default nextConfig;
