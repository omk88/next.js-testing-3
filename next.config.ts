import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: ""
      },
      {
        hostname: "joyous-firefly-383.eu-west-1.convex.cloud",
        protocol: "https",
        port: ""
      }
    ]
  }
};

export default nextConfig;
