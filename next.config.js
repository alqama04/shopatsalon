/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        hostname: "files.edgestore.dev",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
