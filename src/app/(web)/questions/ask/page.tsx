/**
 * Ask Question Page - Client Component
 * Form for submitting new questions
 */

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HttpClient from "@/util/HttpClient";

export default function AskQuestionPage() {
  const [questionText, setQuestionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!questionText.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Zəhmət olmasa, sualınızı daxil edin.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await HttpClient.post("/questions/submit", {
        question: questionText,
      });

      if (!response.ok) {
        let errorMessage =
          "Sual göndərilərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // Ignore JSON parse errors
        }
        throw new Error(errorMessage);
      }

      setSubmitStatus({
        type: "success",
        message: "Sualınız uğurla göndərildi! Tezliklə nəzərdən keçiriləcək.",
      });
      setQuestionText("");

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/questions");
      }, 2000);
    } catch (error) {
      console.error("Error submitting question:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Gözlənilməyən xəta baş verdi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <nav className="mb-8" aria-label="Geri naviqasiya">
          <Link
            href="/questions"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Suallar Siyahısına Qayıt
          </Link>
        </nav>

        {/* Page Header */}
        <header className="text-center mb-10">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Yeni Sual Verin
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Cavabını tapa bilmədiyiniz bir sualınız var? Aşağıdakı formu doldurun.
          </p>
        </header>

        {/* Submission Status Message */}
        {submitStatus.type && (
          <div
            className={`mb-6 p-4 rounded-md border ${
              submitStatus.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
            role="alert"
          >
            <div className="flex items-center gap-2">
              {submitStatus.type === "success" ? (
                <svg
                  className="w-5 h-5 flex-shrink-0"
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
              ) : (
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <p className="text-sm font-medium">{submitStatus.message}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100"
        >
          <div className="mb-6">
            <label
              htmlFor="questionText"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Sualınız <span className="text-red-500" aria-label="tələb olunur">*</span>
            </label>
            <textarea
              id="questionText"
              name="questionText"
              rows={6}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Sualınızı buraya ətraflı yazın..."
              required
              aria-required="true"
              aria-describedby="question-help"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
              disabled={isSubmitting}
            />
            <p id="question-help" className="mt-2 text-xs text-gray-500">
              Zəhmət olmasa, sualınızı aydın və konkret ifadə edin.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !questionText.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Göndərilir...
                </>
              ) : (
                <>
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Sualı Göndər
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
