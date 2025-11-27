import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { getThumbnailPair, ThumbnailManager } from "@/util/Thumbnail.js";
import { BASE_URL } from "@/util/Const.js";
import RelatedVideosTabs from "./RelatedVideosTabs";

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface Playlist {
  playlistId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  videoCount: number;
}

interface RelatedVideosSectionProps {
  currentVideoId?: string;
}

async function fetchVideos(currentVideoId?: string): Promise<Video[]> {
  const res = await fetch(`${BASE_URL}/videos?page=0&size=8`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return [];
  }

  const vData = await res.json();
  let videosList = Array.isArray(vData)
    ? vData
    : vData.content || vData.data || [];

  // Filter out current video
  if (currentVideoId) {
    videosList = videosList.filter(
      (v: Video) => v.videoId !== currentVideoId
    );
  }

  return videosList.slice(0, 8);
}

async function fetchPlaylists(): Promise<Playlist[]> {
  const res = await fetch(`${BASE_URL}/playlists`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return [];
  }

  const pData = await res.json();
  const playlistsList = Array.isArray(pData)
    ? pData
    : pData.content || pData.data || [];

  return playlistsList.slice(0, 8);
}

export default async function RelatedVideosSection({
  currentVideoId,
}: RelatedVideosSectionProps) {
  const [videos, playlists] = await Promise.all([
    fetchVideos(currentVideoId),
    fetchPlaylists(),
  ]);

  // Pre-fetch blur data URLs for all images
  const videosWithBlur = await Promise.all(
    videos.map(async (video) => {
      const { high, low } = getThumbnailPair(video.thumbnail);
      const blur = await ThumbnailManager.fetchBlurDataURL(low);
      return { ...video, high, blur };
    })
  );

  const playlistsWithBlur = await Promise.all(
    playlists.map(async (playlist) => {
      const { high, low } = getThumbnailPair(playlist.thumbnail);
      const blur = await ThumbnailManager.fetchBlurDataURL(low);
      return { ...playlist, high, blur };
    })
  );

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header with Tabs */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Digər Məzmunlar
          </h2>

          <RelatedVideosTabs
            videosCount={videos.length}
            playlistsCount={playlists.length}
          />
        </div>

        {/* Videos Grid */}
        <div data-tab="videos" className="tab-content">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {videosWithBlur.map((video, index) => (
              <div
                key={`${video.videoId}-${index}`}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={`/videos/${video.videoId}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-red-200"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={video.high || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={video.blur}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                        Video
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
                          {new Date(video.publishedAt).toLocaleDateString(
                            "az-AZ",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
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
        </div>

        {/* Playlists Grid */}
        <div data-tab="playlists" className="tab-content hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {playlistsWithBlur.map((playlist, index) => (
              <div
                key={`${playlist.playlistId}-${index}`}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={`/videos/playlist/${playlist.playlistId}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-red-200"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image
                      src={playlist.high || "/placeholder.svg"}
                      alt={playlist.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={playlist.blur}
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
        </div>

        {/* View All Link - Client Component */}
        <div className="mt-12 text-center">
          <div id="view-all-link">
            <Link
              href="/videos?content=videos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Bütün Videolar
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
