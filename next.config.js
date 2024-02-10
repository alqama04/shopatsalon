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

const devMode = process.env.NEXTAUTH_URL === "http://localhost:3000";

const withPWA = require("next-pwa")({
  dest: "public",
  disable:devMode?true:false,
  skipWaiting: true
});

module.exports = withPWA(nextConfig);

// module.exports = nextConfig
