'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function WebError({ error, reset }) {
  useEffect(() => {
    console.error('Web Section Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Error Animation */}
        <div className="mb-8">
          <div className="relative mx-auto w-40 h-40 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl opacity-20 transform rotate-12 animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl opacity-30 transform rotate-6 animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute inset-4 bg-gradient-to-br from-orange-300 to-orange-400 rounded-2xl opacity-40 animate-pulse" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fas fa-bug text-5xl text-orange-600 animate-bounce"></i>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Səhifə Xətası
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Bu səhifədə texniki problem yaranıb. 
            Mütəxəssislərimiz məsələni həll etməyə çalışır.
          </p>
        </div>

        {/* Error Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            <i className="fas fa-tools text-orange-500 mr-2"></i>
            Texniki Məlumat
          </h3>
          <div className="text-left space-y-2">
            <p className="text-sm text-gray-600">
              <strong>Bölmə:</strong> Web Interface
            </p>
            {error?.digest && (
              <p className="text-sm text-gray-600">
                <strong>Xəta ID:</strong> {error.digest}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-3">
              Bu xəta avtomatik olaraq sistem administratorlarına bildirildi.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-refresh mr-2"></i>
            Səhifəni Yenidən Yüklə
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/articles"
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-newspaper mr-1"></i>
              Məqalələr
            </Link>
            <Link 
              href="/questions"
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-question-circle mr-1"></i>
              Suallar
            </Link>
            <Link 
              href="/books"
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-book mr-1"></i>
              Kitablar
            </Link>
            <Link 
              href="/videos"
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-video mr-1"></i>
              Videolar
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

        {/* Status Info */}
        <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-center space-x-2 text-sm text-orange-700">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span>Sistem statusu yoxlanılır...</span>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6 text-center">
          <Link 
            href="/contact"
            className="text-sm text-orange-600 hover:text-orange-700 underline"
          >
            Problem davam edirse bizimlə əlaqə saxlayın
          </Link>
        </div>
      </div>
    </div>
  )
}