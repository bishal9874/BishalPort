import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Bishal Mondal Portfolio',
        short_name: 'Bishal Mondal',
        description: 'Portfolio of Bishal Mondal - Full Stack Developer & IoT Specialist',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/Bishal.svg',
                sizes: '192x192',
                type: 'image/svg+xml',
            },
            {
                src: '/Bishal.svg',
                sizes: '512x512',
                type: 'image/svg+xml',
            },
        ],
    };
}
