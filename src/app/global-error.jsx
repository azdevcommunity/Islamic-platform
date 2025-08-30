'use client'

import {useEffect} from 'react'

export default function GlobalError({error, reset}) {
    useEffect(() => {
        console.error('Global Error:', error)
    }, [error])

    return (
        <html>
        <body>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Critical Error Icon */}
                <div className="mb-8">
                    <div className="relative mx-auto w-32 h-32 mb-6">
                        <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
                        <div className="absolute inset-2 bg-red-400 rounded-full opacity-30 animate-ping"
                             style={{animationDelay: '0.5s'}}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <i className="fas fa-skull-crossbones text-5xl text-red-400"></i>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Kritik Xəta
                    </h1>
                    <p className="text-red-200 text-lg leading-relaxed">
                        Sistemdə ciddi xəta baş verdi.
                        Zəhmət olmasa səhifəni yeniləyin.
                    </p>
                </div>

                {/* Error Details */}
                <div className="bg-black bg-opacity-50 rounded-lg p-6 border border-red-500 mb-8">
                    <h3 className="text-lg font-semibold text-red-300 mb-3">
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        Sistem Xətası
                    </h3>
                    <div className="text-left">
                        <p className="text-sm text-red-200 mb-2">
                            <strong>Növ:</strong> Global Application Error
                        </p>
                        {(error?.message && process.env.APP_ENV_NODE_ENV == 'development') && (
                            <p className="text-sm text-red-200 mb-2 break-words">
                 
                                <strong>Mesaj:</strong> {error.message}
                            </p>
                        )}
                        <p className="text-xs text-red-300 mt-3">
                            Bu xəta avtomatik olaraq sistem administratorlarına göndərildi.
                        </p>
                    </div>
                </div>

                {/* Emergency Actions */}
                <div className="space-y-4">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg"
                    >
                        <i className="fas fa-redo mr-2"></i>
                        Sistemi Yenidən Başlat
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                    >
                        <i className="fas fa-home mr-2"></i>
                        Ana Səhifəyə Qayıt
                    </button>
                </div>

                {/* Emergency Contact */}
                <div className="mt-8 p-4 bg-red-900 bg-opacity-50 rounded-lg border border-red-700">
                    <p className="text-sm text-red-200">
                        <i className="fas fa-phone text-red-400 mr-2"></i>
                        Təcili hal: Texniki dəstək ilə əlaqə saxlayın
                    </p>
                </div>

                {/* System Status */}
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-red-300">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span>Sistem statusu: Kritik xəta</span>
                </div>

                {/* Footer */}
                <div className="mt-8 text-xs text-gray-400">
                    <p>Əhli-Sünnə Mədrəsəsi - Sistem Xəta Səhifəsi</p>
                </div>
            </div>
        </div>
        </body>
        </html>
    )
}
