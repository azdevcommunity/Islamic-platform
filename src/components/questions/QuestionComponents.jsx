"use client"
import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    Clock,
    MessageSquare,
    RotateCcw,
    Search,
    TagIcon
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/util/DateUtil";
import useFilterStore from "@/store/useFilterStore";
import Pagination from "@/components/common/Pagination";

// Modern Professional Question Card
export const OptimizedQuestionCard = memo(function QuestionCard({ question }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const formattedDate = formatDate(question.createdDate);

    const answerPreviewThreshold = 200; // Characters
    const collapsedHeight = "5rem"; // Approx 3-4 lines
    const answerText = question.answer || "Cavab mövcud deyil.";
    const needsExpansion = answerText.length > answerPreviewThreshold;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 120, damping: 25 }}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-[#43b365]/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
        >
            <div className="p-5 md:p-6">
                {/* Question Header with Icon */}
                <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#43b365] to-[#2d7a47] rounded-xl flex items-center justify-center shadow-lg">
                        <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight group-hover:text-[#43b365] transition-colors duration-200">
                        {question.question}
                    </h2>
                </div>

                <div className="text-gray-700 text-base leading-relaxed mb-4 relative pl-14">
                    <motion.div
                        initial={needsExpansion ? { height: collapsedHeight } : { height: "auto" }}
                        animate={{ height: isExpanded || !needsExpansion ? "auto" : collapsedHeight }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden text-justify leading-relaxed"
                    >
                        <div className="prose prose-gray max-w-none">
                            {answerText}
                        </div>
                    </motion.div>

                    {!isExpanded && needsExpansion && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
                    )}

                    {needsExpansion && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            aria-expanded={isExpanded}
                        >
                            {isExpanded ? 'Daha az göstər' : 'Daha çox göstər'}
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    )}
                </div>
                {/* Tags */}
                {question.tags && question.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 pl-14">
                        {question.tags.map(tag => (
                            <Link key={tag.id}
                                href={`/questions?tag=${tag.id}&page=1`}
                                className="group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:border-blue-300 transition-all duration-200 cursor-pointer">
                                    <TagIcon className="w-3 h-3" />
                                    {tag.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
                {/* Meta Info */}
                <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-4 text-sm text-gray-600 pt-4 border-t border-gray-100 pl-14">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2" title="Yaradılma tarixi">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            {formattedDate}
                        </span>
                        {question.categories && question.categories.length > 0 && (
                            <span className="flex items-center gap-2" title="Kateqoriyalar">
                                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                </div>
                                {question.categories.length} kateqoriya
                            </span>
                        )}
                    </div>

                    {question.readCount != null && (
                        <span className="flex items-center gap-2 text-gray-500" title="Oxunma sayı">
                            <Clock className="w-4 h-4" />
                            {question.readCount} oxunma
                        </span>
                    )}
                </div>
            </div>

            {/* Enhanced Action Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-t border-gray-100">
                <Link href={`/questions/${question.id}`}
                    className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold text-sm group transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1 -mx-2 -my-1">
                    <span>Tam cavabı oxu</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
            </div>
        </motion.div>
    );
});

// Modern Skeleton Loader
export function QuestionsSkeletonLoader({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                    <div className="p-5 md:p-6">
                        {/* Header with icon */}
                        <div className="flex items-start gap-4 mb-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                            <div className="flex-1">
                                <div className="h-6 bg-gray-200 rounded w-4/5 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3 mb-4 pl-14">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4 pl-14">
                            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                        </div>

                        {/* Meta */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 pl-14">
                            <div className="flex items-center gap-4">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-100">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Enhanced No Questions Found Component
export function NoQuestionsFound({ onReset, hasFilters }) {
    const { clearFilters } = useFilterStore();
    const [isResetting, setIsResetting] = useState(false);

    const handleReset = () => {
        if (isResetting) return;

        setIsResetting(true);
        clearFilters();

        if (typeof onReset === 'function') {
            setTimeout(() => {
                onReset();
                setIsResetting(false);
            }, 100);
        } else {
            setTimeout(() => {
                setIsResetting(false);
            }, 100);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                <Search className="w-16 h-16 text-blue-600" />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {hasFilters ? "Nəticə tapılmadı" : "Hələ sual yoxdur"}
            </h3>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                {hasFilters
                    ? "Seçdiyiniz filtrlərə uyğun heç bir sual tapılmadı. Axtarış şərtlərini dəyişməyi və ya filtrləri sıfırlamağı yoxlayın."
                    : "Görünür, hələ heç bir sual əlavə edilməyib. Zəhmət olmasa daha sonra təkrar yoxlayın və ya özünüz sual əlavə edin."}
            </p>

            {hasFilters ? (
                <button
                    onClick={handleReset}
                    disabled={isResetting}
                    className={`inline-flex items-center gap-3 px-8 py-4 border border-transparent text-base font-semibold rounded-xl shadow-lg text-white transition-all duration-300 transform hover:scale-105 ${isResetting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-xl"
                        }`}
                >
                    <RotateCcw className={`w-5 h-5 ${isResetting ? 'animate-spin' : ''}`} />
                    {isResetting ? 'Sıfırlanır...' : 'Filtrləri Sıfırla'}
                </button>
            ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105">
                        <MessageSquare className="w-5 h-5" />
                        Sual əlavə et
                    </button>

                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Yenilə
                    </button>
                </div>
            )}
        </div>
    );
}

// Use the common Pagination component
export const OptimizedPagination = memo(function QuestionsPagination({ currentPage, totalPages, onPageChange }) {
    return (
        <Pagination
            clientPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
        />
    );
});
