"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { getThumbnailPair } from "@/util/Thumbnail.js";
import { BASE_URL } from "@/util/Const.js";

interface Playlist {
  playlistId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  videoCount: number;
}

interface PlaylistsGridClientProps {
  search: string;
}

interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

interface PlaylistsResponse {
  content: Playlist[];
  page: PageInfo;
  last: boolean;
}

const LIMIT = 12;

async function fetchPlaylists({
  pageParam = 0,
  search,
}: {
  pageParam?: number;
  search: string;
}): Promise<PlaylistsResponse> {
  const res = await fetch(
    `${BASE_URL}/playlists?page=${pageParam}&size=${LIMIT}&search=${search || ""}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch playlists");
  }

  const data = await res.json();

  // Handle different API response formats
  if (Array.isArray(data)) {
    return {
      content: data,
      page: {
        number: 0,
        size: data.length,
        totalPages: 1,
        totalElements: data.length,
      },
      last: true,
    };
  }

  // Backend-dən gələn page obyekti (kiçik hərflərlə)
  const pageInfo: PageInfo = data.page || {
    number: pageParam,
    size: LIMIT,
    totalPages: 1,
    totalElements: data.content?.length || 0,
  };

  // Son səhifəni hesabla: number (current page) >= totalPages - 1
  const isLastPage = pageInfo.number >= pageInfo.totalPages - 1;

  return {
    content: data.content || data.data || [],
    page: pageInfo,
    last: isLastPage,
  };
}

export default function PlaylistsGridClient({
  search,
}: PlaylistsGridClientProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["playlists-infinite", search],
    queryFn: ({ pageParam = 0 }) => fetchPlaylists({ pageParam, search }),
    getNextPageParam: (lastPage) => {
      // Son səhifədirsə undefined qaytar
      if (lastPage.last) return undefined;
      
      // Növbəti səhifə nömrəsi
      const nextPage = lastPage.page.number + 1;
      
      // Növbəti səhifə totalPages-dən kiçikdirsə qaytar
      if (nextPage < lastPage.page.totalPages) {
        return nextPage;
      }
      
      return undefined;
    },
    initialPageParam: 0,
  });

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

  const allPlaylists = data?.pages.flatMap((page) => page.content) || [];

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Playlistlər
              </h3>
              <div className="h-5 w-32 bg-gray-200 rounded mt-1 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                <div className="relative aspect-video bg-gray-200">
                  <div className="absolute top-3 left-3">
                    <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <div className="h-6 w-16 bg-gray-300 rounded-lg"></div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-full h-full bg-gray-100 rounded-xl -z-10 opacity-30"></div>
                  <div className="absolute -bottom-2 -right-2 w-full h-full bg-gray-50 rounded-xl -z-20 opacity-20"></div>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-3">
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center text-sm space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (allPlaylists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center mb-8 shadow-lg">
          <svg
            className="w-16 h-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Heç bir playlist tapılmadı
        </h2>
        <p className="text-gray-600 max-w-md text-lg leading-relaxed">
          Axtarışa uyğun bir nəticə tapılmadı. Zəhmət olmasa başqa açar sözlərlə
          yenidən cəhd edin.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Playlistlər</h3>
            <p className="text-gray-600 mt-1">
              {allPlaylists.length} playlist tapıldı
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {allPlaylists.map((playlist, index) => (
          <div
            key={`${playlist.playlistId}-${index}`}
            className="animate-fadeInUp"
            style={{ animationDelay: `${(index % 12) * 0.05}s` }}
          >
            <Link
              href={`/videos/playlist/${playlist.playlistId}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-red-200"
            >
              <div className="relative aspect-video overflow-hidden">
                {(() => {
                  const { high, low } = getThumbnailPair(playlist.thumbnail);
                  return (
                    <>
                      {/* Düşük kaliteli blur - hızlı yüklenir */}
                      <Image
                        src={low || "/placeholder.svg"}
                        alt=""
                        fill
                        priority
                        className="object-cover blur-lg scale-105 transition-opacity duration-700 data-[hidden=true]:opacity-0"
                        aria-hidden="true"
                        data-low-quality="true"
                      />
                      {/* Yüksek kaliteli - yavaşça açılır */}
                      <Image
                        src={high || "/placeholder.svg"}
                        alt={playlist.title}
                        fill
                        className="object-cover transition-opacity duration-700 group-hover:scale-110 opacity-0 data-[loaded=true]:opacity-100"
                        loading="lazy"
                        onLoadingComplete={(img) => {
                          img.setAttribute("data-loaded", "true");
                          // Yüksək keyfiyyətli şəkil yükləndikdə blur-lu şəkili gizlət
                          const lowQualityImg = img.parentElement?.querySelector('[data-low-quality="true"]');
                          if (lowQualityImg) {
                            lowQualityImg.setAttribute("data-hidden", "true");
                          }
                        }}
                      />
                    </>
                  );
                })()}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg font-medium">
                  {playlist.videoCount} Video
                </div>

                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Playlist
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute -bottom-1 -right-1 w-full h-full bg-red-100 rounded-xl -z-10 opacity-30"></div>
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-red-50 rounded-xl -z-20 opacity-20"></div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 text-lg leading-tight flex-1 mr-2">
                    {playlist.title}
                  </h3>
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(playlist.publishedAt).toLocaleDateString(
                        "az-AZ",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Intersection Observer Target */}
      <div ref={observerRef} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600 font-medium">
              Daha çox playlist yüklənir...
            </span>
          </div>
        )}
        {!hasNextPage && allPlaylists.length > 0 && (
          <p className="text-gray-500 text-sm">
            Bütün playlistlər yükləndi
          </p>
        )}
      </div>
    </div>
  );
}
