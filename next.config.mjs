/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: true,                // ✅ MUST be enabled
    serverActionsOriginCheck: false,    // ✅ This disables the check
  },
}

export default nextConfig



