/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  ignoreDuringBuilds: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "*/*",
      },
    ],
  },
};

module.exports = nextConfig;
