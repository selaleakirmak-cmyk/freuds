import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/spreads",
        destination: "/tr/spreads",
        permanent: false,
      },
      {
        source: "/deck",
        destination: "/tr/deck",
        permanent: false,
      },
      {
        source: "/reading/:path*",
        destination: "/tr/reading/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
