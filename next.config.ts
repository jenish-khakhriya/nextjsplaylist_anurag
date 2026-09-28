import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   async redirects() {
    return [
      {
        source: "/manage-followers",
        destination: "/manage-followers/followers",
        permanent: false,
      },
    ];
  },
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/images/**",
      },
       {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/images.png",
      },
    ],
  },
};

export default nextConfig;
