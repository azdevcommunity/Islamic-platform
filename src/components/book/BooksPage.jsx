"use client"
import React, {useState, useEffect, useCallback, useRef, memo} from "react";
import { FilterProvider } from "@/components/common/Filter/FilterProvider";
import useDebounce from "@/hooks/useDebounce";
import {formatDate} from "@/util/DateUtil";
import {motion} from "framer-motion";
import Link from "next/link";
import {
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    BookOpen,
    TagIcon,
    Search,
    RotateCcw,
    Star,
    ShoppingCart,
    Eye,
    MessageSquare
} from "lucide-react";
import {booksData} from "@/components/home/Books";

export default function BooksPage() {
    // --- State Variables ---
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        categories: [],
        tags: [],
        searchQuery: ""
    });
    const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const searchInputRef = useRef(null);

    // --- Data Fetching ---
    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const content = booksData;
            const pageInfo = {};

            // Transform the data as needed...
            setBooks(content.map((book) => ({
                id: book.id,
                title: book.title ?? "Kitab başlığı yoxdur",
                author: book.authorName ?? "Müəllif qeyd olunmayıb",
                description: book.description ?? "Təsvir yoxdur",
                image: book.image ?? "/images/placeholder_book.png",
                category: book.category ?? "Ümumi",
                price: book.price ?? "Pulsuz",
                contactPhone: book.contactPhone ?? "",
                chapters: book.chapters ?? [],
                createdDate: book.publishedDate || new Date().toISOString(),
                readCount: Math.floor(Math.random() * 100) + 10,
            })));
            setTotalPages(pageInfo.totalPages ?? 1);
        } catch (err) {
            console.error("Error fetching books:", err);
            setError("Kitablar yüklənərkən xəta baş verdi.");
            setBooks([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearchQuery, filters.categories, filters.tags]);

    // Fetch books when relevant state changes
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // Reset page when filters change
    useEffect(() => {
        if (page !== 0) {
            setPage(0);
        }
    }, [debouncedSearchQuery, filters.categories, filters.tags, page]);

    // Handle filter changes
    const handleFiltersChange = useCallback((newFilters) => {
        // Only update if the filters have actually changed
        if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
            setFilters(newFilters);
        }
    }, [filters]);

    // Pagination handler
    const paginate = useCallback((newPage) => {
        const zeroIndexedPage = newPage - 1;
        if (zeroIndexedPage >= 0 && zeroIndexedPage < totalPages) {
            setPage(zeroIndexedPage);
        }
    }, [totalPages]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            {/* Modern Hero Header */}
            <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>
                
                {/* Floating shapes */}
                <div className="absolute top-10 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 left-16 w-24 h-24 bg-emerald-300/20 rounded-full blur-lg animate-bounce"></div>
                
                <div className="relative container mx-auto px-4 py-16 md:py-24">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-emerald-100 text-sm font-medium mb-6">
                            <BookOpen className="w-4 h-4" />
                            <span>İslami Kitablar</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Mədrəsəmizin 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200 block sm:inline"> Kitabları</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-emerald-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Əhli Sünnə təlimlərinin əsasında hazırlanmış elmi və mənəvi qaynaqları kəşf edin. 
                            Hər səviyyədən oxucular üçün uyğun materiallar.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-6 text-emerald-200">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                <span className="text-sm font-medium">Elmi Məzmun</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5" />
                                <span className="text-sm font-medium">Keyfiyyətli Tərcümə</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                <span className="text-sm font-medium">Asan Anlaşılan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative -mt-16 z-10">
                <div className="container mx-auto px-4">
                    {/* Stats Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="group">
                                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{books.length}+</div>
                                <div className="text-sm text-gray-600">Kitab</div>
                            </div>
                            <div className="group">
                                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Star className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
                                <div className="text-sm text-gray-600">Kateqoriya</div>
                            </div>
                            <div className="group">
                                <div className="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Eye className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">1000+</div>
                                <div className="text-sm text-gray-600">Oxunma</div>
                            </div>
                            <div className="group">
                                <div className="w-16 h-16 bg-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <ShoppingCart className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">Əlçatan</div>
                                <div className="text-sm text-gray-600">Qiymət</div>
                            </div>
                        </div>
                    </div>

                    {/* Filter and Books Section */}
                    <FilterProvider
                        initialCategories={[]}
                        initialTags={[]}
                        initialSearchQuery=""
                        onFiltersChange={handleFiltersChange}
                        searchPlaceholder="Kitab adı və ya müəllif axtar..."
                        searchInputRef={searchInputRef}
                    >
                        <div id="books-list-start" className="mt-6">
                            {error && (
                                <div className="my-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                                    {error}
                                </div>
                            )}

                            {loading ? (
                                <BooksSkeletonLoader count={9} />
                            ) : books.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {books.map((book) => (
                                            <OptimizedBookCard key={book.id} book={book} />
                                        ))}
                                    </div>
                                    {totalPages > 1 && (
                                        <OptimizedPagination
                                            currentPage={page + 1}
                                            totalPages={totalPages}
                                            onPageChange={paginate}
                                        />
                                    )}
                                </>
                            ) : (
                                !error && (
                                    <NoBooksFound
                                        onReset={() => {
                                            // FilterProvider handles the reset internally
                                        }}
                                        hasFilters={filters.searchQuery || filters.categories.length > 0 || filters.tags.length > 0}
                                    />
                                )
                            )}
                        </div>
                    </FilterProvider>
                </div>
            </div>
        </div>
    );
}

// Modern Book Card Component
const OptimizedBookCard = memo(function BookCard({ book }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const formattedDate = formatDate(book.createdDate);

    const descriptionPreviewThreshold = 150;
    const collapsedHeight = "4.5rem";
    const descriptionText = book.description || "Təsvir mövcud deyil.";
    const needsExpansion = descriptionText.length > descriptionPreviewThreshold;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 20 }}
            className="group bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
            {/* Book Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                    src={book.image || "/images/placeholder_book.png"}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {book.price}
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                    {book.category}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white text-center">
                            <p className="text-sm mb-3 line-clamp-2">
                                {book.chapters?.length || 0} Fəsil • {book.category}
                            </p>
                            <button className="w-full bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg font-medium hover:bg-white/30 transition-colors duration-200">
                                Ətraflı Oxu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Book Content */}
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {book.title}
                </h2>
                
                <p className="text-emerald-600 font-medium mb-3">
                    {book.author}
                </p>
                
                {/* Description */}
                <div className="text-gray-600 text-sm leading-relaxed mb-4 relative">
                    <motion.div
                        initial={needsExpansion ? { height: collapsedHeight } : { height: "auto" }}
                        animate={{ height: isExpanded || !needsExpansion ? "auto" : collapsedHeight }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        {descriptionText}
                    </motion.div>

                    {!isExpanded && needsExpansion && (
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                    )}

                    {needsExpansion && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm mt-2 flex items-center focus:outline-none"
                            aria-expanded={isExpanded}
                        >
                            {isExpanded ? 'Daha az göstər' : 'Daha çox göstər'}
                            {isExpanded ? <ChevronUp className="ml-1 h-4 w-4"/> : <ChevronDown className="ml-1 h-4 w-4"/>}
                        </button>
                    )}
                </div>

                {/* Chapters Info */}
                {book.chapters && book.chapters.length > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <BookOpen className="w-4 h-4" />
                            <span>{book.chapters.length} Fəsil</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {book.chapters.slice(0, 2).map((chapter, index) => (
                                <span key={index} className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                    {chapter}
                                </span>
                            ))}
                            {book.chapters.length > 2 && (
                                <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                    +{book.chapters.length - 2} daha
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        {formattedDate}
                    </span>
                    <span className="flex items-center">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        {book.readCount} oxunma
                    </span>
                </div>
            </div>

            {/* Action Footer */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <Link 
                        href={`/books/${book.id}`} 
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center transition-colors"
                    >
                        Kitabı Oxu <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                    {book.contactPhone && (
                        <a 
                            href={`tel:${book.contactPhone}`}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Əlaqə
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
});

// Skeleton Loader
function BooksSkeletonLoader({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden animate-pulse">
                    <div className="aspect-[3/4] bg-gray-200"></div>
                    <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded w-4/5 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="space-y-2 mb-5">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-5">
                            <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                            <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// No Books Found Component
function NoBooksFound({ onReset, hasFilters }) {
    return (
        <div className="text-center py-20 px-6 bg-white rounded-2xl border border-gray-100 shadow-lg my-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 mb-6">
                <Search className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Heç bir kitab tapılmadı</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg leading-relaxed">
                {hasFilters
                    ? "Seçdiyiniz filtrlərə uyğun nəticə yoxdur. Filtrləri dəyişməyi və ya sıfırlamağı yoxlayın."
                    : "Görünür, hələ heç bir kitab əlavə edilməyib. Zəhmət olmasa daha sonra təkrar yoxlayın."}
            </p>
            {hasFilters && (
                <button
                    onClick={onReset}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                >
                    <RotateCcw size={20}/> Filtrləri Sıfırla
                </button>
            )}
        </div>
    );
}

// Pagination Component
const OptimizedPagination = memo(function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const maxPagesBeforeCurrent = Math.floor((maxVisiblePages - 1) / 2);
        const maxPagesAfterCurrent = Math.ceil((maxVisiblePages - 1) / 2);

        if (currentPage <= maxPagesBeforeCurrent) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrent;
            endPage = currentPage + maxPagesAfterCurrent;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const showFirstEllipsis = startPage > 2;
    const showLastEllipsis = endPage < totalPages - 1;

    return (
        <div aria-label="Səhifələmə" className="mt-12 flex justify-center items-center space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center transition-colors ${
                    currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
                }`}
                aria-label="Əvvəlki səhifə"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            {startPage > 1 && (
                <button
                    onClick={() => onPageChange(1)}
                    className="px-4 py-3 rounded-xl text-sm font-medium min-w-[44px] transition-colors bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
                >
                    1
                </button>
            )}

            {showFirstEllipsis && (
                <span className="px-2 py-3 text-sm font-medium text-gray-500">...</span>
            )}

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium min-w-[44px] transition-colors border shadow-sm ${
                        currentPage === page
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
                    }`}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {showLastEllipsis && (
                <span className="px-2 py-3 text-sm font-medium text-gray-500">...</span>
            )}

            {endPage < totalPages && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    className="px-4 py-3 rounded-xl text-sm font-medium min-w-[44px] transition-colors bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
                >
                    {totalPages}
                </button>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center transition-colors ${
                    currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
                }`}
                aria-label="Növbəti səhifə"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
});