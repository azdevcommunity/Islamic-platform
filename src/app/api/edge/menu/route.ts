/**
 * Edge Runtime API for Category Menu
 * Serves navigation menu from Edge
 */

import { NextResponse } from 'next/server';
import { getCategoryMenu } from '@/lib/cache/metadata';

export const runtime = 'edge';
export const revalidate = 1800; // 30 minutes

export async function GET() {
  try {
    const menu = await getCategoryMenu();
    
    return NextResponse.json(menu, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        'CDN-Cache-Control': 'public, s-maxage=1800',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=1800',
      },
    });
  } catch (error) {
    console.error('Edge menu error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}
