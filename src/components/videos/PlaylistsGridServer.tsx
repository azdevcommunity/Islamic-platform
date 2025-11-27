import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { getThumbnailPair, ThumbnailManager } from "@/util/Thumbnail.js";
import LoadMorePlaylists from "./LoadMorePlaylists";

interface Playlist {
  playlistId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  videoCount: number;
}

interface PlaylistsGridServerProps {
  playlists: Playlist[];
  search: string;
  hasMore: boolean;
}

export default async function PlaylistsGridServer({
  playlists,
  search,
  hasMore,
}: PlaylistsGridServerProps) {
  if (playlists.length === 0) {
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
              {playlists.length} playlist tapıldı
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {await Promise.all(playlists.map( async (playlist, index) => {
              const { high: src ,low : lowQualitySrc} =getThumbnailPair(playlist.thumbnail);
              const blur = await ThumbnailManager.fetchBlurDataURL(lowQualitySrc);
          
          return (
            <div
              key={`${playlist.playlistId}-${index}`}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Link
                href={`/videos/playlist/${playlist.playlistId}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-red-200"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={playlist.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={blur}
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
          )
        }))}
      </div>

      {hasMore && <LoadMorePlaylists search={search} initialPage={1} />}
    </div>
  );
}
