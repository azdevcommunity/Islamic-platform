import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar } from 'lucide-react';
import { formatDate } from '@/util/DateUtil';

export default function IslamicArticleCard({ article }) {
    const { id, title, image, createdDate, authorName } = article;
    const href = `/articles/${id}`;
    const formattedDate = createdDate ? formatDate(createdDate) : "Tarix yoxdur";

    return (
        <Link 
            href={href} 
            className="group block bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
        >
            {/* Şəkil */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                    src={image || '/placeholder-article.png'}
                    alt={title || "Məqalə şəkli"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Məzmun */}
            <div className="p-5">
                <h3 className="text-base font-semibold text-stone-900 group-hover:text-primary-700 mb-3 line-clamp-2 transition-colors leading-snug">
                    {title || "Başlıq yoxdur"}
                </h3>
                
                <div className="text-xs text-stone-500 space-y-2">
                    {/* Müəllif */}
                    {authorName && (
                        <p className="flex items-center">
                            <User className="h-3.5 w-3.5 mr-1.5 text-stone-400 flex-shrink-0" />
                            <span className="line-clamp-1">{authorName}</span>
                        </p>
                    )}
                    {/* Tarix */}
                    <p className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-stone-400 flex-shrink-0" />
                        <span className="line-clamp-1">{formattedDate}</span>
                    </p>
                </div>
            </div>
            
            {/* İncə alt xətt - hover effekti */}
            <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>
    );
}
