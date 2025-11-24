/**
 * Edge Runtime API for Tags
 * Serves metadata from Edge for ultra-low latency
 */

import { NextResponse } from 'next/server';
import { getTags } from '@/lib/cache/metadata';

export const runtime = 'edge';
export const revalidate = 1800; // 30 minutes

export async function GET() {
  try {
    const tags = await getTags();
    
    return NextResponse.json(tags, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'CDN-Cache-Control': 'public, s-maxage=1800',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=1800',
      },
    });
  } catch (error) {
    console.error('Edge tags error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}
