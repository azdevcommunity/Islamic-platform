"use client"
import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    Eye,
    MessageCircle,
    Tag,
    BookOpen,
    ArrowUpRight,
    CheckCircle
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/util/DateUtil";

// Compact Question Card with Green Theme
export const CompactQuestionCard = memo(function CompactQuestionCard({ question, index }) {
    const [isHovered, setIsHovered] = useState(false);
    const formattedDate = formatDate(question.createdDate);
    
    // Truncate answer for preview
    const answerPreview = question.answer?.length > 80 
        ? question.answer.substring(0, 80) + "..." 
        : question.answer || "Cavab mövcud deyil.";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 120
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative"
        >
            {/* Main Card */}
            <div className="relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:border-green-200 h-[280px] flex flex-col">
                {/* Green accent bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-emerald-600"></div>
                
                <div className="relative p-4 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                        {/* Compact Icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                            <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        
                        {/* Question Title */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2 group-hover:text-green-700 transition-colors duration-200 line-clamp-2 h-[3.5rem] overflow-hidden">
                                {question.question}
                            </h3>
                            
                            {/* Categories - Compact */}
                            <div className="h-[1.5rem] flex items-start">
                                {question.categories && question.categories.length > 0 ? (
                                    <div className="flex flex-wrap gap-1">
                                        {question.categories.slice(0, 2).map(category => (
                                            <span 
                                                key={category.id}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-md border border-green-100"
                                            >
                                                <BookOpen className="w-2.5 h-2.5" />
                                                {category.name}
                                            </span>
                                        ))}
                                        {question.categories.length > 2 && (
                                            <span className="inline-flex items-center px-2 py-0.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
                                                +{question.categories.length - 2}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    </div>



                    {/* Answer Preview - Compact */}
                    <div className="mb-3 flex-1">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 h-full flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                                </div>
                                <span className="text-xs font-medium text-gray-700">Cavab</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 flex-1">
                                {answerPreview}
                            </p>
                        </div>
                    </div>

                    {/* Tags - Compact */}
                    <div className="h-[2rem] mb-3 flex items-start">
                        {question.tags && question.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {question.tags.slice(0, 3).map(tag => (
                                    <Link 
                                        key={tag.id}
                                        href={`/questions?tag=${tag.id}`}
                                        className="group/tag"
                                    >
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-white text-gray-600 text-xs font-medium rounded-md border border-gray-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700 transition-all duration-200 cursor-pointer">
                                            <Tag className="w-2.5 h-2.5" />
                                            {tag.name}
                                        </span>
                                    </Link>
                                ))}
                                {question.tags.length > 3 && (
                                    <span className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-md">
                                        +{question.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    {/* Meta Information - Compact */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-green-500" />
                                {formattedDate}
                            </span>
                            
                            {question.readCount != null && (
                                <span className="flex items-center gap-1">
                                    <Eye className="w-3 h-3 text-gray-400" />
                                    {question.readCount}
                                </span>
                            )}
                        </div>

                        {/* Compact Read More Button */}
                        <Link 
                            href={`/questions/${question.id}`}
                            className="group/link inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                        >
                            <span>Oxu</span>
                            <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                        </Link>
                    </div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-transparent"
                    animate={{
                        borderColor: isHovered ? "rgba(34, 197, 94, 0.2)" : "transparent"
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
});

// Compact Grid Layout - 3 Columns
export const CompactQuestionsGrid = memo(function CompactQuestionsGrid({ questions }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {questions.map((question, index) => (
                <CompactQuestionCard 
                    key={question.id} 
                    question={question} 
                    index={index}
                />
            ))}
        </div>
    );
});

// Compact List Layout
export const CompactQuestionsList = memo(function CompactQuestionsList({ questions }) {
    return (
        <div className="space-y-3">
            {questions.map((question, index) => (
                <CompactQuestionCard 
                    key={question.id} 
                    question={question} 
                    index={index}
                />
            ))}
        </div>
    );
});

// Compact Skeleton Loader
export function CompactQuestionsSkeletonLoader({ count = 6, layout = "grid" }) {
    const skeletonItems = Array.from({ length: count }).map((_, index) => (
        <div key={index} className="relative">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden animate-pulse h-[280px] flex flex-col">
                {/* Green accent bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gray-200"></div>
                
                <div className="p-4 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-4/5 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                            <div className="h-[1.5rem] flex items-start mt-2">
                                <div className="flex gap-1">
                                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Answer Preview */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-10"></div>
                        </div>
                        <div className="space-y-1 flex-1">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="h-[2rem] mb-3 flex items-start">
                        <div className="flex gap-1">
                            <div className="h-6 bg-gray-200 rounded w-12"></div>
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                            <div className="h-6 bg-gray-200 rounded w-14"></div>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                        <div className="flex gap-4">
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                            <div className="h-3 bg-gray-200 rounded w-12"></div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                </div>
            </div>
        </div>
    ));

    if (layout === "grid") {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skeletonItems}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {skeletonItems}
        </div>
    );
}