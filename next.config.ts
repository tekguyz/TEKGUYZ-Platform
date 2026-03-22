import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ensure the build fails on type errors for a Tier 1 release
  typescript: {
    ignoreBuildErrors: false,
  },
  // We keep this to allow the build to proceed even with minor linting warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Required for smooth Framer Motion (motion/react) transitions in Next.js
  transpilePackages: ['motion'],
};

export default nextConfig;