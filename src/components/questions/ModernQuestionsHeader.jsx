"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Grid3X3,
    List,
    SortAsc,
    SortDesc,
    Calendar,
    Eye,
    MessageCircle,
    Sparkles,
    TrendingUp
} from "lucide-react";

export default function ModernQuestionsHeader({ 
    questionsCount = 0, 
    onLayoutChange, 
    currentLayout = "grid",
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

    const layoutOptions = [
        { value: "grid", label: "Grid", icon: Grid3X3 },
        { value: "list", label: "List", icon: List }
    ];

    return (
        <div className="relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl opacity-60"></div>
            
            {/* Main Header */}
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl shadow-lg p-8">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                    {/* Title & Stats */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Sual və Cavablar</h1>
                                <p className="text-gray-600">İslami elm və hikmət mərkəzi</p>
                            </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Sparkles className="w-4 h-4 text-blue-500" />
                                <span className="font-semibold text-gray-900">{questionsCount}</span>
                                <span>sual tapıldı</span>
                            </div>
                            <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span>Aktiv məzmun</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Sual Ver
                        </motion.button>
                    </div>
                </div>

                {/* Search & Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    {/* Search Bar */}
                    <div className="lg:col-span-6 relative">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Suallar arasında axtar..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange?.(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="lg:col-span-3">
                        <select
                            value={currentSort}
                            onChange={(e) => onSortChange?.(e.target.value)}
                            className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 appearance-none cursor-pointer"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Layout Toggle */}
                    <div className="lg:col-span-2">
                        <div className="flex bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-1">
                            {layoutOptions.map(option => {
                                const Icon = option.icon;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => onLayoutChange?.(option.value)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl transition-all duration-300 ${
                                            currentLayout === option.value
                                                ? "bg-blue-600 text-white shadow-lg"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="hidden sm:inline text-sm font-medium">{option.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filter Button */}
                    <div className="lg:col-span-1">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`w-full flex items-center justify-center px-4 py-4 rounded-2xl border transition-all duration-300 ${
                                isFilterOpen
                                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                                    : "bg-white/80 backdrop-blur-sm text-gray-600 border-gray-200/50 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                            <Filter className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                {/* Filter Panel */}
                {isFilterOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-gray-200/50"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Categories Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Kateqoriyalar
                                </label>
                                <select className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                                    <option>Bütün kateqoriyalar</option>
                                    <option>İslam eliqadı və hüquq</option>
                                    <option>İslam etikası</option>
                                    <option>Videolar</option>
                                </select>
                            </div>

                            {/* Tags Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Etiketlər
                                </label>
                                <select className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                                    <option>Bütün etiketlər</option>
                                    <option>etiketi</option>
                                </select>
                            </div>

                            {/* Date Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tarix aralığı
                                </label>
                                <select className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
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
        </div>
    );
}