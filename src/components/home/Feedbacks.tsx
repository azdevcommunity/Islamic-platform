"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/**
 * Testimonial Data Structure
 */
interface Testimonial {
  id: number;
  author: string;
  text: string;
  rating: number;
}

/**
 * Mock data for testimonials
 * @type {Testimonial[]}
 */
export const testimonialsMock: Testimonial[] = [
  {
    id: 1,
    author: "Elçin S.",
    text: "Nizamiyyə Mədrəsəsi vasitəsilə ruhumun dərinliklərinə səyahət etdim. Hər söhbət və dərs mənə iman və mənəviyyatın əhəmiyyətini bir daha xatırlatdı. Həyatımda yeni bir səhifə açdı.",
    rating: 5,
  },
  {
    id: 2,
    author: "Yusif A.",
    text: "Bu mədrəsənin dərsləri insanı düşünməyə, öyrənməyə və özünü inkişaf etdirməyə sövq edir. Xocaların səmimi yanaşması və zəngin bilikləri mənim üçün ilham mənbəyi oldu.",
    rating: 5,
  },
  {
    id: 3,
    author: "Fərid M.",
    text: "Nizamiyyə Mədrəsəsində öyrəndiklərim gündəlik həyatımda yol göstərici oldu. Dərslərin dərinliyi və hocaların əxlaqı mənəvi zənginliyimə böyük töhfə verdi.",
    rating: 5,
  },
];

/**
 * Star Rating Component
 */
interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => (
  <div className="flex justify-center space-x-1 mb-4" role="img" aria-label={`${rating} ulduz reytinq`}>
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

/**
 * Feedbacks Component
 * Displays student testimonials in a slider
 * 
 * @component
 * @example
 * ```tsx
 * <Feedbacks />
 * ```
 */
export default function Feedbacks() {
  if (!testimonialsMock.length) return null;

  return (
<>
    <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium text-sm mb-4 border border-white/20">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Tələbə Rəyləri
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Sizdən Gələnlər
              </h2>
              <div className="mt-8 w-24 h-0.5 bg-gradient-to-r from-white to-white/70 mx-auto rounded-full"></div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
    <div className="relative max-w-3xl mx-auto">
      {/* Quotation Mark Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <FaQuoteLeft className="h-8 w-8 text-white" aria-hidden="true" />
        </div>
      </div>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={testimonialsMock.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{ clickable: true, el: ".feedbacks-pagination" }}
        navigation={{
          prevEl: ".feedbacks-button-prev",
          nextEl: ".feedbacks-button-next",
        }}
        className="!pb-16"
        aria-label="Tələbə rəyləri"
        aria-live="polite"
      >
        {testimonialsMock.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="text-center px-4 sm:px-8 py-8">
              {/* Star Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Testimonial Text */}
              <div className="relative mb-8">
                <p className="text-lg md:text-xl text-white leading-relaxed font-light italic">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div 
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                  role="img"
                  aria-label={`${testimonial.author} - rəy müəllifi - profil şəkli`}
                >
                  <span className="text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white text-lg">{testimonial.author}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div>
          {/* Custom navigation buttons */}
          <button
            aria-label="Əvvəlki rəy"
            className="feedbacks-button-prev absolute left-1/2 transform -translate-x-full z-10 cursor-pointer rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500"
            style={{ marginLeft: "-30px", bottom: "10px" }}
          >
            <FiChevronLeft className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>
          <button
            aria-label="Növbəti rəy"
            className="feedbacks-button-next absolute left-1/2 transform -translate-x-0 z-10 cursor-pointer rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500"
            style={{ marginLeft: "30px", bottom: "10px" }}
          >
            <FiChevronRight className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>

          {/* Custom pagination container */}
          <div
            style={{ bottom: "20px" }}
            className="feedbacks-pagination flex justify-center space-x-2 absolute left-0 right-0"
          ></div>
        </div>

        {/* Custom Swiper pagination styles */}
        <style jsx global>{`
          .feedbacks-pagination .swiper-pagination-bullet {
            background-color: #9ca3af;
            opacity: 0.7;
            transition: background-color 0.3s ease, width 0.3s ease;
            width: 8px;
            height: 8px;
          }

          .feedbacks-pagination .swiper-pagination-bullet-active {
            background-color: #43b365;
            opacity: 1;
            width: 16px;
            border-radius: 4px;
          }
        `}</style>
      </Swiper>
    </div>
            </div>
          </div>
</>
  );
}
