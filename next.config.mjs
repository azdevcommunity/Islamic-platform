import {withSentryConfig} from '@sentry/nextjs';
// next.config.mjs
/** @type {import('next').NextConfig} */

// Security Headers
const securityHeaders = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()'
    },
];

const nextConfig = {
    reactStrictMode: true, // ✅ Enabled for better development experience
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true, // ESLint'i build sırasında devre dışı bırak
    },
    images: {
        unoptimized: false, // ✅ Enabled image optimization
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 86400, // 24 saat - video thumbnails çox dəyişmir
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
            {
                protocol: 'https',
                hostname: '52principlesforchurchleaders.com',
            }
        ]
    },
    experimental: {
        optimizeCss: false,
        scrollRestoration: true,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
            {
                source: '/videos/:path*',
                headers: [
                    ...securityHeaders,
                    {
                        key: 'Cache-Control',
                        value: 'public, s-maxage=3600, stale-while-revalidate=86400',
                    },
                ],
            },
            {
                source: '/_next/image/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, immutable',
                    },
                ],
            },
        ];
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

export default withSentryConfig(nextConfig, {
  org: "yusif-2z",
  project: "nizamiyyemedresesi",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
});