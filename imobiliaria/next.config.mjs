/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'houseback-api.onrender.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

};

export default nextConfig;
