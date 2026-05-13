import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // <--- ADICIONE ESTA LINHA
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
