"use client";
import { motion } from "framer-motion";
import { FaPlay, FaVideo, FaList, FaClock, FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import HttpClient from "@/util/HttpClient";

const VideoPageHeader = () => {
    const [stats, setStats] = useState({
        videoCount: 500,
        viewCount: 100000,
        playlistCount: 50,
        subscriberCount: 1000
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await HttpClient.get('/videos/statistics');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching video statistics:', error);
                // Keep default values if API fails
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Format numbers for display
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    };
    return (
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
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
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Video Kitabxana
                    </motion.div>

                    {/* Main Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            İslami Video
                            <span className="block text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text">
                                Kolleksiyası
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                            Əhli-Sünnə Mədrəsəsinin zəngin video arxivindən dini dərslər, söhbətlər və təlim materialları
                        </p>
                    </motion.div>

                    {/* Feature Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
                    >
                        {[
                            { 
                                icon: FaVideo, 
                                label: "Videolar", 
                                count: loading ? "..." : formatNumber(stats.videoCount),
                                rawCount: stats.videoCount
                            },
                            { 
                                icon: FaList, 
                                label: "Playlistlər", 
                                count: loading ? "..." : formatNumber(stats.playlistCount),
                                rawCount: stats.playlistCount
                            },
                            { 
                                icon: FaEye, 
                                label: "İzləmələr", 
                                count: loading ? "..." : formatNumber(stats.viewCount),
                                rawCount: stats.viewCount
                            },
                            { 
                                icon: FaPlay, 
                                label: "Abunəçilər", 
                                count: loading ? "..." : formatNumber(stats.subscriberCount),
                                rawCount: stats.subscriberCount
                            }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                                title={loading ? "Yüklənir..." : `${stat.rawCount?.toLocaleString()} ${stat.label}`}
                            >
                                <div className="flex flex-col items-center space-y-3">
                                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                                        <stat.icon className={`w-6 h-6 text-red-400 ${loading ? 'animate-pulse' : ''}`} />
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-2xl font-bold text-white ${loading ? 'animate-pulse' : ''}`}>
                                            {stat.count}
                                        </div>
                                        <div className="text-sm text-white/70">{stat.label}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                    >
                        <a
                            href="#content"
                            className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <FaPlay className="mr-2" />
                            Videoları İzlə
                        </a>
                        <a
                            href="?content=playlists"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
                        >
                            <FaList className="mr-2" />
                            Playlistlər
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-red-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        </section>
    );
};

export default VideoPageHeader;