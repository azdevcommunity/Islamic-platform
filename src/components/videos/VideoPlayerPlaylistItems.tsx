"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBestThumbnailUrl } from "@/util/Thumbnail.js";
import { BASE_URL } from "@/util/Const.js";

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface VideoPlayerPlaylistItemsProps {
  playlistId: string;
  currentVideoId?: string;
  initialVideos?: Video[];
}

interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

interface VideosResponse {
  content: Video[];
  page: PageInfo;
  last: boolean;
}

const LIMIT = 20;

async function fetchPlaylistVideos({
  pageParam = 0,
  playlistId,
}: {
  pageParam?: number;
  playlistId: string;
}): Promise<VideosResponse> {
  const res = await fetch(
    `${BASE_URL}/videos?playlistId=${playlistId}&page=${pageParam}&size=${LIMIT}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch playlist videos");
  }

  const data = await res.json();

  const backendPage = data.page?.number ?? pageParam;


  // Backend-dən gələn page obyekti (kiçik hərflərlə)
const pageInfo: PageInfo = {
  size: data.page?.size ?? LIMIT,
  number: (data.page?.number ?? pageParam) - 1,
  totalElements: data.page?.totalElements ?? data.totalElements,
  totalPages: data.page?.totalPages ?? 1,
};

  // Son səhifəni hesabla: number (current page) >= totalPages - 1
  const isLastPage = pageInfo.number >= pageInfo.totalPages - 1;

  return {
    content: data.content || data.data || [],
    page: pageInfo,
    last: isLastPage,
  };
}

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return "";
  }
};

export default function VideoPlayerPlaylistItems({
  playlistId,
  currentVideoId,
  initialVideos = [],
}: VideoPlayerPlaylistItemsProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["playlist-videos", playlistId],
    queryFn: ({ pageParam = 0 }) =>
      fetchPlaylistVideos({ pageParam, playlistId }),
    getNextPageParam: (lastPage) => {
      // Son səhifədirsə undefined qaytar
    if (lastPage.last) return undefined;
    return lastPage.page.number + 1; // 0,1,2... ⬅️ düz olacaq
    },
    initialPageParam: 0,
    initialData: initialVideos.length > 0 ? {
    pages: [{
        content: initialVideos,
        page: {
        number: 0, // 🔥 0-dan başlamalı
        size: initialVideos.length,
        totalPages: 1,
        totalElements: initialVideos.length,
        },
        last: false,
    }],
    pageParams: [0],
    } : undefined,
  });


  useEffect(() => {
  console.log("ALL VIDEOS", allVideos);
  console.log("DATA PAGES", data?.pages);
}, [data]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allVideos = data?.pages.flatMap((page) => page.content) || [];

  if (isLoading && allVideos.length === 0) {
    return (
      <div className="divide-y divide-gray-700">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex p-3 animate-pulse">
            <div className="flex-shrink-0 w-24 h-16 bg-gray-700 rounded-md"></div>
            <div className="ml-3 flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-700">
      {allVideos.map((video, index) => {
        const isActive = video.videoId === currentVideoId;

        return (
          <Link
            href={`/videos/${video.videoId}`}
            key={`${video.videoId}-${index}`}
            className={`flex p-3 hover:bg-gray-700/50 transition-colors ${
              isActive
                ? "bg-emerald-900/30 border-l-4 !border-l-emerald-500"
                : ""
            }`}
          >
            <div className="flex-shrink-0 relative w-24 h-16 rounded-md overflow-hidden">
              <Image
                src={
                  getBestThumbnailUrl(video.thumbnail) || "/placeholder.svg"
                }
                alt={video.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p
                className={`text-sm font-medium line-clamp-2 ${
                  isActive ? "text-emerald-400" : "text-white"
                }`}
              >
                {video.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatDate(video.publishedAt)}
              </p>
            </div>
          </Link>
        );
      })}

      {/* Intersection Observer Target */}
      <div ref={observerRef} className="p-3">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-gray-400">Yüklənir...</span>
          </div>
        )}
        {!hasNextPage && allVideos.length > 0 && (
          <p className="text-xs text-gray-500 text-center">
            Bütün videolar yükləndi
          </p>
        )}
      </div>
    </div>
  );
}
