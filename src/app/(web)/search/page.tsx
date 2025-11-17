/**
 * Search Page - Server Component with Client Suspense
 * Global search functionality
 */

import { Suspense } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import SearchPage from "@/components/search/SearchPage";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const metadata: Metadata = {
  title: `Axtarış | ${siteConfig.name}`,
  description: "Məqalələr, suallar, videolar və kitablar arasında axtarış edin.",
  robots: {
    index: false, // Don't index search pages
    follow: true,
  },
};

export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <LoadingSpinner size="lg" />
          <p className="mt-6 text-gray-600 font-medium animate-pulse">
            Yüklənir...
          </p>
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}
