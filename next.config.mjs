/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'images.unsplash.com' },
            { hostname: 'res.cloudinary.com' },
            { hostname: 'lh3.googleusercontent.com' },
            { hostname: 'plus.unsplash.com' },
            { hostname: 'tailwindui.com' },
        ]
    }
};

export default nextConfig;
