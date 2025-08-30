"use client";
import { motion } from "framer-motion";
import { FaBook, FaUsers, FaGraduationCap, FaGlobe } from "react-icons/fa";

const stats = [
    {
        icon: FaUsers,
        number: "1000+",
        label: "Aktiv Tələbə",
        description: "Müxtəlif yaş qruplarından"
    },
    {
        icon: FaBook,
        number: "50+",
        label: "Dərs Modulları",
        description: "İslami elmlər üzrə"
    },
    {
        icon: FaGraduationCap,
        number: "500+",
        label: "Məzun",
        description: "Uğurla bitirən tələbələr"
    },
    {
        icon: FaGlobe,
        number: "10+",
        label: "Ölkə",
        description: "Beynəlxalq tələbələr"
    }
];

const StatsSection = () => {
    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Rəqəmlərlə Uğurumuz
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    İllərin təcrübəsi və minlərlə tələbənin etimadı ilə qurduğumuz güclü təhsil ailəsi
                </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center group"
                    >
                        <div className="relative mb-6">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#43b365] to-[#2d7a47] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                            {/* Decorative ring */}
                            <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-[#43b365]/20 rounded-2xl group-hover:border-[#43b365]/40 transition-colors duration-300"></div>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-[#43b365] transition-colors duration-300">
                                {stat.number}
                            </div>
                            <div className="text-lg font-semibold text-gray-700">
                                {stat.label}
                            </div>
                            <div className="text-sm text-gray-500">
                                {stat.description}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default StatsSection;