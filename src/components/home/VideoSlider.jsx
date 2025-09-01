"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaYoutube } from "react-icons/fa";

// Static data defined outside component
const slides = [
  {
    id: 1,
    videoSrc: "https://res.cloudinary.com/dhhlnrons/video/upload/v1743080791/esm/homepage/lubjcf8kkdivjgk2hdox.mp4",
    title: "Ramazan Avari",
    subtitle: "Əhli-Sünnə Mədrəsəsinin Fəaliyyəti ilə Bağlı Önəmli Açıqlama",
    description: "İletişim bilgileri ve daha fazlası için hemen şimdi bizimle iletişime geçin.",
    youtubeLink: "https://youtu.be/6cKKB1_fick?si=FC3KoBmP6cG7FpDw",
  },
];

export default function VideoSlider() {
  const videoRefs = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Set loaded state after a short delay to prevent flash
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      clearTimeout(timer);
    };
  }, []);

  // Optimized slide change handler
  const handleSlideChange = (swiper) => {
    if (!isLoaded) return;
    
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === swiper.realIndex) {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          video.play().catch(error => console.log("Autoplay prevented:", error));
        });
      } else {
        video.pause();
      }
    });
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
          will-change: opacity, transform;
          transform: translate3d(0, 0, 0);
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          will-change: opacity, transform;
          transform: translate3d(0, 0, 0);
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          will-change: opacity;
        }
        
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animate-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animate-delay-800 {
          animation-delay: 0.8s;
        }
        
        .opacity-0 {
          opacity: 0;
        }
        
        /* Performance optimization for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-down,
          .animate-fade-in-up,
          .animate-fade-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
      
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        autoplay={shouldReduceMotion ? false : {
          delay: 8000,
          disableOnInteraction: true,
        }}
        className="h-screen w-full videoSlider"
        onSlideChange={handleSlideChange}
        preloadImages={false}
        lazy={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {/* Video Background */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              width="1920"
              height="1080"
              autoPlay={index === 0 && !shouldReduceMotion}
              muted
              loop
              playsInline
              preload={index === 0 ? "metadata" : "none"}
              className="absolute top-0 left-0 w-full h-full object-cover -z-10"
              style={{ willChange: 'transform' }}
            >
              <source src={slide.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-start text-white bg-gradient-to-r from-black/70 via-black/50 to-transparent p-6 md:p-10 lg:p-16">
              {/* YouTube Link Button */}
              <a
                href={slide.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch "${slide.title}" on YouTube`}
                className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-red-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaYoutube className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Videoya keçid et</span>
              </a>

              {/* Content */}
              <div className="text-center lg:text-left space-y-6 max-w-2xl lg:max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 font-medium text-sm mb-4 opacity-0 animate-fade-in-down">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Əhli-Sünnə Mədrəsəsi
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg leading-tight opacity-0 animate-fade-in-down animate-delay-200">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl drop-shadow-md font-light leading-relaxed opacity-0 animate-fade-in-up animate-delay-400">
                  {slide.subtitle}
                </p>

                {slide.description && (
                  <p className="text-base md:text-lg lg:text-xl max-w-2xl opacity-90 leading-relaxed opacity-0 animate-fade-in animate-delay-600">
                    {slide.description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-fade-in-up animate-delay-800">
                  <a
                    href="#articles"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#43b365] text-white font-semibold rounded-xl hover:bg-[#2d7a47] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Məqalələri Oxu
                  </a>
                  <a
                    href="#books"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
                  >
                    Kitabları Kəşf Et
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
