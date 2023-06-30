require('dotenv').config()

module.exports = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  },
  images: {
    domains: [
      'localhost',
      // Your domain(s) here
      process.env.NEXT_PUBLIC_SERVER_URL,
    ],
  },
}
