import React from 'react';
import { useRouteTransition } from '../../hooks/useRouteTransition';

export default function PageTransition({ children }) {
  const isTransitioning = useRouteTransition();

  return (
    <div
      className={`transition-opacity duration-300 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {children}
    </div>
  );
}