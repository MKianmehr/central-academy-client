/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img-c.udemycdn.com',
      },
      {
        protocol: 'https',
        hostname: 's.udemycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'c-academy.s3.eu-west-3.amazonaws.com'
      }
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
})