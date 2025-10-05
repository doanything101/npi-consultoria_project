// Server-side metadata generation for search page
export function generateSearchMetadata(searchParams) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://npiconsultoria.com.br';
  
  // Extract search parameters
  const cidade = searchParams.get('cidade');
  const finalidade = searchParams.get('finalidade');
  const categoria = searchParams.get('categoria');
  const bairros = searchParams.get('bairros');
  const quartos = searchParams.get('quartos');
  const precoMin = searchParams.get('precoMin');
  const precoMax = searchParams.get('precoMax');

  // Build title
  const titleParts = [];
  if (categoria) titleParts.push(categoria);
  if (finalidade) titleParts.push(finalidade.toLowerCase());
  if (cidade) titleParts.push(`em ${cidade}`);
  
  const title = titleParts.length > 0 
    ? `${titleParts.join(' ')} - NPi Consultoria`
    : "Buscar Imóveis de Alto Padrão - NPi Consultoria";

  // Build description
  const description = `Encontre imóveis de alto padrão ${cidade ? `em ${cidade}` : ''} ${finalidade ? `para ${finalidade.toLowerCase()}` : ''}. ${categoria || 'Apartamentos, casas e terrenos'} exclusivos com a melhor consultoria imobiliária.`;

  // Build canonical URL
  const canonicalUrl = new URL('/busca', baseUrl);
  const essentialParams = ['cidade', 'finalidade', 'categoria', 'bairros', 'quartos', 'precoMin', 'precoMax'];
  
  essentialParams.forEach(param => {
    const value = searchParams.get(param);
    if (value && value.trim() && value !== 'undefined' && value !== 'null') {
      canonicalUrl.searchParams.set(param, value.trim());
    }
  });

  return {
    title,
    description,
    canonical: canonicalUrl.toString(),
    openGraph: {
      title,
      description,
      url: canonicalUrl.toString(),
      type: 'website',
      siteName: 'NPi Consultoria',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
