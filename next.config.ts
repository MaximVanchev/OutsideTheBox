import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'creators.djfan.app',
      },
    ],
  },
  experimental: {
    workerThreads: false,
    // This can sometimes help with memory issues during build
    cpus: 1,
  },
};

export default nextConfig;
