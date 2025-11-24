/**
 * Home Page Cache Layer
 * Separate caching for each home section to prevent global invalidation
 */

import { unstable_cache } from 'next/cache';
import { CACHE_CONFIG } from './config';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
const YTB_API_URL = process.env.NEXT_PUBLIC_BASE_URL_YTB || '';

/**
 * Fetch home articles section
 */
async function fetchHomeArticles() {
  const res = await fetch(`${API_URL}/articles/popular`, {
    next: { revalidate: CACHE_CONFIG.home.articles.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch home articles: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached home articles
 */
export const getHomeArticles = unstable_cache(
  fetchHomeArticles,
  [CACHE_CONFIG.home.articles.key],
  {
    revalidate: CACHE_CONFIG.home.articles.ttl,
    tags: CACHE_CONFIG.home.articles.tags,
  }
);

/**
 * Fetch home videos section
 */
async function fetchHomeVideos() {
  const res = await fetch(`${YTB_API_URL}/videos?limit=10`, {
    next: { revalidate: CACHE_CONFIG.home.videos.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch home videos: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached home videos
 */
export const getHomeVideos = unstable_cache(
  fetchHomeVideos,
  [CACHE_CONFIG.home.videos.key],
  {
    revalidate: CACHE_CONFIG.home.videos.ttl,
    tags: CACHE_CONFIG.home.videos.tags,
  }
);

/**
 * Fetch home books section
 */
async function fetchHomeBooks() {
  const res = await fetch(`${API_URL}/books?limit=8`, {
    next: { revalidate: CACHE_CONFIG.home.books.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch home books: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached home books
 */
export const getHomeBooks = unstable_cache(
  fetchHomeBooks,
  [CACHE_CONFIG.home.books.key],
  {
    revalidate: CACHE_CONFIG.home.books.ttl,
    tags: CACHE_CONFIG.home.books.tags,
  }
);

/**
 * Fetch social media stats
 */
async function fetchSocialStats() {
  const res = await fetch(`${API_URL}/stats/social`, {
    next: { revalidate: CACHE_CONFIG.home.stats.ttl },
  });

  if (!res.ok) {
    // Return default stats if API fails
    return {
      youtube: { subscribers: 0, videos: 0 },
      instagram: { followers: 0 },
      facebook: { followers: 0 },
      tiktok: { followers: 0 },
    };
  }

  return res.json();
}

/**
 * Cached social stats
 */
export const getSocialStats = unstable_cache(
  fetchSocialStats,
  [CACHE_CONFIG.home.stats.key],
  {
    revalidate: CACHE_CONFIG.home.stats.ttl,
    tags: CACHE_CONFIG.home.stats.tags,
  }
);
