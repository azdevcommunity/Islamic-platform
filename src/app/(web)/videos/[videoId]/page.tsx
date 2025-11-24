/**
 * Individual Video Page - SSG with SEO
 * Static generation for each video with proper metadata
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import VideoDetailPage from "@/components/videos/VideoDetailPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

interface Video {
  videoId: string;
  title: string;
  description?: string;
  thumbnail: string;
  publishedAt: string;
}

interface Playlist {
  playlistId: string;
  title: string;
}

// Generate static params for all videos
export async function generateStaticParams() {
  try {
    const res = await fetch(`${BASE_URL}/videos?ids`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    const videos = Array.isArray(data) ? data : data.content || data.data || [];

    return videos.map((video: Video) => ({
      videoId: video.videoId,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Fetch video data
async function getVideoData(videoId: string) {
  try {
    const videoRes = await fetch(`${BASE_URL}/videos/${videoId}`, {
      next: { revalidate: 3600, tags: ["videos"] },
    });

    if (!videoRes.ok) return null;

    const video: Video = await videoRes.json();

    // Find playlist for this video
    let playlist: Playlist | null = null;
    let playlistVideos: Video[] = [];

    try {
      const playlistRes = await fetch(
        `${BASE_URL}/playlists/of-video/${videoId}`,
        {
          next: { revalidate: 3600, tags: ["playlists"] },
        }
      );

      if (playlistRes.ok) {
        const playlistData = await playlistRes.json();
        const playlistId = playlistData.playlistId;

        if (playlistId) {
          const [pRes, vRes] = await Promise.all([
            fetch(`${BASE_URL}/playlists/${playlistId}`, {
              next: { revalidate: 3600, tags: ["playlists"] },
            }),
            fetch(`${BASE_URL}/videos?playlistId=${playlistId}`, {
              next: { revalidate: 3600, tags: ["videos"] },
            }),
          ]);

          if (pRes.ok) playlist = await pRes.json();
          if (vRes.ok) {
            const vData = await vRes.json();
            playlistVideos = Array.isArray(vData)
              ? vData
              : vData.content || vData.data || [];
          }
        }
      }
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }

    return { video, playlist, playlistVideos };
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ videoId: string }>;
}): Promise<Metadata> {
  const { videoId } = await params;
  const data = await getVideoData(videoId);

  if (!data) {
    return {
      title: "Video Tapılmadı | Nizamiyyə Mədrəsəsi",
      description: "Axtardığınız video tapılmadı.",
    };
  }

  const { video } = data;
  const pageTitle = `${video.title} | Nizamiyyə Mədrəsəsi`;
  const pageDescription =
    video.description ||
    "Nizamiyyə Mədrəsəsi tərəfindən hazırlanan dini video dərs.";
  const pageUrl = `${siteConfig.url}/videos/${videoId}`;
  const imageUrl = video.thumbnail.split("+").filter(Boolean).reverse()[0] || `${siteConfig.url}/og-image.jpg`;

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
          alt: video.title,
        },
      ],
      locale: "az_AZ",
      type: "video.other",
      videos: [
        {
          url: `https://www.youtube.com/watch?v=${videoId}`,
        },
      ],
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

export default async function VideoPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  const data = await getVideoData(videoId);

  if (!data) {
    notFound();
  }

  const { video, playlist, playlistVideos } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description || "",
    thumbnailUrl: video.thumbnail.split("+").filter(Boolean).reverse()[0],
    uploadDate: video.publishedAt,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
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
      <VideoDetailPage
        video={video}
        playlist={playlist}
        playlistVideos={playlistVideos}
      />
    </>
  );
}

export const revalidate = 3600; // Revalidate every hour
