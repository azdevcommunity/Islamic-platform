"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { getBestThumbnailUrl } from "@/util/Thumbnail.js";
import { BASE_URL } from "@/util/Const.js";

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

export default function RelatedVideosSection({
  currentVideoId,
}: RelatedVideosSectionProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [activeTab, setActiveTab] = useState<"videos" | "playlists">("videos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedContent = async () => {
      setLoading(true);
      try {
        const [videosRes, playlistsRes] = await Promise.all([
          fetch(`${BASE_URL}/videos?page=0&size=8`),
          fetch(`${BASE_URL}/playlists`),
        ]);

        if (videosRes.ok) {
          const vData = await videosRes.json();
          let videosList = Array.isArray(vData)
            ? vData
            : vData.content || vData.data || [];
          
          // Filter out current video
          if (currentVideoId) {
            videosList = videosList.filter(
              (v: Video) => v.videoId !== currentVideoId
            );
          }
          
          setVideos(videosList.slice(0, 8));
        }

        if (playlistsRes.ok) {
          const pData = await playlistsRes.json();
          const playlistsList = Array.isArray(pData)
            ? pData
            : pData.content || pData.data || [];
          setPlaylists(playlistsList.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching related content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedContent();
  }, [currentVideoId]);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header with Tabs */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Digər Məzmunlar
          </h2>
          
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
                activeTab === "videos"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Videolar ({videos.length})
            </button>
            <button
              onClick={() => setActiveTab("playlists")}
              className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
                activeTab === "playlists"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Playlistlər ({playlists.length})
            </button>
          </div>
        </div>

        {/* Videos Grid */}
        {activeTab === "videos" && (
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
                  <div className="relative aspect-video">
                    <Image
                      src={
                        getBestThumbnailUrl(video.thumbnail) ||
                        "/placeholder.svg"
                      }
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
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
        )}

        {/* Playlists Grid */}
        {activeTab === "playlists" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {playlists.map((playlist, index) => (
              <div
                key={`${playlist.playlistId}-${index}`}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={`/videos/playlist/${playlist.playlistId}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-red-200"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={
                        getBestThumbnailUrl(playlist.thumbnail) ||
                        "/placeholder.svg"
                      }
                      alt={playlist.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
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

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/videos?content=${activeTab}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {activeTab === "videos" ? "Bütün Videolar" : "Bütün Playlistlər"}
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
    </section>
  );
}
