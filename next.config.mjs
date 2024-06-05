/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dd.dexscreener.com',
                port: '',
                pathname: '/ds-data/tokens/solana/**',
            },
        ],
    },
};

export default nextConfig;
