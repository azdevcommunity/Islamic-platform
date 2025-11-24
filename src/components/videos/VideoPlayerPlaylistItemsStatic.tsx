import Link from "next/link";
import Image from "next/image";
import { getBestThumbnailUrl } from "@/util/Thumbnail.js";

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface VideoPlayerPlaylistItemsStaticProps {
  videos: Video[];
  currentVideoId?: string;
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

export default function VideoPlayerPlaylistItemsStatic({
  videos,
  currentVideoId,
}: VideoPlayerPlaylistItemsStaticProps) {
  return (
    <div className="divide-y divide-gray-700">
      {videos.map((video, index) => {
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
    </div>
  );
}
