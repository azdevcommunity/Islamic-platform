"use client";

import { Phone, HeartHandshake, Clock, Mail, MapPin, Users } from "lucide-react";
import SupportButton from "@/components/common/SupportButton";
import {phones} from "@/util/Const";

const ContactAndSupportSidebar = () => {
    return (
        <div className="space-y-8">
            {/* Quick Contact Info */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-emerald-600" />
                    Sürətli Əlaqə
                </h3>
                <div className="space-y-3">
                    {phones.map((phone, index) => (
                        <a
                            key={index}
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="group flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md transition-all duration-200"
                            aria-label={`Telefon nömrəsi: ${phone}`}
                        >
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                <Phone className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-gray-900 block">
                                    {phone}
                                </span>
                                <span className="text-xs text-gray-500">Zəng edin</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Working Hours */}
            {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    İş Saatları
                </h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Bazar ertəsi - Cümə</span>
                        <span className="font-semibold text-gray-900">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Şənbə</span>
                        <span className="font-semibold text-gray-900">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Bazar</span>
                        <span className="font-semibold text-red-600">Bağlı</span>
                    </div>
                </div>
            </div> */}

            {/* Contact Methods */}
            {/* <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-purple-600" />
                    Əlaqə Üsulları
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Mail className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                            <span className="text-gray-600">E-poçt cavabı</span>
                            <p className="text-xs text-gray-500">24 saat ərzində</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <span className="text-gray-600">Telefon dəstəyi</span>
                            <p className="text-xs text-gray-500">İş saatlarında</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <span className="text-gray-600">Şəxsi görüş</span>
                            <p className="text-xs text-gray-500">Təyin ilə</p>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Support Section */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <HeartHandshake className="h-5 w-5 text-amber-600" />
                    Dəstək Olun
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Mədrəsəmizin fəaliyyətinə və İslam elmlərinin yayılmasına dəstək olmaq üçün 
                    bank hesablarımızdan istifadə edə bilərsiniz.
                </p>
                <p className="text-xs text-amber-700 mb-4 font-medium">
                    Allah etdiyiniz yardımları qəbul etsin! 🤲
                </p>
                <SupportButton />
            </div>
        </div>
    );
}

export default ContactAndSupportSidebar; // Export with your component name
