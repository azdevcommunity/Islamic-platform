import VideoPlayerPlaylistItems from "@/components/videos/VideoPlayerPlaylistItems"
import { CalendarIcon, Clock, Eye, ThumbsUp } from "lucide-react"
import { BASE_URL } from "@/util/Const";

// Ensure formatDate utility is available or define it here
const formatDate = (dateString, options = { year: "numeric", month: "short", day: "numeric" }) => {
    try {
        return new Date(dateString).toLocaleDateString("az-AZ", options);
    } catch (e) {
        console.error("Invalid date for formatting:", dateString);
        return "Invalid Date";
    }
};

export const revalidate = 60

const VideoPlayer = async ({ playlistId, search, videoId, content, page }) => {
    // Geçerliliği kontrol eden yardımcı fonksiyon
    const isValid = (prop) => prop != null && prop !== "undefined" && prop !== "null"

    let selectedVideo, videos, playlist

    if (isValid(videoId)) {
        try {
            const findPlaylistResponse = await fetch(`${BASE_URL}/playlists/of-video/${videoId}`, {
                next: { revalidate: 60 },
            })
            if (findPlaylistResponse.ok) {
                const findPlaylist = await findPlaylistResponse.json()
                playlistId = findPlaylist.playlistId
            } else {
                console.error("Failed to find playlist for video:", videoId)
            }
        } catch (error) {
            console.error("Error finding playlist for video:", videoId, error)
        }
    }

    // Eğer playlistId sağlanmamışsa, videoId varsa ilgili playlisti bul; yoksa varsayılanı kullan.
    if (!isValid(playlistId)) {
        // if (!isValid(videoId)) {
        //     const latestVideoRes = await fetch(`${BASE_URL}/videos/latest`, {
        //         next: {revalidate: 60},
        //     })
        //
        //     selectedVideo = await latestVideoRes.json()
        //     videoId = selectedVideo.videoId
        //     console.log("selectedVideo", selectedVideo)
        // }

        // const findPlaylistResponse = await fetch(`${BASE_URL}/playlists/of-video/${videoId}`, {
        //     next: {revalidate: 60},
        // })
        // const findPlaylist = await findPlaylistResponse.json()
        // playlistId = findPlaylist?.playlistId ?? process.env.DEFAULT_PLAYLIST_ID
        playlistId = process.env.DEFAULT_PLAYLIST_ID
    }

    // Playlist ve videoları paralel şekilde çek
    try {
        const [playlistRes, videosRes] = await Promise.all([
            fetch(`${BASE_URL}/playlists/${playlistId}`, { next: { revalidate: 60 } }),
            fetch(`${BASE_URL}/videos?playlistId=${playlistId}`, { next: { revalidate: 60 } }),
        ])
        
        if (playlistRes.ok && videosRes.ok) {
            playlist = await playlistRes.json()
            videos = await videosRes.json()
        } else {
            console.error("Failed to fetch playlist or videos:", playlistId)
            videos = []
            playlist = {}
        }
    } catch (error) {
        console.error("Error fetching playlist data:", error)
        videos = []
        playlist = {}
    }
    // Fetch videos and format dates immediately

    // try {
    //     const fetchedVideosData = await videosRes.json();
    //     if (Array.isArray(fetchedVideosData)) {
    //         videos = fetchedVideosData.map(video => ({
    //             ...video,
    //             publishedAtFormatted: formatDate(video.publishedAt)
    //         }));
    //     }
    // } catch (error) {
    //     console.error("Error processing videos data:", error);
    //     // Keep videos as empty array on error
    // }

    // videoId geçerli ise, ayrı fetch ile seçilen videoyu getir; aksi halde playlist içerisinden seç.
    if (selectedVideo == null) {
        if (isValid(videoId) && isValid(playlistId)) {
            try {
                const selectedVideoResponse = await fetch(`${BASE_URL}/videos/${videoId}`, {
                    next: { revalidate: 60 },
                })
                if (selectedVideoResponse.ok) {
                    selectedVideo = await selectedVideoResponse.json()
                } else {
                    console.error("Failed to fetch selected video:", videoId)
                    selectedVideo = videos.find((v) => v.videoId === videoId) ?? videos[0]
                }
            } catch (error) {
                console.error("Error fetching selected video:", error)
                selectedVideo = videos.find((v) => v.videoId === videoId) ?? videos[0]
            }
        } else {
            selectedVideo = videos.find((v) => v.videoId === videoId) ?? videos[0]
        }
    }

    // Final fallback if selectedVideo is somehow still null
    if (!selectedVideo && videos.length > 0) {
        selectedVideo = videos[0];
    }

    // Prepare formatted date for the main video display (use selectedVideo safely)
    const mainVideoFormattedDate = selectedVideo?.publishedAt
        ? formatDate(selectedVideo.publishedAt, { year: "numeric", month: "long", day: "numeric" })
        : "";

    return (
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="container mx-auto py-12 px-4 max-w-7xl">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Main Video Player Section */}
                    <div className="xl:col-span-3 space-y-8">
                        {/* Video Player */}
                        <div className="relative">
                            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
                                {selectedVideo?.videoId ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0&modestbranding=1&autoplay=1`}
                                        title={selectedVideo?.title || "Video Player"}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                                        <p>Video yüklənmir...</p>
                                    </div>
                                )}
                            </div>
                            {/* Decorative border */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl opacity-20 blur-sm -z-10"></div>
                        </div>

                        {/* Video Info */}
                        <div className="space-y-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <div>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                                    {selectedVideo?.title}
                                </h1>

                                <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="w-5 h-5 text-red-400" />
                                        <span className="font-medium">{mainVideoFormattedDate}</span>
                                    </div>
                                    {/* <div className="flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-blue-400" />
                                        <span className="font-medium">1.2K izlənmə</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ThumbsUp className="w-5 h-5 text-green-400" />
                                        <span className="font-medium">98 bəyənmə</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-purple-400" />
                                        <span className="font-medium">12:34</span>
                                    </div> */}
                                </div>
                            </div>

                            {/* Description */}
                            {selectedVideo?.description && (
                                <div className="border-t border-white/10 pt-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">Təsvir</h3>
                                    <p className="text-gray-300 leading-relaxed line-clamp-3">
                                        {selectedVideo.description}
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
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
                                    </svg>
                                    {playlist?.title || "Playlist"}
                                </h3>
                                <p className="text-red-100 text-sm mt-2">
                                    {videos?.length || 0} video
                                </p>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                                <VideoPlayerPlaylistItems
                                    playlistId={playlistId}
                                    videos={videos}
                                    page={page}
                                    searchParams={search}
                                    content={content}
                                    videoId={selectedVideo?.videoId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoPlayer

