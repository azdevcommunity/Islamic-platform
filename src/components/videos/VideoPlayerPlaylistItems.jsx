"use client"
import Link from "next/link"
import { getBestThumbnailUrl } from "@/util/Thumbnail"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { BASE_URL } from "@/util/Const"

const VideoPlayerPlaylistItems = ({ playlistId, videos: initialVideos, page, searchParams, content, videoId }) => {
  const [videos, setVideos] = useState(initialVideos || [])
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef(null)
  const loadMoreRef = useRef(null)

  const generateRoute = (playlistId, videoId) => {
    const urlParams = new URLSearchParams()
    if (playlistId != null) {
      urlParams.set("playlistId", playlistId)
    }

    if (videoId != null) {
      urlParams.set("videoId", videoId)
    }

    if (content != null) {
      urlParams.set("content", content)
    }

    if (page != null) {
      urlParams.set("page", page)
    }

    const route = `/videos?${urlParams.toString()}`
    return route
  }

  const loadMoreVideos = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const nextPage = currentPage + 1
      const response = await fetch(`${BASE_URL}/videos?playlistId=${playlistId}&page=${nextPage}`)
      
      if (response.ok) {
        const data = await response.json()
        let newVideos = []
        
        if (Array.isArray(data)) {
          newVideos = data
        } else if (data && Array.isArray(data.content)) {
          newVideos = data.content
          setHasMore(!data.last)
        } else if (data && data.data && Array.isArray(data.data)) {
          newVideos = data.data
        }

        if (newVideos.length === 0) {
          setHasMore(false)
        } else {
          setVideos(prev => [...prev, ...newVideos])
          setCurrentPage(nextPage)
        }
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error loading more videos:", error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreVideos()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loading, currentPage])

  return (
    <div className="divide-y divide-gray-700">
      {videos?.map((video, index) => {
        return (
            <Link
                href={generateRoute(playlistId, video.videoId)}
                key={`${video.videoId}-${index}`}
                className={`flex p-3 hover:bg-gray-700/50 transition-colors ${
                    video.videoId === videoId ? "bg-emerald-900/30 border-l-4 !border-l-emerald-500" : ""
                }`}
            >
              <div className="flex-shrink-0 relative w-24 h-16 rounded-md overflow-hidden">
                <Image
                    src={getBestThumbnailUrl(video.thumbnail) || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover"
                />
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p
                    className={`text-sm font-medium line-clamp-2 ${
                        video.videoId === videoId ? "text-emerald-400" : "text-white"
                    }`}
                >
                  {video.title}
                </p>
                {video.publishedAtFormatted && (
                  <p className="text-xs text-gray-400 mt-1">
                    {video.publishedAtFormatted}
                  </p>
                )}
              </div>
            </Link>
        )
      })}
      
      {hasMore && (
        <div ref={loadMoreRef} className="p-4 text-center">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-400">Yüklənir...</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">Daha çox video üçün aşağı sürüşdürün</span>
          )}
        </div>
      )}
    </div>
  )
}

export default VideoPlayerPlaylistItems

