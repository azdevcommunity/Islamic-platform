import Link from "next/link"
import { FaFileAlt, FaNewspaper, FaSearch, FaHome, FaStar, FaLightbulb } from "react-icons/fa"

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Article Icon */}
        <div className="mb-12">
          <div className="relative mx-auto w-40 h-40 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#43b365]/10 to-[#43b365]/20 rounded-3xl opacity-20 transform rotate-12 animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-[#43b365]/20 to-[#43b365]/30 rounded-3xl opacity-30 transform rotate-6"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-[#43b365]/30 to-[#43b365]/40 rounded-3xl opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaFileAlt className="text-6xl text-[#43b365]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#43b365]/10 rounded-full text-[#43b365] font-medium text-sm">
            <span className="w-2 h-2 bg-[#43b365] rounded-full"></span>
            404 Xəta
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Məqalə Tapılmadı
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            Axtardığınız məqalə mövcud deyil və ya silinib. 
            Digər məqalələrimizi nəzərdən keçirə bilərsiniz.
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaLightbulb className="text-yellow-600 text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Təklif
            </h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Axtardığınız mövzunu axtarış bölməsində yoxlayın və ya ən son məqalələrimizə baxın.
            İslami elm və hikmət dolu məqalələrimiz sizləri gözləyir.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          <Link 
            href="/articles"
            className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-[#43b365] to-[#2d7a47] text-white font-semibold rounded-xl hover:from-[#2d7a47] hover:to-[#1e5a32] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FaNewspaper />
            Bütün Məqalələr
          </Link>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#43b365] border-2 border-[#43b365] rounded-xl hover:bg-[#43b365]/5 transition-all duration-300 font-semibold"
            >
              <FaSearch />
              Axtarış
            </Link>
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#43b365] border-2 border-[#43b365] rounded-xl hover:bg-[#43b365]/5 transition-all duration-300 font-semibold"
            >
              <FaHome />
              Ana Səhifə
            </Link>
          </div>
        </div>

        {/* Popular Articles Suggestion */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#43b365]/5 to-green-50 rounded-2xl border border-[#43b365]/20">
          <div className="flex items-center justify-center gap-2 text-[#43b365]">
            <FaStar className="text-[#43b365]" />
            <p className="font-medium">
              Populyar məqalələrimizi oxumaq üçün məqalələr bölməsinə keçin
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}