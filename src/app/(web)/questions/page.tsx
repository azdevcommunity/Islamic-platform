/**
 * Questions Listing Page - Server Component
 * Displays list of Q&A with filtering
 * Enhanced with dynamic JSON-LD structured data
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { apiConfig } from "@/config/api";
import IslamicQuestionsPage from "@/components/questions/IslamicQuestionsPage";

export const revalidate = 60;

interface Question {
  id: string;
  title: string;
  answer?: string;
  content?: string;
}

// Fetch questions for structured data
async function getQuestionsForSEO() {
  try {
    const res = await fetch(`${apiConfig.baseUrl}/questions/public?page=1&limit=20`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.questions || data.data || [];
  } catch (error) {
    console.error("Failed to fetch questions for SEO:", error);
    return [];
  }
}

async function generateJsonLd() {
  const questions = await getQuestionsForSEO();
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "İslami Sual və Cavablar",
    description: "Fiqh, iman, ibadət və digər dini mövzularda verilən sual və cavablar",
    url: `${siteConfig.url}/questions`,
    mainEntity: questions.slice(0, 10).map((q: Question) => ({
      "@type": "Question",
      name: q.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer || q.content || "Cavab hazırlanır...",
      },
    })),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/esm_logo.png`,
      },
    },
  };
}

export const metadata: Metadata = {
  title: "İslami Sual və Cavablar | Nizamiyyə Mədrəsəsi",
  description:
    "Fiqh, iman, ibadət, nikah, talak, hac, oruc, dini biliklər və İslam haqqında verilən maarifləndirici sual və cavablar. Şəriət cavabları və dini məsələlər.",
  keywords: [
    "islam sualları",
    "şəriət cavabları",
    "fiqh sualları",
    "dini suallar",
    "halal",
    "haram",
    "islam mədrəsəsi",
    "nizamiyyə",
    "namaz",
    "oruc",
    "zəkat",
    "hac",
    "nikah",
    "talak",
    "əqidə",
    "hədis",
  ],
  alternates: {
    canonical: `${siteConfig.url}/questions`,
  },
  openGraph: {
    title: "İslami Sual və Cavablar – Nizamiyyə Mədrəsəsi",
    description:
      "Fiqh, ibadət, iman və digər dini mövzularda verilən sual və cavabları oxuyun. Şəriət və İslam haqqında ətraflı məlumatlar.",
    url: `${siteConfig.url}/questions`,
    siteName: siteConfig.name,
    locale: "az_AZ",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/esm_logo.png`,
        width: 1200,
        height: 630,
        alt: "Nizamiyyə Mədrəsəsi - İslami Sual və Cavablar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İslami Sual və Cavablar – Nizamiyyə Mədrəsəsi",
    description:
      "Fiqh, ibadət, iman və digər dini mövzularda verilən sual və cavabları oxuyun.",
    images: [`${siteConfig.url}/esm_logo.png`],
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

export default async function QuestionsPage() {
  const jsonLd = await generateJsonLd();
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IslamicQuestionsPage />
    </>
  );
}
