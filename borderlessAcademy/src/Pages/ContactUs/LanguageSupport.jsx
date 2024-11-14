import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, MessageCircle, BookOpen, HeadphonesIcon } from 'lucide-react';

export default function LanguageSupport() {
  const { t } = useTranslation();

  const supportedLanguages = [
    {
      name: "Bahasa Malaysia",
      flag: "🇲🇾",
      code: "ms",
      support: ["Chat", "Email", "Phone", "Learning Materials"]
    },
    {
      name: "English",
      flag: "🌏",
      code: "en",
      support: ["Chat", "Email", "Phone", "Learning Materials"]
    },
    {
      name: "中文",
      flag: "🇨🇳",
      code: "zh",
      support: ["Chat", "Email", "Phone", "Learning Materials"]
    }
  ];

  const supportTypes = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      name: "Chat",
      availability: "24/7"
    },
    {
      icon: <HeadphonesIcon className="h-5 w-5" />,
      name: "Phone",
      availability: "9AM - 6PM (MYT)"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      name: "Email",
      availability: "24/7"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      name: "Learning Materials",
      availability: "Always Available"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-6">Language Support</h2>

      {/* Available Languages */}
      <div className="space-y-6 mb-8">
        {supportedLanguages.map((language) => (
          <div 
            key={language.code}
            className="bg-background rounded-lg p-4"
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl">{language.flag}</span>
              <span className="font-medium text-gray-900">{language.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {language.support.map((type, index) => (
                <div 
                  key={index}
                  className="text-sm text-gray-600 flex items-center space-x-2"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Support Types */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Support Channels</h3>
        <div className="grid grid-cols-2 gap-4">
          {supportTypes.map((type) => (
            <div 
              key={type.name}
              className="bg-primary/5 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-primary">{type.icon}</div>
                <span className="font-medium text-gray-900">{type.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                Available: {type.availability}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Language Selection Note */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
        <p className="text-sm text-gray-600">
          Language preference can be selected at any time during your interaction with our support team.
          All official documents and certificates are provided in both English and Bahasa Malaysia.
        </p>
      </div>
    </div>
  );
}