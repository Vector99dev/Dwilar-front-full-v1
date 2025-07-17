import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img-v2.gtsstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.sothebysrealty.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sothebysrealty.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['img-v2.gtsstatic.net', 'm.sothebysrealty.com', 'sothebysrealty.com'],
  },
};

export default nextConfig;
