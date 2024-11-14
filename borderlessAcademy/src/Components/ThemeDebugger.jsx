import React, { useState } from 'react';
import { useTheme } from '../assets/Theme/ThemeContext';
import { X } from 'lucide-react';

const regionLabels = {
  india: 'India & South Asia',
  middleEast: 'Middle East',
  northAsia: 'North Asia',
  europe: 'Europe'
};

const languageLabels = {
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil',
  ar: 'Arabic',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
  nl: 'Dutch',
  en: 'English'
};

const ThemeDebugger = ({ onClose }) => {
  const { theme, currentRegion, switchRegion, browserInfo, availableRegions } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getLanguageName = (languageCode) => {
    const code = languageCode.split('-')[0];
    return languageLabels[code] || languageCode;
  };

  if (isCollapsed) {
    return (
      <div className="fixed top-20 right-4 bg-white p-2 rounded-lg shadow-lg z-50 cursor-pointer"
           onClick={() => setIsCollapsed(false)}>
        <div className="text-sm font-medium">🎨 Theme: {regionLabels[currentRegion]}</div>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 bg-white p-6 rounded-lg shadow-lg z-50 w-96 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Theme & Region Debug</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 hover:bg-gray-100 rounded"
            title="Minimize"
          >
            <span className="text-xl">−</span>
          </button>
        </div>
      </div>
      
      {/* Browser Settings */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Browser Settings</h4>
        <div className="text-sm space-y-1">
          <p>Language: {getLanguageName(browserInfo.language)} ({browserInfo.language})</p>
          <p>Timezone: {browserInfo.timezone}</p>
        </div>
      </div>

      {/* Current Theme Info */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Current Theme</h4>
        <p className="text-primary mb-2">Region: {regionLabels[currentRegion] || currentRegion}</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(theme).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <div 
                className="w-6 h-6 rounded"
                style={{ backgroundColor: value }}
              />
              <span className="text-sm">{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Region Switcher */}
      <div>
        <h4 className="font-semibold mb-2">Switch Region</h4>
        <div className="grid grid-cols-2 gap-2">
          {availableRegions.map((region) => (
            <button
              key={region}
              onClick={() => switchRegion(region)}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                currentRegion === region 
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {regionLabels[region] || region}
            </button>
          ))}
        </div>
      </div>

      {/* Local Storage Info */}
      <div className="mt-6 text-xs text-gray-500">
        <p>Stored Preference: {localStorage.getItem('preferred-region') || 'None'}</p>
        <button 
          onClick={() => {
            localStorage.removeItem('preferred-region');
            window.location.reload();
          }}
          className="mt-2 text-red-500 hover:text-red-600"
        >
          Clear Stored Preference
        </button>
      </div>

      <div className="mt-4 pt-4 border-t text-xs text-gray-400">
        <p>Press Ctrl + Shift + D to toggle debugger</p>
      </div>
    </div>
  );
};

export default ThemeDebugger;