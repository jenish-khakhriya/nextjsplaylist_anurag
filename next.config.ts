import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 requires qualities to be explicitly set
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      // ui-avatars.com — fallback avatar generator
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/api/**",
      },
      // Unsplash — default blog images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Allow any http/https hostname for user-supplied profile image
      // and blog image URLs coming from the database.
      // In production, restrict these to your own CDN/storage bucket.
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
