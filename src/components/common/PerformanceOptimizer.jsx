"use client";
import { useEffect, useState } from 'react';

const PerformanceOptimizer = ({ children }) => {
  const [isOptimized, setIsOptimized] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Performance optimizations
    const optimizePerformance = () => {
      // Disable animations for low-end devices
      if (shouldReduceMotion) {
        document.documentElement.classList.add('reduce-motion');
      }

      // Optimize for mobile devices
      if (window.innerWidth <= 768) {
        document.documentElement.classList.add('mobile-optimized');
      }

      // Check for low performance devices
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      
      if (cores < 4 || memory < 4) {
        document.documentElement.classList.add('low-performance');
      }

      setIsOptimized(true);
    };

    // Delay optimization to prevent blocking initial render
    const timer = setTimeout(optimizePerformance, 100);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      clearTimeout(timer);
    };
  }, [shouldReduceMotion]);

  if (!isOptimized) {
    return (
      <div className="performance-optimizer-loading">
        {children}
      </div>
    );
  }

  return (
    <div className={`performance-optimizer ${shouldReduceMotion ? 'reduce-motion' : ''}`}>
      {children}
    </div>
  );
};

export default PerformanceOptimizer;
