import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {getBestThumbnailUrl} from "@/util/Thumbnail";
import {Calendar, Clock, Play} from "lucide-react";

const IslamicVideoCard = ({video, content , link}) => {
    return (
        <Link
            href={link}
            key={video.videoId}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-stone-200 hover:border-primary-200"
        >
            <div className="relative aspect-video bg-stone-100">
                <Image
                    src={getBestThumbnailUrl(video.thumbnail) || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Play icon - hover effekti */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-primary-600/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                        <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                </div>
                
                {/* Müddət badge */}
                <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                    12:34
                </div>
                
                {/* Tip badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {content === "shorts" ? "Short" : "Video"}
                    </span>
                </div>
            </div>
            
            <div className="p-5">
                <h3 className="font-semibold text-stone-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors leading-snug">
                    {video.title}
                </h3>
                <div className="flex items-center text-xs text-stone-500 space-x-4">
                    <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-stone-400" />
                        <span>
                            {new Date(video.publishedAt).toLocaleDateString("az-AZ", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-stone-400" />
                        <span>12:34</span>
                    </div>
                </div>
            </div>
            
            {/* Alt xətt - hover effekti */}
            <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>
    );
};

export default IslamicVideoCard;
