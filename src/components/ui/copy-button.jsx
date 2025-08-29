'use client'
import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CopyButton({ 
  content, 
  variant = "ghost", 
  size = "sm",
  className = "",
  children,
  ...props 
}) {
  const [isCopyCompleted, setCopyCompleted] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopyCompleted(true)

      setTimeout(() => {
        setCopyCompleted(false)
      }, 1500)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`transition-all duration-200 ${className}`}
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      {...props}
    >
      {children ? (
        <>
          {children}
          {isCopyCompleted ? (
            <Check className="ml-2 h-4 w-4 text-green-600" />
          ) : (
            <Copy className="ml-2 h-4 w-4" />
          )}
        </>
      ) : (
        isCopyCompleted ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )
      )}
    </Button>
  )
}