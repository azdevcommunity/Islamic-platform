/**
 * Section Component
 * Reusable section wrapper with consistent spacing
 */

import { cn } from "@/lib/utils/cn";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "gradient" | "dark";
}

export function Section({ 
  children, 
  className, 
  id,
  variant = "default" 
}: SectionProps) {
  const variantStyles = {
    default: "bg-white",
    gradient: "bg-gradient-to-br from-stone-50 to-white",
    dark: "bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800",
  };

  return (
    <section 
      id={id}
      className={cn(
        "py-20 md:py-28 relative",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </section>
  );
}
