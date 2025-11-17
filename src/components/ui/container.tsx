/**
 * Container Component
 * Reusable container with consistent max-width and padding
 */

import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ 
  children, 
  className, 
  as: Component = "div" 
}: ContainerProps) {
  return (
    <Component className={cn("container mx-auto px-4 max-w-7xl", className)}>
      {children}
    </Component>
  );
}
