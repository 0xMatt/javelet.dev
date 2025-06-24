import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import NextBundleAnalyzer from '@next/bundle-analyzer';


const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
})

/** @type {import('next').NextConfig} */


const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',  
});

// Merge MDX config with Next.js config


const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    images: {
        remotePatterns: [
            new URL('https://placehold.co/*'),
            new URL('https://github.com/**'),
        ],
    },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default withBundleAnalyzer(withMDX(nextConfig))