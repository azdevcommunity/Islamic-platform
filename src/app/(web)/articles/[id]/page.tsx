/**
 * Article Detail Page - Server Component
 * Displays individual article with SEO optimization
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { apiConfig } from "@/config/api";
import { siteConfig } from "@/config/site";
import ArticleDetailPage from "@/layouts/ArticleDetailPage";
import { lexicalToPlainText } from "@/util/LexicalToHtml";

export const revalidate = 60;

interface Article {
  id: string | number;
  title: string;
  content: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: { name: string };
  categories?: Array<{ id: string | number; name: string }>;
  tags?: Array<{ id: string | number; name: string }>;
}

async function getArticle(id: string): Promise<Article | null> {
  try {
    const res = await fetch(`${apiConfig.baseUrl}/articles/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch article: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${apiConfig.baseUrl}/articles/all`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const posts = await res.json();
    return posts.map((post: Article) => ({
      id: String(post.id),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return {
      title: "Məqalə Tapılmadı",
      description: "Axtardığınız məqalə mövcud deyil.",
      robots: { index: false, follow: false },
    };
  }

  const cleanDescription =
    lexicalToPlainText(article.content)
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 160) || `${siteConfig.name} - ${article.title}`;

  const keywords = [
    article.title,
    ...(article.categories?.map((c) => c.name) || []),
    ...(article.tags?.map((t) => t.name) || []),
    siteConfig.name,
    "İslam",
    "din",
    "məqalə",
  ]
    .filter(Boolean)
    .join(", ");

  const imageUrl = article.image || `${siteConfig.url}/og-image.jpg`;
  const articleUrl = `${siteConfig.url}/articles/${article.id}`;

  return {
    title: `${article.title} | ${siteConfig.name}`,
    description: cleanDescription,
    keywords,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: `${article.title} | ${siteConfig.name}`,
      description: cleanDescription,
      url: articleUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "az_AZ",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author?.name || siteConfig.name],
      section: article.categories?.[0]?.name,
      tags: article.tags?.map((t) => t.name) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ${siteConfig.name}`,
      description: cleanDescription,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  const cleanJsonLdDescription =
    lexicalToPlainText(article.content).slice(0, 200) ||
    `${siteConfig.name} - İslam dini haqqında məqalə.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/articles/${article.id}`,
    },
    headline: article.title,
    description: cleanJsonLdDescription,
    image: article.image || `${siteConfig.url}/og-image.jpg`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author?.name || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/esm_logo.png`,
      },
    },
    keywords: article.tags?.map((t) => t.name).join(", ") || "",
    inLanguage: "az-AZ",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleDetailPage article={article} />
    </>
  );
}
