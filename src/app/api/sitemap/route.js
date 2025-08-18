// app/api/sitemap/route.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az';
const API = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || '';

async function safeArticles() {
    if (!API) return [];
    try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 5000);
        const res = await fetch(`${API}/articles/all`, { signal: ctrl.signal, cache: 'no-store', next: { revalidate: 0 } });
        clearTimeout(t);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export async function GET() {
    const staticRoutes = [`${DOMAIN}/about`, `${DOMAIN}/contact`, `${DOMAIN}/videos`, `${DOMAIN}/articles`];
    const articles = await safeArticles();
    const dynamicRoutes = articles.map((a) => `${DOMAIN}/articles/${a.id}`);
    const urls = [...staticRoutes, ...dynamicRoutes];

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((u) => `<url><loc>${u}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`),
        '</urlset>',
    ].join('');

    return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
