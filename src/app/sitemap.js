// app/sitemap.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.ehlisunnemedresesi.az';
const API = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || '';

// küçük yardımcı: güvenli fetch (timeout + no-store)
async function safeJson(url, { timeoutMs = 5000 } = {}) {
  if (!url) return [];
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, { signal: ctrl.signal, cache: 'no-store', next: { revalidate: 0 } });
    clearTimeout(t);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date().toISOString();

  const defaultPages = [
    { url: `${DOMAIN}`,                lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${DOMAIN}/about`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/contact`,        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/videos`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${DOMAIN}/articles`,       lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${DOMAIN}/questions`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${DOMAIN}/books`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // API kapalıysa hepsi boş dizi döner, build kırılmaz
  const [articles, categories, questions] = await Promise.all([
    safeJson(`${API}/articles/all`),
    safeJson(`${API}/categories/all`),      // getAllCategories yerine doğrudan endpoint; yoksa boş kalır
    safeJson(`${API}/questions/all`),
  ]);

  return [
    ...defaultPages,
    ...(articles || []).map((a) => ({
      url: `${DOMAIN}/articles/${a.id}`,
      lastModified: a.updatedAt || a.publishedAt || now,
      changeFrequency: 'daily',
      priority: 0.8,
    })),
    ...(categories || []).map((c) => ({
      url: `${DOMAIN}/search?categoryId=${c.id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...(questions || []).map((q) => ({
      url: `${DOMAIN}/questions/${q.id}`,
      lastModified: q.updatedAt || q.createdDate || now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
  ];
}
