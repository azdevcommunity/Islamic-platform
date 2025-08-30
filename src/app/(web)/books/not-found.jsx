import Link from "next/link"

export default function BookNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Book Icon */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg opacity-20 transform rotate-12"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg opacity-30 transform rotate-6"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-purple-300 to-purple-400 rounded-lg opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fas fa-book text-4xl text-purple-600"></i>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Kitab Tapılmadı
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Axtardığınız kitab mövcud deyil və ya silinib. 
            Digər kitablarımızı nəzərdən keçirə bilərsiniz.
          </p>
        </div>

        {/* Library Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            <i className="fas fa-book-open text-purple-500 mr-2"></i>
            Kitabxana
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Geniş kitab kolleksiyamızda İslam dini, fiqh və digər mövzularda dəyərli əsərlər var.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link 
            href="/books"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-books mr-2"></i>
            Bütün Kitablar
          </Link>
          
          <div className="flex space-x-3">
            <Link 
              href="/search"
              className="flex-1 px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-search mr-1"></i>
              Axtarış
            </Link>
            <Link 
              href="/articles"
              className="flex-1 px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 font-medium"
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

        {/* Recommendation */}
        <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-700">
            <i className="fas fa-bookmark text-purple-500 mr-1"></i>
            Tövsiyə olunan kitabları görmək üçün kitablar bölməsinə baxın
          </p>
        </div>
      </div>
    </div>
  )
}