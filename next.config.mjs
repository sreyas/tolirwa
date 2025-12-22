/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // recommended
  experimental: {
    appDir: true, // ✅ ensures Next.js uses the App Router system
  },
  images: {
    domains: ['www.tolirwa.com', 'dev.tolirwa.com']
  },
};

export default nextConfig;
