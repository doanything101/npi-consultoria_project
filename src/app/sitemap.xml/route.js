export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://npiconsultoria.com.br';
        
        // Log sitemap generation for debugging
        console.log(`🗺️ [SITEMAP] Generating sitemap with baseUrl: ${baseUrl}`);

        // 1. Busque os slugs dinâmicos (do banco de dados, CMS, etc.)
        const dynamicPages = await fetchDynamicPages() || [];

        // 2. URLs estáticas com prioridades ESTRATÉGICAS
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

        // 3. URLs de IMÓVEIS com PRIORIDADE MÁXIMA (core business) - APENAS URLs VÁLIDAS
        const sitemapImoveis = dynamicPages
            .filter(page => page.codigo && page.slug) // Garantir que tem ambos
            .map((page) => ({
                url: `${baseUrl}/imovel-${page.codigo}/${page.slug}`,
                lastModified: new Date(page.updatedAt),
                changeFrequency: 'daily', // Imóveis mudam status/preço frequentemente
                priority: 0.9, // PRIORIDADE ALTA - core business
            }));

        // 4. URLs genéricas REMOVIDAS - podem causar redirects
        // const sitemapEntries = dynamicPages.map((page) => ({
        //     url: `${baseUrl}/${page.slug}`,
        //     lastModified: new Date(page.updatedAt),
        //     changeFrequency: 'weekly',
        //     priority: 0.6, // Prioridade menor para URLs genéricas
        // }));

        // 5. Combinar apenas URLs estáticas e de imóveis válidas
        const sitemap = [...staticUrls, ...sitemapImoveis];

        // 6. Validar URLs antes de incluir no sitemap
        const validSitemap = sitemap.filter(entry => {
            // Verificar se URL é válida
            try {
                new URL(entry.url);
                return true;
            } catch {
                console.warn(`URL inválida removida do sitemap: ${entry.url}`);
                return false;
            }
        });

        console.log(`Sitemap final: ${validSitemap.length} URLs válidas`);

        // 7. Retorne o XML OTIMIZADO
        return new Response(
            `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${validSitemap.map((entry) => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastModified ? `<lastmod>${entry.lastModified.toISOString()}</lastmod>` : ''}
    ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`,
            {
                headers: {
                    'Content-Type': 'application/xml',
                    'Cache-Control': 'public, max-age=3600', // Cache por 1 hora
                },
            }
        );
    } catch (error) {
        console.error('🚨 [SITEMAP] Erro ao gerar sitemap:', error);
        console.error('🚨 [SITEMAP] Stack trace:', error.stack);

        // FALLBACK otimizado com prioridades corretas
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://npiconsultoria.com.br';
        console.log(`🗺️ [SITEMAP] Using fallback sitemap with baseUrl: ${baseUrl}`);
        const staticUrls = [
            { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
            { url: `${baseUrl}/sobre/hub-imobiliarias`, priority: 0.8, changeFrequency: 'weekly' },
            { url: `${baseUrl}/sobre/npi-imoveis`, priority: 0.8, changeFrequency: 'weekly' },
            { url: `${baseUrl}/venda-seu-imovel`, priority: 0.8, changeFrequency: 'weekly' },
        ];

        return new Response(
            `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map((entry) => `  <url>
    <loc>${entry.url}</loc>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`,
            {
                headers: {
                    'Content-Type': 'application/xml',
                    'Cache-Control': 'public, max-age=3600',
                },
            }
        );
    }
}

async function fetchDynamicPages() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://npiconsultoria.com.br'
    
    console.log(`🔍 [SITEMAP] Fetching dynamic pages from: ${baseUrl}/api/imoveis/slug`);

    try {
        const res = await fetch(`${baseUrl}/api/imoveis/slug`, {
            // Adicionar cache busting para dados mais frescos
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        if (!res.ok) {
            console.error(`🚨 [SITEMAP] Falha ao buscar slugs: ${res.status} ${res.statusText}`);
            return [];
        }

        const data = await res.json();

        if (!data || !data.data) {
            console.error('🚨 [SITEMAP] Formato de resposta inválido:', data);
            return [];
        }

        // Filtrar e validar URLs para evitar redirects no sitemap
        const validPages = data.data
            .filter(item => {
                // Validar se tem código e slug válidos
                if (!item.Codigo || !item.Slug) return false;
                
                // Validar se o slug não contém caracteres problemáticos
                const slug = item.Slug.toString();
                if (slug.includes('facebook.com') || 
                    slug.includes('instagram.com') || 
                    slug.includes('indexdata') ||
                    slug.includes('http') ||
                    slug.includes('www.') ||
                    slug.length < 3) {
                    return false;
                }
                
                return true;
            })
            .map(item => ({
                codigo: item.Codigo,
                slug: item.Slug,
                updatedAt: new Date().toISOString()
            }));

        console.log(`✅ [SITEMAP] ${validPages.length} URLs válidas encontradas`);
        return validPages;
    } catch (error) {
        console.error('🚨 [SITEMAP] Erro ao buscar páginas dinâmicas:', error);
        console.error('🚨 [SITEMAP] Stack trace:', error.stack);
        return [];
    }
}
