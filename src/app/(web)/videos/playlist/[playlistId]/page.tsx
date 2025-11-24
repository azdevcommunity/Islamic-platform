/**
 * Individual Playlist Page - SSG with SEO
 * Static generation for each playlist with proper metadata
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import PlaylistDetailPage from "@/components/videos/PlaylistDetailPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

interface Playlist {
  playlistId: string;
  title: string;
  description?: string;
  thumbnail: string;
  publishedAt: string;
  videoCount: number;
}

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

// Generate static params for all playlists
export async function generateStaticParams() {
  try {
    const res = await fetch(`${BASE_URL}/playlists`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const playlists = Array.isArray(data)
      ? data
      : data.content || data.data || [];

    return playlists.map((playlist: Playlist) => ({
      playlistId: playlist.playlistId,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Fetch playlist data
async function getPlaylistData(playlistId: string) {
  try {
    const [playlistRes, videosRes] = await Promise.all([
      fetch(`${BASE_URL}/playlists/${playlistId}`, {
        next: { revalidate: 3600, tags: ["playlists"] },
      }),
      fetch(`${BASE_URL}/videos?playlistId=${playlistId}`, {
        next: { revalidate: 3600, tags: ["videos"] },
      }),
    ]);

    if (!playlistRes.ok) return null;

    const playlist: Playlist = await playlistRes.json();
    let videos: Video[] = [];

    if (videosRes.ok) {
      const vData = await videosRes.json();
      videos = Array.isArray(vData) ? vData : vData.content || vData.data || [];
    }

    return { playlist, videos };
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ playlistId: string }>;
}): Promise<Metadata> {
  const { playlistId } = await params;
  const data = await getPlaylistData(playlistId);

  if (!data) {
    return {
      title: "Playlist Tapılmadı | Nizamiyyə Mədrəsəsi",
      description: "Axtardığınız playlist tapılmadı.",
    };
  }

  const { playlist } = data;
  const pageTitle = `${playlist.title} | Nizamiyyə Mədrəsəsi`;
  const pageDescription =
    playlist.description ||
    `${playlist.videoCount} video ilə dolu playlist. Nizamiyyə Mədrəsəsi tərəfindən hazırlanan dini video dərslər.`;
  const pageUrl = `${siteConfig.url}/videos/playlist/${playlistId}`;
  const imageUrl = playlist.thumbnail.split("+").filter(Boolean).reverse()[0] || `${siteConfig.url}/og-image.jpg`;

  return {
    title: pageTitle,
    description: pageDescription,
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
          width: 1280,
          height: 720,
          alt: playlist.title,
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

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ playlistId: string }>;
}) {
  const { playlistId } = await params;
  const data = await getPlaylistData(playlistId);

  if (!data) {
    notFound();
  }

  const { playlist, videos } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: playlist.title,
    description: playlist.description || "",
    numberOfItems: playlist.videoCount,
    url: `${siteConfig.url}/videos/playlist/${playlistId}`,
    itemListElement: videos.slice(0, 10).map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: video.title,
        url: `${siteConfig.url}/videos/${video.videoId}`,
        thumbnailUrl: video.thumbnail.split("+").filter(Boolean).reverse()[0],
      },
    })),
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
      <PlaylistDetailPage playlist={playlist} videos={videos} />
    </>
  );
}

export const revalidate = 3600; // Revalidate every hour
