/**
 * API Configuration
 * Central configuration for API endpoints and settings
 */

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
  youtubeBaseUrl: process.env.NEXT_PUBLIC_BASE_URL_YTB || "",
  
  endpoints: {
    articles: {
      popular: "/articles/popular",
      list: "/articles",
      detail: (id: string | number) => `/articles/${id}`,
    },
    questions: {
      list: "/questions",
      detail: (id: string | number) => `/questions/${id}`,
    },
    categories: {
      menu: "/categories/menu",
      list: "/categories",
    },
    books: {
      list: "/books",
    },
    videos: {
      list: "/videos",
    },
  },
  
  revalidate: {
    default: 60,
    articles: 60,
    questions: 60,
    categories: 300,
  },
} as const;
