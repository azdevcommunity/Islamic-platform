/**
 * Web Error Boundary - Client Component
 * Handles errors in the web section
 */

"use client";

import { useEffect } from "react";
import Link from "next/link";

interface WebErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function WebError({ error, reset }: WebErrorProps) {
  useEffect(() => {
    console.error("Web Section Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Error Animation */}
        <div className="mb-8">
          <div className="relative mx-auto w-40 h-40 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl opacity-20 transform rotate-12 animate-pulse" />
            <div
              className="absolute inset-2 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl opacity-30 transform rotate-6 animate-pulse"
              style={{ animationDelay: "0.3s" }}
            />
            <div
              className="absolute inset-4 bg-gradient-to-br from-orange-300 to-orange-400 rounded-2xl opacity-40 animate-pulse"
              style={{ animationDelay: "0.6s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-orange-600 animate-bounce"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Səhifə Xətası
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Bu səhifədə texniki problem yaranıb. Mütəxəssislərimiz məsələni həll
            etməyə çalışır.
          </p>
        </div>

        {/* Error Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            <svg
              className="inline-block w-5 h-5 text-orange-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Texniki Məlumat
          </h2>
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
        <nav className="space-y-4" aria-label="Xəta bərpa seçimləri">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Səhifəni Yenidən Yüklə
          </button>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/articles"
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 font-medium"
            >
              Məqalələr
            </Link>
            <Link
              href="/questions"
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 font-medium"
            >
              Suallar
            </Link>
            <Link
              href="/books"
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 font-medium"
            >
              Kitablar
            </Link>
            <Link
              href="/videos"
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 font-medium"
            >
              Videolar
            </Link>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Ana Səhifəyə Qayıt
          </Link>
        </nav>

        {/* Status Info */}
        <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-center space-x-2 text-sm text-orange-700">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
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
  );
}
