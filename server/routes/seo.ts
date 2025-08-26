import type { Express, Request, Response } from 'express';
import type { IStorage } from '../storage';

export function setupSEORoutes(app: Express, storage: IStorage) {
  
  // Robots.txt endpoint
  app.get('/robots.txt', (req: Request, res: Response) => {
    // Dynamic base URL based on request
    const protocol = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : 'http');
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin pages
Disallow: /admin
Disallow: /api/admin

# Allow specific pages
Allow: /
Allow: /servizi
Allow: /diagnosi-chirurgica
Allow: /contatti
Allow: /blog
Allow: /privacy-policy
Allow: /cookie-policy

# Crawl delay
Crawl-delay: 1`);
  });

  // Sitemap.xml endpoint
  app.get('/sitemap.xml', async (req: Request, res: Response) => {
    try {
      // Get published blog posts for sitemap
      const blogPosts = await storage.getAllBlogPosts();
      const publishedPosts = blogPosts.filter(post => post.status === 'published');
      
      // Dynamic base URL based on request
      const protocol = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : 'http');
      const host = req.headers.host;
      const baseUrl = `${protocol}://${host}`;
      const currentDate = new Date().toISOString().split('T')[0];
      
      const staticPages = [
        { url: '/', changefreq: 'weekly', priority: '1.0' },
        { url: '/servizi', changefreq: 'monthly', priority: '0.9' },
        { url: '/diagnosi-chirurgica', changefreq: 'monthly', priority: '0.8' },
        { url: '/contatti', changefreq: 'monthly', priority: '0.7' },
        { url: '/blog', changefreq: 'weekly', priority: '0.8' },
        { url: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
        { url: '/cookie-policy', changefreq: 'yearly', priority: '0.3' }
      ];

      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      // Add static pages
      staticPages.forEach(page => {
        sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      });

      // Add blog posts
      publishedPosts.forEach(post => {
        const postDate = new Date(post.updatedAt || post.createdAt).toISOString().split('T')[0];
        sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });

      sitemap += `
</urlset>`;

      res.type('application/xml');
      res.send(sitemap);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error generating sitemap:', error);
      }
      res.status(500).send('Error generating sitemap');
    }
  });
}