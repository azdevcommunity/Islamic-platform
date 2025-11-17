/**
 * Article Detail Loading State
 * Skeleton UI for article detail page
 */

export default function ArticleDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 animate-pulse" role="status" aria-label="Yüklənir">
      {/* Hero Image Skeleton */}
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-gray-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <div className="h-10 md:h-12 bg-gray-400/50 rounded-lg w-3/4 mb-4" />
            <div className="flex flex-wrap gap-4">
              <div className="h-5 bg-gray-400/50 rounded-lg w-32" />
              <div className="h-5 bg-gray-400/50 rounded-lg w-24" />
              <div className="h-5 bg-gray-400/50 rounded-lg w-40" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <article className="bg-white rounded-t-2xl shadow-md p-6 md:p-10">
          {/* Author Info Skeleton */}
          <div className="flex items-center mb-8">
            <div className="h-12 w-12 rounded-full bg-gray-300 mr-4" />
            <div>
              <div className="h-5 bg-gray-300 rounded w-32 mb-2" />
              <div className="h-4 bg-gray-300 rounded w-16" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
            {/* Article Content Skeleton */}
            <div>
              <div className="space-y-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-300 rounded"
                    style={{ width: `${Math.random() * 30 + 70}%` }}
                  />
                ))}
              </div>

              {/* Action Buttons Skeleton */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-20 bg-gray-300 rounded-lg" />
                  <div className="h-10 w-24 bg-gray-300 rounded-lg" />
                </div>
                <div className="h-10 w-32 bg-gray-300 rounded-lg" />
              </div>

              {/* Tags Skeleton */}
              <div className="mt-8">
                <div className="h-6 bg-gray-300 rounded w-32 mb-3" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-8 w-20 bg-gray-300 rounded-full" />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <aside className="space-y-8">
              <div className="bg-gray-100 rounded-xl p-6">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-5 bg-gray-300 rounded w-3/4" />
                  ))}
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-6">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4" />
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex space-x-4">
                      <div className="w-24 h-16 bg-gray-300 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>

      {/* Related Articles Skeleton */}
      <section className="container mx-auto px-4 mt-12">
        <div className="h-8 bg-gray-300 rounded w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-300 aspect-[16/9]" />
              <div className="p-5">
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-full mb-2" />
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
                <div className="h-4 bg-gray-300 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <span className="sr-only">Məqalə yüklənir...</span>
    </div>
  );
}
