import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function VideoNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center mb-8 shadow-lg mx-auto">
            <svg
              className="w-16 h-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Video Tapılmadı
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Axtardığınız video mövcud deyil və ya silinib.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/videos"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            Videolara Qayıt
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
          >
            <Home className="w-5 h-5" />
            Ana Səhifə
          </Link>
        </div>
      </div>
    </div>
  );
}
