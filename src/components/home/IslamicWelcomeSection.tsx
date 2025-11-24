"use client";
import { FaQuran, FaGraduationCap, FaHeart, FaUsers } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";

interface Feature {
    icon: IconType;
    title: string;
    description: string;
}

const features: Feature[] = [
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

export default function IslamicWelcomeSection() {
    const leftContentRef = useRef<HTMLDivElement>(null);
    const rightImageRef = useRef<HTMLDivElement>(null);
    const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-triggered');
                }
            });
        }, observerOptions);

        if (leftContentRef.current) observer.observe(leftContentRef.current);
        if (rightImageRef.current) observer.observe(rightImageRef.current);
        featureRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Sol tərəf - Məzmun */}
                <div ref={leftContentRef} className="space-y-8 animate-slide-in-left">
                    <div>
                        {/* Badge - Minimal və zərif */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 font-medium text-sm mb-6 border border-primary-100">
                            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                            Nizamiyyə Mədrəsəsi
                        </div>
                        
                        {/* Başlıq - Modern və oxunaqlı */}
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                            İlahi Nur və Hikmət
                            <span className="block text-primary-600 mt-2">Mərkəzi</span>
                        </h2>
                        
                        {/* Təsvir - Geniş satır aralığı */}
                        <p className="text-lg text-stone-600 leading-relaxed mb-8">
                            Nizamiyyə Mədrəsəsi olaraq, İslami elmlərin öyrədilməsi və mənəvi tərbiyənin 
                            verilməsi sahəsində xidmət göstəririk. Quran və Sünnət işığında, müasir dövrdə 
                            İslami şüurun formalaşmasına töhfə veririk.
                        </p>
                    </div>

                    {/* Xüsusiyyətlər Grid - Minimal kartlar */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    ref={(el) => { featureRefs.current[index] = el; }}
                                    className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100 hover:border-primary-200 animate-slide-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors border border-primary-100">
                                            <IconComponent className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-stone-900 mb-2 text-base">{feature.title}</h3>
                                            <p className="text-sm text-stone-600 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sağ tərəf - Şəkil */}
                <div ref={rightImageRef} className="relative animate-slide-in-right">
                    {/* İslami geometrik naxış - arxa fon */}
                    <div className="absolute -inset-4 bg-islamic-pattern opacity-30 rounded-3xl"></div>
                    
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                        <Image
                            src="/about_us.png"
                            alt="Nizamiyyə Mədrəsəsi - İslami elm və mənəviyyat mərkəzi, tələbələr Quran və İslami elmlər öyrənir"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        {/* Soft gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-in-left {
                    opacity: 0;
                    transform: translateX(-30px);
                }

                .animate-slide-in-left.animate-triggered {
                    animation: slideInLeft 0.8s ease-out forwards;
                }

                .animate-slide-in-right {
                    opacity: 0;
                    transform: translateX(30px);
                }

                .animate-slide-in-right.animate-triggered {
                    animation: slideInRight 0.8s ease-out forwards;
                }

                .animate-slide-in-up {
                    opacity: 0;
                    transform: translateY(20px);
                }

                .animate-slide-in-up.animate-triggered {
                    animation: slideInUp 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
