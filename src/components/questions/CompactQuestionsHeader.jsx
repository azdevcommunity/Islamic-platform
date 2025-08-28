"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Calendar,
    Eye,
    MessageCircle,
    TrendingUp,
    Plus
} from "lucide-react";

export default function CompactQuestionsHeader({ 
    questionsCount = 0, 
    onSortChange,
    currentSort = "date",
    searchQuery = "",
    onSearchChange
}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const sortOptions = [
        { value: "date", label: "Tarixə görə", icon: Calendar },
        { value: "views", label: "Oxunmaya görə", icon: Eye },
        { value: "popular", label: "Populyarlığa görə", icon: TrendingUp }
    ];



    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            {/* Top Section - Compact */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                {/* Title & Stats - Compact */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                        <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Sual və Cavablar</h1>
                        <p className="text-sm text-gray-600">{questionsCount} nəticə</p>
                    </div>
                </div>

                {/* Quick Actions - Compact */}
                <div className="flex items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <Plus className="w-4 h-4" />
                        Sual Ver
                    </motion.button>
                </div>
            </div>

            {/* Search & Controls - Compact */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                {/* Search Bar - Compact */}
                <div className="lg:col-span-6 relative">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Suallar arasında axtar..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm text-gray-900 placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Sort Dropdown - Compact */}
                <div className="lg:col-span-3">
                    <select
                        value={currentSort}
                        onChange={(e) => onSortChange?.(e.target.value)}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm text-gray-900 appearance-none cursor-pointer"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>



                {/* Filter Button - Compact */}
                <div className="lg:col-span-1">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`w-full flex items-center justify-center px-3 py-2.5 rounded-lg border transition-all duration-200 ${
                            isFilterOpen
                                ? "bg-green-600 text-white border-green-600 shadow-sm"
                                : "bg-gray-50 text-gray-600 border-gray-200 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                    >
                        <Filter className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>

            {/* Filter Panel - Compact */}
            {isFilterOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Categories Filter - Compact */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Kateqoriyalar
                            </label>
                            <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm">
                                <option>Bütün kateqoriyalar</option>
                                <option>İslam eliqadı və hüquq</option>
                                <option>İslam etikası</option>
                                <option>Videolar</option>
                            </select>
                        </div>

                        {/* Tags Filter - Compact */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Etiketlər
                            </label>
                            <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm">
                                <option>Bütün etiketlər</option>
                                <option>etiketi</option>
                            </select>
                        </div>

                        {/* Date Filter - Compact */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Tarix aralığı
                            </label>
                            <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm">
                                <option>Bütün vaxtlar</option>
                                <option>Son həftə</option>
                                <option>Son ay</option>
                                <option>Son il</option>
                            </select>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}