import Link from "next/link"
import { FaPlay, FaVideo, FaSearch, FaNewspaper, FaHome, FaFire } from "react-icons/fa"

export default function VideoNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Video Icon */}
        <div className="mb-12">
          <div className="relative mx-auto w-40 h-40 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl opacity-20 transform rotate-12 animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-red-200 to-red-300 rounded-3xl opacity-30 transform rotate-6"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-red-300 to-red-400 rounded-3xl opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaPlay className="text-6xl text-red-600" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full text-red-700 font-medium text-sm">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            404 Xəta
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Video Tapılmadı
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            Axtardığınız video mövcud deyil və ya silinib. 
            Digər videolarımızı izləyə bilərsiniz.
          </p>
        </div>

        {/* Video Library Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaVideo className="text-red-600 text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Video Kitabxana
            </h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Dini mövzularda maraqlı və faydalı videolarımızı izləyin. 
            Əhli-Sünnə Mədrəsəsinin zəngin video arxivindən istifadə edin.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          <Link 
            href="/videos"
            className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FaVideo />
            Bütün Videolar
          </Link>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-red-600 border-2 border-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 font-semibold"
            >
              <FaSearch />
              Axtarış
            </Link>
            <Link 
              href="/articles"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-red-600 border-2 border-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 font-semibold"
            >
              <FaNewspaper />
              Məqalələr
            </Link>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-3 w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
          >
            <FaHome />
            Ana Səhifəyə Qayıt
          </Link>
        </div>

        {/* Popular Videos Suggestion */}
        <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
          <div className="flex items-center justify-center gap-2 text-red-700">
            <FaFire className="text-red-500" />
            <p className="font-medium">
              Populyar videoları görmək üçün videolar bölməsinə baxın
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}