import Link from "next/link"

export default function QuestionNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Question Icon */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-20"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-30"></div>
            <div className="absolute inset-4 bg-gradient-to-blue-300 to-blue-400 rounded-full opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fas fa-question-circle text-4xl text-blue-600"></i>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sual Tapılmadı
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Axtardığınız sual mövcud deyil və ya silinib. 
            Digər sualları nəzərdən keçirə və ya yeni sual verə bilərsiniz.
          </p>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            <i className="fas fa-hands-helping text-blue-500 mr-2"></i>
            Kömək
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Sualınız cavabsız qaldımı? Yeni sual verin və ya mövcud suallar arasında axtarış edin.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link 
            href="/questions/ask"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-plus mr-2"></i>
            Yeni Sual Ver
          </Link>
          
          <div className="flex space-x-3">
            <Link 
              href="/questions"
              className="flex-1 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-list mr-1"></i>
              Bütün Suallar
            </Link>
            <Link 
              href="/search"
              className="flex-1 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-search mr-1"></i>
              Axtarış
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

        {/* FAQ Suggestion */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <i className="fas fa-info-circle text-blue-500 mr-1"></i>
            Tez-tez verilən sualları görmək üçün suallar bölməsinə baxın
          </p>
        </div>
      </div>
    </div>
  )
}