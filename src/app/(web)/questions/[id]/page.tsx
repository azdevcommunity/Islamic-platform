/**
 * Question Detail Page - Server Component
 * Displays individual Q&A with SEO optimization
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { apiConfig } from "@/config/api";
import { siteConfig } from "@/config/site";
import QuestionDetailWrapper from "@/layouts/QuestionDetailWrapper";
import { formatDate } from "@/util/DateUtil";

export const revalidate = 3600;

// Generate static params for all questions
export async function generateStaticParams() {
  try {
    const res = await fetch(`${apiConfig.baseUrl}/questions/ids`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch question IDs:", res.status);
      return [];
    }

    const ids = await res.json();

    // Handle different response formats
    if (Array.isArray(ids)) {
      return ids.map((id) => ({
        id: String(id),
      }));
    }

    // If response is an object with data property
    if (ids && Array.isArray(ids.data)) {
      return ids.data.map((id: number | string) => ({
        id: String(id),
      }));
    }

    return [];
  } catch (error) {
    console.error("Error generating static params for questions:", error);
    return [];
  }
}

interface Question {
  id: string | number;
  question: string;
  answer: string;
  image?: string;
  createdDate?: string;
  updatedDate?: string;
  categories?: Array<{ id: string | number; name: string }>;
  tags?: Array<{ id: string | number; name: string }>;
  viewCount?: number;
  likeCount?: number;
  readTime?: number;
}

async function getQuestion(id: string): Promise<Question | null> {
  try {
    const res = await fetch(`${apiConfig.baseUrl}/questions/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch question: ${res.status}`);
    }

    const data = await res.json();

    if (!data || typeof data !== "object" || !data.id) {
      throw new Error("Invalid data format received.");
    }

    return {
      ...data,
      categories: Array.isArray(data.categories) ? data.categories : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      createdDateFormatted: formatDate(data.createdDate),
      readCount: data.viewCount ?? 0,
      initialLikeCount: data.likeCount ?? 0,
      readTimeMinutes:
        data.readTime ?? Math.max(1, Math.ceil((data.answer?.length || 0) / 1000)),
    };
  } catch (error) {
    console.error("Error fetching question:", error);
    return null;
  }
}

async function getRelatedQuestions(id: string) {
  try {
    const res = await fetch(`${apiConfig.baseUrl}/questions/${id}/related`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching related questions:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const question = await getQuestion(id);

  if (!question) {
    return {
      title: "Sual Tapılmadı",
      description: "Axtardığınız sual mövcud deyil.",
      robots: { index: false, follow: false },
    };
  }

  const cleanDescription =
    question.answer
      ?.replace(/<[^>]*>?/gm, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 160) || `${siteConfig.name} - ${question.question} sualına cavab.`;

  const keywords = [
    question.question,
    ...(question.categories?.map((c) => c.name) || []),
    ...(question.tags?.map((t) => t.name) || []),
    siteConfig.name,
    "İslam",
    "sual",
    "cavab",
    "din",
  ]
    .filter(Boolean)
    .join(", ");

  const imageUrl =
    question.image || `${siteConfig.url}/og-image.jpg`;
  const questionUrl = `${siteConfig.url}/questions/${question.id}`;

  return {
    title: `${question.question} | ${siteConfig.name}`,
    description: cleanDescription,
    keywords,
    alternates: {
      canonical: questionUrl,
    },
    openGraph: {
      title: `${question.question} | ${siteConfig.name}`,
      description: cleanDescription,
      url: questionUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: question.question,
        },
      ],
      locale: "az_AZ",
      type: "article",
      publishedTime: question.createdDate,
      modifiedTime: question.updatedDate || question.createdDate,
    },
    twitter: {
      card: "summary_large_image",
      title: `${question.question} | ${siteConfig.name}`,
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

interface QuestionPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { id } = await params;
  const [question, relatedQuestions] = await Promise.all([
    getQuestion(id),
    getRelatedQuestions(id),
  ]);

  if (!question) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: question.question,
    text: question.question,
    acceptedAnswer: {
      "@type": "Answer",
      text:
        question.answer
          ?.replace(/<[^>]*>?/gm, " ")
          .replace(/\s+/g, " ")
          .trim() || "Cavab mövcuddur.",
    },
    answerCount: 1,
    upvoteCount: question.likeCount || 0,
    dateCreated: question.createdDate,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/esm_logo.png`,
      },
    },
    inLanguage: "az-AZ",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QuestionDetailWrapper
        question={question}
        relatedQuestions={relatedQuestions}
      />
    </>
  );
}
