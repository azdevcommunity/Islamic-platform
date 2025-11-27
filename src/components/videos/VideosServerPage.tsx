import VideoPageHeader from "./VideoPageHeader";
import ModernSearchAndToggle from "./ModernSearchAndToggle";
import VideosGridServer from "./VideosGridServer";
import PlaylistsGridServer from "./PlaylistsGridServer";

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

interface VideosServerPageProps {
  content: string;
  search: string;
  page: number;
  videosData: { videos: Video[]; totalPages: number } | null;
  playlistsData: { playlists: Playlist[]; hasMore: boolean } | null;
}

export default function VideosServerPage({
  content,
  search,
  page,
  videosData,
  playlistsData,
}: VideosServerPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <VideoPageHeader />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-12">
            <ModernSearchAndToggle
              content={content}
              search={search}
            />
          </div>

          <div className="space-y-8">
            {content === "playlists" && playlistsData && (
              <PlaylistsGridServer
                playlists={playlistsData.playlists}
                search={search}
                hasMore={playlistsData.hasMore}
              />
            )}
            {(content === "videos" || content === "shorts") && videosData && (
              <VideosGridServer
                videos={videosData.videos}
                totalPages={videosData.totalPages}
                content={content}
                search={search}
                page={page}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
