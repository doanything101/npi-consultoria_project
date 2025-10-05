// CORS headers configuration for API routes
export function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || 'https://npiconsultoria.com.br',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
}

export function handleCors(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: getCorsHeaders(),
    });
  }
  return null;
}
