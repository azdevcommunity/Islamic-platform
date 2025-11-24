/**
 * Webhook endpoint for revalidating questions cache
 * Backend should call this when question is created/updated/deleted
 */

import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-revalidate-token');
    
    if (token !== process.env.REVALIDATE_SECRET_TOKEN) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    revalidateTag('questions:list');
    revalidateTag('questions:detail');

    console.log('✅ Questions cache revalidated via webhook');

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
