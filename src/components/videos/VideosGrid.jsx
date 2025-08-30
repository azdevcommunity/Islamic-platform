import { BASE_URL } from "@/util/Const"
import Link from "next/link"
import Pagination from "@/components/common/Pagination"
import { getBestThumbnailUrl } from "@/util/Thumbnail"
import Image from "next/image"
import { Clock, Calendar } from "lucide-react"

export const revalidate = 60

const LIMIT = 12

const VideosGrid = async ({ playlistId, search, videoId, page, content }) => {
  const clientPage = Number.parseInt(page, 10) || 1
  const backendPage = clientPage - 1

  const isShorts = content === "shorts" ? 1 : 0

  const res = await fetch(
    `${BASE_URL}/videos?page=${backendPage}&size=${LIMIT}&search=${search ?? ""}&shorts=${isShorts}`,
    {
      next: { revalidate: 60 },
    },
  )

  const data = await res.json()

  let videos = data.content ?? data
  const totalPages = data.page.totalPages ?? 1

  if (playlistId) {
    videos = videos?.sort((a, b) => (a.videoId === videoId ? -1 : b.videoId === videoId ? 1 : 0))
  }

  const buildPageLink = (newPage, dynamicVideoId) => {
    const params = new URLSearchParams()
    params.set("page", newPage)

    if (dynamicVideoId) {
      params.set("videoId", dynamicVideoId)
    } else if (videoId) {
      params.set("videoId", videoId)
    }

    if (content) {
      params.set("content", content)
    }
    if (search) {
      params.set("search", search)
    }
    if (playlistId) {
      params.set("playlistId", playlistId)
    }
    return `?${params.toString()}`
  }

  return (
    <div>
      {videos?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center mb-8 shadow-lg">
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Heç bir video tapılmadı</h2>
          <p className="text-gray-600 max-w-md text-lg leading-relaxed">
            Axtarışa uyğun bir nəticə tapılmadı. Zəhmət olmasa başqa açar sözlərlə yenidən cəhd edin.
          </p>
        </div>
      ) : (
        <>
          {/* Results Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {content === "shorts" ? "Qısa Videolar" : "Videolar"}
                </h3>
                <p className="text-gray-600 mt-1">
                  {videos?.length} nəticə tapıldı
                </p>
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {videos?.map((video, index) => (
              <div
                key={video.videoId}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={buildPageLink(clientPage, video.videoId)}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-red-200"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={getBestThumbnailUrl(video.thumbnail) || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Duration badge */}
                    {/* <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg font-medium">
                      12:34
                    </div> */}
                    
                    {/* Type badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white`}>
                        {content === "shorts" ? "Short" : "Video"}
                      </span>
                    </div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16">
              <Pagination clientPage={clientPage} totalPages={totalPages} buildPageLink={buildPageLink} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default VideosGrid

