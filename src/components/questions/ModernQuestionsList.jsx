"use client"
import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    ChevronDown,
    ChevronRight,
    Clock,
    Eye,
    MessageCircle,
    Tag,
    User,
    BookOpen,
    ArrowUpRight,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/util/DateUtil";

// Modern Question Card with Glass Morphism Design
export const ModernQuestionCard = memo(function ModernQuestionCard({ question, index }) {
    const [isHovered, setIsHovered] = useState(false);
    const formattedDate = formatDate(question.createdDate);

    // Truncate answer for preview
    const answerPreview = question.answer?.length > 150
        ? question.answer.substring(0, 150) + "..."
        : question.answer || "Cavab mövcud deyil.";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Main Card */}
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:border-blue-200/60">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/10 to-blue-500/10 rounded-full blur-xl transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>

                <div className="relative p-8">
                    {/* Header */}
                    <div className="flex items-start gap-6 mb-6">
                        {/* Icon */}
                        <motion.div
                            className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <MessageCircle className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Question Title */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-700 transition-colors duration-300">
                                {question.question}
                            </h3>

                            {/* Categories */}
                            {question.categories && question.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {question.categories.slice(0, 2).map(category => (
                                        <span
                                            key={category.id}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-medium rounded-full border border-blue-200/50"
                                        >
                                            <BookOpen className="w-3 h-3" />
                                            {category.name}
                                        </span>
                                    ))}
                                    {question.categories.length > 2 && (
                                        <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                                            +{question.categories.length - 2}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Answer Preview */}
                    <div className="mb-6">
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-6 border border-gray-100/50">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-semibold text-gray-800">Cavab</h4>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                {answerPreview}
                            </p>
                        </div>
                    </div>

                    {/* Tags */}
                    {question.tags && question.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {question.tags.slice(0, 4).map(tag => (
                                <Link
                                    key={tag.id}
                                    href={`/questions?tag=${tag.id}`}
                                    className="group/tag"
                                >
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-xl border border-gray-200/50 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer">
                                        <Tag className="w-3 h-3" />
                                        {tag.name}
                                    </span>
                                </Link>
                            ))}
                            {question.tags.length > 4 && (
                                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100/80 text-gray-600 text-sm font-medium rounded-xl">
                                    +{question.tags.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-100/50">
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                {formattedDate}
                            </span>

                            {question.readCount != null && (
                                <span className="flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-green-500" />
                                    {question.readCount} oxunma
                                </span>
                            )}
                        </div>

                        {/* Read More Button */}
                        <Link
                            href={`/questions/${question.id}`}
                            className="group/link inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <span>Tam oxu</span>
                            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                        </Link>
                    </div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-transparent"
                    animate={{
                        borderColor: isHovered ? "rgba(59, 130, 246, 0.3)" : "transparent"
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
});

// Modern Grid Layout
export const ModernQuestionsGrid = memo(function ModernQuestionsGrid({ questions }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {questions.map((question, index) => (
                <ModernQuestionCard
                    key={question.id}
                    question={question}
                    index={index}
                />
            ))}
        </div>
    );
});

// Modern List Layout (Alternative)
export const ModernQuestionsList = memo(function ModernQuestionsList({ questions }) {
    return (
        <div className="space-y-6">
            {questions.map((question, index) => (
                <ModernQuestionCard
                    key={question.id}
                    question={question}
                    index={index}
                />
            ))}
        </div>
    );
});

// Enhanced Skeleton Loader
export function ModernQuestionsSkeletonLoader({ count = 6, layout = "grid" }) {
    const skeletonItems = Array.from({ length: count }).map((_, index) => (
        <div key={index} className="relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-3xl opacity-60"></div>

            {/* Main Card */}
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl shadow-lg overflow-hidden animate-pulse">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start gap-6 mb-6">
                        <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                        <div className="flex-1">
                            <div className="h-6 bg-gray-200 rounded-lg w-4/5 mb-3"></div>
                            <div className="flex gap-2">
                                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                                <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                            </div>
                        </div>
                    </div>

                    {/* Answer Preview */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 mb-6">
                        <div className="h-7 bg-gray-200 rounded-xl w-16"></div>
                        <div className="h-7 bg-gray-200 rounded-xl w-20"></div>
                        <div className="h-7 bg-gray-200 rounded-xl w-18"></div>
                    </div>

                    {/* Meta */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                        <div className="flex gap-6">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                        <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
                    </div>
                </div>
            </div>
        </div>
    ));

    if (layout === "grid") {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {skeletonItems}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {skeletonItems}
        </div>
    );
}