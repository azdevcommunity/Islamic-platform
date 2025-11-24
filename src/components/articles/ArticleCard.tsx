import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import type { Article } from "@/types"

interface ArticleCardProps {
  article?: Article;
  // Legacy props support (for gradual migration)
  id?: string | number;
  title?: string;
  description?: string;
  image?: string;
  date?: string;
  authorName?: string;
  authorImage?: string;
}

const ArticleCard = ({ 
  article,
  id: legacyId, 
  title: legacyTitle, 
  description: legacyDescription, 
  image: legacyImage, 
  date: legacyDate, 
  authorName: legacyAuthorName, 
  authorImage: legacyAuthorImage 
}: ArticleCardProps) => {
  // Support both new (article object) and legacy (individual props) usage
  const id = article?.id ?? legacyId;
  const title = article?.title ?? legacyTitle;
  const description = legacyDescription; // article type doesn't have description yet
  const image = article?.image ?? legacyImage;
  const date = article?.createdDate ?? legacyDate;
  const authorName = article?.authorName ?? legacyAuthorName;
  const formattedDate = date ? new Date(date).toLocaleDateString("az-AZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "Tarix yoxdur"

  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link href={`/articles/${id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title || "Article"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Category badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded">
            Məqalə
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-800 group-hover:text-primary-600 mb-2 line-clamp-2 transition-colors">
            {title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
            {authorName && (
              <div className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <span className="line-clamp-1">{authorName}</span>
              </div>
            )}
          </div>

          {/* Read More Button */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-sm text-primary-600 font-medium group-hover:text-primary-700 flex items-center gap-1">
              Oxu
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ArticleCard

