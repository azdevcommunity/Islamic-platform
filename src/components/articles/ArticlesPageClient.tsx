"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterProvider } from "@/components/common/Filter/FilterProvider";
import HttpClient from "@/util/HttpClient";
import useDebounce from "@/hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";
import ArticleCard from "@/components/articles/ArticleCard";
import Pagination from "@/components/common/Pagination";
import { RotateCcw, SearchX } from "lucide-react";
import useFilterStore from "@/store/useFilterStore";

interface ArticlesPageClientProps {
  initialPage?: string;
  initialCategory?: string;
}

export default function ArticlesPageClient({
  initialPage,
  initialCategory,
}: ArticlesPageClientProps) {
  // --- State Variables ---
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(parseInt(initialPage || "0") || 0);
  const [totalPages, setTotalPages] = useState(1);
  const [statistics, setStatistics] = useState({
    totalArticles: 0,
    totalCategories: 0,
    totalAuthors: 0,
    totalReadCount: 0,
  });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const initialCategoryLoadedRef = useRef(false);
  const PAGE_SIZE = 12;

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get filter state from Zustand store
  const { selectedCategories, selectedTags, searchQuery, setSelectedCategories } =
    useFilterStore();

  // Use debounce for search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // --- Data Fetching ---
  const fetchCategoryById = useCallback(async (categoryId: number) => {
    try {
      const response = await HttpClient.get(`/categories/${categoryId}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error("Error fetching category:", err);
      return null;
    }
  }, []);

  const fetchStatistics = useCallback(async () => {
    try {
      const response = await HttpClient.get("/articles/statistics");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setStatistics(data);
    } catch (err) {
      console.error("Error fetching statistics:", err);
      // Keep default values if API fails
    }
  }, []);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: PAGE_SIZE.toString(),
      });

      if (debouncedSearchQuery)
        params.set("searchQuery", debouncedSearchQuery);
      if (selectedCategories.length > 0)
        params.set(
          "categoryIds",
          selectedCategories.map((c) => c.id).join(",")
        );
      if (selectedTags.length > 0)
        params.set(
          "tagIds",
          selectedTags.map((t) => t.id).join(",")
        );

      const response = await HttpClient.get(`/articles?${params.toString()}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const content = data?.content || [];
      setArticles(content);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Məqalələr yüklənərkən xəta baş verdi.");
      setArticles([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearchQuery, selectedCategories, selectedTags]);

  // Fetch articles when relevant state changes
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Fetch statistics when component mounts
  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  // Handle initial category parameter from URL (only once on mount)
  useEffect(() => {
    if (initialCategory && !initialCategoryLoadedRef.current) {
      const categoryId = parseInt(initialCategory);
      if (categoryId && !isNaN(categoryId)) {
        fetchCategoryById(categoryId).then((category) => {
          if (category) {
            setSelectedCategories([category]);
            initialCategoryLoadedRef.current = true;
          }
        });
      }
    }
  }, [initialCategory, fetchCategoryById, setSelectedCategories]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategories.length > 0) {
      params.set("categoryId", selectedCategories[0].id.toString());
    }
    
    if (page > 0) {
      params.set("page", page.toString());
    }

    const newUrl = params.toString() ? `/articles?${params.toString()}` : "/articles";
    router.replace(newUrl, { scroll: false });
  }, [selectedCategories, page, router]);

  // Reset page when filters change
  useEffect(() => {
    if (page !== 0) {
      setPage(0);
    }
  }, [debouncedSearchQuery, selectedCategories, selectedTags]);

  // Pagination handler
  const paginate = useCallback(
    (newPage: number) => {
      const zeroIndexedPage = newPage - 1;
      if (zeroIndexedPage >= 0 && zeroIndexedPage < totalPages) {
        setPage(zeroIndexedPage);
        // Scroll to top of article list when changing pages
        document
          .getElementById("articles-list-start")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [totalPages]
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#12a19a] via-[#12a19a] to-[#0d8a84] overflow-hidden">
        {/* Background Pattern - Noktalar */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
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
              Məqalələr Arxivi
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                İlahi Hikmət və
                <span className="block text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text">
                  Maarifləndirici Yazılar
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                İslami elm və hikmətdən doğan məqalələrimizlə ruhunuzu
                zənginləşdirin və mənəvi inkişafınıza töhfə verin
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
            >
              {[
                { label: "Məqalələr", count: statistics.totalArticles || 0 },
                {
                  label: "Kateqoriyalar",
                  count: statistics.totalCategories || 0,
                },
                { label: "Müəlliflər", count: statistics.totalAuthors || 0 },
                {
                  label: "Oxunma",
                  count:
                    statistics.totalReadCount >= 1000
                      ? `${Math.floor(statistics.totalReadCount / 1000)}K+`
                      : statistics.totalReadCount || 0,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {stat.count}
                    </div>
                    <div className="text-sm text-white/70 mt-1">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Use FilterProvider component */}
          <FilterProvider
            searchPlaceholder="Məqalələr arasında axtar..."
            searchInputRef={searchInputRef}
          >
            {/* Articles List Area */}
            <div id="articles-list-start" className="mt-8">
              {error && (
                <div className="my-8 p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-center">
                  <div className="text-lg font-semibold mb-2">
                    Xəta baş verdi
                  </div>
                  <p>{error}</p>
                </div>
              )}

              {loading ? (
                <ArticlesSkeletonLoader count={PAGE_SIZE} />
              ) : articles.length > 0 ? (
                <>
                  {/* Results Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Məqalələr
                        </h2>
                        <p className="text-gray-600 mt-1">
                          {articles.length} nəticə tapıldı
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                      {articles.map((article: any, index: number) => (
                        <motion.div
                          key={article.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                          }}
                          className="animate-fadeInUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <ArticleCard
                            id={article.id}
                            title={article.title}
                            description={article.description}
                            image={article.image}
                            date={article.publishedAt}
                            authorImage={article.authorImage}
                            authorName={article.authorName}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-16">
                      <Pagination
                        clientPage={page + 1}
                        totalPages={totalPages}
                        onPageChange={paginate}
                      />
                    </div>
                  )}
                </>
              ) : (
                !error && (
                  <NoArticlesFound
                    hasFilters={
                      searchQuery ||
                      selectedCategories.length > 0 ||
                      selectedTags.length > 0
                    }
                  />
                )
              )}
            </div>
          </FilterProvider>
        </div>
      </section>
    </main>
  );
}

// Skeleton Loader for Articles
function ArticlesSkeletonLoader({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse"
        >
          <div className="aspect-[4/3] bg-gray-200"></div>
          <div className="p-6 space-y-4">
            {/* Date placeholder */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            {/* Title placeholder */}
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-4/5"></div>
            </div>
            {/* Description placeholder */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            {/* Author section placeholder */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function NoArticlesFound({ hasFilters }: { hasFilters: boolean }) {
  // Get clear filters function from Zustand store
  const { clearFilters } = useFilterStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-32 h-32 bg-gradient-to-br from-[#12a19a]/10 to-[#12a19a]/20 rounded-3xl flex items-center justify-center mb-8 shadow-lg">
        <SearchX size={64} className="text-[#12a19a]" />
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-4">
        Məqalə Tapılmadı
      </h3>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
        {hasFilters
          ? "Seçdiyiniz filtrlərə uyğun nəticə yoxdur. Filtrləri dəyişməyi və ya sıfırlamağı yoxlayın."
          : "Heç bir məqalə tapılmadı. Zəhmət olmasa daha sonra yenidən yoxlayın."}
      </p>
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#12a19a] to-[#0a6e6a] text-white font-semibold rounded-xl hover:from-[#0a6e6a] hover:to-[#085854] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <RotateCcw size={20} />
          Filtrləri Sıfırla
        </button>
      )}
    </motion.div>
  );
}
