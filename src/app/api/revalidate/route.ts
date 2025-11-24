/**
 * Tag-based Revalidation API
 * Allows selective cache invalidation by scope
 */

import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { CACHE_TAGS } from '@/lib/cache/config';

// Validate secret token
function validateToken(request: NextRequest): boolean {
  const token = request.headers.get('x-revalidate-token');
  const secret = process.env.REVALIDATE_SECRET_TOKEN;
  
  return token === secret && !!secret;
}

export async function POST(request: NextRequest) {
  // Validate authorization
  if (!validateToken(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { tag, tags } = body;

    // Validate tag
    const validTags = Object.values(CACHE_TAGS);
    const tagsToRevalidate = tags || [tag];

    if (!tagsToRevalidate || tagsToRevalidate.length === 0) {
      return NextResponse.json(
        { error: 'Tag or tags array is required' },
        { status: 400 }
      );
    }

    // Validate all tags
    for (const t of tagsToRevalidate) {
      if (!validTags.includes(t)) {
        return NextResponse.json(
          { error: `Invalid tag: ${t}` },
          { status: 400 }
        );
      }
    }

    // Revalidate tags
    for (const t of tagsToRevalidate) {
      revalidateTag(t);
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}

// GET endpoint to list available tags
export async function GET(request: NextRequest) {
  if (!validateToken(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    availableTags: Object.values(CACHE_TAGS),
    description: 'Use POST with { tag: "tag-name" } or { tags: ["tag1", "tag2"] } to revalidate',
  });
}
