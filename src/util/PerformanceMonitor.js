// Performance monitoring utilities
export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.startTime = performance.now();
  }

  // Measure page load time
  measurePageLoad() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const loadTime = performance.now() - this.startTime;
        this.metrics.pageLoadTime = loadTime;
        
        // Log performance metrics
        console.log('Performance Metrics:', {
          pageLoadTime: `${loadTime.toFixed(2)}ms`,
          deviceMemory: navigator.deviceMemory || 'Unknown',
          hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
          connectionType: navigator.connection?.effectiveType || 'Unknown'
        });
      });
    }
  }

  // Measure animation performance
  measureAnimation(element, animationName) {
    if (!element) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes(animationName)) {
          this.metrics[`${animationName}Duration`] = entry.duration;
          console.log(`${animationName} animation took: ${entry.duration.toFixed(2)}ms`);
        }
      }
    });

    observer.observe({ entryTypes: ['measure'] });
  }

  // Check if device is low performance
  isLowPerformanceDevice() {
    if (typeof window === 'undefined') return false;

    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const connection = navigator.connection;

    const isLowEnd = cores < 4 || memory < 4;
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.effectiveType === '3g'
    );

    return isLowEnd || isSlowConnection;
  }

  // Get performance recommendations
  getRecommendations() {
    const recommendations = [];

    if (this.isLowPerformanceDevice()) {
      recommendations.push('Consider reducing animations for better performance');
      recommendations.push('Use lower quality images and videos');
      recommendations.push('Implement lazy loading for non-critical content');
    }

    if (this.metrics.pageLoadTime > 3000) {
      recommendations.push('Page load time is slow, consider optimizing assets');
    }

    return recommendations;
  }

  // Monitor frame rate
  monitorFrameRate() {
    if (typeof window === 'undefined') return;

    let frameCount = 0;
    let lastTime = performance.now();

    const countFrames = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.metrics.fps = fps;
        
        if (fps < 30) {
          console.warn('Low frame rate detected:', fps, 'fps');
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(countFrames);
    };

    requestAnimationFrame(countFrames);
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Initialize monitoring
if (typeof window !== 'undefined') {
  performanceMonitor.measurePageLoad();
  performanceMonitor.monitorFrameRate();
}
