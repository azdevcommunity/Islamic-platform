"use client"
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterProvider } from "@/components/common/Filter/FilterProvider";
import HttpClient from "@/util/HttpClient";
import ModernQuestionsHeader from "./ModernQuestionsHeader";
import {
    ModernQuestionsGrid,
    ModernQuestionsList,
    ModernQuestionsSkeletonLoader
} from "./ModernQuestionsList";
import { NoQuestionsFound, OptimizedPagination } from "./QuestionComponents";

export default function ModernQuestionsPage() {
    // State Management
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [layout, setLayout] = useState("grid");
    const [sortBy, setSortBy] = useState("date");
    const [searchQuery, setSearchQuery] = useState("");
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
                maxResult: layout === "grid" ? "8" : "6",
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
    }, [filters.searchQuery, filters.categories, filters.tags, isFiltersInitialized, sortBy]);

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
        setPage(0); // Reset to first page when changing layout
    };

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
        setPage(0); // Reset to first page when changing sort
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setFilters(prev => ({ ...prev, searchQuery: query }));
    };

    const paginate = useCallback((newPage) => {
        const zeroIndexedPage = newPage - 1;
        if (zeroIndexedPage >= 0 && zeroIndexedPage < totalPages) {
            setPage(zeroIndexedPage);
            // Smooth scroll to top of questions list
            document.getElementById('questions-content')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [totalPages]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#43b365] via-[#2d7a47] to-[#1e5a32] overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                <div className="container mx-auto px-4 max-w-7xl relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-8"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 font-medium"
                        >
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            İslami Elm və Hikmət Mərkəzi
                        </motion.div>

                        {/* Main Title */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Sual və Cavablar
                                <span className="block text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text">
                                    Platforması
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                                Dini məsələlər haqqında suallarınızın cavablarını tapın və İslami elm dünyasına qoşulun
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
                        >
                            {[
                                { label: "Aktiv Suallar", count: questions.length || "200+" },
                                { label: "Kateqoriyalar", count: "15+" },
                                { label: "Cavablar", count: "180+" },
                                { label: "Oxunma", count: "10K+" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                                >
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">{stat.count}</div>
                                        <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            </section>

            {/* Main Content */}
            <section id="questions-content" className="py-12 md:py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Filter Provider */}
                    <FilterProvider
                        initialCategories={[]}
                        initialTags={[]}
                        initialSearchQuery=""
                        onFiltersChange={handleFiltersChange}
                        searchPlaceholder="Suallar arasında axtar...333"
                        showSearch={false}
                    >
                        {/* Modern Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <ModernQuestionsHeader
                                questionsCount={questions.length}
                                onLayoutChange={handleLayoutChange}
                                currentLayout={layout}
                                onSortChange={handleSortChange}
                                currentSort={sortBy}
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
                                    className="my-8 p-8 bg-red-50 border border-red-200 text-red-700 rounded-3xl text-center"
                                >
                                    <div className="text-xl font-semibold mb-2">Xəta baş verdi</div>
                                    <p className="text-lg">{error}</p>
                                </motion.div>
                            )}

                            {loading ? (
                                <ModernQuestionsSkeletonLoader
                                    count={layout === "grid" ? 8 : 6}
                                    layout={layout}
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
                                        <ModernQuestionsGrid questions={questions} />
                                    ) : (
                                        <ModernQuestionsList questions={questions} />
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