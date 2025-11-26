/**
 * Videos Page - Server-side Rendering
 * Displays videos and playlists with server-side data fetching
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import VideosServerPage from "@/components/videos/VideosServerPage";
import { BASE_URL } from "@/util/Const.js";

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

const LIMIT = 12;

async function fetchVideos(content: string, search: string, page: number) {
  try {
    const isShorts = content === "shorts" ? 1 : 0;
    const backendPage = page - 1;
    const res = await fetch(
      `${BASE_URL}/videos?page=${backendPage}&size=${LIMIT}&search=${search || ""}&shorts=${isShorts}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) return { videos: [], totalPages: 1 };

    const data = await res.json();
    const videosList = Array.isArray(data) ? data : data.content || data.data || [];
    const totalPages = data?.page?.totalPages || data?.totalPages || 1;

    return { videos: videosList, totalPages };
  } catch (error) {
    console.error("Error fetching videos:", error);
    return { videos: [], totalPages: 1 };
  }
}

async function fetchPlaylists(search: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/playlists?page=0&size=${LIMIT}&search=${search || ""}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) return { playlists: [], hasMore: false };

    const data = await res.json();
    
    if (Array.isArray(data)) {
      return { playlists: data, hasMore: false };
    }

    const playlists = data.content || data.data || [];
    const pageInfo = data.page || {};
    const hasMore = (pageInfo.number || 0) < (pageInfo.totalPages || 1) - 1;

    return { playlists, hasMore };
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return { playlists: [], hasMore: false };
  }
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const params = await searchParams;
  const content = params.content || "videos";
  const search = params.search || "";
  const page = parseInt(params.page || "1");

  // Fetch data based on content type
  let videosData = null;
  let playlistsData = null;

  if (content === "playlists") {
    playlistsData = await fetchPlaylists(search);
  } else {
    videosData = await fetchVideos(content, search, page);
  }
  
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
      <VideosServerPage
        content={content}
        search={search}
        page={page}
        videosData={videosData}
        playlistsData={playlistsData}
      />
    </>
  );
}
