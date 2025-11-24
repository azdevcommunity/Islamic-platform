/**
 * Articles Listing Page - Server Component
 * Metadata and JSON-LD
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ArticlesPageClient from "@/components/articles/ArticlesPageClient";

export const revalidate = 60;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "İslami Məqalələr və Dini Yazılar",
  description:
    "İslam dini, fiqh, əqidə, hədis və digər dini mövzularda maarifləndirici məqalələr",
  url: `${siteConfig.url}/articles`,
  about: {
    "@type": "Thing",
    name: "İslam Dini",
    description: "İslam dini, fiqh, əqidə və dini biliklər",
  },
  publisher: {
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/esm_logo.png`,
    },
    sameAs: [
      process.env.NEXT_PUBLIC_YTB_CHANNEL_URL,
      process.env.NEXT_PUBLIC_INSTAGRAM_CHANNEL_URL,
      process.env.NEXT_PUBLIC_FACEBOOK_CHANNEL_URL,
    ].filter(Boolean),
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  title: `Məqalələr | ${siteConfig.name}`,
  description:
    "Nizamiyyə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun.",
  keywords:
    "İslam məqalələri, dini məqalələr, Əhli-Sünnə, İslam dini, dini yazılar, fiqh, əqidə",
  alternates: {
    canonical: `${siteConfig.url}/articles`,
  },
  openGraph: {
    title: `Məqalələr | ${siteConfig.name}`,
    description:
      "Nizamiyyə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun.",
    url: `${siteConfig.url}/articles`,
    siteName: siteConfig.name,
    locale: "az_AZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Məqalələr | ${siteConfig.name}`,
    description:
      "Nizamiyyə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface ArticlesPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlesPageClient
        initialPage={params.page}
        initialCategory={params.category}
      />
    </>
  );
}
