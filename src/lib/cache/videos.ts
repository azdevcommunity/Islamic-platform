/**
 * Videos Cache Layer
 */

import { unstable_cache } from 'next/cache';
import { CACHE_CONFIG } from './config';

const YTB_API_URL = process.env.NEXT_PUBLIC_BASE_URL_YTB || '';

/**
 * Fetch videos list
 */
async function fetchVideosList(params?: {
  page?: number;
  limit?: number;
  playlistId?: string;
}) {
  const searchParams = new URLSearchParams();
  
  if (params?.page !== undefined) searchParams.set('page', params.page.toString());
  if (params?.limit !== undefined) searchParams.set('limit', params.limit.toString());
  if (params?.playlistId) searchParams.set('playlistId', params.playlistId);

  const url = `${YTB_API_URL}/videos?${searchParams.toString()}`;
  
  const res = await fetch(url, {
    next: { revalidate: CACHE_CONFIG.videos.list.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch videos: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached videos list
 */
export const getVideosList = (params?: Parameters<typeof fetchVideosList>[0]) => {
  const paramsKey = params ? JSON.stringify(params) : 'default';
  
  return unstable_cache(
    () => fetchVideosList(params),
    [CACHE_CONFIG.videos.list.key(paramsKey)],
    {
      revalidate: CACHE_CONFIG.videos.list.ttl,
      tags: CACHE_CONFIG.videos.list.tags,
    }
  )();
};

/**
 * Fetch playlists
 */
async function fetchPlaylists() {
  const res = await fetch(`${YTB_API_URL}/playlists`, {
    next: { revalidate: CACHE_CONFIG.videos.playlists.ttl },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch playlists: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Cached playlists
 */
export const getPlaylists = unstable_cache(
  fetchPlaylists,
  [CACHE_CONFIG.videos.playlists.key],
  {
    revalidate: CACHE_CONFIG.videos.playlists.ttl,
    tags: CACHE_CONFIG.videos.playlists.tags,
  }
);
