import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { formatDate } from '@/util/DateUtil';

export default function IslamicArticleCard({ article }) {
    const { id, title, image, createdDate, authorName, description } = article;
    const href = `/articles/${id}`;
    const formattedDate = createdDate ? formatDate(createdDate) : "Tarix yoxdur";

    return (
        <Link 
            href={href} 
            className="group flex flex-col h-full bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-2xl hover:border-primary-300 transition-all duration-500 overflow-hidden"
        >
            {/* Image Container */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                <Image
                    src={image || '/placeholder-article.png'}
                    alt={title || "Məqalə şəkli"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    priority={false}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    Məqalə
                </div>
            </div>
            
            {/* Content Container */}
            <div className="flex flex-col flex-1 p-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-primary-700 mb-3 line-clamp-2 transition-colors leading-tight">
                    {title || "Başlıq yoxdur"}
                </h3>
                
                {/* Description */}
                {description && (
                    <p className="text-sm text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                        {description}
                    </p>
                )}
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-4 mt-auto">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-stone-400" />
                        <span>{formattedDate}</span>
                    </div>
                    {authorName && (
                        <div className="flex items-center gap-1.5">
                            <div className="h-4 w-4 rounded-full bg-primary-200 flex items-center justify-center text-xs font-semibold text-primary-700">
                                {authorName.charAt(0)}
                            </div>
                            <span className="line-clamp-1">{authorName}</span>
                        </div>
                    )}
                </div>
                
                {/* Footer with CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-100 group-hover:border-primary-200 transition-colors">
                    <span className="text-xs font-semibold text-primary-600 group-hover:text-primary-700">
                        Oxu
                    </span>
                    <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all duration-300" />
                </div>
            </div>
        </Link>
    );
}
