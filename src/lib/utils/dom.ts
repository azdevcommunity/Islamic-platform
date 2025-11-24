/**
 * DOM Utilities
 * Replacement for PrimeReact's DomHandler
 */

export const DomUtils = {
  /**
   * Add class to element
   */
  addClass(element: HTMLElement | null, className: string): void {
    if (element && className) {
      element.classList.add(...className.split(' '));
    }
  },

  /**
   * Remove class from element
   */
  removeClass(element: HTMLElement | null, className: string): void {
    if (element && className) {
      element.classList.remove(...className.split(' '));
    }
  },

  /**
   * Toggle class on element
   */
  toggleClass(element: HTMLElement | null, className: string): void {
    if (element && className) {
      element.classList.toggle(className);
    }
  },

  /**
   * Check if element has class
   */
  hasClass(element: HTMLElement | null, className: string): boolean {
    if (element && className) {
      return element.classList.contains(className);
    }
    return false;
  },

  /**
   * Check if device is touch-enabled
   */
  isTouchDevice(): boolean {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  },

  /**
   * Get viewport width
   */
  getViewportWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth;
  },

  /**
   * Get viewport height
   */
  getViewportHeight(): number {
    return window.innerHeight || document.documentElement.clientHeight;
  },

  /**
   * Check if element is visible in viewport
   */
  isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Get element offset
   */
  getOffset(element: HTMLElement): { top: number; left: number } {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
  },

  /**
   * Scroll to element
   */
  scrollIntoView(element: HTMLElement, options?: ScrollIntoViewOptions): void {
    element.scrollIntoView(options || { behavior: 'smooth', block: 'start' });
  },

  /**
   * Focus element
   */
  focus(element: HTMLElement | null): void {
    if (element) {
      element.focus();
    }
  },

  /**
   * Block body scroll
   */
  blockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  },

  /**
   * Unblock body scroll
   */
  unblockBodyScroll(): void {
    document.body.style.overflow = '';
  },
};
