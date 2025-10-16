import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable Partial Prerendering (PPR) for Next.js 15
  experimental: {
    ppr: true,
  },

  // Enable standalone output for Docker
  output: 'standalone',

  // Disable telemetry
  telemetry: false,
};

export default nextConfig;
