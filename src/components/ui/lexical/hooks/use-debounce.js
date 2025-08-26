import { useCallback, useRef } from "react"

export function useDebounce(fn, delay, maxWait) {
  const timeoutRef = useRef(null)
  const maxTimeoutRef = useRef(null)
  const lastCallTimeRef = useRef(0)

  const debouncedFn = useCallback(
    (...args) => {
      const now = Date.now()

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // If this is the first call or maxWait time has passed, execute immediately
      if (!lastCallTimeRef.current || (maxWait && now - lastCallTimeRef.current >= maxWait)) {
        if (maxTimeoutRef.current) {
          clearTimeout(maxTimeoutRef.current)
          maxTimeoutRef.current = null
        }
        lastCallTimeRef.current = now
        return fn(...args)
      }

      // Set up the debounced call
      timeoutRef.current = setTimeout(() => {
        lastCallTimeRef.current = Date.now()
        fn(...args)
      }, delay)

      // Set up max wait timeout if specified
      if (maxWait && !maxTimeoutRef.current) {
        maxTimeoutRef.current = setTimeout(() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          lastCallTimeRef.current = Date.now()
          fn(...args)
          maxTimeoutRef.current = null
        }, maxWait)
      }
    },
    [fn, delay, maxWait]
  )

  // Add cancel method
  debouncedFn.cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current)
      maxTimeoutRef.current = null
    }
  }, [])

  return debouncedFn
}