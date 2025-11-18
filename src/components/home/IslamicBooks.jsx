"use client";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import Image from "next/image";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const booksData=[]
export const booksData2 = [
    {
        id: 1,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722148/esm/books/tujvd6zrscuqiqhskvxp.jpg",
        title: "Əhli-Sünnə Əqidəsi",
        authorName: "Nizamiyyə Mədrəsəsi",
        category: 'Əqidə',
        description: 'İslam əqidəsinin əsasları, tövhid, şirk və digər mühüm mövzular Əhli-Sünnə prizmasından geniş izah olunur.',
        price: '3 AZN',
        contactPhone: '+994 55 585 03 69',
        chapters: ['Tövhidin növləri', 'Şirk və onun təhlükələri', 'İmanın şərtləri', 'Qədərə iman']
    },
    {
        id: 2,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722145/esm/books/qwqgjoagkondanp5gktf.jpg",
        title: "Müxtəsər Elmihal",
        authorName: "Nizamiyyə Mədrəsəsi",
        category: 'Fiqh',
        description: 'Gündəlik ibadətlər (namaz, oruc, zəkat, həcc), təharət qaydaları və muamilatla bağlı əsas fiqhi hökmlər.',
        price: '4 AZN',
        contactPhone: '+994 55 585 03 69',
        chapters: ['Təharət bəhsi', 'Namazın qaydaları', 'Orucun hökmləri', 'Zəkat və sədəqə']
    },
    {
        id: 3,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722117/esm/books/zxwlxh1zsjutjhocvi1x.jpg",
        title: "İmanın Əsasları",
        authorName: "Nizamiyyə Mədrəsəsi",
        category: 'Əqidə',
        description: 'İmanın altı şərti (Allaha, mələklərə, kitablara, peyğəmbərlərə, axirət gününə, qədərə iman) dəlillərlə şərh olunur.',
        price: '3 AZN',
        contactPhone: '+994 55 585 03 69',
        chapters: ['Allaha iman', 'Mələklərə iman', 'Kitablara iman', 'Peyğəmbərlərə iman']
    },
    {
        id: 4,
        image: "https://res.cloudinary.com/dhhlnrons/image/upload/v1742722148/esm/books/tujvd6zrscuqiqhskvxp.jpg",
        title: "Fiqh Dərsləri",
        authorName: "Nizamiyyə Mədrəsəsi",
        category: 'Fiqh',
        description: 'İslam fiqhinin əsas qaydaları və müasir həyatda tətbiqi.',
        price: '5 AZN',
        contactPhone: '+994 55 585 03 69',
        chapters: ['İbadət fiqhi', 'Muamilat fiqhi', 'Ailə fiqhi', 'Cəmiyyət fiqhi']
    },
];

export default function IslamicBooks() {
    return (
        <div className="relative">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                pagination={{clickable: true, el: '.books-pagination'}}
                navigation={{
                    prevEl: ".books-button-prev",
                    nextEl: ".books-button-next",
                }}
                breakpoints={{
                    640: {slidesPerView: 2, spaceBetween: 20},
                    768: {slidesPerView: 3, spaceBetween: 24},
                    1024: {slidesPerView: 4, spaceBetween: 24},
                }}
                className="!pb-12"
            >
                {booksData.map((book) => (
                    <SwiperSlide key={book.id} className="!flex justify-center">
                        {/* Kitab Kartı - Minimal və zərif */}
                        <div className="group flex w-full max-w-[280px] flex-col items-center text-center">
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl border-2 border-stone-100 group-hover:border-primary-200">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 280px"
                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    priority={book.id <= 3}
                                />
                                {/* Soft gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Qiymət badge - Minimal */}
                                <div className="absolute top-4 right-4 px-3 py-1.5 bg-accent-500 text-white text-sm font-semibold rounded-full shadow-md">
                                    {book.price}
                                </div>

                                {/* Kateqoriya badge */}
                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm text-stone-700 text-xs font-medium rounded-full border border-stone-200">
                                    {book.category}
                                </div>

                                {/* Hover məzmunu */}
                                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="text-white text-center w-full">
                                        <p className="text-sm leading-relaxed mb-3 line-clamp-3">
                                            {book.description}
                                        </p>
                                        <button className="w-full bg-white/20 backdrop-blur-sm text-white py-2.5 px-4 rounded-xl font-medium hover:bg-white/30 transition-colors duration-200 border border-white/30">
                                            Ətraflı Məlumat
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 space-y-2">
                                <h3 className="text-base font-bold text-stone-900 group-hover:text-primary-700 transition-colors duration-300 line-clamp-2">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-stone-600 font-medium">{book.authorName}</p>
                                <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
                                    <span>{book.chapters?.length || 0} Fəsil</span>
                                    <span>•</span>
                                    <span>{book.category}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Naviqasiya düymələri - Minimal */}
            <button
                aria-label="Previous book"
                className="books-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-2.5 shadow-md transition-all hover:bg-stone-50 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border border-stone-200"
            >
                <FiChevronLeft className="h-5 w-5 text-stone-700"/>
            </button>
            <button
                aria-label="Next book"
                className="books-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-2.5 shadow-md transition-all hover:bg-stone-50 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border border-stone-200"
            >
                <FiChevronRight className="h-5 w-5 text-stone-700"/>
            </button>

            {/* Pagination */}
            <div className="books-pagination flex justify-center space-x-2 mt-8"></div>

            <style jsx global>{`
                .books-pagination .swiper-pagination-bullet {
                    background-color: #d6d3d1;
                    opacity: 0.8;
                    transition: background-color 0.3s ease, width 0.3s ease;
                    width: 8px;
                    height: 8px;
                }

                .books-pagination .swiper-pagination-bullet-active {
                    background-color: #12a19a;
                    opacity: 1;
                    width: 24px;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
}
