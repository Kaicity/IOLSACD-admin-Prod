import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ hostname: 'utfs.io', port: '', protocol: 'https' }],
  },
  /* config options here */
};

export default nextConfig;
