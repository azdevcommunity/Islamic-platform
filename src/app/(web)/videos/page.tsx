/**
 * Videos Page - Client-side Grid List
 * Displays videos and playlists with client-side pagination, search, and toggle
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import VideosClientPage from "@/components/videos/VideosClientPage";

export const metadata: Metadata = {
  title: "İslami Videolar | Nizamiyyə Mədrəsəsi",
  description:
    "Nizamiyyə Mədrəsəsi tərəfindən hazırlanan dini videolar, dərslər və söhbətlər. İslamı öyrənmək üçün video mənbələr.",
  keywords:
    "İslami videolar, dini videolar, Nizamiyyə Mədrəsəsi, video dərslər, Quran, hədis, fiqh, söhbətlər",
  alternates: {
    canonical: `${siteConfig.url}/videos`,
  },
  openGraph: {
    title: "İslami Videolar | Nizamiyyə Mədrəsəsi",
    description:
      "Nizamiyyə Mədrəsəsi tərəfindən hazırlanan dini videolar, dərslər və söhbətlər.",
    url: `${siteConfig.url}/videos`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "İslami Videolar Banner",
      },
    ],
    locale: "az_AZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İslami Videolar | Nizamiyyə Mədrəsəsi",
    description:
      "Nizamiyyə Mədrəsəsi tərəfindən hazırlanan dini videolar, dərslər və söhbətlər.",
    images: [`${siteConfig.url}/og-image.jpg`],
  },
  robots: { index: true, follow: true },
};

interface VideosPageProps {
  searchParams: Promise<{
    content?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const params = await searchParams;
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "İslami Videolar",
    description:
      "Nizamiyyə Mədrəsəsi tərəfindən hazırlanan dini video dərslər və söhbətlər.",
    url: `${siteConfig.url}/videos`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/esm_logo.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VideosClientPage
        initialContent={params.content || "videos"}
        initialSearch={params.search || ""}
        initialPage={parseInt(params.page || "1")}
      />
    </>
  );
}
