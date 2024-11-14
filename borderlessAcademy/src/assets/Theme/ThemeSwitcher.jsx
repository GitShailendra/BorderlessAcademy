// src/assets/Theme/ThemeSwitcher.jsx
import React from 'react';
import { useTheme } from './ThemeContext';

export default function ThemeSwitcher() {
  const { currentRegion, switchRegion, availableRegions, isLoading } = useTheme();

  if (isLoading) {
    return <div className="p-4">Loading theme...</div>;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <select
        value={currentRegion}
        onChange={(e) => switchRegion(e.target.value)}
        className="p-2 border rounded"
      >
        {availableRegions.map((region) => (
          <option key={region} value={region}>
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </option>
        ))}
      </select>
      <div className="mt-2 text-sm text-gray-600">
        Current Region: {currentRegion}
      </div>
    </div>
  );
}