'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Client Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon Animation */}
        <div className="mb-8">
          <div className="relative mx-auto w-48 h-48 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-30 animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="absolute inset-8 bg-gradient-to-br from-red-300 to-red-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.4s'}}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-6xl text-red-600 animate-bounce"></i>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Xəta Baş Verdi
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Təəssüf ki, səhifə yüklənərkən xəta baş verdi. 
            Zəhmət olmasa yenidən cəhd edin.
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-red-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            <i className="fas fa-info-circle text-red-500 mr-2"></i>
            Xəta Haqqında
          </h3>
          <div className="text-left">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Xəta növü:</strong> Client-side Error
            </p>
            {error?.message && (
              <p className="text-sm text-gray-600 mb-2">
                <strong>Mesaj:</strong> {error.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Bu xəta brauzer tərəfində baş verib və avtomatik olaraq qeydə alınıb.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-redo mr-2"></i>
            Yenidən Cəhd Et
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
            >
              <i className="fas fa-sync-alt mr-1"></i>
              Səhifəni Yenilə
            </button>
            <Link 
              href="/"
              className="flex-1 px-4 py-2 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium text-center"
            >
              <i className="fas fa-home mr-1"></i>
              Ana Səhifə
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-700 mb-2">
            <i className="fas fa-question-circle text-red-500 mr-1"></i>
            Problem davam edirse:
          </p>
          <ul className="text-xs text-red-600 space-y-1">
            <li>• Brauzerinizi yeniləyin</li>
            <li>• İnternet bağlantınızı yoxlayın</li>
            <li>• Bir neçə dəqiqə sonra yenidən cəhd edin</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Əhli-Sünnə Mədrəsəsi - Texniki Dəstək</p>
        </div>
      </div>
    </div>
  )
}