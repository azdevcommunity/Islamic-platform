/**
 * Articles Listing Page - Server Component
 * Displays paginated list of articles with filtering
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Articles from "@/layouts/ArticlesPage";

export const revalidate = 60;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "İslami Məqalələr",
  description: "İslam dini haqqında dəyərli və maarifləndirici məqalələr",
  url: `${siteConfig.url}/articles`,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/esm_logo.png`,
    },
  },
};

export const metadata: Metadata = {
  title: `Məqalələr | ${siteConfig.name}`,
  description: "Nizamiyyə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun.",
  keywords: "İslam məqalələri, dini məqalələr, Əhli-Sünnə, İslam dini, dini yazılar, fiqh, əqidə",
  alternates: {
    canonical: `${siteConfig.url}/articles`,
  },
  openGraph: {
    title: `Məqalələr | ${siteConfig.name}`,
    description: "Nizamiyyə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun.",
    url: `${siteConfig.url}/articles`,
    siteName: siteConfig.name,
    locale: "az_AZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Məqalələr | ${siteConfig.name}`,
    description: "Nizamiyyə Mədrəsəsi saytında İslam dini haqqında dəyərli və maarifləndirici məqalələri oxuyun.",
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

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams;
  const { page, category } = params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Articles page={page} category={category} />
    </>
  );
}
