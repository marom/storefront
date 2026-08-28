import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle (.next/standalone/server.js) for the Docker image.
  output: "standalone",
};

export default nextConfig;
