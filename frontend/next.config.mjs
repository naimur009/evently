/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: undefined // Disable turbo for production builds
  },
  images: {
    domains: ['localhost'], // Add your image domains here
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  },
  // Ensure all pages are properly generated
  trailingSlash: false,
  // Handle client-side routing
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
