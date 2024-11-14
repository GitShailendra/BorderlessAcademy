import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const LanguageSwitcher = ({ isMobile = false }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Set document direction for RTL languages
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className={`relative ${isMobile ? 'w-full' : 'inline-block'}`}>
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className={`
          appearance-none bg-white rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          ${isMobile 
            ? 'w-full p-3 border border-gray-200 text-base'
            : 'px-4 py-2 border border-gray-300 text-sm'
          }
        `}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {`${lang.flag} ${lang.name}`}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;