/**
 * Type Definitions
 * Central type definitions for the application
 */

export interface Article {
  id: string | number;
  title: string;
  image?: string;
  createdDate?: string;
  authorName?: string;
  content?: string;
  categories?: Category[];
  tags?: Tag[];
  viewCount?: number;
}

export interface Question {
  id: string | number;
  question: string;
  answer: string;
  categories?: Category[];
  tags?: Tag[];
  createdDate?: string;
  updatedDate?: string;
  viewCount?: number;
  likeCount?: number;
  image?: string;
}

export interface Category {
  id: string | number;
  name: string;
  subcategories?: Category[];
  href?: string;
}

export interface Tag {
  id: string | number;
  name: string;
}

export interface Book {
  id: string | number;
  title: string;
  image: string;
  authorName: string;
  category: string;
  description: string;
  price: string;
  contactPhone: string;
  chapters?: string[];
}

export interface MenuItem {
  name: string;
  href: string;
  subcategories?: MenuItem[];
}

export interface BankInfo {
  id: number;
  bankName: string;
  cardCode: string;
}

export interface ApiResponse<T> {
  content?: T[];
  page?: {
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  };
}
