/**
 * Metadata Cache Layer (Edge Runtime)
 * Categories, tags, and menu - rarely change, served from Edge
 */

import { unstable_cache } from 'next/cache';
import { CACHE_CONFIG } from './config';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

/**
 * Fetch all categories
 */
async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: CACHE_CONFIG.meta.categories.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached categories (Edge)
 * MUST be served from Edge since rarely changes
 */
export const getCategories = unstable_cache(
  fetchCategories,
  [CACHE_CONFIG.meta.categories.key],
  {
    revalidate: CACHE_CONFIG.meta.categories.ttl,
    tags: CACHE_CONFIG.meta.categories.tags,
  }
);

/**
 * Fetch category menu
 */
async function fetchCategoryMenu() {
  const res = await fetch(`${API_URL}/categories/menu`, {
    next: { revalidate: CACHE_CONFIG.meta.menu.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch category menu: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached category menu (Edge)
 */
export const getCategoryMenu = unstable_cache(
  fetchCategoryMenu,
  [CACHE_CONFIG.meta.menu.key],
  {
    revalidate: CACHE_CONFIG.meta.menu.ttl,
    tags: CACHE_CONFIG.meta.menu.tags,
  }
);

/**
 * Fetch all tags
 */
async function fetchTags() {
  const res = await fetch(`${API_URL}/tags`, {
    next: { revalidate: CACHE_CONFIG.meta.tags.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tags: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached tags (Edge)
 */
export const getTags = unstable_cache(
  fetchTags,
  [CACHE_CONFIG.meta.tags.key],
  {
    revalidate: CACHE_CONFIG.meta.tags.ttl,
    tags: CACHE_CONFIG.meta.tags.tags,
  }
);

/**
 * Fetch single category by ID
 */
async function fetchCategoryById(id: number) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    next: { revalidate: CACHE_CONFIG.meta.categories.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch category ${id}: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached category by ID
 */
export const getCategoryById = (id: number) => {
  return unstable_cache(
    () => fetchCategoryById(id),
    [`meta:category:${id}`],
    {
      revalidate: CACHE_CONFIG.meta.categories.ttl,
      tags: CACHE_CONFIG.meta.categories.tags,
    }
  )();
};
