/**
 * Section Header Component
 * Reusable section header with badge, title, and description
 */

import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ 
  badge, 
  title, 
  description, 
  className 
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 font-medium text-sm mb-4 border border-primary-100">
          <span className="w-2 h-2 bg-primary-500 rounded-full" />
          {badge}
        </div>
      )}
      
      <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
        {title}
      </h2>
      
      {description && (
        <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
      
      <div className="mt-8 w-24 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto rounded-full" />
    </div>
  );
}
