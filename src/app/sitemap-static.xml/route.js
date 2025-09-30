export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://npiconsultoria.com.br';
        
        console.log(`🗺️ [SITEMAP-STATIC] Generating static sitemap with baseUrl: ${baseUrl}`);

        // URLs estáticas apenas
        const staticUrls = [
            { 
                url: baseUrl, 
                priority: 1.0, 
                changeFrequency: 'weekly',
                lastModified: new Date()
            },
            { 
                url: `${baseUrl}/sobre/hub-imobiliarias`, 
                priority: 0.8, 
                changeFrequency: 'weekly',
                lastModified: new Date()
            },
            { 
                url: `${baseUrl}/sobre/npi-imoveis`, 
                priority: 0.8, 
                changeFrequency: 'weekly',
                lastModified: new Date()
            },
            { 
                url: `${baseUrl}/venda-seu-imovel`, 
                priority: 0.8, 
                changeFrequency: 'weekly',
                lastModified: new Date()
            },
        ];

        const staticSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map((entry) => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastModified ? `<lastmod>${entry.lastModified.toISOString()}</lastmod>` : ''}
    ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

        console.log(`📊 [SITEMAP-STATIC] XML Size: ${staticSitemapContent.length} bytes, URLs: ${staticUrls.length}`);

        return new Response(staticSitemapContent, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, max-age=3600',
                'Content-Length': staticSitemapContent.length.toString(),
            },
        });
    } catch (error) {
        console.error('🚨 [SITEMAP-STATIC] Error generating static sitemap:', error);
        
        // Fallback simples
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://npiconsultoria.com.br';
        const fallbackContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

        return new Response(fallbackContent, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, max-age=3600',
            },
        });
    }
}
