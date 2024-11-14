// src/assets/Theme/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectRegion, regionalThemes } from './config/geocoding';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentRegion, setCurrentRegion] = useState('india');
  const [theme, setTheme] = useState(regionalThemes.india);
  const [browserInfo, setBrowserInfo] = useState({
    timezone: '',
    language: ''
  });

  const updateCSSVariables = (themeColors) => {
    const root = document.documentElement;
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  const switchRegion = (region) => {
    if (regionalThemes[region]) {
      setCurrentRegion(region);
      setTheme(regionalThemes[region]);
      updateCSSVariables(regionalThemes[region]);
      localStorage.setItem('preferred-region', region);
    }
  };

  useEffect(() => {
    // Get browser info
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language || navigator.userLanguage;
    setBrowserInfo({ timezone, language });

    // Check localStorage first
    const savedRegion = localStorage.getItem('preferred-region');
    if (savedRegion && regionalThemes[savedRegion]) {
      switchRegion(savedRegion);
      return;
    }

    // Detect region based on browser settings
    const detectedRegion = detectRegion();
    switchRegion(detectedRegion);
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      currentRegion, 
      switchRegion,
      browserInfo,
      availableRegions: Object.keys(regionalThemes)
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}