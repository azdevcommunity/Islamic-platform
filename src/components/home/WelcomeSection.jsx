"use client";
import { motion } from "framer-motion";
import { FaQuran, FaGraduationCap, FaHeart, FaUsers } from "react-icons/fa";
import Image from "next/image";

const features = [
    {
        icon: FaQuran,
        title: "Quran və Sünnet",
        description: "Əhli-Sünnə əqidəsinə uyğun təlim və tərbiyə"
    },
    {
        icon: FaGraduationCap,
        title: "Keyfiyyətli Təhsil",
        description: "Müasir metodlarla ənənəvi İslami elmlərin öyrədilməsi"
    },
    {
        icon: FaHeart,
        title: "Mənəvi İnkişaf",
        description: "Ruhani təmizlik və əxlaqi kamillik yolu"
    },
    {
        icon: FaUsers,
        title: "Birlik və Qardaşlıq",
        description: "İslami qardaşlıq və həmrəylik mühiti"
    }
];

const WelcomeSection = () => {
    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#43b365]/10 rounded-full text-[#43b365] font-medium text-sm mb-6">
                            <span className="w-2 h-2 bg-[#43b365] rounded-full"></span>
                            Əhli-Sünnə Mədrəsəsi
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            İlahi Nur və Hikmət
                            <span className="block text-[#43b365]">Mərkəzi</span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            Əhli-Sünnə Mədrəsəsi olaraq, İslami elmlərin öyrədilməsi və mənəvi tərbiyənin 
                            verilməsi sahəsində xidmət göstəririk. Quran və Sünnət işığında, müasir dövrdə 
                            İslami şüurun formalaşmasına töhfə veririk.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#43b365]/20"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#43b365]/10 rounded-xl flex items-center justify-center group-hover:bg-[#43b365]/20 transition-colors">
                                        <feature.icon className="w-6 h-6 text-[#43b365]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/about_us.png"
                            alt="Əhli-Sünnə Mədrəsəsi"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Floating card */}
                    {/* <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#43b365] rounded-xl flex items-center justify-center">
                                <FaQuran className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">1000+</div>
                                <div className="text-sm text-gray-600">Tələbə</div>
                            </div>
                        </div>
                    </motion.div> */}
                </motion.div>
            </div>
        </div>
    );
};

export default WelcomeSection;