/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config")

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img-c.udemycdn.com',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n
}

module.exports = nextConfig
