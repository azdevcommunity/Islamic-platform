"use client";

import { useEffect, useRef, useState } from "react";
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

interface LoadMorePlaylistsProps {
  search: string;
  initialPage: number;
}

const LIMIT = 12;

export default function LoadMorePlaylists({
  search,
  initialPage,
}: LoadMorePlaylistsProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/playlists?page=${page}&size=${LIMIT}&search=${search || ""}`
      );

      if (!res.ok) {
        setHasMore(false);
        return;
      }

      const data = await res.json();
      const newPlaylists = data.content || data.data || [];
      const pageInfo = data.page || {};

      setPlaylists((prev) => [...prev, ...newPlaylists]);
      setPage((prev) => prev + 1);
      setHasMore((pageInfo.number || page) < (pageInfo.totalPages || 1) - 1);
    } catch (error) {
      console.error("Error loading more playlists:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
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
  }, [hasMore, isLoading, page]);

  return (
    <>
      {playlists.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {playlists.map((playlist, index) => (
            <div
              key={`${playlist.playlistId}-${index}`}
              className="animate-fadeInUp"
              style={{ animationDelay: `${(index % 12) * 0.05}s` }}
            >
              <Link
                href={`/videos/playlist/${playlist.playlistId}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-red-200"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={getThumbnailPair(playlist.thumbnail).high || "/placeholder.svg"}
                    alt={playlist.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                  />
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
      )}

      <div ref={observerRef} className="h-20 flex items-center justify-center mt-8">
        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600 font-medium">
              Daha çox playlist yüklənir...
            </span>
          </div>
        )}
        {!hasMore && playlists.length > 0 && (
          <p className="text-gray-500 text-sm">Bütün playlistlər yükləndi</p>
        )}
      </div>
    </>
  );
}
