import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/farming-simulator-25',
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
