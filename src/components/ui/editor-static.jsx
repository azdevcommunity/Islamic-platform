import * as React from 'react';
import { cn } from '@/lib/utils';

// Simple static editor component for displaying content
export function EditorStatic({
  className,
  children,
  content,
  ...props
}) {
  return (
    <div 
      className={cn(
        'relative w-full break-words whitespace-pre-wrap',
        'rounded-md p-4 text-base',
        className
      )} 
      {...props}
    >
      {content || children}
    </div>
  );
}
