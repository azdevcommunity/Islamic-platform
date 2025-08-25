import Link from "next/link"

export default function VideoNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Video Icon */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl opacity-20 transform rotate-12"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-red-200 to-red-300 rounded-2xl opacity-30 transform rotate-6"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-red-300 to-red-400 rounded-2xl opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fas fa-play-circle text-4xl text-red-600"></i>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Video Tapılmadı
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Axtardığınız video mövcud deyil və ya silinib. 
            Digər videolarımızı izləyə bilərsiniz.
          </p>
        </div>

        {/* Video Library Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            <i className="fas fa-video text-red-500 mr-2"></i>
            Video Kitabxana
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Dini mövzularda maraqlı və faydalı videolarımızı izləyin.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link 
            href="/videos"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-video mr-2"></i>
            Bütün Videolar
          </Link>
          
          <div className="flex space-x-3">
            <Link 
              href="/search"
              className="flex-1 px-4 py-2 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-search mr-1"></i>
              Axtarış
            </Link>
            <Link 
              href="/articles"
              className="flex-1 px-4 py-2 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-newspaper mr-1"></i>
              Məqalələr
            </Link>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            <i className="fas fa-home mr-2"></i>
            Ana Səhifəyə Qayıt
          </Link>
        </div>

        {/* Popular Videos Suggestion */}
        <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-700">
            <i className="fas fa-fire text-red-500 mr-1"></i>
            Populyar videoları görmək üçün videolar bölməsinə baxın
          </p>
        </div>
      </div>
    </div>
  )
}