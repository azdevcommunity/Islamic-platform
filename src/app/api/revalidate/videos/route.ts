/**
 * Webhook endpoint for revalidating videos cache
 * Backend should call this when new video is added
 * 
 * Usage: POST /api/revalidate/videos
 * Headers: { "x-revalidate-token": "your-secret-token" }
 */

import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const token = request.headers.get('x-revalidate-token');
    
    if (token !== process.env.REVALIDATE_SECRET_TOKEN) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Revalidate videos cache
    revalidateTag('videos');
    revalidateTag('videos-videos');
    revalidateTag('videos-shorts');
    
    // Also revalidate home page if videos appear there
    revalidateTag('home');

    console.log('✅ Videos cache revalidated via webhook');

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
