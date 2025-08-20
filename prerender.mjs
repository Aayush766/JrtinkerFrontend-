// prerender.mjs
import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import axios from 'axios';
import http from 'http';
import handler from 'serve-handler';

// Function to generate the list of URLs from your backend
async function generateUrls() {
    try {
        console.log('Fetching slugs from production backend...');
        const baseUrl = 'https://jrtinker01.onrender.com';

        const [blogsRes, coursesRes] = await Promise.all([
            axios.get(`${baseUrl}/api/blogs`),
            axios.get(`${baseUrl}/api/courses`)
        ]);

        // IMPROVEMENT: Get the last modification date from the API
        const blogSlugs = blogsRes.data.map(blog => ({ path: `/blog/${blog.slug}`, lastmod: blog.updatedAt }));
        const courseSlugs = coursesRes.data.courses.map(course => ({ path: `/courses/${course.slug}`, lastmod: course.updatedAt }));

        const staticPages = [
            '/', '/about', '/login', '/register', '/courses',
            '/blog', '/products', '/projects' 
            // NOTE: '/contact' was removed as it was a 404. Add it back if you create the page.
        ].map(p => ({ path: p, lastmod: new Date().toISOString() }));
        
        const allPages = [
            ...staticPages,
            ...blogSlugs.map(b => ({ path: b.path, lastmod: b.lastmod || new Date().toISOString() })),
            ...courseSlugs.map(c => ({ path: c.path, lastmod: c.lastmod || new Date().toISOString() }))
        ];

        const uniquePages = Array.from(new Map(allPages.map(item => [item.path, item])).values());
        return uniquePages;

    } catch (error) {
        console.error('Failed to generate URLs:', error.message);
        return [];
    }
}

// Generates and writes the sitemap XML file
async function generateSitemap(pages, outputPath) {
    const baseUrl = 'https://jrtinker.com';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    pages.forEach(page => {
        const fullUrl = `${baseUrl}${page.path}`;
        xml += '  <url>\n';
        xml += `    <loc>${fullUrl}</loc>\n`;
        // IMPROVEMENT: Use the actual last modification date
        xml += `    <lastmod>${new Date(page.lastmod).toISOString()}</lastmod>\n`;
        xml += `    <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>\n`;
        xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    await fs.writeFile(outputPath, xml);
    console.log(`✅ Sitemap generated at: ${outputPath}`);
}

// Main pre-rendering logic
async function prerender() {
    console.log('🚀 Starting pre-rendering...');
    const buildDir = 'dist';
    const server = http.createServer((request, response) => {
        return handler(request, response, {
            public: buildDir,
            rewrites: [{ source: '**', destination: '/index.html' }]
        });
    });

    const port = 5000;
    server.listen(port, () => {
        console.log(`📠 Local server running at http://localhost:${port}`);
    });

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const pagesToPrerender = await generateUrls();
    if (pagesToPrerender.length === 0) {
        console.error('❌ No URLs to pre-render. Exiting.');
        server.close();
        await browser.close();
        return;
    }

    const distPath = path.join(process.cwd(), buildDir);
    await fs.mkdir(distPath, { recursive: true });
    
    const sitemapPath = path.join(distPath, 'sitemap.xml');
    await generateSitemap(pagesToPrerender, sitemapPath);

    for (const pageInfo of pagesToPrerender) {
        // FIX: Create a new page for each URL
        const page = await browser.newPage();
        const urlPath = pageInfo.path;
        const urlToVisit = `http://localhost:${port}${urlPath}`;
        
        // FIX: Add try/catch/finally block for robust error handling
        try {
            console.log(`⏳ Pre-rendering: ${urlPath}`);
            await page.goto(urlToVisit, { waitUntil: 'networkidle0', timeout: 60000 });

            // FIX: Check for the "Not Found" page to prevent Soft 404s
            const isNotFound = await page.$('#page-not-found-container');

            if (isNotFound) {
                console.warn(`⚠️  Skipping ${urlPath} - Detected as a 404 page.`);
                continue; 
            }

            const htmlContent = await page.content();
            
            const outputDir = path.join(distPath, urlPath);
            await fs.mkdir(outputDir, { recursive: true });
            const outputFilePath = path.join(outputDir, 'index.html');

            await fs.writeFile(outputFilePath, htmlContent);

        } catch (error) {
            console.error(`❌ Failed to pre-render ${urlPath}: ${error.message}`);
        } finally {
            await page.close();
        }
    }

    const rootIndexPath = path.join(distPath, 'index.html');
    const rootPrerenderedPath = path.join(distPath, '/', 'index.html');
    try {
        await fs.copyFile(rootPrerenderedPath, rootIndexPath);
        console.log('✅ Copied root page to /index.html');
    } catch (error) {
        console.error('Could not copy root index.html:', error.message);
    }
    
    await browser.close();
    server.close();
    console.log('✅ Pre-rendering complete!');
}

prerender().catch(console.error);