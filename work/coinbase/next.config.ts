import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/lbx-webarena-coinbase' : '',
};

export default nextConfig;
