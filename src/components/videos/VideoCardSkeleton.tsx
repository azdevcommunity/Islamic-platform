export default function VideoCardSkeleton() {
  return (
    <div className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video bg-gray-200">
        {/* Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Meta Info Skeleton */}
        <div className="flex items-center text-sm space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
