import Link from "next/link"
import Image from "next/image"
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi"

const ArticleCard = ({ id, title, description, image, date, authorName, authorImage }) => {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-[#43b365]/20 h-full flex flex-col">
      {/* Image Container */}
      <Link href={`/articles/${id}`} className="block overflow-hidden relative aspect-[4/3]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Date badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-[#43b365] text-white text-xs font-medium rounded-full">
          Məqalə
        </div>

        {/* Read more overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <span>Oxu</span>
            <FiArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FiCalendar className="w-4 h-4" />
          <span>
            {new Date(date).toLocaleDateString("az-AZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Title */}
        <Link href={`/articles/${id}`}>
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-[#43b365] transition-colors duration-300 leading-tight">
            {title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-gray-600 line-clamp-3 flex-grow leading-relaxed">
          {description}
        </p>

        {/* Author section */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                <Image 
                  src={authorImage || "/default-avatar.png"} 
                  alt={authorName} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <FiUser className="w-3 h-3" />
                  <span>Müəllif</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{authorName}</span>
              </div>
            </div>
            
            <Link 
              href={`/articles/${id}`}
              className="text-[#43b365] hover:text-[#2d7a47] transition-colors duration-200"
            >
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#43b365]/20 transition-colors duration-300 pointer-events-none"></div>
    </article>
  )
}

export default ArticleCard

