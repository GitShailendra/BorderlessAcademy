// src/assets/Theme/config/geocoding.js

export const detectRegion = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const browserLanguage = navigator.language || navigator.userLanguage;
    console.log('Timezone:', timezone, 'Language:', browserLanguage);
  
    // Check language first
    switch (browserLanguage.toLowerCase().split('-')[0]) {
      case 'hi':
      case 'bn':
      case 'ta':
        return 'india';
      case 'ar':
        return 'middleEast';
      case 'ja':
      case 'ko':
      case 'zh':
        return 'northAsia';
      case 'de':
      case 'fr':
      case 'es':
      case 'it':
      case 'nl':
        return 'europe';
    }
  
    // If language doesn't match, check timezone
    if (timezone.startsWith('Asia/Kolkata') || 
        timezone.startsWith('Asia/Colombo') || 
        timezone.startsWith('Asia/Dhaka')) {
      return 'india';
    }
    
    if (timezone.startsWith('Asia/Dubai') || 
        timezone.startsWith('Asia/Riyadh') || 
        timezone.startsWith('Asia/Qatar') || 
        timezone.startsWith('Asia/Muscat')) {
      return 'middleEast';
    }
    
    if (timezone.startsWith('Asia/Tokyo') || 
        timezone.startsWith('Asia/Seoul') || 
        timezone.startsWith('Asia/Shanghai') || 
        timezone.startsWith('Asia/Hong_Kong')) {
      return 'northAsia';
    }
  
    if (timezone.startsWith('Europe/')) {
      return 'europe';
    }
  
    return 'india'; // Default
  };
  
  export const regionalThemes = {
    india: {
      primary: "#3D52A0",
      secondary: "#7091E6",
      accent: "#8697C4",
      surface: "#ADBBDA",
      background: "#EDE8F5",
    },
    middleEast: {
      primary: "#8B4513",
      secondary: "#DEB887",
      accent: "#DAA520",
      surface: "#F5DEB3",
      background: "#FDF5E6",
    },
    northAsia: {
      primary: "#8B0000",
      secondary: "#FF4500",
      accent: "#FF6347",
      surface: "#FFA07A",
      background: "#FFF5EE",
    },
    europe: {
      primary: "#2C3E50",
      secondary: "#3498DB",
      accent: "#E74C3C",
      surface: "#ECF0F1",
      background: "#F8F9FA",
    }
  };