/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allow all paths under Cloudinary
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**", // Keep Pexels if needed
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
