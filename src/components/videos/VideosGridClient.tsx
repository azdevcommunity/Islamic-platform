"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { getThumbnailPair } from "@/util/Thumbnail.js";
import Pagination from "@/components/common/Pagination";
import { BASE_URL } from "@/util/Const.js";

const LIMIT = 12;

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface VideosGridClientProps {
  content: string;
  search: string;
  page: number;
  onPageChange: (page: number) => void;
}

async function fetchVideos(
  content: string,
  search: string,
  page: number
): Promise<{ videos: Video[]; totalPages: number }> {
  const isShorts = content === "shorts" ? 1 : 0;
  const backendPage = page - 1;
  const res = await fetch(
    `${BASE_URL}/videos?page=${backendPage}&size=${LIMIT}&search=${search || ""}&shorts=${isShorts}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }

  const data = await res.json();
  const videosList = Array.isArray(data)
    ? data
    : data.content || data.data || [];
  
  // Backend-dən gələn page obyekti (kiçik hərflərlə)
  const totalPages = data?.page?.totalPages || data?.totalPages || 1;

  return { videos: videosList, totalPages };
}

export default function VideosGridClient({
  content,
  search,
  page,
  onPageChange,
}: VideosGridClientProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["videos", content, search, page],
    queryFn: () => fetchVideos(content, search, page),
  });

  const videos = data?.videos || [];
  const totalPages = data?.totalPages || 1;
  const loading = isLoading;

  const buildPageLink = (newPage: number) => {
    return `/videos?content=${content}&page=${newPage}${search ? `&search=${search}` : ""}`;
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {content === "shorts" ? "Qısa Videolar" : "Videolar"}
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
                    <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
                  </div>
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
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded"></div>
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

  if (videos.length === 0) {
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
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Heç bir video tapılmadı
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
            <h3 className="text-xl font-semibold text-gray-900">
              {content === "shorts" ? "Qısa Videolar" : "Videolar"}
            </h3>
            <p className="text-gray-600 mt-1">{videos.length} nəticə tapıldı</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {videos.map((video, index) => (
          <div
            key={`${video.videoId}-${index}`}
            className="animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Link
              href={`/videos/${video.videoId}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-red-200"
            >
              <div className="relative aspect-video overflow-hidden">
                {(() => {
                  const { high, low } = getThumbnailPair(video.thumbnail);
                  return (
                    <>
                      {/* Düşük kaliteli blur - hızlı yüklenir */}
                      <Image
                        src={low || "/placeholder.svg"}
                        alt=""
                        fill
                        priority
                        className="object-cover blur-lg scale-105"
                        aria-hidden="true"
                      />
                      {/* Yüksek kaliteli - yavaşça açılır */}
                      <Image
                        src={high || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover transition-opacity duration-700 group-hover:scale-110 opacity-0 data-[loaded=true]:opacity-100"
                        loading="lazy"
                        onLoadingComplete={(img) => {
                          img.setAttribute("data-loaded", "true");
                        }}
                      />
                    </>
                  );
                })()}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                    {content === "shorts" ? "Short" : "Video"}
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
              </div>

              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-300 text-lg leading-tight">
                  {video.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(video.publishedAt).toLocaleDateString("az-AZ", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>12:34</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-16">
          <Pagination
            clientPage={page}
            totalPages={totalPages}
            buildPageLink={buildPageLink}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
