/**
 * Server Actions for Cache Revalidation
 * Used by admin panel to invalidate specific cache scopes
 */

'use server';

import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/cache/config';

/**
 * Revalidate articles list cache
 * Call this when creating, updating, or deleting articles
 */
export async function revalidateArticlesList() {
  revalidateTag(CACHE_TAGS.ARTICLES_LIST);
  console.log('✅ Revalidated: articles:list');
}

/**
 * Revalidate specific article detail
 * Call this when updating a specific article
 */
export async function revalidateArticleDetail(articleId: string | number) {
  revalidateTag(CACHE_TAGS.ARTICLES_DETAIL);
  console.log(`✅ Revalidated: articles:detail (ID: ${articleId})`);
}

/**
 * Revalidate both list and detail for articles
 * Use when article changes affect both list and detail views
 */
export async function revalidateArticles() {
  revalidateTag(CACHE_TAGS.ARTICLES_LIST);
  revalidateTag(CACHE_TAGS.ARTICLES_DETAIL);
  console.log('✅ Revalidated: articles:list + articles:detail');
}

/**
 * Revalidate questions list cache
 */
export async function revalidateQuestionsList() {
  revalidateTag(CACHE_TAGS.QUESTIONS_LIST);
  console.log('✅ Revalidated: questions:list');
}

/**
 * Revalidate specific question detail
 */
export async function revalidateQuestionDetail(questionId: string | number) {
  revalidateTag(CACHE_TAGS.QUESTIONS_DETAIL);
  console.log(`✅ Revalidated: questions:detail (ID: ${questionId})`);
}

/**
 * Revalidate both list and detail for questions
 */
export async function revalidateQuestions() {
  revalidateTag(CACHE_TAGS.QUESTIONS_LIST);
  revalidateTag(CACHE_TAGS.QUESTIONS_DETAIL);
  console.log('✅ Revalidated: questions:list + questions:detail');
}

/**
 * Revalidate metadata (categories, tags, menu)
 * Call this when updating categories or tags
 * This is RARE - only when admin changes metadata
 */
export async function revalidateMetadata() {
  revalidateTag(CACHE_TAGS.META);
  console.log('✅ Revalidated: meta (categories, tags, menu)');
}

/**
 * Revalidate home page sections
 * Call when home page content needs refresh
 */
export async function revalidateHome() {
  revalidateTag(CACHE_TAGS.HOME);
  console.log('✅ Revalidated: home sections');
}

/**
 * Revalidate videos
 */
export async function revalidateVideos() {
  revalidateTag(CACHE_TAGS.VIDEOS_LIST);
  console.log('✅ Revalidated: videos:list');
}

/**
 * Revalidate books
 */
export async function revalidateBooks() {
  revalidateTag(CACHE_TAGS.BOOKS_LIST);
  console.log('✅ Revalidated: books:list');
}

/**
 * Example: Admin action to update category
 */
export async function updateCategory(id: number, data: any) {
  try {
    // Update category in database (your API call here)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update category');
    }

    // Revalidate ONLY metadata cache (not articles!)
    await revalidateMetadata();

    return { success: true };
  } catch (error) {
    console.error('Update category error:', error);
    return { success: false, error: 'Failed to update category' };
  }
}

/**
 * Example: Admin action to create article
 */
export async function createArticle(data: any) {
  try {
    // Create article in database
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create article');
    }

    // Revalidate articles list (not detail, not meta!)
    await revalidateArticlesList();
    
    // Also revalidate home if article is featured
    if (data.featured) {
      await revalidateHome();
    }

    return { success: true };
  } catch (error) {
    console.error('Create article error:', error);
    return { success: false, error: 'Failed to create article' };
  }
}

/**
 * Example: Admin action to update article
 */
export async function updateArticle(id: string | number, data: any) {
  try {
    // Update article in database
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update article');
    }

    // Revalidate both list and specific detail
    await revalidateArticles();

    return { success: true };
  } catch (error) {
    console.error('Update article error:', error);
    return { success: false, error: 'Failed to update article' };
  }
}

/**
 * Example: Admin action to delete article
 */
export async function deleteArticle(id: string | number) {
  try {
    // Delete article from database
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete article');
    }

    // Revalidate articles list
    await revalidateArticlesList();

    return { success: true };
  } catch (error) {
    console.error('Delete article error:', error);
    return { success: false, error: 'Failed to delete article' };
  }
}
