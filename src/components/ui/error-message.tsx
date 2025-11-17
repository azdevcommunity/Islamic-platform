/**
 * Error Message Component
 * Reusable error display component
 */

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ 
  title = "Xəta baş verdi", 
  message, 
  className,
  onRetry 
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "p-8 bg-red-50 border border-red-200 text-red-700 rounded-3xl text-center",
        className
      )}
    >
      <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
      <div className="text-xl font-semibold mb-2">{title}</div>
      <p className="text-lg mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Yenidən cəhd et
        </button>
      )}
    </div>
  );
}
