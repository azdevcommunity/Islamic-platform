"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Xəta baş verdi
            </h1>
            <p className="mb-6 text-gray-600">
              Təəssüf ki, gözlənilməz bir xəta baş verdi. Xətanı qeyd etdik və tezliklə həll edəcəyik.
            </p>
            <button
              onClick={reset}
              className="rounded-lg bg-emerald-600 px-6 py-3 text-white transition-colors hover:bg-emerald-700"
            >
              Yenidən cəhd et
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
