/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // Commented out for development - uncomment for static export
  // basePath: '/Pac_Man', // Commented out for development - uncomment for deployment
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

