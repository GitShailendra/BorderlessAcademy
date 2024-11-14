// src/components/ThemeTester.jsx
import React from 'react';
import { useTheme } from '../../assets/Theme/ThemeContext';

const ThemeTester = () => {
  const { theme, currentRegion, switchRegion } = useTheme();

  return (
    <div className="fixed top-20 right-4 bg-white p-6 rounded-lg shadow-lg z-50 w-80">
      <h3 className="text-lg font-bold mb-4">Theme Tester</h3>
      
      {/* Region Switcher */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Current Region: {currentRegion}</label>
        <select
          value={currentRegion}
          onChange={(e) => switchRegion(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="india">India</option>
          <option value="middleEast">Middle East</option>
          <option value="northAsia">North Asia</option>
        </select>
      </div>

      {/* Color Swatches */}
      <div className="space-y-4">
        {Object.entries(theme).map(([colorName, colorValue]) => (
          <div key={colorName} className="flex items-center">
            <div 
              className="w-12 h-12 rounded mr-4"
              style={{ backgroundColor: colorValue }}
            />
            <div>
              <p className="font-medium">{colorName}</p>
              <p className="text-sm text-gray-600">{colorValue}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Debug Info */}
      <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
        <pre>{JSON.stringify(theme, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ThemeTester;