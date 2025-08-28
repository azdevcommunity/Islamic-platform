// app/contact/page.jsx
import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

// Client Form komponentini import edirik
import ContactForm from "@/components/contact/ContactForm";
import { bankData, phones } from "@/util/Const";
import ContactAndSupportSidebar from "@/components/contact/ContactAndSupportSidebar";

// --- Səhifə Komponenti (Server Component) ---
export default function ContactPage() {
    return (
        <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 min-h-screen pb-20">
            {/* Modern Hero Section */}
            <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1713013727106-bfa2a9bdddc1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Əlaqə Fon Şəkli"
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-slate-900/70 to-emerald-800/60" />

                {/* Floating geometric shapes for modern touch */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-32 left-16 w-24 h-24 bg-white/5 rounded-full blur-lg animate-bounce"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                                Bizimlə
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200"> Əlaqə</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-emerald-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                                Suallarınız, təklifləriniz və ya əməkdaşlıq üçün bizimlə əlaqə saxlayın.
                                Peşəkar komandamız sizə yardım etməyə hazırdır.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <div className="flex items-center gap-2 text-emerald-200">
                                    <Clock className="w-5 h-5" />
                                    <span className="text-sm">24/7 Dəstək</span>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-200">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-sm">Sürətli Cavab</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Content Section */}
            <div className="relative -mt-20 z-10 ">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Contact Information Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 sticky top-20">
                                <ContactAndSupportSidebar />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-8">
                            <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-white/20">
                                <div className="mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                        Mesaj Göndərin
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Aşağıdakı formu dolduraraq bizimlə əlaqə saxlaya bilərsiniz.
                                        Bütün mesajlar 24 saat ərzində cavablandırılır.
                                    </p>
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info Section */}
            {/* <div className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 mt-20">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Telefon Dəstəyi</h3>
                            <p className="text-emerald-100">Hər gün 09:00-18:00 arası</p>
                        </div>
                        <div className="text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">E-poçt Dəstəyi</h3>
                            <p className="text-emerald-100">24 saat ərzində cavab</p>
                        </div>
                        <div className="text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Ünvan</h3>
                            <p className="text-emerald-100">Bakı, Azərbaycan</p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
