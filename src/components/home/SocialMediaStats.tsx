"use client";

import { FaInstagram, FaYoutube, FaFacebook, FaTelegramPlane } from "react-icons/fa";
import type { IconType } from "react-icons";

/**
 * Social Media Stat Data Structure
 */
interface SocialStat {
  platform: string;
  icon: IconType;
  count: string;
  color: string;
  ariaLabel: string;
}

/**
 * Mock data for social media statistics
 * @type {SocialStat[]}
 */
export const socialStatsMock: SocialStat[] = [
  {
    platform: "Instagram",
    icon: FaInstagram,
    count: "13.8K+",
    color: "text-gray-800",
    ariaLabel: "Instagram - 13.8 min izləyici",
  },
  {
    platform: "YouTube",
    icon: FaYoutube,
    count: "35.6K+",
    color: "text-gray-800",
    ariaLabel: "YouTube - 35.6 min abunəçi",
  },
  {
    platform: "Facebook",
    icon: FaFacebook,
    count: "6.3K+",
    color: "text-gray-800",
    ariaLabel: "Facebook - 6.3 min izləyici",
  },
  {
    platform: "Telegram",
    icon: FaTelegramPlane,
    count: "1.0K+",
    color: "text-gray-800",
    ariaLabel: "Telegram - 1.0 min üzv",
  },
];

/**
 * Social Media Stats Component
 * Displays social media follower statistics with animations
 * 
 * @component
 * @example
 * ```tsx
 * <SocialMediaStats />
 * ```
 */
export default function SocialMediaStats() {
  if (!socialStatsMock.length) return null;

  return (
      <div className="container mx-auto px-4 max-w-7xl relative">
    <div className="text-white flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
      {/* Left Section: Text */}
      <div className="w-full lg:w-5/12 text-center lg:text-left space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 font-medium text-sm mb-4">
          <span className="w-2 h-2 bg-white rounded-full" aria-hidden="true"></span>
          Sosial Şəbəkələr
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Bizi İzləyirsinizmi?
        </h2>
        <p className="text-white/80 leading-relaxed text-lg md:text-xl">
          Rəqəmsal platformalarda milyonlarla insana çatdıq, ürəklərə toxunduq. Hər paylaşım bir hekayənin başlanğıcı
          oldu. Sizinlə paylaşdığımız hər məzmun aramızda bir körpü qurdu.
        </p>
        <p className="text-white/70 leading-relaxed text-base md:text-lg">
          Nizamiyyə Mədrəsəsi olaraq, milyonların ürəyində iman həqiqətlərinin yer alması bizə ümid verir.
        </p>
      </div>

      {/* Right Section: Stats */}
      <div className="w-full lg:w-6/12 grid grid-cols-2 gap-6 lg:gap-8">
        {socialStatsMock.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.platform}
              className="group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

                {/* Content */}
                <div className="relative flex flex-col items-center text-center space-y-4">
                  <div className="relative" aria-label={stat.ariaLabel}>
                    <IconComponent
                      className={`text-4xl md:text-5xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                      aria-hidden="true"
                    />
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 ${stat.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-3xl font-bold text-white group-hover:text-white transition-colors duration-300">
                      {stat.count}
                    </p>
                    <p className="text-sm md:text-base text-white/70 font-medium">{stat.platform}</p>
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
