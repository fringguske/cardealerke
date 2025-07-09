/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mpqznwazguinlxlnkrng.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/car-images/**',
      },
    ],
  },
};

module.exports = nextConfig; 