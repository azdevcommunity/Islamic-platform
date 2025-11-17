/**
 * Books Listing Page - Server Component
 * Displays list of Islamic books
 */

import { Suspense } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import BooksListPage from "@/components/book/BooksPage";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const revalidate = 300;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "İslami Kitablar",
  description: "İslam dini haqqında dəyərli kitablar və əsərlər",
  url: `${siteConfig.url}/books`,
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
  title: `Kitablar | ${siteConfig.name}`,
  description:
    "İslam dini, fiqh, əqidə və digər mövzularda dəyərli kitablar. Nizamiyyə Mədrəsəsi kitab kolleksiyası.",
  keywords: "İslami kitablar, dini kitablar, fiqh kitabları, əqidə, hədis, təfsir, siyer",
  alternates: {
    canonical: `${siteConfig.url}/books`,
  },
  openGraph: {
    title: `Kitablar | ${siteConfig.name}`,
    description:
      "İslam dini, fiqh, əqidə və digər mövzularda dəyərli kitablar. Nizamiyyə Mədrəsəsi kitab kolleksiyası.",
    url: `${siteConfig.url}/books`,
    siteName: siteConfig.name,
    locale: "az_AZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Kitablar | ${siteConfig.name}`,
    description:
      "İslam dini, fiqh, əqidə və digər mövzularda dəyərli kitablar. Nizamiyyə Mədrəsəsi kitab kolleksiyası.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BooksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <BooksListPage />
      </Suspense>
    </>
  );
}
