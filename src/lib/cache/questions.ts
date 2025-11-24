/**
 * Questions Cache Layer
 * Scope-based caching for questions list and detail
 */

import { unstable_cache } from 'next/cache';
import { CACHE_CONFIG } from './config';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

/**
 * Fetch questions list
 */
async function fetchQuestionsList(params?: {
  page?: number;
  limit?: number;
  categoryId?: string;
  searchQuery?: string;
}) {
  const searchParams = new URLSearchParams();
  
  if (params?.page !== undefined) searchParams.set('page', params.page.toString());
  if (params?.limit !== undefined) searchParams.set('limit', params.limit.toString());
  if (params?.categoryId) searchParams.set('categoryId', params.categoryId);
  if (params?.searchQuery) searchParams.set('searchQuery', params.searchQuery);

  const url = `${API_URL}/questions/public?${searchParams.toString()}`;
  
  const res = await fetch(url, {
    next: { revalidate: CACHE_CONFIG.questions.list.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch questions: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached questions list
 */
export const getQuestionsList = (params?: Parameters<typeof fetchQuestionsList>[0]) => {
  const paramsKey = params ? JSON.stringify(params) : 'default';
  
  return unstable_cache(
    () => fetchQuestionsList(params),
    [CACHE_CONFIG.questions.list.key(paramsKey)],
    {
      revalidate: CACHE_CONFIG.questions.list.ttl,
      tags: CACHE_CONFIG.questions.list.tags,
    }
  )();
};

/**
 * Fetch single question by ID
 */
async function fetchQuestionById(id: string | number) {
  const res = await fetch(`${API_URL}/questions/${id}`, {
    next: { revalidate: CACHE_CONFIG.questions.detail.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch question ${id}: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached question detail
 */
export const getQuestionById = (id: string | number) => {
  return unstable_cache(
    () => fetchQuestionById(id),
    [CACHE_CONFIG.questions.detail.key(id)],
    {
      revalidate: CACHE_CONFIG.questions.detail.ttl,
      tags: CACHE_CONFIG.questions.detail.tags,
    }
  )();
};
