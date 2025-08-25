import Link from "next/link"

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Article Icon */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl opacity-20 transform rotate-12"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl opacity-30 transform rotate-6"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-amber-300 to-amber-400 rounded-2xl opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fas fa-file-alt text-4xl text-amber-600"></i>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Məqalə Tapılmadı
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Axtardığınız məqalə mövcud deyil və ya silinib. 
            Digər məqalələrimizi nəzərdən keçirə bilərsiniz.
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
            Təklif
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Axtardığınız mövzunu axtarış bölməsində yoxlayın və ya ən son məqalələrimizə baxın.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link 
            href="/articles"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-newspaper mr-2"></i>
            Bütün Məqalələr
          </Link>
          
          <div className="flex space-x-3">
            <Link 
              href="/search"
              className="flex-1 px-4 py-2 bg-white text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-search mr-1"></i>
              Axtarış
            </Link>
            <Link 
              href="/"
              className="flex-1 px-4 py-2 bg-white text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-home mr-1"></i>
              Ana Səhifə
            </Link>
          </div>
        </div>

        {/* Popular Articles Suggestion */}
        <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-700">
            <i className="fas fa-star text-emerald-500 mr-1"></i>
            Populyar məqalələrimizi oxumaq üçün məqalələr bölməsinə keçin
          </p>
        </div>
      </div>
    </div>
  )
}