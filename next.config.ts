import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.135"],
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      // @mediapipe/face_detection is an IIFE with no ES module exports,
      // which breaks Turbopack's static analysis. The actual mediapipe
      // solution is loaded via CDN (solutionPath), so a stub is safe here.
      "@mediapipe/face_detection": "./lib/mediapipe-face-detection-stub.js",
    },
  },
};

export default nextConfig;
