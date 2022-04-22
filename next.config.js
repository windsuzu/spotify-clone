/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["platform-lookaside.fbsbx.com", "res.cloudinary.com"],
    },
};

module.exports = nextConfig;
