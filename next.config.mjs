/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'lh4.googleusercontent.com' },
      { hostname: 'pub-cfeefa67a6af4937b33f9a7717a77a7f.r2.dev' }
    ]
  }
};

export default nextConfig;
