/**
 * useResizeListener Hook
 * Replacement for PrimeReact's useResizeListener
 */

import { useEffect, useCallback } from 'react';

export function useResizeListener(handler: () => void, debounceMs: number = 100) {
  const debouncedHandler = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handler, debounceMs);
    };
  }, [handler, debounceMs]);

  useEffect(() => {
    const resizeHandler = debouncedHandler();
    
    window.addEventListener('resize', resizeHandler);
    
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [debouncedHandler]);
}

/**
 * useMediaQuery Hook
 * Detects media query changes
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = React.useState<boolean>(getMatches(query));

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatches(getMatches(query));
    };

    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
}

// Import React for useState
import React from 'react';
