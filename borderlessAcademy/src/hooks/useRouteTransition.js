// src/hooks/useRouteTransition.js
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useRouteTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [location]);

  return isTransitioning;
}