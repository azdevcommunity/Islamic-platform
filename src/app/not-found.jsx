import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 İllustration */}
        <div className="mb-8">
          <div className="relative mx-auto w-48 h-48 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full opacity-20"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full opacity-30"></div>
            <div className="absolute inset-8 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-full opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-emerald-600">404</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Səhifə Tapılmadı
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Axtardığınız səhifə mövcud deyil və ya köçürülüb. 
            Zəhmət olmasa əsas səhifəyə qayıdın.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-home mr-2"></i>
            Ana Səhifəyə Qayıt
          </Link>
          
          <div className="flex space-x-3">
            <Link 
              href="/articles"
              className="flex-1 px-4 py-2 bg-white text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-200 font-medium"
            >
              Məqalələr
            </Link>
            <Link 
              href="/questions"
              className="flex-1 px-4 py-2 bg-white text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-200 font-medium"
            >
              Suallar
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Əhli-Sünnə Mədrəsəsi</p>
        </div>
      </div>
    </div>
  )
}

