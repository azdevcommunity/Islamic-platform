"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Clock, Eye, AlertCircle, ChevronDown, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

const MostReadArticlesClient = ({ articles, currentArticle }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const router = useRouter()

    // Manual refresh function - revalidates the page
    const handleRefresh = async () => {
        setIsRefreshing(true)
        try {
            // Trigger revalidation by refreshing the page
            router.refresh()
        } finally {
            setTimeout(() => setIsRefreshing(false), 1000) // Visual feedback
        }
    }

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return ""
        try {
            const date = new Date(dateString)
            const now = new Date()
            const diffTime = Math.abs(now - date)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

            if (diffDays <= 7) {
                if (diffDays === 0) return "Bugün"
                if (diffDays === 1) return "Dünən"
                return `${diffDays} gün əvvəl`
            } else {
                return new Intl.DateTimeFormat("az-AZ", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }).format(date)
            }
        } catch (e) {
            console.error("Error formatting date:", e)
            return "Tarix xətası"
        }
    }

    // Estimate read time function
    const getReadTime = (content) => {
        if (!content) return "≈ 3 dəq"
        const wordsPerMinute = 200
        const wordCount = content?.trim().split(/\s+/).length || 0
        const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
        return `≈ ${readTime} dəq`
    }

    // Animation variants
    const contentVariants = {
        collapsed: { opacity: 0, height: 0, marginTop: 0 },
        open: { opacity: 1, height: "auto", marginTop: "1rem" }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
            {/* Collapsible Header */}
            <div className="flex items-center justify-between w-full bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 px-4 text-white">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 hover:bg-emerald-700/30 rounded px-2 py-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2"
                    aria-expanded={isOpen}
                    aria-controls="most-read-content"
                >
                    <TrendingUp size={20} className="text-emerald-100" />
                    <h2 className="font-semibold text-base">Ən Çox Oxunanlar</h2>
                </button>
                
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleRefresh}
                        className="p-1 hover:bg-emerald-700 rounded transition-colors"
                        title="Yenilə"
                        disabled={isRefreshing}
                    >
                        <RefreshCw size={14} className={`text-emerald-100 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                    
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1 hover:bg-emerald-700 rounded transition-colors"
                        aria-expanded={isOpen}
                        aria-controls="most-read-content"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 0 : -180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown size={20} className="text-emerald-100" />
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Collapsible Content Area */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id="most-read-content"
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={contentVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        {articles.length > 0 ? (
                            <ArticleList 
                                articles={articles} 
                                formatDate={formatDate} 
                                getReadTime={getReadTime} 
                            />
                        ) : (
                            <EmptyState />
                        )}

                        {/* "View All" Link */}
                        {articles.length > 0 && (
                            <div className="p-3 pt-0 mt-2 bg-white">
                                <Link
                                    href="/articles"
                                    className="text-sm text-center block text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                                >
                                    Bütün məqalələrə bax
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Loading skeleton component (exported for server component)
export const LoadingSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-3 px-4">
            <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-100" />
                <span className="font-semibold text-base text-white">Ən Çox Oxunanlar</span>
            </div>
        </div>
        <div className="px-4 pb-4 space-y-4 mt-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 animate-pulse pt-4">
                    <div className="bg-gray-200 rounded-md w-20 h-20 flex-shrink-0"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                        <div className="flex gap-4 mt-2">
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                            <div className="h-3 bg-gray-200 rounded w-12"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

const ErrorDisplay = ({ error }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 text-center"
    >
        <AlertCircle className="mx-auto mb-2 text-red-500" size={32} />
        <p className="text-red-600 text-sm font-medium">{error}</p>
        <p className="text-gray-500 text-xs mt-1">Zəhmət olmasa bir az sonra yenidən cəhd edin.</p>
    </motion.div>
)

const EmptyState = () => (
    <div className="p-6 text-center text-gray-500">
        <Eye size={24} className="mx-auto mb-2 text-gray-400" />
        <p className="text-sm">Oxunan məqalə tapılmadı.</p>
    </div>
)

const ArticleList = ({ articles, formatDate, getReadTime }) => (
    <div className="divide-y divide-gray-100 px-1">
        {articles.map((item, index) => (
            <motion.div
                key={item.id || index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.07 }}
                className="relative group"
            >
                <Link
                    href={`/articles/${item.id}`}
                    className="block p-4 hover:bg-emerald-50/50 transition-colors duration-150 rounded-lg"
                >
                    <div className="flex gap-4 items-start">
                        {/* Image and Read Time Badge */}
                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                            <Image
                                src={item.image || "/placeholder.svg?height=80&width=80"}
                                alt={item.title || "Məqalə şəkli"}
                                fill
                                sizes="80px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-1 py-0.5">
                                <span className="text-[10px] text-white flex items-center justify-center font-medium">
                                    <Clock size={10} className="mr-0.5 flex-shrink-0" />
                                    {getReadTime(item.content)}
                                </span>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-3 mb-1.5 leading-snug">
                                {item.title}
                            </h3>

                            {/* Metadata */}
                            <div className="flex items-center text-xs text-gray-500 gap-x-3 gap-y-1 flex-wrap mt-1">
                                <span className="flex items-center gap-1 whitespace-nowrap">
                                    <Clock size={12} className="text-gray-400 flex-shrink-0" />
                                    {formatDate(item.publishedAt)}
                                </span>

                                {item.viewCount != null && (
                                    <span className="flex items-center gap-1 whitespace-nowrap">
                                        <Eye size={12} className="text-gray-400 flex-shrink-0" />
                                        {new Intl.NumberFormat("az-AZ").format(item.viewCount)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
        ))}
    </div>
)

export default MostReadArticlesClient