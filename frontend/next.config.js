/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // Remove rewrites - let the frontend make direct API calls to localhost:8080
};

module.exports = nextConfig;
