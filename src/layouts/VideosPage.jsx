import VideoPlayer from "@/components/videos/VideoPlayer"
import PlaylistsGrid from "@/components/videos/PlaylistsGrid"
import VideosGrid from "@/components/videos/VideosGrid"
import ModernSearchAndToggle from "@/components/videos/ModernSearchAndToggle";
import VideoPageHeader from "@/components/videos/VideoPageHeader";

const Videos = ({ playlistId, search, videoId, content, page }) => {
    // Debug: Log received parameters
    console.log("VideosPageLayout params:", { playlistId, search, videoId, content, page });

    if (page == null) {
        if (content == null && videoId != null) {
            content = "videos"
        }
        page = 0
    }

    content ??= "videos"

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
            {/* Video Player Section */}
            {(videoId || (playlistId && content !== "playlists")) && (
                <VideoPlayer playlistId={playlistId} videoId={videoId} content={content} search={search} />
            )}

            {/* Page Header */}
            {!videoId && !playlistId && (
                <VideoPageHeader />
            )}

            {/* Content Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Search and Toggle Controls */}
                    <div className="mb-12">
                        <ModernSearchAndToggle
                            playlistId={playlistId}
                            videoId={videoId}
                            content={content}
                            search={search}
                        />
                    </div>

                    {/* Content Grid */}
                    <div className="space-y-8">
                        {content === "playlists" && (
                            <PlaylistsGrid
                                playlistId={playlistId}
                                videoId={videoId}
                                content={content}
                                search={search}
                            />
                        )}
                        {(content === "videos" || content === "shorts") && (
                            <VideosGrid
                                playlistId={playlistId}
                                videoId={videoId}
                                content={content}
                                search={search}
                                page={page}
                            />
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Videos

