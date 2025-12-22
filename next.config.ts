import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS origins
      },
      {
        protocol: "http",
        hostname: "**", // Allow all HTTP origins
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for versioned images
  },
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/api/:path*",
            // destination: "https://api-x-finance.fevico.com.ng/api/v1/:path*", // proxy to remote backend
            destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`, // proxy to remote/local backend dynamically based on env var
            // destination: 'http://localhost:3810/api/:path*', // proxy to local backend
          },
        ]
      : [
        {
            source: "/api/:path*",
            destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`, // proxy to remote/local backend dynamically based on env var
          },
      ];
  },
};

export default nextConfig;
