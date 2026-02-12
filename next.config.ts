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
    const isDev = process.env.NODE_ENV === "development";

    return [
      // API proxy (keep your existing)
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`,
      },

      // Tenant subdomain handling (local + prod)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value:
              "(?<tenant>[^.]+)\\.(localhost|fevico\\.com\\.ng|yourdomain\\.com)",
          },
        ],
        destination: "/:path*", // keep same path, just use host to extract tenant
      },

      // Optional: redirect non-tenant subdomains or invalid to main
      // {
      //   source: '/:path*',
      //   has: [{ type: 'host', value: '^(?!www|api|localhost).*$' }],
      //   destination: 'https://fevico.com.ng/:path*',
      //   permanent: false,
      // },
    ];
  },
};

export default nextConfig;
