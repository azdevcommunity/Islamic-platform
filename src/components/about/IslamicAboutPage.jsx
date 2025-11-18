"use client";
import Image from "next/image";
import { FaQuran, FaGraduationCap, FaHeart, FaUsers, FaBook, FaMosque } from "react-icons/fa";
import { motion } from "framer-motion";

const values = [
    {
        icon: FaQuran,
        title: "Quran və Sünnet",
        description: "Əhli-Sünnə əqidəsinə uyğun təlim və tərbiyə sistemi"
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
    },
    {
        icon: FaBook,
        title: "Elm və Hikmət",
        description: "İslami elmlərin dərin öyrənilməsi və tətbiqi"
    },
    {
        icon: FaMosque,
        title: "İbadət və Təqva",
        description: "Allah rızası üçün ibadət və təqva həyatı"
    }
];

const IslamicAboutPage = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 overflow-hidden">
                {/* Background Pattern - Noktalar */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>
                
                <div className="absolute inset-0 bg-islamic-pattern opacity-10"></div>
                
                <div className="container mx-auto px-4 max-w-7xl relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 font-medium border border-white/20">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            Haqqımızda
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Nizamiyyə Mədrəsəsi
                            <span className="block text-accent-200 mt-2">İslami Təhsil Mərkəzi</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                            İslami elmlərin öyrədilməsi və mənəvi tərbiyənin verilməsi sahəsində xidmət göstəririk
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Missiya və Vizyon */}
            <section className="py-20 md:py-28 bg-white relative">
                <div className="absolute inset-0 bg-islamic-subtle opacity-20"></div>
                
                <div className="container mx-auto px-4 max-w-7xl relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Sol tərəf - Şəkil */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                                <Image
                                    src="/about_us.png"
                                    alt="Nizamiyyə Mədrəsəsi"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </motion.div>

                        {/* Sağ tərəf - Məzmun */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                                    Missiyamız
                                </h2>
                                <p className="text-lg text-stone-600 leading-relaxed mb-6">
                                    Nizamiyyə Mədrəsəsi olaraq, İslami elmlərin öyrədilməsi və mənəvi tərbiyənin 
                                    verilməsi sahəsində xidmət göstəririk. Quran və Sünnət işığında, müasir dövrdə 
                                    İslami şüurun formalaşmasına töhfə veririk.
                                </p>
                                <p className="text-lg text-stone-600 leading-relaxed">
                                    Əhli-Sünnə əqidəsinə uyğun olaraq, İslam dininin əsas prinsiplərini öyrətmək, 
                                    tələbələrimizin mənəvi inkişafına kömək etmək və cəmiyyətdə İslami dəyərlərin 
                                    yayılmasına xidmət etmək əsas məqsədimizdir.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Dəyərlərimiz */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-stone-50 to-white relative">
                <div className="absolute inset-0 bg-islamic-pattern opacity-30"></div>
                
                <div className="container mx-auto px-4 max-w-7xl relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 font-medium text-sm mb-4 border border-primary-100">
                            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                            Dəyərlərimiz
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                            Əsas Prinsiplərimiz
                        </h2>
                        <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
                            İslami təhsil və tərbiyədə rəhbər tutduğumuz əsas dəyərlər
                        </p>
                        <div className="mt-8 w-24 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 bg-white rounded-2xl hover:shadow-sm transition-all duration-300 border border-stone-200 hover:border-primary-200"
                            >
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center group-hover:bg-primary-100 transition-colors border border-primary-100">
                                        <value.icon className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-900">{value.title}</h3>
                                    <p className="text-stone-600 leading-relaxed">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Əlaqə CTA */}
            <section className="py-20 md:py-24 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-islamic-pattern opacity-10"></div>
                
                <div className="container mx-auto px-4 max-w-4xl relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            Bizimlə Əlaqə Saxlayın
                        </h2>
                        <p className="text-xl text-white/80 leading-relaxed">
                            Suallarınız və ya təklifləriniz varsa, bizimlə əlaqə saxlamaqdan çəkinməyin
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-stone-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                Əlaqə Səhifəsi
                            </a>
                            <a
                                href="/questions"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30"
                            >
                                Suallar
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default IslamicAboutPage;
