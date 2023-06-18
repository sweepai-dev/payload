/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 6000,
    domains: [
      'localhost',
    ],
  },
}

module.exports = nextConfig
