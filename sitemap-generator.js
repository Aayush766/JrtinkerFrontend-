import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const staticRoutes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.8 },
    { url: '/courses', changefreq: 'weekly', priority: 0.8 },
    { url: '/blog', changefreq: 'weekly', priority: 0.8 },
    { url: '/login', changefreq: 'monthly', priority: 0.8 },
    { url: '/register', changefreq: 'monthly', priority: 0.8 },
    { url: '/products', changefreq: 'monthly', priority: 0.8 },
    { url: '/stemlab', changefreq: 'monthly', priority: 0.8 },
    { url: '/projects', changefreq: 'monthly', priority: 0.8 },
    { url: '/contact-us', changefreq: 'monthly', priority: 0.8 },
    { url: '/know-more-info', changefreq: 'monthly', priority: 0.8 },
];

async function generateSitemap() {
    try {
        const blogsRes = await axios.get('https://jrtinker01.onrender.com/api/blogs');
        const coursesRes = await axios.get('https://jrtinker01.onrender.com/api/courses');

        // Safely extract the blogs data, ensuring it's an array.
        const blogs = Array.isArray(blogsRes.data) ? blogsRes.data : (blogsRes.data?.blogs || []);
        
        // Safely extract the courses data, ensuring it's an array.
        const courses = Array.isArray(coursesRes.data) ? coursesRes.data : (coursesRes.data?.courses || []);
        
        const dynamicRoutes = [
            ...blogs.map(blog => ({ url: `/blog/${blog.slug}`, changefreq: 'weekly', priority: 0.8 })),
            ...courses.map(course => ({ url: `/courses/${course.slug}`, changefreq: 'weekly', priority: 0.8 })),
        ];

        const allRoutes = [...staticRoutes, ...dynamicRoutes];

        const sitemapStream = new SitemapStream({ hostname: 'https://jrtinker.com' });
        const readable = Readable.from(allRoutes);
        readable.pipe(sitemapStream);

        const sitemapXML = await streamToPromise(sitemapStream);
        const filePath = path.resolve('./public/sitemap.xml');
        fs.writeFileSync(filePath, sitemapXML);

        console.log('✅ Sitemap generated successfully!');
    } catch (error) {
        console.error('❌ Failed to generate sitemap:', error);
    }
}

generateSitemap();