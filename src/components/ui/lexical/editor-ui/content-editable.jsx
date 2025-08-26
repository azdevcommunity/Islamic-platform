"use client"

import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable"
import { cn } from "@/lib/utils"

export function ContentEditable({
  placeholder,
  className,
  placeholderClassName,
  ...props
}) {
  return (
    <LexicalContentEditable
      className={
        className ??
        cn(
          "ContentEditable__root relative block min-h-72 min-h-full overflow-auto px-8 py-4 focus:outline-none"
        )
      }
      aria-placeholder={placeholder}
      placeholder={
        <div
          className={
            placeholderClassName ??
            cn(
              "text-muted-foreground pointer-events-none absolute top-0 left-0 overflow-hidden px-8 py-[18px] text-ellipsis select-none"
            )
          }
        >
          {placeholder}
        </div>
      }
      {...props}
    />
  )
}