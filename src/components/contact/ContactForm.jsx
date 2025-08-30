// components/contact/ContactForm.jsx
'use client';

import React, {useState} from 'react';
// useFormState və useFormStatus artıq lazım deyil
import {Send, Loader2, AlertCircle, CheckCircle} from 'lucide-react';
// API endpoint üçün base URL (yolu öz layihənizə uyğunlaşdırın)
import {BASE_URL} from "@/util/Const";
import HttpClient from "@/util/HttpClient";
// HttpClient lazım olarsa import edin, ya da birbaşa fetch istifadə edin
// import HttpClient from '@/util/HttpClient';

// Əsas Form Komponenti
export default function ContactForm() {
    // Form məlumatlarını saxlamaq üçün state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
    });
    // Göndərmə statusunu (loading) saxlamaq üçün state
    const [isLoading, setIsLoading] = useState(false);
    // Göndərmə nəticəsini (uğur/xəta) saxlamaq üçün state
    const [submitStatus, setSubmitStatus] = useState({status: null, message: ''}); // { status: 'success'/'error', message: '...' }

    // Input dəyişikliklərini idarə edən funksiya
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    // Form göndərmə funksiyası
    const handleSubmit = async (event) => {
        event.preventDefault(); // Standart form göndərməsinin qarşısını alır
        setIsLoading(true); // Yüklənmə statusunu aktiv edir
        setSubmitStatus({status: null, message: ''}); // Əvvəlki statusu təmizləyir

        // --- Client tərəfli sadə validasiya ---
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setSubmitStatus({status: 'error', message: 'Zəhmət olmasa, bütün tələb olunan sahələri doldurun.'});
            setIsLoading(false); // Yüklənməni dayandırır
            return; // Funksiyanı dayandırır
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setSubmitStatus({status: 'error', message: 'Zəhmət olmasa, düzgün e-poçt ünvanı daxil edin.'});
            setIsLoading(false);
            return;
        }
        // --- Validasiya sonu ---

        try {
            // API endpointinə fetch ilə sorğu göndəririk
            const response = await HttpClient.post("/contact", formData)

            if (response.ok) {
                // Uğurlu cavab halında
                setSubmitStatus({status: 'success', message: 'Mesajınız uğurla göndərildi!'});
                // Formu təmizləyirik
                setFormData({name: '', email: '', subject: '', phone: '', message: ''});
            } else {
                // Xəta halında cavabdan mesajı almağa çalışırıq
                let errorMessage = 'Mesaj göndərilərkən xəta baş verdi.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) { /* Cavabı parse etmək mümkün olmadıqda */
                }
                console.error("Client Side Submit: API Error Status:", response.status, errorMessage);
                setSubmitStatus({status: 'error', message: errorMessage});
            }
        } catch (error) {
            // Şəbəkə və ya fetch xətası halında
            console.error("Client Side Submit: Network/Fetch Error:", error);
            setSubmitStatus({status: 'error', message: 'Şəbəkə xətası baş verdi. Zəhmət olmasa, yenidən cəhd edin.'});
        } finally {
            // İstər uğurlu, istər xəta olsun, sonda yüklənməni dayandırırıq
            setIsLoading(false);
        }
    };

    return (
        // Form action olaraq birbaşa handleSubmit funksiyasını istifadə edir
        // ref artıq lazım deyil
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Uğur/Xəta Mesajlarının Göstərilməsi */}
            {submitStatus.message && ( // submitStatus.message varsa, bu bloku göstər
                <div
                    className={`p-4 rounded-md border flex items-center gap-3 text-sm transition-opacity duration-300 ${
                        submitStatus.status === 'success' // submitStatus.status-a görə stil seçimi
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                    role={submitStatus.status === 'error' ? 'alert' : 'status'}
                >
                    {submitStatus.status === 'success' ? ( // submitStatus.status-a görə ikon seçimi
                        <CheckCircle className="h-5 w-5 flex-shrink-0"/>
                    ) : (
                        <AlertCircle className="h-5 w-5 flex-shrink-0"/>
                    )}
                    {/* submitStatus.message-dən gələn mesaj mətni */}
                    <span>{submitStatus.message}</span>
                </div>
            )}

            {/* Form Sahələri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2 group-focus-within:text-emerald-600 transition-colors">
                        Adınız Soyadınız <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Adınızı və soyadınızı daxil edin"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in-out hover:border-gray-300"
                        />
                    </div>
                </div>
                <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2 group-focus-within:text-emerald-600 transition-colors">
                        E-poçt Ünvanı <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="email@nümunə.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in-out hover:border-gray-300"
                        />
                    </div>
                </div>
                <div className="group">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-2 group-focus-within:text-emerald-600 transition-colors">
                        Mövzu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="Mesajınızın mövzusu"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in-out hover:border-gray-300"
                        />
                    </div>
                </div>
                <div className="group">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2 group-focus-within:text-emerald-600 transition-colors">
                        Telefon (Könüllü)
                    </label>
                    <div className="relative">
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="+994 XX XXX XX XX"
                            value={formData.phone}
                            onChange={handleChange}
                            className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in-out hover:border-gray-300"
                        />
                    </div>
                </div>
            </div>

            <div className="group">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2 group-focus-within:text-emerald-600 transition-colors">
                    Mesajınız <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <textarea
                        name="message"
                        id="message"
                        rows="6"
                        placeholder="Sualınızı və ya təklifinizi bura yazın..."
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in-out hover:border-gray-300 resize-y min-h-[120px]"
                    ></textarea>
                </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                {/* Submit Düyməsi */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 min-w-[200px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-3">
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin"/>
                                <span>Göndərilir...</span>
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"/>
                                <span>Mesajı Göndər</span>
                            </>
                        )}
                    </div>
                </button>
                
                {/* Additional Info */}
                <div className="text-sm text-gray-500 text-center sm:text-right">
                    <p>Mesajınız 24 saat ərzində cavablandırılacaq</p>
                </div>
            </div>
        </form>
    );
}
