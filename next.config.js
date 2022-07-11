/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'i.scdn.co',
      'charts-images.scdn.co',
      'mosaic.scdn.co',
      't.scdn.co',
    ],
  },
  compress: true,
}

module.exports = nextConfig
