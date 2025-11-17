"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaYoutube } from "react-icons/fa";

const slides = [
  {
    id: 1,
    videoSrc: "https://res.cloudinary.com/dhhlnrons/video/upload/v1743080791/esm/homepage/lubjcf8kkdivjgk2hdox.mp4",
    title: "Ramazan Avari",
    subtitle: "Nizamiyyə Mədrəsəsinin Fəaliyyəti ilə Bağlı Önəmli Açıqlama",
    description: "İletişim bilgileri və daha fazlası için hemen şimdi bizimle iletişime geçin.",
    youtubeLink: process.env.NEXT_PUBLIC_YTB_CHANNEL_URL,
  },
];

export default function IslamicVideoSlider() {
  const videoRefs = useRef([]);

  const handleSlideChange = (swiper) => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === swiper.realIndex) {
        video.play().catch(error => console.log("Autoplay prevented:", error));
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
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
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
      `}</style>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: true,
        }}
        className="h-screen w-full videoSlider"
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {/* Video Arxa Fon */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              width="1920"
              height="1080"
              autoPlay={index === 0}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
              <source src={slide.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Məzmun Overlay - Daha soft və minimal */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-start text-white bg-gradient-to-r from-stone-900/80 via-stone-900/60 to-transparent p-6 md:p-10 lg:p-16">
              {/* YouTube Link - Minimal dizayn */}
              <a
                href={slide.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch "${slide.title}" on YouTube`}
                className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <FaYoutube className="h-5 w-5 text-red-500" />
                <span className="hidden sm:inline font-medium">Kanala keçid et</span>
              </a>

              {/* Məzmun */}
              <div className="text-center lg:text-left space-y-6 max-w-2xl lg:max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 font-medium text-sm mb-4 opacity-0 animate-fade-in-down border border-white/20">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  Nizamiyyə Mədrəsəsi
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
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Məqalələri Oxu
                  </a>
                  <a
                    href="#books"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/30"
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
