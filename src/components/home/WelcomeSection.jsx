"use client";
import { FaQuran, FaGraduationCap, FaHeart, FaUsers } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
    const leftContentRef = useRef(null);
    const rightImageRef = useRef(null);
    const featureRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
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

        // Observe left content
        if (leftContentRef.current) {
            observer.observe(leftContentRef.current);
        }

        // Observe right image
        if (rightImageRef.current) {
            observer.observe(rightImageRef.current);
        }

        // Observe feature cards
        featureRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div ref={leftContentRef} className="space-y-8 animate-slide-in-left">
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
                            <div
                                key={index}
                                ref={(el) => featureRefs.current[index] = el}
                                className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#43b365]/20 animate-slide-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
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
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Image */}
                <div ref={rightImageRef} className="relative animate-slide-in-right">
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
                    {/* <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 animate-scale-in">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#43b365] rounded-xl flex items-center justify-center">
                                <FaQuran className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">1000+</div>
                                <div className="text-sm text-gray-600">Tələbə</div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translate3d(-50px, 0, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translate3d(50px, 0, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 20px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale3d(0.8, 0.8, 1);
                    }
                    to {
                        opacity: 1;
                        transform: scale3d(1, 1, 1);
                    }
                }

                .animate-slide-in-left {
                    opacity: 0;
                    transform: translate3d(-50px, 0, 0);
                    will-change: opacity, transform;
                }

                .animate-slide-in-left.animate-triggered {
                    animation: slideInLeft 0.8s ease-out forwards;
                }

                .animate-slide-in-right {
                    opacity: 0;
                    transform: translate3d(50px, 0, 0);
                    will-change: opacity, transform;
                }

                .animate-slide-in-right.animate-triggered {
                    animation: slideInRight 0.8s ease-out forwards;
                }

                .animate-slide-in-up {
                    opacity: 0;
                    transform: translate3d(0, 20px, 0);
                    will-change: opacity, transform;
                }

                .animate-slide-in-up.animate-triggered {
                    animation: slideInUp 0.6s ease-out forwards;
                }

                .animate-scale-in {
                    opacity: 0;
                    transform: scale3d(0.8, 0.8, 1);
                    will-change: opacity, transform;
                }

                .animate-scale-in.animate-triggered {
                    animation: scaleIn 0.6s ease-out 0.4s forwards;
                }
                
                /* Performance optimization for reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    .animate-slide-in-left,
                    .animate-slide-in-right,
                    .animate-slide-in-up,
                    .animate-scale-in {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default WelcomeSection;