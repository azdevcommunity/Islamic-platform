/**
 * Cache Configuration
 * Centralized cache settings with scope-based TTLs and tags
 */

export const CACHE_CONFIG = {
  // Article caching
  articles: {
    list: {
      key: (params: string) => `articles:list:${params}`,
      ttl: 60, // 1 minute
      tags: ['articles:list'] as string[],
    },
    detail: {
      key: (id: string | number) => `articles:id:${id}`,
      ttl: 120, // 2 minutes
      tags: ['articles:detail'] as string[],
    },
    popular: {
      key: 'articles:popular',
      ttl: 300, // 5 minutes
      tags: ['articles:list'] as string[],
    },
  },

  // Questions caching
  questions: {
    list: {
      key: (params: string) => `questions:list:${params}`,
      ttl: 60,
      tags: ['questions:list'] as string[],
    },
    detail: {
      key: (id: string | number) => `questions:id:${id}`,
      ttl: 120,
      tags: ['questions:detail'] as string[],
    },
  },

  // Metadata (rarely changes - Edge cached)
  meta: {
    categories: {
      key: 'meta:categories',
      ttl: 1800, // 30 minutes
      tags: ['meta'] as string[],
    },
    tags: {
      key: 'meta:tags',
      ttl: 1800,
      tags: ['meta'] as string[],
    },
    menu: {
      key: 'meta:menu',
      ttl: 1800,
      tags: ['meta'] as string[],
    },
  },

  // Home page sections
  home: {
    articles: {
      key: 'home:articles',
      ttl: 300, // 5 minutes
      tags: ['home'] as string[],
    },
    videos: {
      key: 'home:videos',
      ttl: 300,
      tags: ['home'] as string[],
    },
    books: {
      key: 'home:books',
      ttl: 300,
      tags: ['home'] as string[],
    },
    stats: {
      key: 'home:stats',
      ttl: 600, // 10 minutes
      tags: ['home'] as string[],
    },
  },

  // Videos
  videos: {
    list: {
      key: (params: string) => `videos:list:${params}`,
      ttl: 3600, // 1 saat - videolar tez-tez dəyişmir
      tags: ['videos:list'] as string[],
    },
    playlists: {
      key: 'videos:playlists',
      ttl: 3600, // 1 saat - playlistlər tez-tez dəyişmir
      tags: ['videos:list'] as string[],
    },
  },

  // Books
  books: {
    list: {
      key: 'books:list',
      ttl: 600,
      tags: ['books:list'] as string[],
    },
  },
};

/**
 * Cache tags for invalidation
 */
export const CACHE_TAGS = {
  ARTICLES_LIST: 'articles:list',
  ARTICLES_DETAIL: 'articles:detail',
  QUESTIONS_LIST: 'questions:list',
  QUESTIONS_DETAIL: 'questions:detail',
  META: 'meta',
  HOME: 'home',
  VIDEOS_LIST: 'videos:list',
  BOOKS_LIST: 'books:list',
} as const;
