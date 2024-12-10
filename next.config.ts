import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['placehold.co'],
    dangerouslyAllowSVG: true,  // Allow SVG images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Improves security
  },
};

export default nextConfig;
