"use client"
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterProvider } from "@/components/common/Filter/FilterProvider";
import HttpClient from "@/util/HttpClient";
import { 
    Calendar, 
    Eye, 
    MessageCircle, 
    Tag, 
    BookOpen, 
    ArrowUpRight,
    Search,
    Filter,
    Grid3X3,
    List
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/util/DateUtil";
import { NoQuestionsFound, OptimizedPagination } from "./QuestionComponents";

// Question List Item (for list view)
const QuestionListItem = ({ question, index }) => {
    const formattedDate = formatDate(question.createdDate);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:border-blue-300"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    {/* Question Title */}
                    <Link href={`/questions/${question.id}`} className="group">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                            {question.question}
                        </h3>
                    </Link>
                    
                    {/* Answer Preview */}
                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {question.answer?.length > 120 
                            ? question.answer.substring(0, 120) + "..." 
                            : question.answer || "Cavab mövcud deyil."}
                    </p>
                    
                    {/* Categories and Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {question.categories?.slice(0, 2).map(category => (
                            <span 
                                key={category.id}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-md"
                            >
                                <BookOpen className="w-3 h-3" />
                                {category.name}
                            </span>
                        ))}
                        {question.tags?.slice(0, 3).map(tag => (
                            <span 
                                key={tag.id}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                            >
                                <Tag className="w-3 h-3" />
                                {tag.name}
                            </span>
                        ))}
                    </div>
                    
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formattedDate}
                        </span>
                        {question.readCount != null && (
                            <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {question.readCount} oxunma
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Read More Button */}
                <Link 
                    href={`/questions/${question.id}`}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                    <span>Oxu</span>
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
};

// Question Grid Item (for grid view)
const QuestionGridItem = ({ question, index }) => {
    const formattedDate = formatDate(question.createdDate);
    const answerPreview = question.answer?.length > 80 
        ? question.answer.substring(0, 80) + "..." 
        : question.answer || "Cavab mövcud deyil.";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-blue-300 h-[320px] flex flex-col"
        >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <Link href={`/questions/${question.id}`} className="group">
                        <h3 className="text-base font-semibold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 h-[3rem] overflow-hidden">
                            {question.question}
                        </h3>
                    </Link>
                </div>
            </div>

            {/* Answer Preview */}
            <div className="mb-3 flex-1">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                            <Eye className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Cavab</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-4 flex-1">
                        {answerPreview}
                    </p>
                </div>
            </div>

            {/* Categories */}
            <div className="mb-3">
                {question.categories && question.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {question.categories.slice(0, 2).map(category => (
                            <span 
                                key={category.id}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
                            >
                                <BookOpen className="w-2.5 h-2.5" />
                                {category.name}
                            </span>
                        ))}
                        {question.categories.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md">
                                +{question.categories.length - 2}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formattedDate}
                    </span>
                    {question.readCount != null && (
                        <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {question.readCount}
                        </span>
                    )}
                </div>

                <Link 
                    href={`/questions/${question.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors duration-200"
                >
                    <span>Oxu</span>
                    <ArrowUpRight className="w-3 h-3" />
                </Link>
            </div>
        </motion.div>
    );
};

// Header Component with Layout Toggle
const QuestionsHeader = ({ questionsCount, onSortChange, currentSort, searchQuery, onSearchChange, layout, onLayoutChange }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Sual və Cavablar</h2>
                    <p className="text-gray-600">{questionsCount} sual tapıldı</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Suallar arasında axtar...1212"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                        />
                    </div>
                    
                    {/* Layout Toggle */}
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => onLayoutChange('list')}
                            className={`px-3 py-2 flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                                layout === 'list' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <List className="w-4 h-4" />
                            List
                        </button>
                        <button
                            onClick={() => onLayoutChange('grid')}
                            className={`px-3 py-2 flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                                layout === 'grid' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <Grid3X3 className="w-4 h-4" />
                            Grid
                        </button>
                    </div>
                    
                    {/* Sort */}
                    <select
                        value={currentSort}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="date">Tarixə görə</option>
                        <option value="views">Baxışa görə</option>
                        <option value="popular">Populyarlığa görə</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

// Skeleton Loaders
const QuestionsSkeletonLoader = ({ count = 6, layout = "list" }) => {
    const skeletonItems = Array.from({ length: count }).map((_, index) => (
        <div key={index} className={layout === 'grid' 
            ? "bg-white border border-gray-200 rounded-lg p-4 animate-pulse h-[320px] flex flex-col"
            : "bg-white border border-gray-200 rounded-lg p-6 animate-pulse"
        }>
            {layout === 'grid' ? (
                <>
                    <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-4/5 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 flex-1">
                        <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                </>
            ) : (
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                        <div className="flex gap-2 mb-3">
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-20"></div>
                </div>
            )}
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
        <div className="space-y-4">
            {skeletonItems}
        </div>
    );
};

export default function QuestionsPage() {
    // State Management
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("date");
    const [searchQuery, setSearchQuery] = useState("");
    const [layout, setLayout] = useState("list"); // New layout state
    const [filters, setFilters] = useState({
        categories: [],
        tags: [],
        searchQuery: ""
    });
    const [isFiltersInitialized, setIsFiltersInitialized] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Data Fetching
    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: page.toString(),
                maxResult: layout === 'grid' ? "12" : "10", // More items for grid
                containsTag: '1',
                containsCategory: '1',
            });

            if (filters.searchQuery) params.set('searchQuery', filters.searchQuery);
            if (filters.categories.length > 0) params.set('categoryIds', filters.categories.map(c => c.id).join(','));
            if (filters.tags.length > 0) params.set('tagIds', filters.tags.map(t => t.id).join(','));

            // Add sorting
            switch (sortBy) {
                case "views":
                    params.set('sortBy', 'viewCount');
                    params.set('sortDirection', 'desc');
                    break;
                case "popular":
                    params.set('sortBy', 'popular');
                    params.set('sortDirection', 'desc');
                    break;
                default:
                    params.set('sortBy', 'createdDate');
                    params.set('sortDirection', 'desc');
            }

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
        } catch (err) {
            console.error("Error fetching questions:", err);
            setError("Suallar yüklənərkən xəta baş verdi.");
            setQuestions([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page, filters.searchQuery, filters.categories, filters.tags, sortBy, layout]);

    // Effects
    useEffect(() => {
        if (isFiltersInitialized) {
            fetchQuestions();
        }
    }, [fetchQuestions, isFiltersInitialized]);

    useEffect(() => {
        if (isFiltersInitialized) {
            setPage(0);
        }
    }, [filters.searchQuery, filters.categories, filters.tags, isFiltersInitialized, sortBy, layout]);

    // Handlers
    const handleFiltersChange = useCallback((newFilters) => {
        if (!isFiltersInitialized) {
            setIsFiltersInitialized(true);
        }

        if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
            setFilters(newFilters);
        }
    }, [filters, isFiltersInitialized]);

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
        setPage(0);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setFilters(prev => ({ ...prev, searchQuery: query }));
    };

    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout);
        setPage(0);
    };

    const paginate = useCallback((newPage) => {
        const zeroIndexedPage = newPage - 1;
        if (zeroIndexedPage >= 0 && zeroIndexedPage < totalPages) {
            setPage(zeroIndexedPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [totalPages]);

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center text-white"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Sual və Cavablar
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Dini məsələlər haqqında suallarınızın cavablarını tapın
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <FilterProvider
                        initialCategories={[]}
                        initialTags={[]}
                        initialSearchQuery=""
                        onFiltersChange={handleFiltersChange}
                        searchPlaceholder="Suallar arasında axtar...555"
                        showSearch={false}
                    >
                        {/* Header */}
                        <QuestionsHeader
                            questionsCount={questions.length}
                            onSortChange={handleSortChange}
                            currentSort={sortBy}
                            searchQuery={searchQuery}
                            onSearchChange={handleSearchChange}
                            layout={layout}
                            onLayoutChange={handleLayoutChange}
                        />

                        {/* Content */}
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-center mb-6"
                                >
                                    <div className="font-semibold mb-1">Xəta baş verdi</div>
                                    <p className="text-sm">{error}</p>
                                </motion.div>
                            )}

                            {loading ? (
                                <QuestionsSkeletonLoader count={layout === 'grid' ? 12 : 10} layout={layout} />
                            ) : questions.length > 0 ? (
                                <motion.div
                                    key={`${layout}-${page}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {layout === 'grid' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {questions.map((question, index) => (
                                                <QuestionGridItem 
                                                    key={question.id} 
                                                    question={question} 
                                                    index={index}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {questions.map((question, index) => (
                                                <QuestionListItem 
                                                    key={question.id} 
                                                    question={question} 
                                                    index={index}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.2 }}
                                            className="mt-8"
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
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                    >
                                        <NoQuestionsFound
                                            onReset={() => {
                                                setFilters({ categories: [], tags: [], searchQuery: "" });
                                                setSearchQuery("");
                                            }}
                                            hasFilters={filters.searchQuery || filters.categories.length > 0 || filters.tags.length > 0}
                                        />
                                    </motion.div>
                                )
                            )}
                        </AnimatePresence>
                    </FilterProvider>
                </div>
            </section>
        </main>
    );
}


