import { Suspense } from "react"
import SearchPage from "@/components/search/SearchPage"
import Spinner from "@/components/search/Spinner"

export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <Spinner size="lg" color="primary" />
          <p className="mt-6 text-gray-600 font-medium animate-pulse">Yüklənir...</p>
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  )
}

