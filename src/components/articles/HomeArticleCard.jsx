import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";


const HomeArticleCard = async ({ article }) => {
    return (
        <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#43b365]/20 hover:-translate-y-2">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#43b365] text-white text-xs font-medium rounded-full">
                    Məqalə
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow space-y-4">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCalendar className="w-4 h-4" />
                    <span>{article.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-[#43b365] transition-colors duration-300 leading-tight">
                    {article.title}
                </h3>

                {/* Excerpt if available */}
                {article.excerpt && (
                    <p className="text-gray-600 line-clamp-3 flex-grow leading-relaxed">
                        {article.excerpt}
                    </p>
                )}

                {/* Read More Link */}
                <Link 
                    href={`/articles/${article.id}`}
                    className="inline-flex items-center gap-2 text-[#43b365] hover:text-[#2d7a47] font-semibold transition-all duration-300 group/link mt-auto pt-2"
                >
                    <span>Davamını Oxu</span>
                    <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
            </div>

            {/* Hover border effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#43b365]/20 transition-colors duration-300 pointer-events-none"></div>
        </div>
    );
};

export default HomeArticleCard;
