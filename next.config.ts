import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */

// Merge MDX config with Next.js config

const nextConfig: NextConfig = {
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
  images: {
    remotePatterns: [
      new URL('https://placehold.co/*'),
      new URL('https://github.com/**'),
      new URL('https://i.imgur.com/**'),
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    viewTransition: true,
    nodeMiddleware: true,
    useCache: true,
  },
};

export default withMDX(nextConfig);
