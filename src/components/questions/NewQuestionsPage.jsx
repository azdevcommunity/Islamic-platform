"use client"
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterProvider } from "@/components/common/Filter/FilterProvider";
import HttpClient from "@/util/HttpClient";
import {
    Search,
    Grid3X3,
    List,
    Calendar,
    Eye,
    MessageCircle,
    Tag,
    BookOpen,
    ArrowRight,
    TrendingUp,
    X,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/util/DateUtil";
import { OptimizedPagination } from "./QuestionComponents";

// Modern Question Card Component
const ModernQuestionCard = ({ question, index, layout }) => {
    const formattedDate = formatDate(question.createdDate);
    const answerPreview = question.answer?.length > 120
        ? question.answer.substring(0, 120) + "..."
        : question.answer || "Cavab mövcud deyil.";

    if (layout === 'list') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
                <div className="p-8">
                    <div className="flex items-start gap-6">
                        {/* Question Icon */}
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <MessageCircle className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                            {/* Question Title */}
                            <Link href={`/questions/${question.id}`} className="block group/link">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover/link:text-green-600 transition-colors duration-200 line-clamp-2 leading-tight">
                                    {question.question}
                                </h3>
                            </Link>

                            {/* Answer Preview */}
                            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-700">Cavab</span>
                                </div>
                                <p className="text-gray-600 leading-relaxed line-clamp-3">
                                    {answerPreview}
                                </p>
                            </div>

                            {/* Categories and Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {question.categories?.slice(0, 2).map(category => (
                                    <span
                                        key={category.id}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg hover:bg-green-100 transition-colors duration-200"
                                    >
                                        <BookOpen className="w-3.5 h-3.5" />
                                        {category.name}
                                    </span>
                                ))}
                                {question.tags?.slice(0, 3).map(tag => (
                                    <span
                                        key={tag.id}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                    >
                                        <Tag className="w-3.5 h-3.5" />
                                        {tag.name}
                                    </span>
                                ))}
                            </div>

                            {/* Meta Information */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        {formattedDate}
                                    </span>
                                    {question.readCount != null && (
                                        <span className="flex items-center gap-1.5">
                                            <Eye className="w-4 h-4" />
                                            {question.readCount} oxunma
                                        </span>
                                    )}
                                </div>

                                <Link
                                    href={`/questions/${question.id}`}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-medium rounded-xl transition-all duration-200 group/btn"
                                >
                                    <span>Oxu</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Grid Layout
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-lg sm:rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 overflow-hidden min-h-[420px] flex flex-col"
        >
            {/* Header */}
            <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <Link href={`/questions/${question.id}`} className="group/link">
                            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover/link:text-green-600 transition-colors duration-200 line-clamp-3 min-h-[3.5rem] break-words">
                                {question.question}
                            </h3>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Answer Preview */}
            <div className="px-4 sm:px-6 pb-3 sm:pb-4 flex-1">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700">Cavab</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 flex-1">
                        {answerPreview}
                    </p>
                </div>
            </div>

            {/* Categories */}
            <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                <div className="flex flex-wrap gap-2">
                    {question.categories?.slice(0, 2).map(category => (
                        <span
                            key={category.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg"
                        >
                            <BookOpen className="w-3 h-3" />
                            {category.name}
                        </span>
                    ))}
                    {question.categories?.length > 2 && (
                        <span className="inline-flex items-center px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg">
                            +{question.categories.length - 2}
                        </span>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 mt-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formattedDate}
                        </span>
                        {question.readCount != null && (
                            <span className="flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5" />
                                {question.readCount}
                            </span>
                        )}
                    </div>

                    <Link
                        href={`/questions/${question.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs font-medium rounded-lg transition-all duration-200 group/btn"
                    >
                        <span>Oxu</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

// Modern Header Component
const ModernHeader = ({
    questionsCount,
    layout,
    onLayoutChange,
    searchQuery,
    onSearchChange
}) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <div className="bg-white rounded-lg sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-8 mb-4 sm:mb-8 mx-1 sm:mx-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left Section */}
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Sual və Cavablar</h2>
                    </div>
                    <p className="text-gray-600 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-lg">
                            <TrendingUp className="w-4 h-4" />
                            {questionsCount} sual
                        </span>
                        <span className="text-sm">mövcuddur</span>
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>

                        <input
                            type="text"
                            placeholder={"Suallar arasında axtar..."}
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-12 pr-4 py-3 w-full sm:w-80 rounded-xl border border-gray-300 bg-white text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                        />

                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <X className="w-4 h-4"/>
                            </button>
                        )}
                    </div>

                    {/* Layout Toggle */}
                    <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                        <button
                            onClick={() => onLayoutChange('list')}
                            className={`px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-200 ${layout === 'list'
                                ? 'bg-green-600 text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                            }`}
                        >
                            <List className="w-4 h-4"/>
                            <span className="hidden sm:inline">List</span>
                        </button>
                        <button
                            onClick={() => onLayoutChange('grid')}
                            className={`px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-200 ${layout === 'grid'
                                ? 'bg-green-600 text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                            }`}
                        >
                            <Grid3X3 className="w-4 h-4"/>
                            <span className="hidden sm:inline">Grid</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Skeleton Loader
const SkeletonLoader = ({ layout, count = 6 }) => {
    const skeletonItems = Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`bg-white rounded-lg sm:rounded-2xl border border-gray-100 animate-pulse ${layout === 'grid' ? 'min-h-[420px] flex flex-col' : ''
            }`}>
            {layout === 'grid' ? (
                <>
                    <div className="p-6 pb-4">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pb-4 flex-1">
                        <div className="bg-gray-50 rounded-xl p-4 h-full">
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 mt-auto">
                        <div className="flex justify-between items-center">
                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                            <div className="h-8 bg-gray-200 rounded w-16"></div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="p-8">
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                        <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-6 bg-gray-200 rounded w-20"></div>
                                <div className="h-6 bg-gray-200 rounded w-16"></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-4">
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                </div>
                                <div className="h-10 bg-gray-200 rounded w-20"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ));

    if (layout === 'grid') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
                {skeletonItems}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {skeletonItems}
        </div>
    );
};

// No Results Component
const NoResults = ({ onReset, hasFilters }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
    >
        <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {hasFilters ? 'Heç bir nəticə tapılmadı' : 'Hələ sual yoxdur'}
            </h3>
            <p className="text-gray-600 mb-6">
                {hasFilters
                    ? 'Axtarış kriteriyalarınızı dəyişdirməyi cəhd edin'
                    : 'Tezliklə suallar əlavə ediləcək'
                }
            </p>
            {hasFilters && (
                <button
                    onClick={onReset}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors duration-200"
                >
                    <X className="w-4 h-4" />
                    Filterləri təmizlə
                </button>
            )}
        </div>
    </motion.div>
);

export default function NewQuestionsPage() {
    // State Management
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [layout, setLayout] = useState("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        categories: [],
        tags: [],
        searchQuery: ""
    });
    const [isFiltersInitialized, setIsFiltersInitialized] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(1);
    const [statistics, setStatistics] = useState({
        totalQuestions: 0,
        totalCategories: 0,
        totalTags: 0,
        totalViewCount: 0
    });

    // Data Fetching
    const fetchStatistics = useCallback(async () => {
        try {
            const response = await HttpClient.get('/questions/statistics');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            setStatistics({
                totalQuestions: data.totalQuestions || 0,
                totalCategories: data.totalCategories || 0,
                totalTags: data.totalTags || 0,
                totalViewCount: data.totalViewCount || 0
            });
        } catch (err) {
            console.error("Error fetching statistics:", err);
            // Keep default values if API fails
        }
    }, []);

    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: page.toString(),
                maxResult: layout === "list" ? "6" : "9",
                containsTag: '1',
                containsCategory: '1',
            });

            if (filters.searchQuery) params.set('searchQuery', filters.searchQuery);
            if (filters.categories.length > 0) params.set('categoryIds', filters.categories.map(c => c.id).join(','));
            if (filters.tags.length > 0) params.set('tagIds', filters.tags.map(t => t.id).join(','));

            // Default sorting by date
            params.set('sortBy', 'createdDate');
            params.set('sortDirection', 'desc');

            const response = await HttpClient.get(`/questions?${params.toString()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            const content = data?.content || [];
            const pageInfo = data?.page || {};

            setQuestions(content.map((q) => ({
                id: q.id,
                question: q.question ?? "Sual başlığı yoxdur",
                answer: q.answer ?? "Cavab yoxdur",
                categories: Array.isArray(q.categories) ? q.categories.map(c => ({ id: c.id, name: c.name })) : [],
                tags: Array.isArray(q.tags) ? q.tags.map(t => ({ id: t.id, name: t.name })) : [],
                createdDate: q.createdDate || new Date().toISOString(),
                readCount: q.viewCount ?? Math.floor(Math.random() * 100) + 10,
            })));
            setTotalPages(pageInfo.totalPages ?? 1);
            setTotalElements(pageInfo.totalElements ?? 1);
        } catch (err) {
            console.error("Error fetching questions:", err);
            setError("Suallar yüklənərkən xəta baş verdi.");
            setQuestions([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page, filters.searchQuery, filters.categories, filters.tags, layout]);

    // Effects
    useEffect(() => {
        // Fetch statistics on component mount
        fetchStatistics();
    }, [fetchStatistics]);

    useEffect(() => {
        if (isFiltersInitialized) {
            fetchQuestions();
        }
    }, [fetchQuestions, isFiltersInitialized]);

    useEffect(() => {
        if (isFiltersInitialized) {
            setPage(0);
        }
    }, [filters.searchQuery, filters.categories, filters.tags, isFiltersInitialized, layout]);

    // Handlers
    const handleFiltersChange = useCallback((newFilters) => {
        if (!isFiltersInitialized) {
            setIsFiltersInitialized(true);
        }

        if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
            setFilters(newFilters);
        }
    }, [filters, isFiltersInitialized]);

    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout);
        setPage(0);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setFilters(prev => ({ ...prev, searchQuery: query }));
    };

    const paginate = useCallback((newPage) => {
        const zeroIndexedPage = newPage - 1;
        if (zeroIndexedPage >= 0 && zeroIndexedPage < totalPages) {
            setPage(zeroIndexedPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [totalPages]);

    const resetFilters = () => {
        setFilters({ categories: [], tags: [], searchQuery: "" });
        setSearchQuery("");
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#43b365] via-[#2d7a47] to-[#1e5a32] overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                <div className="container mx-auto px-4 max-w-7xl relative">
                    <div className="text-center space-y-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 font-medium text-sm"
                        >
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            Sual və Cavablar Arxivi
                        </motion.div>

                        {/* Main Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Dini Suallar və
                                <span className="block text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text">
                                    Mütəxəssis Cavabları
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                                İslami elm və hikmətdən doğan suallarınızın cavablarını tapın və mənəvi inkişafınıza töhfə verin
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
                        >
                            {[
                                { label: "Suallar", count: statistics.totalQuestions },
                                { label: "Kateqoriyalar", count: statistics.totalCategories },
                                { label: "Teqlər", count: statistics.totalTags }, // Assuming answered questions = total questions
                                { label: "Oxunma", count: statistics.totalViewCount > 1000 ? `${Math.floor(statistics.totalViewCount / 1000)}K+` : `${statistics.totalViewCount}+` }
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                                >
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-white">{stat.count}</div>
                                        <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="w-full sm:container sm:mx-auto px-1 sm:px-4 sm:max-w-7xl">
                    <FilterProvider
                        initialCategories={[]}
                        initialTags={[]}
                        initialSearchQuery=""
                        onFiltersChange={handleFiltersChange}
                        searchPlaceholder="Suallar arasında axtar...444"
                        showSearch={false}
                    >
                        {/* Modern Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <ModernHeader
                                questionsCount={totalElements}
                                layout={layout}
                                onLayoutChange={handleLayoutChange}
                                searchQuery={searchQuery}
                                onSearchChange={handleSearchChange}
                            />
                        </motion.div>
                        {/* Content Area */}
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="my-8 p-8 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-center"
                                >
                                    <div className="text-xl font-semibold mb-2">Xəta baş verdi</div>
                                    <p className="text-lg">{error}</p>
                                </motion.div>
                            )}

                            {loading ? (
                                <SkeletonLoader
                                    layout={layout}
                                    count={layout === "grid" ? 9 : 6}
                                />
                            ) : questions.length > 0 ? (
                                <motion.div
                                    key={`${layout}-${page}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {layout === "grid" ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
                                            {questions.map((question, index) => (
                                                <ModernQuestionCard
                                                    key={question.id}
                                                    question={question}
                                                    index={index}
                                                    layout={layout}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {questions.map((question, index) => (
                                                <ModernQuestionCard
                                                    key={question.id}
                                                    question={question}
                                                    index={index}
                                                    layout={layout}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="mt-16"
                                        >
                                            <OptimizedPagination
                                                currentPage={page + 1}
                                                totalPages={totalPages}
                                                onPageChange={paginate}
                                            />
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                !error && (
                                    <NoResults
                                        onReset={resetFilters}
                                        hasFilters={filters.searchQuery || filters.categories.length > 0 || filters.tags.length > 0}
                                    />
                                )
                            )}
                        </AnimatePresence>
                    </FilterProvider>
                </div>
            </section>
        </main>
    );
}
