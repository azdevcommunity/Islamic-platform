import { CalendarIcon } from "lucide-react";
import VideoPlayerPlaylistItems from "./VideoPlayerPlaylistItems";
import RelatedVideosSection from "./RelatedVideosSection";

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
  description?: string;
}

interface PlaylistDetailPageProps {
  playlist: Playlist;
  videos: Video[];
  totalVideos: number;
}

const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => {
  try {
    return new Date(dateString).toLocaleDateString("az-AZ", options);
  } catch (e) {
    console.error("Invalid date for formatting:", dateString);
    return "Invalid Date";
  }
};

export default function PlaylistDetailPage({
  playlist,
  videos,totalVideos
}: PlaylistDetailPageProps) {
  // First video is auto-selected
  const selectedVideo = videos[0];
  const mainVideoFormattedDate = selectedVideo
    ? formatDate(selectedVideo.publishedAt)
    : "";

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto py-12 px-4 max-w-7xl">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Video Player Section */}
            <div className="xl:col-span-3 space-y-8">
              {/* Video Player */}
              <div className="relative">
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
                  {selectedVideo ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0&modestbranding=1&autoplay=1`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                      <p>Video yüklənmir...</p>
                    </div>
                  )}
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl opacity-20 blur-sm -z-10"></div>
              </div>

              {/* Video Info */}
              <div className="space-y-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {selectedVideo?.title || playlist.title}
                  </h1>

                  <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-red-400" />
                      <span className="font-medium">{mainVideoFormattedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {(selectedVideo?.description || playlist.description) && (
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Təsvir
                    </h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selectedVideo?.description || playlist.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Playlist Sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/10 sticky top-8">
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
                    </svg>
                    {playlist.title}
                  </h3>
                  <p className="text-red-100 text-sm mt-2">
                    {totalVideos} video
                  </p>
                </div>
                <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                  <VideoPlayerPlaylistItems
                    playlistId={playlist.playlistId}
                    currentVideoId={selectedVideo?.videoId}
                    initialVideos={videos}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Videos and Playlists Section */}
      <RelatedVideosSection currentVideoId={selectedVideo?.videoId} />
    </>
  );
}
