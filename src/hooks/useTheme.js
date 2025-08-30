"use client"

import { useState, useEffect, useCallback } from "react"

const useTheme = () => {
  const [theme, setThemeState] = useState('light');

  // Function to apply theme to the document and potentially save preference
  const applyTheme = useCallback((chosenTheme) => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;

    let effectiveTheme = chosenTheme;
    if (chosenTheme === 'system') {
      localStorage.removeItem("color-theme");
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
    } else {
      localStorage.setItem("color-theme", chosenTheme);
      effectiveTheme = chosenTheme;
    }

    // Apply the class to the document element
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    // Force remove dark class from both html and body
    htmlElement.classList.remove("dark");
    bodyElement.classList.remove("dark");
    
    if (effectiveTheme === 'dark') {
      htmlElement.classList.add("dark");
      bodyElement.classList.add("dark");
    }

    // Update the state
    setThemeState(chosenTheme);

    // Force a re-render by triggering a custom event
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: effectiveTheme } }));

    // Update color scheme
    document.documentElement.style.colorScheme = effectiveTheme;
    
    // Add a data attribute to help with CSS targeting
    document.documentElement.setAttribute('data-theme', effectiveTheme);

  }, []);

  // Effect to set initial theme and listen for system changes
  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;

    const storedTheme = localStorage.getItem("color-theme");
    const initialTheme = storedTheme || 'system';
    
    // Apply theme immediately on mount
    setTimeout(() => {
      applyTheme(initialTheme);
    }, 0);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Handler for system theme changes
    const handleSystemChange = (e) => {
      // Only apply system change if the current setting is 'system'
      if (!localStorage.getItem("color-theme") || theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [applyTheme, theme]);

  return [theme, applyTheme];
}

export default useTheme

