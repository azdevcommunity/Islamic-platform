"use client"
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterProvider } from "@/components/common/Filter/FilterProvider";
import Pagination from "@/components/common/Pagination";
import HttpClient from "@/util/HttpClient";
import { Search, Grid, List } from "lucide-react";

// Sadə Question Card komponenti
const IslamicQuestionCard = ({ question }) => {
    return (
        <a
            href={`/questions/${question.id}`}
            className="group block bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 p-6"
        >
            <h3 className="text-lg font-semibold text-stone-900 group-hover:text-primary-700 mb-3 line-clamp-2 transition-colors">
                {question.question}
            </h3>
            <p className="text-sm text-stone-600 line-clamp-3 mb-4 leading-relaxed">
                {question.answer}
            </p>
            <div className="flex items-center justify-between text-xs text-stone-500">
                <div className="flex gap-2">
                    {question.categories?.slice(0, 2).map((cat) => (
                        <span key={cat.id} className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full">
                            {cat.name}
                        </span>
                    ))}
                </div>
                <span>{question.readCount} oxunma</span>
            </div>
        </a>
    );
};

export default function IslamicQuestionsPage() {
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
    const [statistics, setStatistics] = useState({
        totalQuestions: 0,
        totalCategories: 0,
        totalTags: 0,
        totalViewCount: 0
    });

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

    const fetchStatistics = useCallback(async () => {
        try {
            const response = await HttpClient.get('/questions/statistics');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setStatistics(data);
        } catch (err) {
            console.error("Error fetching statistics:", err);
            // Keep default values if API fails
        }
    }, []);


    useEffect(() => {
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
    }, [filters.searchQuery, filters.categories, filters.tags, isFiltersInitialized, sortBy]);

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

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
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
            document.getElementById('questions-content')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [totalPages]);

    return (
        <main style={{
             backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                        backgroundSize: '60px 60px'
        }} className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
            {/* Hero Section - İslami estetik */}
            <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 overflow-hidden">
                {/* Background Pattern - Noktalar */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                {/* İslami naxış */}
                <div className="absolute inset-0 bg-islamic-pattern opacity-10"></div>

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
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 font-medium border border-white/20"
                        >
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            İslami Elm və Hikmət Mərkəzi
                        </motion.div>

                        {/* Başlıq */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Sual və Cavablar
                                <span className="block text-accent-200 mt-2">
                                    Platforması
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                                Dini məsələlər haqqında suallarınızın cavablarını tapın və İslami elm dünyasına qoşulun
                            </p>
                        </div>

                        {/* Statistika */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
                        >
                            {[
                                { label: "Aktiv Suallar", count: statistics.totalQuestions },
                                { label: "Kateqoriyalar", count: statistics.totalCategories},
                                { label: "Teqlər", count: statistics.totalTags },
                                { label: "Oxunma", count: statistics.totalViewCount}
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
            </section>

            {/* Əsas Məzmun */}
            <section id="questions-content" className="py-12 md:py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <FilterProvider
                        initialCategories={[]}
                        initialTags={[]}
                        initialSearchQuery=""
                        onFiltersChange={handleFiltersChange}
                        searchPlaceholder="Suallar arasında axtar..."
                        showSearch={false}
                    >
                        {/* Axtarış və Filtr */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm"
                        >
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="flex-1 w-full">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                        <input
                                            type="text"
                                            placeholder="Suallar arasında axtar..."
                                            value={searchQuery}
                                            onChange={(e) => handleSearchChange(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleLayoutChange("grid")}
                                        className={`p-3 rounded-lg border transition-colors ${
                                            layout === "grid"
                                                ? "bg-primary-600 text-white border-primary-600"
                                                : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                                        }`}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleLayoutChange("list")}
                                        className={`p-3 rounded-lg border transition-colors ${
                                            layout === "list"
                                                ? "bg-primary-600 text-white border-primary-600"
                                                : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                                        }`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

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
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="bg-white rounded-2xl border border-stone-200 p-6 animate-pulse">
                                            <div className="h-6 bg-stone-200 rounded mb-3"></div>
                                            <div className="h-4 bg-stone-200 rounded mb-2"></div>
                                            <div className="h-4 bg-stone-200 rounded mb-4"></div>
                                            <div className="flex gap-2">
                                                <div className="h-6 w-16 bg-stone-200 rounded-full"></div>
                                                <div className="h-6 w-16 bg-stone-200 rounded-full"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : questions.length > 0 ? (
                                <motion.div
                                    key={`${layout}-${page}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className={layout === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                                        {questions.map((question) => (
                                            <IslamicQuestionCard key={question.id} question={question} />
                                        ))}
                                    </div>

                                    {totalPages > 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="mt-16"
                                        >
                                            <Pagination
                                                clientPage={page + 1}
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
                                        className="text-center py-16"
                                    >
                                        <div className="text-stone-600 text-lg font-medium mb-2">Sual tapılmadı</div>
                                        <p className="text-stone-500">Axtarış kriteriyalarını dəyişdirin</p>
                                        <button
                                            onClick={() => {
                                                setFilters({ categories: [], tags: [], searchQuery: "" });
                                                setSearchQuery("");
                                            }}
                                            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                        >
                                            Sıfırla
                                        </button>
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
