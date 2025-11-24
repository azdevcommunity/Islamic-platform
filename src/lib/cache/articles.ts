/**
 * Article Cache Layer with unstable_cache
 * Implements scope-based caching with proper tag invalidation
 */

import { unstable_cache } from 'next/cache';
import { CACHE_CONFIG } from './config';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

/**
 * Fetch articles list with caching
 */
async function fetchArticlesList(params?: {
  page?: number;
  size?: number;
  categoryIds?: string;
  tagIds?: string;
  searchQuery?: string;
}) {
  const searchParams = new URLSearchParams();
  
  if (params?.page !== undefined) searchParams.set('page', params.page.toString());
  if (params?.size !== undefined) searchParams.set('size', params.size.toString());
  if (params?.categoryIds) searchParams.set('categoryIds', params.categoryIds);
  if (params?.tagIds) searchParams.set('tagIds', params.tagIds);
  if (params?.searchQuery) searchParams.set('searchQuery', params.searchQuery);

  const url = `${API_URL}/articles?${searchParams.toString()}`;
  
  const res = await fetch(url, {
    next: { revalidate: CACHE_CONFIG.articles.list.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached articles list
 */
export const getArticlesList = (params?: Parameters<typeof fetchArticlesList>[0]) => {
  const paramsKey = params ? JSON.stringify(params) : 'default';
  
  return unstable_cache(
    () => fetchArticlesList(params),
    [CACHE_CONFIG.articles.list.key(paramsKey)],
    {
      revalidate: CACHE_CONFIG.articles.list.ttl,
      tags: CACHE_CONFIG.articles.list.tags,
    }
  )();
};

/**
 * Fetch single article by ID
 */
async function fetchArticleById(id: string | number) {
  const res = await fetch(`${API_URL}/articles/${id}`, {
    next: { revalidate: CACHE_CONFIG.articles.detail.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch article ${id}: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached article detail
 */
export const getArticleById = (id: string | number) => {
  return unstable_cache(
    () => fetchArticleById(id),
    [CACHE_CONFIG.articles.detail.key(id)],
    {
      revalidate: CACHE_CONFIG.articles.detail.ttl,
      tags: CACHE_CONFIG.articles.detail.tags,
    }
  )();
};

/**
 * Fetch popular articles
 */
async function fetchPopularArticles() {
  const res = await fetch(`${API_URL}/articles/popular`, {
    next: { revalidate: CACHE_CONFIG.articles.popular.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch popular articles: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached popular articles (for home page)
 */
export const getPopularArticles = unstable_cache(
  fetchPopularArticles,
  [CACHE_CONFIG.articles.popular.key],
  {
    revalidate: CACHE_CONFIG.articles.popular.ttl,
    tags: CACHE_CONFIG.articles.popular.tags,
  }
);

/**
 * Fetch article statistics
 */
async function fetchArticleStatistics() {
  const res = await fetch(`${API_URL}/articles/statistics`, {
    next: { revalidate: 600 }, // 10 minutes
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch statistics: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached article statistics
 */
export const getArticleStatistics = unstable_cache(
  fetchArticleStatistics,
  ['articles:statistics'],
  {
    revalidate: 600,
    tags: ['articles:list'],
  }
);
