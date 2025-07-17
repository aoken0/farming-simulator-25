import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
