import { useEffect, useState } from 'react';

export const useAnimationOptimization = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Check for low performance devices
    const checkPerformance = () => {
      // Check for low-end devices based on hardware concurrency and memory
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      
      // Consider device low performance if it has less than 4 cores or less than 4GB memory
      const isLowEnd = cores < 4 || memory < 4;
      
      // Check for slow connection
      const connection = navigator.connection;
      const isSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g' ||
        connection.effectiveType === '3g'
      );
      
      setIsLowPerformance(isLowEnd || isSlowConnection);
    };

    checkPerformance();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Optimized animation variants for framer-motion
  const getOptimizedVariants = (baseVariants) => {
    if (shouldReduceMotion || isLowPerformance) {
      // Return simplified variants for better performance
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
      };
    }
    
    return baseVariants;
  };

  // Optimized transition settings
  const getOptimizedTransition = (baseTransition = {}) => {
    if (shouldReduceMotion || isLowPerformance) {
      return {
        duration: 0.2,
        ease: "easeOut"
      };
    }
    
    return {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      ...baseTransition
    };
  };

  return {
    shouldReduceMotion,
    isLowPerformance,
    getOptimizedVariants,
    getOptimizedTransition
  };
};
