import Link from "next/link"
import { FaQuestionCircle, FaPlus, FaList, FaSearch, FaHome, FaInfoCircle, FaHandsHelping } from "react-icons/fa"

export default function QuestionNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Question Icon */}
        <div className="mb-12">
          <div className="relative mx-auto w-40 h-40 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl opacity-20 transform rotate-12 animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-green-200 to-green-300 rounded-3xl opacity-30 transform rotate-6"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-green-300 to-green-400 rounded-3xl opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaQuestionCircle className="text-6xl text-green-600" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            404 Xəta
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sual Tapılmadı
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            Axtardığınız sual mövcud deyil və ya silinib.
            Digər sualları nəzərdən keçirə və ya yeni sual verə bilərsiniz.
          </p>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaHandsHelping className="text-green-600 text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Kömək
            </h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Sualınız cavabsız qaldımı? Yeni sual verin və ya mövcud suallar arasında axtarış edin.
            Dini məsələlər üzrə həkimlik cavabları sizləri gözləyir.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          <Link
            href="/questions/ask"
            className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FaPlus />
            Yeni Sual Ver
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/questions"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-xl hover:bg-green-50 transition-all duration-300 font-semibold"
            >
              <FaList />
              Bütün Suallar
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-xl hover:bg-green-50 transition-all duration-300 font-semibold"
            >
              <FaSearch />
              Axtarış
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

        {/* FAQ Suggestion */}
        <div className="mt-12 mb-4 p-6 bg-gradient-to-r from-green-50 to-green-200 rounded-2xl border border-green-200">
          <div className="flex items-center justify-center gap-2 text-green-700">
            <FaInfoCircle className="text-green-500" />
            <p className="font-medium">
              Tez-tez verilən sualları görmək üçün suallar bölməsinə baxın
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
