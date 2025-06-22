import type {MetadataRoute} from 'next'

const robots: MetadataRoute.Robots = {
    rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
    },
    sitemap: process.env.APP_URL + '/sitemap.xml',
};

export default robots;