/**
 * Not Found Template Component
 * Reusable 404 page template with customizable content
 */

import Link from "next/link";
import type { ReactNode } from "react";

interface NotFoundAction {
  href: string;
  label: string;
  icon: ReactNode;
  variant?: "primary" | "secondary";
}

interface NotFoundTemplateProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconBgColor: string;
  accentColor: string;
  suggestionTitle: string;
  suggestionDescription: string;
  suggestionIcon: ReactNode;
  primaryAction: NotFoundAction;
  secondaryActions: NotFoundAction[];
  footerMessage: string;
}

export function NotFoundTemplate({
  title,
  description,
  icon,
  iconBgColor,
  accentColor,
  suggestionTitle,
  suggestionDescription,
  suggestionIcon,
  primaryAction,
  secondaryActions,
  footerMessage,
}: NotFoundTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Icon Animation */}
        <div className="mb-12" role="img" aria-label={title}>
          <div className="relative mx-auto w-40 h-40 mb-8">
            <div
              className={`absolute inset-0 ${iconBgColor} rounded-3xl opacity-20 transform rotate-12 animate-pulse`}
            />
            <div
              className={`absolute inset-2 ${iconBgColor} rounded-3xl opacity-30 transform rotate-6`}
            />
            <div
              className={`absolute inset-4 ${iconBgColor} rounded-3xl opacity-40`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 ${accentColor} rounded-full font-medium text-sm`}
          >
            <span className={`w-2 h-2 ${accentColor.replace("bg-", "bg-").replace("/10", "")} rounded-full`} />
            404 Xəta
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            {description}
          </p>
        </div>

        {/* Suggestion Box */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`w-12 h-12 ${accentColor} rounded-xl flex items-center justify-center`}>
              {suggestionIcon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {suggestionTitle}
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {suggestionDescription}
          </p>
        </div>

        {/* Actions */}
        <nav className="space-y-6" aria-label="Naviqasiya seçimləri">
          <Link
            href={primaryAction.href}
            className={`inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r ${accentColor.replace("/10", "").replace("bg-", "from-")} to-opacity-80 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg`}
          >
            {primaryAction.icon}
            {primaryAction.label}
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secondaryActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-white ${accentColor.replace("/10", "").replace("bg-", "text-")} border-2 ${accentColor.replace("/10", "").replace("bg-", "border-")} rounded-xl hover:${accentColor} transition-all duration-300 font-semibold`}
              >
                {action.icon}
                {action.label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
          >
            <svg
              className="w-5 h-5"
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

        {/* Footer Message */}
        <div
          className={`mt-12 p-6 bg-gradient-to-r ${accentColor} rounded-2xl border ${accentColor.replace("/10", "/20").replace("bg-", "border-")}`}
        >
          <div className={`flex items-center justify-center gap-2 ${accentColor.replace("/10", "").replace("bg-", "text-")}`}>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium">{footerMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
