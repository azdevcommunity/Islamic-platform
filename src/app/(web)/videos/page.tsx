/**
 * Videos Page - Server Component
 * Displays video playlists and content
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import VideosPageLayout from "@/layouts/VideosPage";

export const revalidate = 300;

interface VideosPageProps {
  searchParams: Promise<{
    playlistId?: string;
    search?: string;
    videoId?: string;
    content?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: VideosPageProps): Promise<Metadata> {
  const params = await searchParams;
  const pageTitle = "İslami Videolar | Nizamiyyə Mədrəsəsi";
  const pageDescription =
    "Nizamiyyə Mədrəsəsi tərəfindən hazırlanan dini videolar, dərslər və söhbətlər. İslamı öyrənmək üçün video mənbələr.";
  const pageKeywords =
    "İslami videolar, dini videolar, Nizamiyyə Mədrəsəsi, video dərslər, Quran, hədis, fiqh, söhbətlər";
  const pageUrl = `${siteConfig.url}/videos`;
  const imageUrl = `${siteConfig.url}/og-image.jpg`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
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
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const params = await searchParams;
  const { playlistId, search, videoId, content, page } = params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "İslami Videolar",
    description:
      "Nizamiyyə Mədrəsəsi tərəfindən hazırlanan dini video dərslər və söhbətlər.",
    url: `${siteConfig.url}/videos${
      Object.keys(params).length > 0
        ? "?" + new URLSearchParams(params as Record<string, string>).toString()
        : ""
    }`,
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
      <VideosPageLayout
        playlistId={playlistId}
        videoId={videoId}
        content={content}
        search={search}
        page={page}
      />
    </>
  );
}
