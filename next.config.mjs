// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ]
    },
    experimental: {
        optimizeCss: false,
        scrollRestoration: true,
    },
    async rewrites() {
        return [
            {
                source: '/ex-api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
            },
            {
                source: '/ytb-api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BASE_URL_YTB}/:path*`,
            },
            {
                source: "/sitemap.xml",
                destination: "/api/sitemap",
            },
        ];
    },
};

export default nextConfig;
