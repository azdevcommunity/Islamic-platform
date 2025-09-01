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
        // Performans optimizasyonları
        optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-icons'],
    },
    // Performans optimizasyonları
    compiler: {
        // CSS optimizasyonu
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Webpack optimizasyonları
    webpack: (config, { dev, isServer }) => {
        // Production optimizasyonları
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                    framerMotion: {
                        test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
                        name: 'framer-motion',
                        chunks: 'all',
                        priority: 10,
                    },
                },
            };
        }
        
        return config;
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
